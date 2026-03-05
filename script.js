/* ═══════════════════════════════════════════════════
   BURAK ERDEMCI — PORTFOLIO LOGIC & CONTENT
   ═══════════════════════════════════════════════════ */

// ─── Chevron SVG (reusable) ───
const chevronSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
const imageSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
const externalSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

// ─── Content Data ───
const data = {
    tr: {
        // Nav
        navAbout: "Hakkımda",
        navSkills: "Yetenekler",
        navProjects: "Projeler",
        navTimeline: "Deneyim",
        navContact: "İletişim",
        btnLang: "EN",

        // Hero
        heroStatus: "İş Tekliflerine Açık",
        heroSubtitle: "Game & Backend Developer | ASP.NET Core & Python",
        btnProjects: "Projeleri Gör",
        btnCv: "CV İndir",

        // About
        aboutLabel: "Hakkımda",
        aboutTitle: "Merhaba, Ben Burak",
        aboutText: "Yazılım dünyasına Gemi Makineleri Mühendisliği'nden geçiş yaptım. C#, ASP.NET Core ve Python dillerini kullanarak projeler geliştiriyor, özellikle backend alanında kendimi geliştiriyorum. 2D ve 3D hikaye tabanlı oyunlar ve web tabanlı uygulamalar üzerine yoğunlaşıyorum.",
        status: "İş Tekliflerine Açık",
        role: "Yazılım Geliştirici",

        // Skills
        skillsLabel: "Teknik Yetenekler",
        skillsTitle: "Yetenekler",
        skills: {
            "Backend": ["C#", "ASP.NET Core", "Entity Framework", "Python"],
            "Frontend & Web": ["HTML/CSS/JS", "Next.js", "React", "Tailwind CSS"],
            "Game Dev": ["Unity (2D/3D)", "Unreal Engine 5"],
            "Veritabanı": ["MySQL", "SQLite", "MongoDB"]
        },

        // Projects
        projectsLabel: "Portfolyo",
        projectsTitle: "Seçilmiş Projeler",
        projectImagesLabel: "Görseller",
        projectViewGithub: "GitHub'da Görüntüle",
        projects: [
            {
                title: "Unity Architect AI",
                brief: "Yapay zeka destekli Unity C# kod analiz ve geliştirme platformu.",
                tag: "AI / Desktop App",
                link: "https://github.com/BurakErdemci/Unity-Architect-AI",
                detail: "Unity geliştiricileri için profesyonel seviyede kod denetimi, performans analizi ve AI destekli kod düzeltme sunan masaüstü uygulaması. Electron (Nextron) tabanlı IDE benzeri 3 panel arayüzü (Dosya Gezgini, Kod Editörü, AI Chat) içerir. FastAPI backend ile 5 farklı AI sağlayıcı desteği, 0-10 arası ağırlıklı akıllı puanlama sistemi, severity sınıflandırma (Kritik/Uyarı/Bilgi), C# syntax highlighting, Markdown render ve workspace yönetimi gibi gelişmiş özellikler barındırır.",
                tech: ["Electron", "Next.js", "Python", "FastAPI", "SQLite", "AI/LLM"],
                images: ["IDE Arayüzü", "AI Analiz Sonuçları", "Puanlama Sistemi"]
            },
            {
                title: "Ristorante Stellato",
                brief: "Next.js 16 ve MongoDB ile geliştirilmiş full-stack lüks restoran ve rezervasyon sistemi.",
                tag: "Full Stack",
                link: "https://github.com/BurakErdemci/ristorante-stellato",
                detail: "Next.js 16 Server Actions kullanılarak geliştirilen gerçek dünya ihtiyaçlarına yönelik bir full-stack rezervasyon yönetim sistemi. Müşteri tarafında interaktif masa seçimi (kapasite kontrolü, dolu masa tespiti), multi-step rezervasyon formu, akıllı takvim sistemi ve Nodemailer ile otomatik email bildirimi sunar. Admin panelinde dashboard istatistikleri, gelişmiş filtreleme, canlı arama, toplu işlemler ve güvenli silme (confirmation modal) özellikleri bulunur. Framer Motion ile premium animasyonlar ve Zod ile form validasyonu içerir.",
                tech: ["Next.js 16", "React 18", "Tailwind CSS v4", "MongoDB", "Mongoose", "Framer Motion", "Zod", "Nodemailer"],
                images: [
                    "images/Mainpage1.png",
                    "images/Mainpage2.png",
                    "images/MainpageMenu.png",
                    "images/MainpageExperience.png",
                    "images/ReservationPage1.png",
                    "images/ResarvationPage2.png",
                    "images/Resarvationpage3.png",
                    "images/ReservationPage4.png",
                    "images/ResarvationPage5.png",
                    "images/Adminpage.png"
                ]
            },
            {
                title: "Workday-Loop ",
                brief: "Unity ile geliştirilmiş 2D psikolojik gerilim / anlatı deneyimi oyunu.",
                tag: "Game Dev",
                link: "https://github.com/BurakErdemci/Workday-Loop",
                detail: "Modern iş hayatının tekdüzeliğini ve bireyin bu sistem içindeki sessiz çürüyüşünü anlatan bir psikolojik gerilim deneyimi. Klasik bir ofis simülatörü gibi başlayıp, giderek tuhaflaşan bir anlatıya dönüşür. Mad Men'den ilham alan 1960'lar minimalist estetiği ve Nier: Automata'dan esinlenen varoluşsal melankoli müzikleri ile desteklenir. Oyuncunun seçimlerine göre iki farklı son sunar: Kurtuluş (Salvation) ve Sonsuz Döngü (Loop). Mini oyunlar, değişen çevre detayları ve sistem mesajları ile psikolojik derinlik katar.",
                tech: ["Unity", "C#", "2D Game Design", "Narrative Design"],
                images: [
                    "images/workday-1.png",
                    "images/workday-2.png",
                    "images/workday-3.png",
                    "images/workday-4.png",
                    "images/workday-5.png",
                    "images/workday-6.png",
                    "images/workday-7.png",
                    "images/workday-8.png",
                    "images/workday-9.png"
                ]
            },
            {
                title: "OyunBlog",
                brief: "ASP.NET Core ile geliştirilmiş çok katmanlı oyun blog ve forum platformu.",
                tag: "ASP.NET Core",
                link: "https://github.com/BurakErdemci/OyunBlog",
                detail: "Oyun tutkunları için geliştirilmiş, çok katmanlı (multi-layered) mimariye sahip bir web uygulaması. Core, Data, BusinessLogic, MainPage ve Utilities olmak üzere 5 katmanlı clean architecture yapısı kullanır. Entity Framework Core ile SQLite veritabanı, Repository ve Unit of Work pattern'ları, ASP.NET Core Identity ile kimlik doğrulama ve rol yönetimi, DTO ve AutoMapper ile veri transferi, Razor Pages ve MVC Controller yapısı, forum CRUD işlemleri, arama, sayfalama ve admin yetkili içerik yönetimi içerir.",
                tech: ["C#", "ASP.NET Core", "Entity Framework Core", "Identity", "AutoMapper", "SQLite", "Razor Pages"],
                images: ["images/OyunblogResim-1.png", "images/OyunblogResim-2.png", "images/OyunblogResim-3.png", "images/OyunblogResim-4.png", "images/OyunblogResim-5.png", "images/OyunblogResim-6.png"]
            }
        ],

        // Timeline
        timelineLabel: "Yolculuk",
        timelineTitle: "Deneyim & Eğitim",
        timeline: [
            {
                date: "2024 — Devam Ediyor",
                title: "Yazılım Geliştirme",
                subtitle: "Freelance & Kişisel Projeler",
                text: "Backend geliştirme, oyun programlama ve web uygulamaları üzerine aktif çalışmalar."
            },
            {
                date: "2020 — 2024",
                title: "Gemi Makineleri Mühendisliği",
                subtitle: "Üniversite Eğitimi",
                text: "Mühendislik eğitimi sırasında yazılıma olan ilgi ve geçiş süreci."
            }
        ],

        // Contact
        contactLabel: "İletişim",
        contactTitle: "Birlikte Çalışalım",
        contactText: "Yeni projeler, iş birlikleri veya sadece merhaba demek için benimle iletişime geçebilirsiniz.",
        formName: "İsim",
        formEmail: "E-posta",
        formMessage: "Mesaj",
        formSubmit: "Gönder",

        // Footer
        footerCv: "CV İndir",
        footerTop: "Yukarı"
    },

    en: {
        navAbout: "About",
        navSkills: "Skills",
        navProjects: "Projects",
        navTimeline: "Experience",
        navContact: "Contact",
        btnLang: "TR",

        heroStatus: "Open to Work",
        heroSubtitle: "Game & Backend Developer | ASP.NET Core & Python",
        btnProjects: "View Projects",
        btnCv: "Download CV",

        aboutLabel: "About Me",
        aboutTitle: "Hello, I'm Burak",
        aboutText: "I transitioned into the software world from Marine Engineering. I develop projects using C#, ASP.NET Core, and Python, focusing specifically on backend development. I create 2D and 3D story-based games and web applications.",
        status: "Open to Work",
        role: "Software Developer",

        skillsLabel: "Technical Skills",
        skillsTitle: "Skills",
        skills: {
            "Backend": ["C#", "ASP.NET Core", "Entity Framework", "Python"],
            "Frontend & Web": ["HTML/CSS/JS", "Next.js", "React", "Tailwind CSS"],
            "Game Dev": ["Unity (2D/3D)", "Unreal Engine 5"],
            "Database": ["MySQL", "SQLite", "MongoDB"]
        },

        projectsLabel: "Portfolio",
        projectsTitle: "Selected Projects",
        projectImagesLabel: "Images",
        projectViewGithub: "View on GitHub",
        projects: [
            {
                title: "Unity Architect AI",
                brief: "AI-powered Unity C# code analysis and development platform.",
                tag: "AI / Desktop App",
                link: "https://github.com/BurakErdemci/Unity-Architect-AI",
                detail: "A desktop application offering professional-grade code review, performance analysis, and AI-powered code fixes for Unity developers. Features an Electron (Nextron) based IDE-like 3-panel layout (File Explorer, Code Editor, AI Chat). Includes FastAPI backend with 5 AI provider support, weighted 0-10 smart scoring system, severity classification (Critical/Warning/Info), C# syntax highlighting, Markdown rendering, and workspace management.",
                tech: ["Electron", "Next.js", "Python", "FastAPI", "SQLite", "AI/LLM"],
                images: ["IDE Interface", "AI Analysis Results", "Scoring System"]
            },
            {
                title: "Ristorante Stellato",
                brief: "Full-stack luxury restaurant and reservation system with Next.js 16 & MongoDB.",
                tag: "Full Stack",
                link: "https://github.com/BurakErdemci/ristorante-stellato",
                detail: "A real-world full-stack reservation management system built with Next.js 16 Server Actions. Customer side features interactive table selection (capacity checks, occupied detection), multi-step reservation form, smart calendar system, and automatic email notifications via Nodemailer. Admin panel includes dashboard statistics, advanced filtering, live search, bulk operations, and safe deletion with confirmation modals. Premium animations with Framer Motion and form validation with Zod.",
                tech: ["Next.js 16", "React 18", "Tailwind CSS v4", "MongoDB", "Mongoose", "Framer Motion", "Zod", "Nodemailer"],
                images: [
                    "images/Mainpage1.png",
                    "images/Mainpage2.png",
                    "images/MainpageMenu.png",
                    "images/MainpageExperience.png",
                    "images/ReservationPage1.png",
                    "images/ResarvationPage2.png",
                    "images/Resarvationpage3.png",
                    "images/ReservationPage4.png",
                    "images/ResarvationPage5.png",
                    "images/Adminpage.png"
                ]
            },
            {
                title: "Workday-Loop ",
                brief: "A 2D psychological thriller / narrative experience game built with Unity.",
                tag: "Game Dev",
                link: "https://github.com/BurakErdemci/Workday-Loop",
                detail: "A psychological thriller experience exploring the monotony of modern work life and the silent decay of the individual within this system. Starts as a classic office simulator but evolves into an increasingly unsettling narrative. Inspired by Mad Men's 1960s minimalist aesthetic and Nier: Automata's existential melancholy soundtrack. Offers two endings based on player choices: Salvation and Eternal Loop. Adds psychological depth through mini-games, changing environmental details, and cryptic system messages.",
                tech: ["Unity", "C#", "2D Game Design", "Narrative Design"],
                images: [
                    "images/workday-1.png",
                    "images/workday-2.png",
                    "images/workday-3.png",
                    "images/workday-4.png",
                    "images/workday-5.png",
                    "images/workday-6.png",
                    "images/workday-7.png",
                    "images/workday-8.png",
                    "images/workday-9.png"
                ]
            },
            {
                title: "OyunBlog",
                brief: "Multi-layered game blog and forum platform built with ASP.NET Core.",
                tag: "ASP.NET Core",
                link: "https://github.com/BurakErdemci/OyunBlog",
                detail: "A web application for gaming enthusiasts with a multi-layered (clean) architecture. Uses a 5-layer structure: Core, Data, BusinessLogic, MainPage, and Utilities. Features Entity Framework Core with SQLite, Repository and Unit of Work patterns, ASP.NET Core Identity for authentication and role management, DTO mapping with AutoMapper, Razor Pages with MVC Controllers, forum CRUD operations, search, pagination, and admin-privileged content management.",
                tech: ["C#", "ASP.NET Core", "Entity Framework Core", "Identity", "AutoMapper", "SQLite", "Razor Pages"],
                images: ["images/OyunblogResim-1.png", "images/OyunblogResim-2.png", "images/OyunblogResim-3.png", "images/OyunblogResim-4.png", "images/OyunblogResim-5.png", "images/OyunblogResim-6.png"]
            }
        ],

        timelineLabel: "Journey",
        timelineTitle: "Experience & Education",
        timeline: [
            {
                date: "2024 — Present",
                title: "Software Development",
                subtitle: "Freelance & Personal Projects",
                text: "Active work on backend development, game programming, and web applications."
            },
            {
                date: "2020 — 2024",
                title: "Marine Engineering",
                subtitle: "University Education",
                text: "Developed interest in software during engineering education and transitioned into the field."
            }
        ],

        contactLabel: "Contact",
        contactTitle: "Let's Work Together",
        contactText: "Feel free to reach out for new projects, collaborations, or just to say hello.",
        formName: "Name",
        formEmail: "Email",
        formMessage: "Message",
        formSubmit: "Send",

        footerCv: "Download CV",
        footerTop: "Back to Top"
    }
};

