// test-pages.mjs
// Run AFTER: nuxt build && node .output/server/index.mjs
// Usage: node test-pages.mjs [base-url] [iterations]
// Example: node test-pages.mjs http://localhost:3000 20

import { performance } from 'perf_hooks'

const BASE_URL = process.argv[2] || 'http://localhost:3000'
const ITERATIONS = parseInt(process.argv[3] || '10')

const PAGES = [
  {
    name: 'SSR',
    path: '/ssr',
    description: 'Server-Side Rendered — HTML built per request',
  },
  {
    name: 'CSR',
    path: '/csr',
    description: 'Client-Side Rendered — server sends empty shell',
  },
  {
    name: 'Static',
    path: '/static',
    description: 'Pre-rendered — server reads a file from disk',
  },
]

async function measureRequest(url) {
  const start = performance.now()
  const res = await fetch(url)
  const firstByteTime = performance.now() // TTFB approximation
  const html = await res.text()
  const totalTime = performance.now()

  return {
    status: res.status,
    ttfb: firstByteTime - start,         // Time to first byte
    total: totalTime - start,             // Full response time
    size: Buffer.byteLength(html, 'utf8'),
    html,
  }
}

function stats(values) {
  const sorted = [...values].sort((a, b) => a - b)
  const sum = values.reduce((a, b) => a + b, 0)
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    avg: sum / values.length,
    median: sorted[Math.floor(sorted.length / 2)],
    p95: sorted[Math.floor(sorted.length * 0.95)],
  }
}

function fmt(ms) {
  return `${ms.toFixed(1)}ms`
}

function bar(value, max, width = 30) {
  const filled = Math.round((value / max) * width)
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

function checkHydration(html, page) {
  const hints = []
  if (html.includes('data-v-') || html.includes('__nuxt')) hints.push('✓ Vue hydration markers present')
  if (html.includes('<div id="__nuxt"></div>') || html.includes('<div id="app"></div>')) {
    hints.push('⚠ Empty root div — CSR shell detected (no server HTML)')
  } else {
    hints.push('✓ Root div has content — pre-rendered HTML present')
  }
  if (html.includes('window.__NUXT__')) hints.push('✓ Nuxt payload embedded in HTML')
  return hints
}

async function runTests() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║           Nuxt Rendering Mode — Load Time Benchmark          ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')
  console.log(`\n  Base URL   : ${BASE_URL}`)
  console.log(`  Iterations : ${ITERATIONS} requests per page`)
  console.log(`  Mode       : Production-like (run after nuxt build)\n`)

  const results = []

  for (const page of PAGES) {
    const url = `${BASE_URL}${page.path}`
    console.log(`\n─── Testing ${page.name} (${url}) ───`)
    console.log(`  ${page.description}`)

    // Warmup round (not counted)
    process.stdout.write('  Warming up... ')
    await measureRequest(url)
    console.log('done')

    // Real measurements
    const ttfbs = []
    const totals = []
    let lastResult

    process.stdout.write(`  Running ${ITERATIONS} requests: `)
    for (let i = 0; i < ITERATIONS; i++) {
      const r = await measureRequest(url)
      ttfbs.push(r.ttfb)
      totals.push(r.total)
      lastResult = r
      process.stdout.write('.')
    }
    console.log(' done')

    const ttfbStats = stats(ttfbs)
    const totalStats = stats(totals)

    results.push({ page, ttfbStats, totalStats, lastResult })

    // Per-page detail
    console.log(`\n  ┌─ TTFB (Time to First Byte)`)
    console.log(`  │  avg: ${fmt(ttfbStats.avg)}  median: ${fmt(ttfbStats.median)}  p95: ${fmt(ttfbStats.p95)}  min: ${fmt(ttfbStats.min)}  max: ${fmt(ttfbStats.max)}`)
    console.log(`  ├─ Total Response Time`)
    console.log(`  │  avg: ${fmt(totalStats.avg)}  median: ${fmt(totalStats.median)}  p95: ${fmt(totalStats.p95)}  min: ${fmt(totalStats.min)}  max: ${fmt(totalStats.max)}`)
    console.log(`  └─ Response Size: ${(lastResult.size / 1024).toFixed(1)} KB  │  Status: ${lastResult.status}`)

    // HTML content hints
    const hints = checkHydration(lastResult.html, page)
    console.log('\n  HTML Analysis:')
    hints.forEach(h => console.log(`    ${h}`))
  }

  // ── Comparison Summary ──────────────────────────────────────────
  console.log('\n\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║                      Comparison Summary                      ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')

  const maxAvgTtfb = Math.max(...results.map(r => r.ttfbStats.avg))
  const maxAvgTotal = Math.max(...results.map(r => r.totalStats.avg))

  console.log('  TTFB — avg (lower is better)')
  for (const r of results) {
    const b = bar(r.ttfbStats.avg, maxAvgTtfb)
    console.log(`  ${r.page.name.padEnd(8)} ${b} ${fmt(r.ttfbStats.avg)}`)
  }

  console.log('\n  Total Response Time — avg')
  for (const r of results) {
    const b = bar(r.totalStats.avg, maxAvgTotal)
    console.log(`  ${r.page.name.padEnd(8)} ${b} ${fmt(r.totalStats.avg)}`)
  }

  console.log('\n  Response Size')
  for (const r of results) {
    console.log(`  ${r.page.name.padEnd(8)} ${(r.lastResult.size / 1024).toFixed(1).padStart(6)} KB`)
  }

  console.log('\n  What to expect in production:')
  console.log('  • Static  → fastest TTFB (file read from disk, no computation)')
  console.log('  • SSR     → slightly slower (renders Vue tree per request)')
  console.log('  • CSR     → similar TTFB to Static (empty shell) but data loads after')
  console.log('              — the HTML response is fast, but the page is blank until JS runs')
  console.log()
}

runTests().catch(err => {
  console.error('\nError:', err.message)
  console.error('Make sure the Nuxt production server is running:')
  console.error('  nuxt build && node .output/server/index.mjs')
  process.exit(1)
})