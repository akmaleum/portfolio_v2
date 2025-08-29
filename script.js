// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Smooth scroll to target section
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });



    // Update active navigation based on scroll position
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding navigation link
                const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavigation);

    // Initialize active state for first section
    navLinks[0].classList.add('active');

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all content sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add hover effects for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add smooth reveal animation for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            link.style.transition = 'all 0.4s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });


});

// Add smooth scroll behavior for all internal links (including name link)
document.addEventListener('DOMContentLoaded', function () {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);

                if (targetElement) {
                    // Update navigation highlighting
                    const navLinks = document.querySelectorAll('.nav-link');
                    navLinks.forEach(navLink => navLink.classList.remove('active'));

                    // Find and activate the corresponding navigation link
                    // Use a more specific selector to find the nav-link, not the name-link
                    const correspondingNavLink = document.querySelector(`.nav-link[href="${href}"]`);
                    if (correspondingNavLink) {
                        correspondingNavLink.classList.add('active');
                    }

                    // Smooth scroll to target section
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Add scroll-triggered animations
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.left-column');

    if (parallax) {
        const speed = scrolled * 0.1;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function (e) {
    const sections = ['about', 'education', 'projects'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        scrollToSection(sections[nextIndex]);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        scrollToSection(sections[prevIndex]);
    }
});

function getCurrentSection() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('.content-section');

    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            return section.id;
        }
    }

    return 'about';
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update active navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const correspondingLink = document.querySelector(`[href="#${sectionId}"]`);
        if (correspondingLink) {
            correspondingLink.classList.add('active');
        }
    }
}
