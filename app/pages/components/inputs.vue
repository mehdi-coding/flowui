<template>
    <div class="m-12">
        <div class="space-y-1">
            <label class="text-sm font-medium">Username</label>
            <input type="text" class="input" placeholder="Enter username..." />
        </div>

        <div class="space-y-1">
            <label class="text-sm font-medium">Password</label>
            <input type="password" class="input input-error" value="123" />
            <p class="text-xs text-error">Password too short</p>
        </div>

        <div class="space-y-1">
            <label class="text-sm font-medium">Coupon Code</label>
            <input type="text" class="input input-success" value="SAVE20" />
        </div>
    </div>
</template>