/* ================= PRELOADER LOADING PAGE ================= */
(function initPreloader() {
    const preloader = document.getElementById('preloader');
    const percentEl = document.getElementById('loader-percent');
    const progressFill = document.getElementById('loader-progress-fill');
    const statusEl = document.getElementById('loader-status');

    if (!preloader) return;

    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const statusMessages = [
        'Initializing modules...',
        'Compiling Next.js components...',
        'Connecting PostgreSQL database...',
        'Establishing Cloud & DevOps link...',
        'Finalizing UI & services...',
        'System ready!'
    ];

    let currentProgress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {
        // Smooth and steady cinematic progress pacing (~2.2s total)
        if (currentProgress < 40) {
            currentProgress += Math.floor(Math.random() * 2) + 1;
        } else if (currentProgress < 75) {
            currentProgress += Math.floor(Math.random() * 3) + 1;
        } else if (currentProgress < 95) {
            currentProgress += Math.floor(Math.random() * 2) + 1;
        } else {
            currentProgress += 1;
        }

        if (currentProgress > 100) currentProgress = 100;

        if (progressFill) progressFill.style.width = currentProgress + '%';
        if (percentEl) percentEl.textContent = currentProgress + '%';

        // Update status text based on progress stage
        const msgIdx = Math.min(Math.floor((currentProgress / 100) * statusMessages.length), statusMessages.length - 1);
        if (msgIdx !== messageIndex && statusEl) {
            messageIndex = msgIdx;
            statusEl.textContent = statusMessages[messageIndex];
        }

        if (currentProgress >= 100) {
            clearInterval(interval);
            if (statusEl) statusEl.textContent = 'Welcome to Portfolio!';
            
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 900);
            }, 500);
        }
    }, 35);

    // Fallback safety timeout (max 4.5s)
    setTimeout(() => {
        if (!preloader.classList.contains('fade-out')) {
            currentProgress = 100;
            if (progressFill) progressFill.style.width = '100%';
            if (percentEl) percentEl.textContent = '100%';
            preloader.classList.add('fade-out');
            document.body.style.overflow = '';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 900);
        }
    }, 4500);
})();

/*  MENU TOGGLE  */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*  SCROLL SECTIONS ACTIVE LINK  */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document
                    .querySelector('header nav a[href*=' + id + ']')
                    ?.classList.add('active');
            });
        }
    });

    /*  STICKY HEADER  */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*  REMOVE MENU ON SCROLL  */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*  RENDER DYNAMIC PORTFOLIO PROJECTS  */
const portfolioContainer = document.querySelector('.portfolio-container');
if (portfolioContainer && window.PortfolioManager) {
    window.PortfolioManager.renderToContainer(portfolioContainer);
}

/*  INTERACTIVE PORTFOLIO CATEGORY FILTER  */
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0 && portfolioContainer) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const allProjects = window.PortfolioManager ? window.PortfolioManager.getProjects() : [];

            if (filterValue === 'all') {
                window.PortfolioManager.renderToContainer(portfolioContainer);
            } else {
                const filtered = allProjects.filter(p => {
                    const cat = (p.category || '').toLowerCase();
                    const title = (p.title || '').toLowerCase();
                    const search = filterValue.toLowerCase();
                    return cat.includes(search) || title.includes(search);
                });
                portfolioContainer.replaceChildren(...filtered.map(p => window.PortfolioManager.createProjectCardElement(p)));
            }
        });
    });
}

/* SCROLL REVEAL  */
ScrollReveal({
    distance: '80px',
    duration: 1800,
    delay: 150
});

ScrollReveal().reveal('.heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .service-container, .skills-container, .portfolio-box, .contact-grid', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*  TYPED JS  */
const typed = new Typed('.multiple-text', {
    strings: [
        'Next.js & Full-Stack Developer',
        'Aspiring Cloud Engineer',
        'Passionate Coder',
        'DevOps Learner',
        'Problem Solver'
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
});

/*  ADMIN DASHBOARD SHORTCUT (Ctrl + Shift + A)  */
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        window.location.href = 'admin.html';
    }
});

/*  EMAILJS CONTACT FORM */
(function () {
    emailjs.init("qf80UU9PGUtbKiHTb"); //  Public Key
})();

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_vwnlvi9",      //  Service ID
            "template_yk2kbte",     //  Template ID
            this
        ).then(
            () => {
                alert("Message sent successfully!");
                contactForm.reset();
            },
            (error) => {
                alert("Failed to send message. Try again.");
                console.error("EmailJS Error:", error);
            }
        );
    });
}
