document.addEventListener("DOMContentLoaded", () => {

    /**
     * Initializes the mobile menu toggle functionality.
     */
    const initMobileMenu = () => {
        const menuToggle = document.querySelector(".hero__menu-toggle");
        const mobileNav = document.querySelector(".mobile-nav");

        if (!menuToggle || !mobileNav) return;

        menuToggle.addEventListener("click", () => {
            mobileNav.classList.toggle("is-open");
            // Change menu icon to close icon if open
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (mobileNav.classList.contains("is-open")) {
                    icon.className = "fa fa-times";
                } else {
                    icon.className = "fa fa-bars";
                }
            }
        });

        // Close menu when a link is clicked
        mobileNav.addEventListener("click", (e) => {
            if (e.target.matches("a")) {
                mobileNav.classList.remove("is-open");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.className = "fa fa-bars";
                }
            }
        });
    };

    /**
     * Initializes smooth scrolling for all links with the .scroll-link class.
     */
    const initSmoothScroll = () => {
        const scrollLinks = document.querySelectorAll(".scroll-link");

        scrollLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                const targetId = link.getAttribute("href");
                if (!targetId.startsWith("#")) return; // ignore standard mail/links
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        });
    };

    /**
     * Initializes card slide-up and fade-in animations using the native Intersection Observer API.
     */
    const initCardAnimations = () => {
        const cards = document.querySelectorAll('.animate-card');
        if (!cards.length) return;

        const cardOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                // Trigger smooth CSS stagger
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            });
        }, cardOptions);

        cards.forEach((card, index) => {
            // Apply initial operational styles programmatically
            card.style.opacity = "0";
            card.style.transform = "translateY(35px)";
            card.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
            card.style.transitionDelay = `${(index % 2) * 0.08}s`;
            
            cardObserver.observe(card);
        });
    };

    /**
     * Initializes the elite copywriting text cycle animation in the contact section.
     */
    const initTextAnimation = () => {
        const textElement = document.querySelector(".text-animate");
        if (!textElement) return;

        const sentences = [
            "high-performance apps ?",
            "intelligent AI integrations ?",
            "scalable MERN architectures ?",
            "premium digital systems ?"
        ];
        let currentIndex = 0;

        setInterval(() => {
            textElement.style.opacity = "0";

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % sentences.length;
                textElement.textContent = sentences[currentIndex];
                textElement.style.opacity = "1";
            }, 300); // Wait for fade-out transition
        }, 3200);
    };

    /**
     * Low-overhead mouse spotlight tracking for bento grid cards.
     * Sets dynamic coordinates on CSS variables (--mouse-x, --mouse-y).
     */
    const initBentoSpotlight = () => {
        const bentoGrids = document.querySelectorAll(".bento-grid");
        
        bentoGrids.forEach(grid => {
            grid.addEventListener("mousemove", (e) => {
                const cards = grid.querySelectorAll(".bento-card");
                cards.forEach((card) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    card.style.setProperty("--mouse-x", `${x}px`);
                    card.style.setProperty("--mouse-y", `${y}px`);
                });
            });
        });
    };

    /**
     * High-performance telemetry simulation for the Hero dashboard.
     * Updates database latency, CPU system loads, SVG line graphs, and terminal outputs.
     */
    const initTelemetrySimulation = () => {
        const dbVal = document.getElementById("db-latency-val");
        const sysVal = document.getElementById("sys-load-val");
        const pathEl = document.getElementById("telemetry-svg-path");
        const circleEl = document.getElementById("telemetry-svg-endpoint");
        const termEl = document.getElementById("terminal-logs");

        if (!dbVal || !sysVal || !pathEl || !circleEl || !termEl) return;

        // DB Latency fluctuations
        setInterval(() => {
            const lat = Math.floor(Math.random() * 9) + 8; // 8ms to 17ms
            dbVal.textContent = `${lat}ms`;
        }, 1600);

        // System CPU Load fluctuations
        setInterval(() => {
            const load = (Math.random() * 0.7 + 0.8).toFixed(2); // 0.80% to 1.50%
            sysVal.textContent = `${load}%`;
        }, 2200);

        // Live SVG line graph shift
        const graphPoints = [60, 50, 55, 40, 50, 30, 45, 50];
        setInterval(() => {
            graphPoints.shift();
            graphPoints.push(Math.floor(Math.random() * 45) + 15); // Random height value
            
            // Re-render SVG line path coordinates
            let pathD = `M 0 ${graphPoints[0]}`;
            for (let i = 1; i < graphPoints.length; i++) {
                const x = Math.floor(i * (300 / (graphPoints.length - 1)));
                pathD += ` L ${x} ${graphPoints[i]}`;
            }
            pathEl.setAttribute("d", pathD);
            circleEl.setAttribute("cx", "300");
            circleEl.setAttribute("cy", graphPoints[graphPoints.length - 1].toString());
        }, 1100);

        // Dynamic terminal boot outputs
        const logTemplates = [
            "[AI] Recalculating state vector model...",
            "[SYS] Syncing global state nodes...",
            "[SYS] GC complete: freed 4.1MB in 0.14ms",
            "[AI] Response token streaming: 62 tokens/s",
            "[SYS] Gateway heartbeat: OK",
            "[DB] Index seek resolved in 9ms",
            "[AI] Routing query context to LLM core..."
        ];

        setInterval(() => {
            const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
            const time = new Date().toTimeString().split(' ')[0];
            const logLine = `<br>[${time}] ${randomLog}`;
            
            termEl.innerHTML += logLine;
            
            // Constrain console stack height
            const lines = termEl.innerHTML.split("<br>");
            if (lines.length > 7) {
                termEl.innerHTML = lines.slice(lines.length - 7).join("<br>");
            }
        }, 3400);
    };

    // Initialize all custom interactive subsystems
    initMobileMenu();
    initSmoothScroll();
    initCardAnimations();
    initTextAnimation();
    initBentoSpotlight();
    initTelemetrySimulation();
});