document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Ensure sidebar starts in a closed state
    sidebar.classList.add('closed');

    menuToggle.addEventListener('click', () => {
        // Toggle both open and closed classes
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('closed');

        // Optional: animate the menu toggle button
        menuToggle.classList.toggle('active');
    });

    // Optional: Close sidebar when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebar.classList.add('closed');
            menuToggle.classList.remove('active');
        });
    });
}); 