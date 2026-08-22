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
      "Game Dev": ["Unity (2D/3D)", "Unreal Engine 5"],
      "Veritabanı": ["MySQL", "SQLite", "MongoDB"]
    },
    projectsLabel: "Portfolyo",
    projectsTitle: "Seçilmiş Projeler",
    projectImagesLabel: "Görseller",
    projectViewGithub: "GitHub'da Görüntüle",
    projects: [
      {
        title: "Gamachine",
        brief: "Unity geliştiricileri için AI ajanlarını yöneten masaüstü uygulaması.",
        tag: "AI DEV TOOL — FLAGSHIP",
        link: "https://github.com/BurakErdemci/gamachine",
        detail: `### 🎮 Unity için AI Ajan Merkezi\n**Gamachine** (v3.0.0), Unity geliştiricileri için AI ajanlarını yöneten bir masaüstü uygulamasıdır; Electron, Next.js ve Python FastAPI üzerine kuruludur.\n\n#### ✨ Öne Çıkan Özellikler\n- **Tek Sohbet Penceresi:** Claude Code, Codex, Antigravity, GitHub Copilot, Cursor, OpenCode ve Kimi CLI ajanları; Anthropic, OpenAI, Google, NVIDIA NIM, Groq, DeepSeek, Moonshot ve Z.ai bulut API'leri; ve yerel Ollama tek arayüzde birleşir.\n- **Ortak Onay Kapısı:** Hangi ajan isterse istesin, dosya yazma/silme ve tehlikeli terminal komutları bir onay kartı açar.\n- **Canlı Unity Kontrolü (MCP):** GameObject ekleme, bileşen bağlama, konsol okuma, play mode, ekran görüntüsü ve manage_input ile çalışan oyuna girdi gönderme.\n- **C# Kod Zekası:** OmniSharp-Roslyn sidecar ile canlı hata gösterimi, IntelliSense ve tanıma git.\n\n#### 💻 Platform ve Lisans\nWindows ve macOS (Apple Silicon) için ücretsiz. MIT + Commons Clause: uygulamayla yapılan oyunlar satılabilir, uygulamanın kendisi satılamaz.`,
        tech: ["Electron", "Next.js", "Python", "FastAPI", "MCP", "SQLite", "AI/LLM"],
        images: [
          "images/unity-architect-ai-1.png",
          "images/unity-architect-ai-2.png",
          "images/unity-architect-ai-3.png",
          "images/unity-architect-ai-4.png",
          "images/unity-architect-ai-5.png",
          "images/unity-architect-ai-6.png",
          "images/unity-architect-ai-7.png",
          "images/unity-architect-ai-8.png",
          "images/unity-architect-ai-9.png",
          "images/unity-architect-ai-10.png"
        ]
      },
      {
        title: "Context Police",
        brief: "AI kod ajanlarının hafızasını denetleyen, bayatlamış notları yakalayan masaüstü aracı.",
        tag: "AI TOOLING — MEMORY AUDITOR",
        link: "https://github.com/BurakErdemci/Context-Police",
        detail: `### 🔎 Ajan hafızası sessizce çürüyor\n**Context Police**, AI kod ajanlarının hafıza notlarını denetleyen bir arka plan aracıdır. Kod ilerler, not olduğu yerde kalır, ajan onu doğru sanmaya devam eder.\n\n#### ✨ Nasıl çalışıyor\n- **Çelişki tespiti:** iki not birbirini yalanlıyorsa en az biri yanlıştır. Ucuz ve tamamen yerel bir sinyal.\n- **Çapa kayması:** notun bağlandığı dosya, sembol veya commit hareket ettiyse not şüpheli olur. Hakem git geçmişidir, ajanın kendisi değil.\n- **Hiçbir şey silinmez:** çürüyen not superseded işaretlenir. Yanlış alarmın maliyeti sıfır, geri alma tek tık, aracın kendi hata oranı ölçülebilir kalır.\n- **Canlı oturuma yazmaz:** denetim temiz bir bağlamda, ölçüm görevi olarak koşar.\n\n#### 🖥️ Arayüz\nTauri masaüstü uygulaması, "vaka defteri" tasarım diliyle: kağıt zemin, el yazısı not, damga ve grafit kalem.`,
        tech: ["Tauri", "TypeScript", "Python", "SQLite", "Git", "LLM"],
        images: []
      },
      {
        title: "codex-delegate",
        brief: "Codex işçi hatlarına iş dağıtan, her bulguyu koşulabilir bir kanıta bağlayan Claude Code eklentisi.",
        tag: "DEV TOOLING — AGENT ORCHESTRATION",
        link: "https://github.com/BurakErdemci/codex-delegate",
        detail: `### ⚙️ İşi Codex yapar, kararı Claude verir\nİki yarımlı bir Claude Code eklentisi, tek fikir üzerine kurulu.\n\n#### 🧵 codex-delegate — paralel işçi hatları\nHer Codex işçisi, bilinen bir commit'e sabitlenmiş kendi git worktree'sinde çalışır ve altı satırla rapor verir. Claude spec'i yazar, "doğru"nun ne olduğuna karar verir, hattın bıraktığı izi spec'e karşı doğrular ve yamayı ana ağaca kendisi uygular.\n\n#### 🔴 codex-audit — dış göz\nAynı makine tersine çevrilir: Codex bir red team olarak koda saldırır, her bulgu koşulabilir bir kanıt getirmek zorundadır, Claude yeniden üretmediği hiçbir bulguya göre hareket etmez.\n\n#### 📓 Her kural bir arızadan geldi\nEklentideki her kuralın arkasında gerçek kullanımda kırılan bir şey var. Ölçümüyle birlikte hepsi FIELD-LOG.md'de duruyor.`,
        tech: ["Python", "Claude Code Plugin", "Codex CLI", "Git Worktree"],
        images: []
      },
      {
        title: "Workday-Loop",
        brief: "Unity 2D psikolojik gerilim oyunu. Ekip işi; rolüm level design ve anlatı tasarımı.",
        tag: "GAME — PSYCHOLOGICAL THRILLER",
        link: "https://burakerdemci.itch.io/workdayloop",
        detail: "Modern iş hayatının tekdüzeliğini ve bireyin bu sistem içindeki sessiz çürüyüşünü anlatan bir psikolojik gerilim deneyimi. Klasik bir ofis simülatörü gibi başlayıp, giderek tuhaflaşan bir anlatıya dönüşür. Mad Men'den ilham alan 1960'lar minimalist estetiği ve Nier: Automata'dan esinlenen varoluşsal melankoli müzikleri ile desteklenir. Oyuncunun seçimlerine göre iki farklı son sunar: Kurtuluş (Salvation) ve Sonsuz Döngü (Loop). Mini oyunlar, değişen çevre detayları ve sistem mesajları ile psikolojik derinlik katar.",
        tech: ["Unity", "Level Design", "Narrative Design", "2D Game Design"],
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
        title: "Ristorante Stellato",
        brief: "Next.js 16 ve MongoDB ile geliştirilmiş full-stack lüks restoran ve rezervasyon sistemi.",
        tag: "WEB — FULL-STACK SHOWCASE",
        link: "https://ristorante-stellato-puum.vercel.app",
        detail: `### 🍝 Modern Rezervasyon Deneyimi\n**Ristorante Stellato**, Next.js 16 ve Server Actions mimarisiyle inşa edilmiş, Michelin yıldızlı bir restoranın tüm rezervasyon süreçlerini yöneten profesyonel bir platformdur.\n\n#### 🎯 Teknik Detaylar\n- **İnteraktif Masa Seçimi:** Kat planı üzerinden görsel masa seçimi ve gerçek zamanlı doluluk kontrolü.\n- **Çok Adımlı Kullanıcı Deneyimi:** Zod doğrulamalı (validation), akıcı ve hata payını sıfıra indiren rezervasyon adımları.\n- **Güvenli Yönetici Paneli:** NextAuth v5 ile korunan, kontrol paneli istatistikleri ve canlı arama içeren yönetim merkezi.\n- **Mobil Uyumlu & PWA:** Duyarlı (responsive) tasarım, koyu/açık tema desteği ve offline erişim imkanı sağlayan PWA yapısı.\n- **Spam Koruması:** IP tabanlı istek sınırlama (rate limiting) ile yüksek güvenlik standartları.`,
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
        title: "Jarvan",
        brief: "Çok ajanlı kişisel asistan ve işletim köprüsü.",
        tag: "ARŞİV — ERKEN DENEME",
        link: "https://github.com/BurakErdemci/JARVAN",
        detail: `### 🤖 Çok Ajanlı Kişisel Asistan\n**Jarvan**, günlük işlerinizi ve yazılım geliştirme süreçlerinizi organize eden gelişmiş bir çok ajanlı (multi-agent) asistan sistemidir.\n\n#### ✨ Öne Çıkan Özellikler\n- **Görev Dağılımlı Ajanlar:** Bir model genel mimariyi planlarken, diğeri kodu yazar, üçüncüsü ise standartlara ve güvenliğe uygunluğu denetler.\n- **Markdown Tabanlı Bağlam Hattı:** Ajanlar arası iletişim, veri paylaşımı ve hafıza yönetimi markdown dosyaları üzerinden organize edilir.\n- **Proaktif Yetenekler:** Kişiselleştirilmiş sabah brifingleri, otomatik not tutma sistemleri ve cihazlar arası veri köprüleri.`,
        tech: ["Multi-Agent", "Python", "FastAPI", "LLM Orchestration"],
        images: []
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
      "Game Dev": ["Unity (2D/3D)", "Unreal Engine 5"],
      "Database": ["MySQL", "SQLite", "MongoDB"]
    },
    projectsLabel: "Portfolio",
    projectsTitle: "Selected Projects",
    projectImagesLabel: "Images",
    projectViewGithub: "View on GitHub",
    projects: [
      {
        title: "Gamachine",
        brief: "Desktop app that orchestrates AI agents for Unity developers.",
        tag: "AI DEV TOOL — FLAGSHIP",
        link: "https://github.com/BurakErdemci/gamachine",
        detail: `### 🎮 An AI Agent Hub for Unity\n**Gamachine** (v3.0.0) is a desktop application that orchestrates AI agents for Unity developers, built on Electron, Next.js, and Python FastAPI.\n\n#### ✨ Core Features\n- **One Chat Window:** Claude Code, Codex, Antigravity, GitHub Copilot, Cursor, OpenCode, and Kimi CLI agents; the Anthropic, OpenAI, Google, NVIDIA NIM, Groq, DeepSeek, Moonshot, and Z.ai cloud APIs; and local Ollama, all in a single interface.\n- **Shared Approval Gate:** No matter which agent asks, file writes/deletes and dangerous terminal commands raise an approval card.\n- **Live Unity Control (MCP):** Add GameObjects, wire up components, read the console, drive play mode, capture screenshots, and send input to the running game via manage_input.\n- **C# Code Intelligence:** Live diagnostics, IntelliSense, and go-to-definition through an OmniSharp-Roslyn sidecar.\n\n#### 💻 Platform and License\nFree on Windows and macOS (Apple Silicon). MIT + Commons Clause: games made with the app can be sold, the app itself cannot.`,
        tech: ["Electron", "Next.js", "Python", "FastAPI", "MCP", "SQLite", "AI/LLM"],
        images: [
          "images/unity-architect-ai-1.png",
          "images/unity-architect-ai-2.png",
          "images/unity-architect-ai-3.png",
          "images/unity-architect-ai-4.png",
          "images/unity-architect-ai-5.png",
          "images/unity-architect-ai-6.png",
          "images/unity-architect-ai-7.png",
          "images/unity-architect-ai-8.png",
          "images/unity-architect-ai-9.png",
          "images/unity-architect-ai-10.png"
        ]
      },
      {
        title: "Context Police",
        brief: "A desktop auditor for AI coding-agent memory: it catches the notes that went stale.",
        tag: "AI TOOLING — MEMORY AUDITOR",
        link: "https://github.com/BurakErdemci/Context-Police",
        detail: `### 🔎 Agent memory rots without anyone noticing\n**Context Police** audits the memory files AI coding agents rely on. Code moves, the note stays put, and the agent keeps treating it as true.\n\n#### ✨ How it works\n- **Contradiction detection:** if two notes disagree, at least one is wrong. Cheap, entirely local.\n- **Anchor drift:** when the file, symbol or commit a note is pinned to moves, the note becomes suspect. The git history is the arbiter, never the agent.\n- **Nothing is ever deleted:** a decayed note is marked superseded. A wrong flag costs nothing, recovery is one click, and the tool's own error rate stays measurable.\n- **Never writes into a live session:** the audit runs in a clean context, framed as a measurement task.\n\n#### 🖥️ Interface\nA Tauri desktop app built around a "case notebook" design language: paper ground, handwritten notes, stamps and graphite pencil.`,
        tech: ["Tauri", "TypeScript", "Python", "SQLite", "Git", "LLM"],
        images: []
      },
      {
        title: "codex-delegate",
        brief: "A Claude Code plugin that hands implementation to Codex worker lanes and makes every finding carry a runnable proof.",
        tag: "DEV TOOLING — AGENT ORCHESTRATION",
        link: "https://github.com/BurakErdemci/codex-delegate",
        detail: `### ⚙️ Codex does the labour, Claude keeps the judgement\nA Claude Code plugin with two halves built on one idea.\n\n#### 🧵 codex-delegate — parallel worker lanes\nEach Codex worker gets a disposable git worktree pinned to a known commit and reports back in six lines. Claude writes the spec, decides what "correct" means, verifies the lane's footprint against that spec, and applies the diff to the main tree itself.\n\n#### 🔴 codex-audit — outside eyes\nThe same machinery, reversed: a Codex red team attacks the code, every finding must ship a runnable proof, and Claude acts on nothing it has not reproduced.\n\n#### 📓 Every rule came from a failure\nEach rule traces back to something that broke in real use. The measurement behind each one is recorded in FIELD-LOG.md.`,
        tech: ["Python", "Claude Code Plugin", "Codex CLI", "Git Worktree"],
        images: []
      },
      {
        title: "Workday-Loop",
        brief: "A Unity 2D psychological thriller. Team project; my role was level design and narrative.",
        tag: "GAME — PSYCHOLOGICAL THRILLER",
        link: "https://burakerdemci.itch.io/workdayloop",
        detail: "A psychological thriller experience exploring the monotony of modern work life and the silent decay of the individual within this system. Starts as a classic office simulator but evolves into an increasingly unsettling narrative. Inspired by Mad Men's 1960s minimalist aesthetic and Nier: Automata's existential melancholy soundtrack. Offers two endings based on player choices: Salvation and Eternal Loop. Adds psychological depth through mini-games, changing environmental details, and cryptic system messages.",
        tech: ["Unity", "Level Design", "Narrative Design", "2D Game Design"],
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
        title: "Ristorante Stellato",
        brief: "Full-stack luxury restaurant and reservation system with Next.js 16 & MongoDB.",
        tag: "WEB — FULL-STACK SHOWCASE",
        link: "https://ristorante-stellato-puum.vercel.app",
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
        title: "Jarvan",
        brief: "Multi-agent personal assistant and system bridge.",
        tag: "ARCHIVED — EARLY EXPERIMENT",
        link: "https://github.com/BurakErdemci/JARVAN",
        detail: `### 🤖 Multi-Agent Personal Assistant\n**Jarvan** is an advanced Multi-Agent personal assistant system that organizes your daily workflows and development pipelines.\n\n#### ✨ Key Features\n- **Role-Based Agents:** One model plans the architecture, another writes the code, and a third reviews for compliance and safety.\n- **Markdown Context Bus:** Inter-agent communication and state management are orchestrated via markdown files.\n- **Proactive Functionality:** Automatic morning briefings, note-taking, and secure cross-device bridging.`,
        tech: ["Multi-Agent", "Python", "FastAPI", "LLM Orchestration"],
        images: []
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
