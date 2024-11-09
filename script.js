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
        document.documentElement.style.setProperty('--topbar-margin', 'var(--sidebar-width)');
    } else {
        sidebar.classList.add('closed');
        sidebar.classList.remove('open');
        menuToggle.classList.remove('active');
        socialBar.classList.remove('inverted');
        document.documentElement.style.setProperty('--topbar-margin', '0');
    }
    
    // Toggle sidebar function
    const toggleSidebar = () => {
        const isOpen = sidebar.classList.contains('open');
        
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('closed');
        
        localStorage.setItem(SIDEBAR_STATE_KEY, isOpen ? 'closed' : 'open');
        
        menuToggle.classList.toggle('active');
        socialBar.classList.toggle('inverted');
        
        document.documentElement.style.setProperty(
            '--topbar-margin', 
            isOpen ? '0' : 'var(--sidebar-width)'
        );
    };
    
    // Event listeners
    menuToggle.addEventListener('click', toggleSidebar);
    
    // Close sidebar on navigation link click for mobile
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
            
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
            if (window.innerWidth <= 768) {
                // Always close sidebar on mobile
                sidebar.classList.remove('open');
                sidebar.classList.add('closed');
                menuToggle.classList.remove('active');
                socialBar.classList.remove('inverted');
                document.documentElement.style.setProperty('--topbar-margin', '0');
                localStorage.setItem(SIDEBAR_STATE_KEY, 'closed');
            } else {
                // Restore stored state on desktop
                const storedState = localStorage.getItem(SIDEBAR_STATE_KEY);
                if (storedState === 'open') {
                    sidebar.classList.remove('closed');
                    sidebar.classList.add('open');
                    menuToggle.classList.add('active');
                    socialBar.classList.add('inverted');
                    document.documentElement.style.setProperty('--topbar-margin', 'var(--sidebar-width)');
                }
            }
        }, 250);
    });
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                duration: 1000  // Milliseconds for scroll duration
            });
        });
    });
});

function openLinkedInMessage(event) {
    event.preventDefault();
    const url = 'https://www.linkedin.com/messaging/compose?recipient=kafzali';
    const width = Math.max(400, Math.min(window.innerWidth * 0.4, 800));  // At least 400px, max 800px
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
        url,
        'LinkedInMessage',
        `width=${width},
         height=${height},
         left=${left},
         top=${top},
         toolbar=no,
         menubar=no,
         location=no,
         status=no`
    );
}

function adjustFontSize(element, container) {
    const text = element.textContent;
    let fontSize = 100; // Start with a large size
    element.style.fontSize = fontSize + 'px';
    
    // Reduce font size until text fits container width
    while (element.offsetWidth > container.offsetWidth && fontSize > 0) {
        fontSize--;
        element.style.fontSize = fontSize + 'px';
    }
}

// Apply to both title and subtitle
function adjustAllText() {
    const title = document.querySelector('#home h1');
    const subtitle = document.querySelector('#home .title');
    const titleContainer = document.querySelector('.title-container');
    const subtitleContainer = document.querySelector('.subtitle-container');
    
    adjustFontSize(title, titleContainer);
    adjustFontSize(subtitle, subtitleContainer);
}

// Run on load and resize
window.addEventListener('load', adjustAllText);
window.addEventListener('resize', adjustAllText);