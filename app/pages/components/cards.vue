<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 bg-surface">
        <div class="card">
            <div class="card-body">
                <h3>Simple Card</h3>
                <p>Just a standard container with no header.</p>
            </div>
        </div>

        <div class="card ">
            <div class="card-header">
                <h4 class="margin-0">System Notification</h4>
            </div>
            <div class="card-body">
                <p>Your subscription is about to expire in 3 days.</p>
                <button class="btn btn-sm outline secondary">Renew Now</button>
            </div>
        </div>

        <div class="card danger">
            <div class="card-header">
                <h4 class="margin-0 text-on-primary">Critical Alert</h4>
            </div>
            <div class="card-body">
                <p>Database connection lost. Attempting to reconnect...</p>
            </div>
            <div class="card-footer">
                <span class="text-xs text-muted">Last sync: 2 mins ago</span>
            </div>
        </div>

    </div>
</template>