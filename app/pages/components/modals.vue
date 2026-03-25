<template>
    <button class="btn primary" onclick="document.getElementById('myModal').showModal()">
        Open Settings
    </button>

    <dialog id="myModal" class="modal">

        <div class="modal-header">
            <h3 class="margin-0">System Settings</h3>
            <button class="btn btn-rounded p-0 bg-transparent border-2 border-gray-500 w-8 h-8 text-gray-500"
                onclick="document.getElementById('myModal').close()" aria-label="Close modal">
                ✕
            </button>
        </div>

        <div class="modal-body">
            <p class="text-muted">
                Update your preferences below. These changes will be applied immediately across your workspace.
            </p>

            <div class="mb-4">
                <label class="label">Workspace Name</label>
                <input type="text" class="input" value="Production Server">
            </div>
        </div>

        <div class="modal-footer">
            <button class="btn btn-sm outline bg-danger" onclick="document.getElementById('myModal').close()">
                Cancel
            </button>
            <button class="btn btn-sm success" onclick="document.getElementById('myModal').close()">
                Save Changes
            </button>
        </div>

    </dialog>
</template>