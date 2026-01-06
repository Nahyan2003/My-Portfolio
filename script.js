document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TRAILING CURSOR PHYSICS ---
    const trail = document.querySelector('.cursor-trail');
    const nodes = document.querySelectorAll('.cursor-node');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dots = Array.from(nodes).map(() => ({ x: mouseX, y: mouseY }));

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        dots[0].x = mouseX;
        dots[0].y = mouseY;
        for (let i = 1; i < dots.length; i++) {
            dots[i].x += (dots[i - 1].x - dots[i].x) * 0.35;
            dots[i].y += (dots[i - 1].y - dots[i].y) * 0.35;
        }
        nodes.forEach((node, i) => {
            node.style.transform = `translate3d(${dots[i].x}px, ${dots[i].y}px, 0) translate(-50%, -50%)`;
        });
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // --- 2. HOVER DETECTION (Arrow Morph) ---
    // Add '.contact-item' to the selector list
const interactables = document.querySelectorAll('a, button, .project-box, .nav-item, .contact-card, .contact-zone, .project-row, .contact-item');

interactables.forEach(item => {
    item.addEventListener('mouseenter', () => {
        trail.classList.add('active'); // This turns the dot into the #444 arrow
    });
    item.addEventListener('mouseleave', () => {
        trail.classList.remove('active');
    });
});

    // --- 3. SCROLL REVEAL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                const items = entry.target.querySelectorAll('.reveal-item');
                items.forEach((item, index) => {
                    setTimeout(() => { item.classList.add('show'); }, index * 150);
                });
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-reveal').forEach(section => observer.observe(section));
});