<template>
    <div class="space-y-6">
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Total Users" value="12,430" />
            <KPICard title="Surveys Completed" value="3,210" />
            <KPICard title="Appointments" value="842" />
            <KPICard title="Response Rate" value="78%" />
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LineChart />
            <BarChart />
        </div>

        <!-- Table -->
        <ActivityTable />
    </div>
</template>

<script setup>
import KPICard from '@/components/dashboard/KPICard.vue'
import LineChart from '@/components/dashboard/LineChart.vue'
import BarChart from '@/components/dashboard/BarChart.vue'
import ActivityTable from '@/components/dashboard/ActivityTable.vue'
</script>