export interface Project {
  title: string
  brief: string
  tag: string
  link: string
  detail: string
  tech: string[]
  images: string[]
}

export interface TimelineItem {
  date: string
  title: string
  subtitle: string
  text: string
}

export interface LangContent {
  navAbout: string
  navSkills: string
  navProjects: string
  navTimeline: string
  navContact: string
  btnLang: string
  heroStatus: string
  heroSubtitle: string
  btnProjects: string
  btnCv: string
  aboutLabel: string
  aboutTitle: string
  aboutText: string
  status: string
  role: string
  skillsLabel: string
  skillsTitle: string
  skills: Record<string, string[]>
  projectsLabel: string
  projectsTitle: string
  projectImagesLabel: string
  projectViewGithub: string
  projects: Project[]
  timelineLabel: string
  timelineTitle: string
  timeline: TimelineItem[]
  contactLabel: string
  contactTitle: string
  contactText: string
  formName: string
  formEmail: string
  formMessage: string
  formSubmit: string
  footerCv: string
  footerTop: string
}

export const content: Record<'tr' | 'en', LangContent> = {
  tr: {
    navAbout: "Hakkımda",
    navSkills: "Yetenekler",
    navProjects: "Projeler",
    navTimeline: "Deneyim",
    navContact: "İletişim",
    btnLang: "EN",
    heroStatus: "İş Tekliflerine Açık",
    heroSubtitle: "Game & Full Stack Developer",
    btnProjects: "Projeleri Gör",
    btnCv: "CV İndir",
    aboutLabel: "Hakkımda",
    aboutTitle: "Merhaba, Ben Burak",
    aboutText: "Yazılım dünyasına Gemi Makineleri Mühendisliği'nden geçiş yaptım. TypeScript, C# ve Python ana uzmanlık alanlarım olmak üzere; hem modern web ekosistemlerinde (React, Next.js) hem de arka uç mimarilerinde (ASP.NET Core, FastAPI) full-stack projeler geliştiriyorum. Ayrıca Unity ile hikaye tabanlı oyunlar tasarlıyorum.",
    status: "İş Tekliflerine Açık",
    role: "Yazılım Geliştirici",
    skillsLabel: "Teknik Yetenekler",
    skillsTitle: "Yetenekler",
    skills: {
      "Backend": ["C#", "ASP.NET Core", "Entity Framework", "Python"],
      "Frontend & Web": ["HTML/CSS/JS", "TypeScript", "Next.js", "React", "Tailwind CSS"],
      "Game Dev": ["Unity (2D/3D)", "Unreal Engine 5"],
      "Veritabanı": ["MySQL", "SQLite", "MongoDB"]
    },
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
        detail: `### 🧠 Yapay Zeka Destekli Mimari\n**Unity Architect AI**, Unity geliştiricileri için Multi-Agent AI mimarisini kullanan profesyonel bir kod denetimi ve geliştirme platformudur.\n\n#### ✨ Öne Çıkan Özellikler\n- **LLM Tabanlı Niyet Algılama:** Claude, ChatGPT ve Gemini gibi modellerle kullanıcı taleplerini analiz eden akıllı yönlendirme sistemi.\n- **Oyun Hissiyatı (Game Feel) Analizi:** Kodun sadece kalitesini değil, oyuncunun hissedeceği "akıcılığı" (%30 Hareket, %25 Combat, %10 Juice) puanlayan benzersiz bir ajan sistemi.\n- **Multi-Agent Pipeline:** Orchestrator, Unity Expert, Critic ve Game Feel ajanlarının paralel çalışarak kodu optimize ettiği ileri düzey mimari.\n- **IDE Benzeri Arayüz:** Electron tabanlı, syntax highlighting destekli, Dosya Gezgini ve AI Chat panelli profesyonel çalışma alanı.\n\n#### 🤖 Çoklu AI Desteği\nAnthropic Claude, OpenAI, OpenRouter, Groq ve yerel Ollama modelleriyle tam entegrasyon sunar.`,
        tech: ["Electron", "Next.js", "Python", "FastAPI", "SQLite", "AI/LLM"],
        images: []
      },
      {
        title: "Ristorante Stellato",
        brief: "Next.js 16 ve MongoDB ile geliştirilmiş full-stack lüks restoran ve rezervasyon sistemi.",
        tag: "Full Stack",
        link: "https://github.com/BurakErdemci/ristorante-stellato",
        detail: `### 🍝 Modern Rezervasyon Deneyimi\n**Ristorante Stellato**, Next.js 16 ve Server Actions mimarisiyle inşa edilmiş, Michelin yıldızlı bir restoranın tüm ihtiyaçlarını karşılayan profesyonel bir rezervasyon platformudur.\n\n#### 🎯 Teknik Üstünlükler\n- **İnteraktif Masa Seçimi:** Kroki üzerinde görsel masa seçimi ve gerçek zamanlı doluluk kontrolü.\n- **Multi-Step UX:** Zod validasyonlu, akıcı ve hata payını sıfıra indiren rezervasyon süreci.\n- **Güvenli Admin Paneli:** NextAuth v5 ile korunan, dashboard istatistikleri ve canlı arama içeren yönetim merkezi.\n- **PWA & Tasarım:** Responsive yapı, Dark/Light tema desteği ve offline erişim imkanı sağlayan PWA mimarisi.\n- **Rate Limiting:** IP tabanlı spam koruması ile yüksek güvenlik standartları.`,
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
        title: "Workday-Loop",
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
    timelineLabel: "Yolculuk",
    timelineTitle: "Deneyim & Eğitim",
    timeline: [
      {
        date: "2025 — Devam Ediyor",
        title: "Freelance Yazılımcı",
        subtitle: "Full Stack & Açık Kaynak Projeler",
        text: "Modern web teknolojileri (Next.js, Nextron, React) ve güçlü arka uç (ASP.NET Core, FastAPI) sistemleriyle uçtan uca full-stack uygulamalar ve açık kaynaklı AI araçları geliştiriyorum."
      },
      {
        date: "2025",
        title: "Yazılım Uzmanlığı Eğitimi",
        subtitle: "İstanbul Arı Bilgi Bilişim & Kariyer Akademisi",
        text: "Yazılım Uzmanlığı ve İleri Seviye JavaScript eğitimlerini başarılı bir şekilde tamamladım. Endüstri standartlarında proje geliştirme, veritabanı mimarisi ve modern web teknolojileri üzerine profesyonel altyapı edindim."
      },
      {
        date: "Kasım 2024",
        title: "Yazılıma İlk Adım",
        subtitle: "Oyun Geliştirme & Unity 3D",
        text: "Yazılımla hiçbir bağımın olmadığı mühendislik yıllarımdan sonra oyun geliştirme merakımla Unity motorunu öğrenerek sektöre çok hızlı ve yoğun bir giriş yaptım. C# dilinin temelini oyun tasarlayarak atmam, nesne yönelimli programlama (OOP) ve sistem mimarisi konularını çok daha görsel ve yaratıcı bir yolla kavramamı sağladı."
      },
      {
        date: "2021 — 2024",
        title: "Gemi Makineleri Mühendisliği",
        subtitle: "Lisans Eğitimi",
        text: "Mühendislik disiplini, karmaşık makine sistemlerini analiz etme ve problem çözme yeteneğimi şekillendirdi. Bu eğitim sürecinde yazılım veya kodlamayla hiçbir ilgim olmasa da, mühendislik analitik düşünce yapısı bugünkü kariyer hızımın temelini oluşturdu."
      }
    ],
    contactLabel: "İletişim",
    contactTitle: "Birlikte Çalışalım",
    contactText: "Yeni projeler, iş birlikleri veya sadece merhaba demek için benimle iletişime geçebilirsiniz.",
    formName: "İsim",
    formEmail: "E-posta",
    formMessage: "Mesaj",
    formSubmit: "Gönder",
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
    heroSubtitle: "Game & Full Stack Developer",
    btnProjects: "View Projects",
    btnCv: "Download CV",
    aboutLabel: "About Me",
    aboutTitle: "Hello, I'm Burak",
    aboutText: "I transitioned into the software world from Marine Engineering. With TypeScript, C#, and Python as my core expertise, I develop full-stack projects across modern web ecosystems (React, Next.js) and robust backends (ASP.NET Core, FastAPI). I also design story-based games using Unity.",
    status: "Open to Work",
    role: "Software Developer",
    skillsLabel: "Technical Skills",
    skillsTitle: "Skills",
    skills: {
      "Backend": ["C#", "ASP.NET Core", "Entity Framework", "Python"],
      "Frontend & Web": ["HTML/CSS/JS", "TypeScript", "Next.js", "React", "Tailwind CSS"],
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
        detail: `### 🧠 AI-Powered Architectural Intelligence\n**Unity Architect AI** is a professional code auditing and development platform for Unity developers, leveraging a sophisticated Multi-Agent AI architecture.\n\n#### ✨ Core Features\n- **Intent Classification:** Intelligent routing that analyzes user requests using models like Claude, ChatGPT, and Gemini.\n- **Game Feel Analysis:** A unique agent system that scores not just code quality, but the \"feel\" of the gameplay (30% Movement, 25% Combat, 10% Juice).\n- **Multi-Agent Pipeline:** Advanced orchestration where Unity Expert, Critic, and Game Feel agents work in parallel to optimize code.\n- **IDE-Inspired UI:** Electron-based professional workspace with syntax highlighting, File Explorer, and AI Chat panels.\n\n#### 🤖 Comprehensive AI Support\nSeamless integration with Anthropic Claude, OpenAI, OpenRouter, Groq, and local Ollama models.`,
        tech: ["Electron", "Next.js", "Python", "FastAPI", "SQLite", "AI/LLM"],
        images: []
      },
      {
        title: "Ristorante Stellato",
        brief: "Full-stack luxury restaurant and reservation system with Next.js 16 & MongoDB.",
        tag: "Full Stack",
        link: "https://github.com/BurakErdemci/ristorante-stellato",
        detail: `### 🍝 Modern Reservation Experience\n**Ristorante Stellato** is a professional reservation platform built with Next.js 16 and Server Actions, tailored for the needs of high-end dining establishments.\n\n#### 🎯 Technical Excellence\n- **Interactive Table Selection:** Visual table choice on a layout with real-time occupancy tracking.\n- **Multi-Step UX:** Seamless reservation flow with Zod validation to eliminate errors.\n- **Secure Admin Dashboard:** Management hub protected by NextAuth v5, featuring real-time statistics and live search.\n- **PWA & Design:** Fully responsive with Dark/Light mode and PWA capabilities for offline access.\n- **Rate Limiting:** High-security standards with IP-based spam protection.`,
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
        title: "Workday-Loop",
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
        date: "2025 — Present",
        title: "Freelance Software Developer",
        subtitle: "Full Stack & Open Source Projects",
        text: "Actively developing end-to-end full stack applications and open source AI tools using modern web ecosystems (Next.js, Nextron, React) along with robust backends (ASP.NET Core, FastAPI)."
      },
      {
        date: "2025",
        title: "Software Expertise Certification",
        subtitle: "Istanbul Arı Bilgi IT & Career Academy",
        text: "Successfully completed the Software Expertise and Advanced JavaScript training programs. Acquired a strong professional foundation in industry-standard project development, database architecture, and modern web technologies."
      },
      {
        date: "November 2024",
        title: "First Step into Software",
        subtitle: "Game Development & Unity 3D",
        text: "After years in engineering with zero coding background, I made an intense and rapid leap into the tech industry driven by my passion for games, starting with the Unity engine. Learning C# by designing game mechanics allowed me to grasp Object-Oriented Programming (OOP) and system architecture in a highly creative and visual manner."
      },
      {
        date: "2021 — 2024",
        title: "Marine Engineering",
        subtitle: "Bachelor's Degree",
        text: "My engineering discipline heavily shaped my analytical thinking and ability to troubleshoot complex systems. Although I had absolutely no connection to software during this time, the analytical engineering mindset laid the foundation for my rapid career acceleration today."
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
}