// ─── State ───
let currentLang = localStorage.getItem('lang') || 'tr';
let isDark = localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

// ─── Theme ───
function applyTheme() {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    const darkIcon = document.getElementById('theme-icon-dark');
    const lightIcon = document.getElementById('theme-icon-light');
    if (darkIcon && lightIcon) {
        darkIcon.style.display = isDark ? 'none' : 'block';
        lightIcon.style.display = isDark ? 'block' : 'none';
    }
}

function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme();
}

// ─── Language ───
function toggleLang() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    localStorage.setItem('lang', currentLang);
    renderContent();
}

// ─── Render Content ───
function renderContent() {
    const t = data[currentLang];

    // Simple text bindings
    const textMap = {
        'hero-status': t.heroStatus,
        'hero-subtitle': t.heroSubtitle,
        'btn-projects': t.btnProjects,
        'btn-cv': t.btnCv,
        'about-label': t.aboutLabel,
        'about-title': t.aboutTitle,
        'about-text': t.aboutText,
        'status-text': t.status,
        'role-text': t.role,
        'skills-label': t.skillsLabel,
        'skills-title': t.skillsTitle,
        'projects-label': t.projectsLabel,
        'projects-title': t.projectsTitle,
        'timeline-label': t.timelineLabel,
        'timeline-title': t.timelineTitle,
        'contact-label': t.contactLabel,
        'contact-title': t.contactTitle,
        'contact-text': t.contactText,
        'form-name-label': t.formName,
        'form-email-label': t.formEmail,
        'form-message-label': t.formMessage,
        'form-submit-text': t.formSubmit,
        'lang-text': t.btnLang,
        'footer-cv-text': t.footerCv,
        'footer-top-text': t.footerTop
    };

    for (const [id, text] of Object.entries(textMap)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    // Nav links
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });

    // Skills — categorized
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = Object.entries(t.skills).map(([category, skills]) => `
            <div class="skills-category">
                <div class="skills-category-label">${category}</div>
                <div class="skills-grid">
                    ${skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // Projects — accordion cards
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = t.projects.map((proj, i) => `
            <div class="project-card reveal" data-project="${i}">
                <div class="project-header" onclick="toggleProject(${i})">
                    <div class="project-header-left">
                        <span class="project-tag">${proj.tag}</span>
                        <h3 class="project-title">${proj.title}</h3>
                        <p class="project-brief">${proj.brief}</p>
                    </div>
                    <div class="project-toggle">
                        ${chevronSVG}
                    </div>
                </div>
                <div class="project-body" id="project-body-${i}">
                    <div class="project-body-inner">
                        <p class="project-description">${proj.detail}</p>
                        <div class="project-tech">
                            ${proj.tech.map(t => `<span class="project-tech-tag">${t}</span>`).join('')}
                        </div>
                        
                        <!-- Images sub-accordion -->
                        <div class="project-images-toggle" onclick="toggleProjectImages(event, ${i})">
                            <span class="project-images-toggle-label">
                                ${imageSVG}
                                ${t.projectImagesLabel} (${proj.images.length})
                            </span>
                            <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                        <div class="project-images-body" id="project-images-${i}">
                            <div class="project-images-scroll">
                                ${proj.images.map((img, j) => `
                                    <div class="project-image-item">
                                        ${img.includes('images/')
                ? `<img src="${img}" alt="${proj.title} Screenshot ${j + 1}" class="project-img-real" loading="lazy">`
                : `<div class="project-image-placeholder">${img}</div>`
            }
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <a href="${proj.link}" target="_blank" rel="noopener" class="project-link">
                            ${externalSVG}
                            ${t.projectViewGithub}
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-observe newly created project cards
        observeNewElements();
    }

    // Timeline
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        timelineContainer.innerHTML = t.timeline.map(item => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${item.date}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-subtitle">${item.subtitle}</p>
                <p class="timeline-text">${item.text}</p>
            </div>
        `).join('');
    }
}

