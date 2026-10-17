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
    heroSubtitle: "Game & AI Tooling Developer",
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
      "Game Dev": ["Unity (2D/3D)", "URP / 2D"],
      "Veritabanı": ["MySQL", "SQLite", "MongoDB"]
    },
    timelineLabel: "Yolculuk",
    timelineTitle: "Deneyim & Eğitim",
    timeline: [
      {
        date: "Eyl 2026 → Bugün",
        title: "Eczacıbaşı VitrA (İME)",
        subtitle: "Stajyer, Dijital Tasarım",
        text: ""
      },
      {
        date: "2025 → Haz 2027",
        title: "Eskişehir Teknik Üniversitesi",
        subtitle: "Bilgisayar Programcılığı (ön lisans)",
        text: "Son sınıf. 2025'te yatay geçişle geldim, Haziran 2027'de mezun oluyorum."
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
    heroSubtitle: "Game & AI Tooling Developer",
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
      "Game Dev": ["Unity (2D/3D)", "URP / 2D"],
      "Database": ["MySQL", "SQLite", "MongoDB"]
    },
    timelineLabel: "Journey",
    timelineTitle: "Experience & Education",
    timeline: [
      {
        date: "Sep 2026 → Now",
        title: "Eczacıbaşı VitrA (İME)",
        subtitle: "Intern, Digital Design",
        text: ""
      },
      {
        date: "2025 → Jun 2027",
        title: "Eskişehir Technical University",
        subtitle: "Computer Programming (associate degree)",
        text: "Final year. Transferred in 2025, graduating in June 2027."
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
