<template>
    <div class="p-10 space-y-8 max-w-xl mx-auto bg-surface text-main">

        <div>
            <label class="label">Username</label>
            <input type="text" class="input text-xs" placeholder="Type your username..." />
        </div>

        <div>
            <label class="label danger">Email Address</label>
            <input type="email" class="input danger" value="invalid-email" />
            <p class="text-xs mt-1 text-danger">Please enter a valid email.</p>
        </div>

        <div>
            <label class="label success">Account Type</label>
            <select class="select success">
                <option>Personal Account</option>
                <option selected>Business Account (Verified)</option>
            </select>
        </div>

        <div>
            <label class="label warning">Bio Description</label>
            <textarea class="textarea warning" placeholder="Tell us about yourself..."></textarea>
        </div>

        <div>
            <label class="label">System ID (Read Only)</label>
            <input type="text" class="input" disabled value="ID-99021-X" />
        </div>

        <input class="input" placeholder="I have a gray border">

        <input class="input danger" value="I have a red border">

    </div>
</template>