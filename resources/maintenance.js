// maintenance.js - handles the maintenance mode toggle

document.addEventListener('DOMContentLoaded', () => {
    // Get required elements
    const toggleButton = document.getElementById('toggleMaintenance');
    const maintenanceDiv = document.getElementById('maintenance');
    const contentDiv = document.getElementById('content');
    const header = document.getElementById('headerContent');
    const nav = document.getElementById('navContent');
    const footer = document.getElementById('footerContent');

    // Toggle maintenance mode: When active, only show the maintenance section.
    toggleButton.addEventListener('click', () => {
        const isMaintenanceActive = !maintenanceDiv.classList.contains('hidden');

        if (isMaintenanceActive) {
            maintenanceDiv.classList.add('hidden');
            header.classList.remove('hidden');
            nav.classList.remove('hidden');
            contentDiv.classList.remove('hidden');
            footer.classList.remove('hidden');
        } else {
            maintenanceDiv.classList.remove('hidden');
            header.classList.add('hidden');
            nav.classList.add('hidden');
            contentDiv.classList.add('hidden');
            footer.classList.add('hidden');
        }
    });

    console.log("Maintenance script loaded.");
});