// ─── Accordion: Projects ───
function toggleProject(index) {
    const allCards = document.querySelectorAll('.project-card');
    allCards.forEach((card, i) => {
        const body = document.getElementById(`project-body-${i}`);
        if (i === index) {
            const isExpanded = card.classList.contains('expanded');
            if (isExpanded) {
                card.classList.remove('expanded');
                body.style.maxHeight = '0';
            } else {
                card.classList.add('expanded');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        } else {
            card.classList.remove('expanded');
            if (body) body.style.maxHeight = '0';
            // Also close any open image sub-accordions
            const imgToggle = card.querySelector('.project-images-toggle');
            const imgBody = document.getElementById(`project-images-${i}`);
            if (imgToggle) imgToggle.classList.remove('active');
            if (imgBody) imgBody.style.maxHeight = '0';
        }
    });
}

// ─── Accordion: Project Images ───
function toggleProjectImages(event, index) {
    event.stopPropagation();
    const toggle = event.currentTarget;
    const body = document.getElementById(`project-images-${index}`);
    const projectBody = document.getElementById(`project-body-${index}`);
    const isActive = toggle.classList.contains('active');

    if (isActive) {
        toggle.classList.remove('active');
        body.style.maxHeight = '0';
    } else {
        toggle.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
    }

    // Recalculate parent accordion height after animation
    setTimeout(() => {
        if (projectBody) {
            projectBody.style.maxHeight = projectBody.scrollHeight + 'px';
        }
    }, 50);
}

// ─── Scroll Reveal ───
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

function observeNewElements() {
    document.querySelectorAll('.reveal:not(.active)').forEach(el => observer.observe(el));
}

// ─── Navbar scroll effect ───
function handleNavScroll() {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// ─── Mobile Menu ───
function toggleMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const links = document.getElementById('nav-links');
    btn.classList.toggle('active');
    links.classList.toggle('mobile-open');
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
    // Theme
    applyTheme();

    // Render content
    renderContent();

    // Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Event listeners
    document.getElementById('theme-btn').addEventListener('click', toggleTheme);
    document.getElementById('lang-btn').addEventListener('click', toggleLang);
    document.getElementById('menu-btn').addEventListener('click', toggleMobileMenu);

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const btn = document.getElementById('menu-btn');
            const links = document.getElementById('nav-links');
            btn.classList.remove('active');
            links.classList.remove('mobile-open');
        });
    });

    // Scroll effects
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // Observe reveal elements
    observeNewElements();

    // Contact form (Web3Forms Integration)
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('form-submit-btn');
            const originalText = submitBtn.innerHTML;
            const submitTextEl = document.getElementById('form-submit-text');

            // Checking if the user changed the API Key
            const accessKey = form.querySelector('[name="access_key"]').value;
            if (accessKey === 'YOUR_ACCESS_KEY_HERE') {
                alert(currentLang === 'tr' ? 'Lütfen index.html dosyasındaki Web3Forms Access Key kısmına kendi anahtarınızı girin!' : 'Please enter your Web3Forms Access Key in index.html!');
                return;
            }

            // Loading state
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
            if (submitTextEl) submitTextEl.innerText = currentLang === 'tr' ? 'Gönderiliyor...' : 'Sending...';

            const formData = new FormData(form);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Success state
                    submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span id="form-submit-text">${currentLang === 'tr' ? 'Gönderildi!' : 'Sent!'}</span>`;
                    submitBtn.style.background = '#22c55e';
                    submitBtn.style.borderColor = '#22c55e';
                    submitBtn.style.color = '#fff';
                    form.reset();
                } else {
                    // API Error state
                    submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> <span id="form-submit-text">Hata</span>`;
                    submitBtn.style.background = '#ef4444';
                    submitBtn.style.borderColor = '#ef4444';
                    submitBtn.style.color = '#fff';
                    console.error('Web3Forms Error:', data);
                }
            } catch (error) {
                // Network Error state
                submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> <span id="form-submit-text">Hata</span>`;
                submitBtn.style.background = '#ef4444';
                submitBtn.style.borderColor = '#ef4444';
                submitBtn.style.color = '#fff';
                console.error('Network Error:', error);
            }

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }, 3000);
        });
    }
});