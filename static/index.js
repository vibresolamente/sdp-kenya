document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.desktop-nav');
    const contrastToggle = document.getElementById('contrast-toggle');
    const navLinks = document.querySelectorAll('.desktop-nav a'); // Moved up for global use
    
    // =======================================================
    // 1. MOBILE MENU TOGGLE FUNCTIONALITY
    // =======================================================
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open'); 
        });
    }

    // --- NEW ENHANCEMENT: Close Mobile Nav on Link Click (Better UX) ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the mobile nav is open (indicated by the 'nav-open' class)
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
            }
        });
    });


    // =======================================================
    // 2. HIGH CONTRAST TOGGLE FUNCTIONALITY (UX/Accessibility)
    // =======================================================
    if (contrastToggle) {
        // A. Check local storage on load (persists choice across pages)
        if (localStorage.getItem('contrastMode') === 'on') {
            body.classList.add('high-contrast');
        }

        // B. Add click listener
        contrastToggle.addEventListener('click', () => {
            body.classList.toggle('high-contrast');
            
            // C. Save state to local storage
            if (body.classList.contains('high-contrast')) {
                localStorage.setItem('contrastMode', 'on');
            } else {
                localStorage.setItem('contrastMode', 'off');
            }
        });
    }


    // =======================================================
    // 3. SCROLL SPY (Highlights active link in navigation)
    // =======================================================
    const sections = document.querySelectorAll("section[id]");
    
    // --- NEW UTILITY: Debounce Function (Performance) ---
    // Limits how often the scroll handler runs.
    const debounce = (func, delay) => {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const handleScroll = () => {
        let current = "";
        
        // Use document.documentElement.scrollTop for wider browser compatibility
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            // 100px offset accounts for the fixed header height
            const sectionTop = section.offsetTop - 100; 
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute("id");
            }
        });
      
        navLinks.forEach(a => {
            a.classList.remove('active-link');
            // Check if the link's target ID matches the currently viewed section ID
            // This is primarily for the index.html page where links are anchors (#home, #about)
            if (a.getAttribute('href').includes(current) && current !== '') {
                a.classList.add('active-link');
            // Fallback for non-anchor links (like manifesto.html)
            } else if (a.getAttribute('href').includes(document.location.pathname.substring(1))) {
                a.classList.add('active-link');
            }
        });
    };

    // Attach the debounced scroll handler
    window.addEventListener('scroll', debounce(handleScroll, 100));
    
    // Run once on load to set the initial active link
    handleScroll();
    
    // =======================================================
    // 4. FORM HANDLING (Removed static prevention; form now submits)
    // =======================================================
    // Note: No JavaScript is needed here as the form submits directly 
    // to the Formspree service defined in contact.html's action attribute.

});

