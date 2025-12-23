// ==========================================
// Intersection Observer for Scroll Animations
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    // Animate cards on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial styles and observe requirement cards
    const cards = document.querySelectorAll('.requirement-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate notice card
    const noticeCard = document.querySelector('.notice-card');
    if (noticeCard) {
        noticeCard.style.opacity = '0';
        noticeCard.style.transform = 'translateY(20px)';
        noticeCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        const noticeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    noticeObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        noticeObserver.observe(noticeCard);
    }

    // ==========================================
    // Players Carousel Navigation
    // ==========================================
    const carousel = document.getElementById('playersCarousel');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (carousel && prevBtn && nextBtn) {
        const cardWidth = 260; // Width of each card + gap
        const scrollAmount = cardWidth + 24; // card width + gap

        // Update button states
        function updateButtons() {
            const scrollLeft = carousel.scrollLeft;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            prevBtn.disabled = scrollLeft <= 10;
            nextBtn.disabled = scrollLeft >= maxScroll - 10;
        }

        // Scroll left
        prevBtn.addEventListener('click', function () {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Scroll right
        nextBtn.addEventListener('click', function () {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update buttons on scroll
        carousel.addEventListener('scroll', updateButtons);

        // Initial button state
        updateButtons();

        // Update on resize
        window.addEventListener('resize', updateButtons);
    }

    // ==========================================
    // Smooth scroll for anchor links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // Add parallax effect to hero decorations
    // ==========================================
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const scrolled = window.pageYOffset;
                const circles = document.querySelectorAll('.circle');

                circles.forEach((circle, index) => {
                    const speed = 0.1 + (index * 0.05);
                    circle.style.transform = `translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    console.log('🌟 Página cargada correctamente - Regreso 5 de Enero 2025');
});
