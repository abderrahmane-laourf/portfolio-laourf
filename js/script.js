/* ===================================================
    HIGH-PERFORMANCE & MODERNIZED PORTFOLIO SCRIPT
=================================================== */

(function() {
    'use strict'; // Enforces stricter parsing and error handling

    /* ===================================================
        HELPER: DOM ELEMENT SELECTION
    =================================================== */
    // A utility to make sure we don't try to add listeners to non-existent elements
    const select = (selector) => document.querySelector(selector);
    const selectAll = (selector) => document.querySelectorAll(selector);

    /* ===================================================
        STATE & ELEMENT CACHING
    =================================================== */
    const nav = select(".nav");
    const allSections = selectAll(".section");
    const navTogglerBtn = select(".nav-toggler");
    const aside = select(".aside");
    const hireMeBtn = select(".hire-me");
    const dayNightToggler = select(".day-night");

    /* ===================================================
        PARTICLES.JS CONFIGURATION FOR SPACE/STARFIELD
    =================================================== */
    function initParticles() {
        if (typeof particlesJS === 'undefined') {
            console.error('particles.js not found. Make sure the library is loaded correctly.');
            return;
        }

        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 160, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
                "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 2.5, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": {
                    "grab": { "distance": 140, "line_opacity": 0.3 },
                    "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                    "repulse": { "distance": 200, "duration": 0.4 },
                    "push": { "particles_nb": 4 },
                    "remove": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }

    /* ===================================================
        TYPING ANIMATION
    =================================================== */
    function initTyping() {
        if (typeof Typed === 'undefined') {
            console.error('Typed.js not found.');
            return;
        }
        new Typed(".typing", {
            strings: ["Web Developer", "Full-Stack developper",],
            typeSpeed: 100,
            backSpeed: 60, // Corrected property name from "BackSpeed"
            loop: true,
        });
    }

    /* ===================================================
        SECTION & NAVIGATION MANAGEMENT
    =================================================== */
    function setActiveSection(targetId) {
        // Deactivate current active section and nav link
        const currentActiveSection = select(".section.active");
        if (currentActiveSection) {
            currentActiveSection.classList.remove("active");
        }
        const currentActiveLink = select(".nav a.active");
        if (currentActiveLink) {
            currentActiveLink.classList.remove("active");
        }

        // Activate new section and nav link
        const newSection = select(targetId);
        if (newSection) {
            newSection.classList.add("active");
        }
        const newLink = select(`.nav a[href="${targetId}"]`);
        if (newLink) {
            newLink.classList.add("active");
        }
    }

    function initNavigation() {
        if (!nav) return;

        // Event Delegation: One listener on the parent for better performance
        nav.addEventListener("click", (event) => {
            const link = event.target.closest("a"); // Find the clicked link
            if (!link) return; // Exit if the click was not on a link

            event.preventDefault();
            const targetId = link.getAttribute("href");
            setActiveSection(targetId);

            // Close the aside on mobile after a selection
            if (window.innerWidth < 1200) {
                toggleAside();
            }
        });
    }

    function initHireMeButton() {
        if (!hireMeBtn) return;
        
        hireMeBtn.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href");
            setActiveSection(targetId);
        });
    }

    /* ===================================================
        ASIDE (SIDEBAR) TOGGLER
    =================================================== */
    function toggleAside() {
        if (!aside || !navTogglerBtn) return;
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
        // The CSS handles the main content shift, no need to loop through sections here
    }

    function initAsideToggler() {
        if (!navTogglerBtn) return;
        navTogglerBtn.addEventListener("click", toggleAside);
    }

    /* ===================================================
        DARK MODE TOGGLER WITH LOCALSTORAGE PERSISTENCE
    =================================================== */
    function initThemeToggler() {
        if (!dayNightToggler) return;

        const themeIcon = dayNightToggler.querySelector("i");
        
        // Function to apply the theme
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                document.body.classList.add("dark");
                themeIcon.classList.add("fa-sun");
                themeIcon.classList.remove("fa-moon");
            } else {
                document.body.classList.remove("dark");
                themeIcon.classList.add("fa-moon");
                themeIcon.classList.remove("fa-sun");
            }
        };

        // On click, toggle the theme and save the preference
        dayNightToggler.addEventListener("click", () => {
            const isDark = document.body.classList.toggle("dark");
            const newTheme = isDark ? 'dark' : 'light';
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });

        // On page load, apply the saved theme from localStorage
        const savedTheme = localStorage.getItem("theme") || 'light'; // Default to light
        applyTheme(savedTheme);
    }

    /* ===================================================
        INITIALIZE ALL SCRIPTS ON DOCUMENT LOAD
    =================================================== */
    document.addEventListener('DOMContentLoaded', () => {
        initParticles();
        initTyping();
        initNavigation();
        initHireMeButton();
        initAsideToggler();
        initThemeToggler();
    });

})();