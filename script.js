document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const socialBar = document.querySelector('.fixed-topbar');
    
    // Initialize sidebar state
    const SIDEBAR_STATE_KEY = 'sidebarState';
    const storedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    
    if (storedState === 'open') {
        sidebar.classList.add('open');
        sidebar.classList.remove('closed');
        menuToggle.classList.add('active');
        socialBar.classList.add('inverted');
    } else {
        sidebar.classList.add('closed');
        sidebar.classList.remove('open');
        menuToggle.classList.remove('active');
        socialBar.classList.remove('inverted');
    }
    
    // Toggle sidebar function
    const toggleSidebar = () => {
        const isOpen = sidebar.classList.contains('open');
        
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('closed');
        
        // Store sidebar state
        localStorage.setItem(SIDEBAR_STATE_KEY, isOpen ? 'closed' : 'open');
        
        // Toggle active class on menu button and social bar
        menuToggle.classList.toggle('active');
        socialBar.classList.toggle('inverted');
    };
    
    // Event listeners
    menuToggle.addEventListener('click', toggleSidebar);
    
    // Close sidebar on navigation link click for mobile
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
            
            // Smooth scroll to section
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Close sidebar on click outside
    document.addEventListener('click', (e) => {
        const isClickInside = sidebar.contains(e.target) || 
                            menuToggle.contains(e.target);
        
        if (!isClickInside && sidebar.classList.contains('open') && 
            window.innerWidth <= 768) {
            toggleSidebar();
        }
    });
    
    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && sidebar.classList.contains('closed')) {
                sidebar.classList.remove('closed');
                sidebar.classList.add('open');
                menuToggle.classList.add('active');
                socialBar.classList.add('inverted');
            }
        }, 250);
    });
});