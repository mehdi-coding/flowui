<template>
    <div class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="card primary">
                <div class="card-body bg-primary">
                    <h6 class="text-on-primary opacity-80">Total Users</h6>
                    <h2 class="text-on-primary">24,512</h2>
                </div>
            </div>

            <div class="card secondary">
                <div class="card-body bg-secondary">
                    <h6 class="text-on-primary opacity-80">Surveys Completed</h6>
                    <h2 class="text-on-primary">1,840</h2>
                </div>
            </div>

            <div class="card accent">
                <div class="card-body bg-accent">
                    <h6 class="text-on-primary opacity-80">Response Rate</h6>
                    <h2 class="text-on-primary">84.2%</h2>
                </div>
            </div>

            <div class="card warning">
                <div class="card-body bg-warning">
                    <h6 class="text-on-primary opacity-80">Appointments</h6>
                    <h2 class="text-on-primary">42</h2>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="card lg:col-span-2">
                <div class="card-header">
                    <h4 class="margin-0">Recent Activity</h4>
                </div>
                <div class="card-body p-0">
                    <table class="w-full text-start border-collapse">
                        <thead class="bg-surface-sunken">
                            <tr>
                                <th class="p-4 border-b text-start">User</th>
                                <th class="p-4 border-b text-start">Survey</th>
                                <th class="p-4 border-b text-start">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in 5" :key="i" class="hover:bg-gray-50">
                                <td class="p-4 border-b">User #{{ i }}24</td>
                                <td class="p-4 border-b">Customer Feedback</td>
                                <td class="p-4 border-b">
                                    <span class="btn btn-xs success rounded">Completed</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <div class="card-header secondary text-on-primary">
                    <h4 class="margin-0">Quick Actions</h4>
                </div>
                <div class="card-body">
                    <button class="btn primary w-full">Create New Survey</button>
                    <button class="btn outline secondary w-full">Schedule Appointment</button>
                    <hr class="border-gray-100 my-2">
                    <p class="text-sm text-muted">
                        Next system maintenance scheduled for Sunday at 02:00 AM.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>