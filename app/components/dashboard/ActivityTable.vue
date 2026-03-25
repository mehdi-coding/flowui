<template>
    <div class="card p-4">
        <h3 class="mb-4 font-semibold">Recent Activity</h3>

        <table class="table w-full">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Date</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="i in 25" :key="i">
                    <td>User {{ i }}</td>
                    <td>Completed Survey</td>
                    <td>2026-03-25</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>