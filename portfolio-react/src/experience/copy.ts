// All visitor-facing text of the menu experience. Source of truth:
// site-tasarim/site-copy/site-metinleri.md (taslak 2, 17 Oct 2026). Do not add
// facts that are not in that file; VitrA is title-only by Burak's rule.
import { CV_VERSION } from '../data/cv-version';

export type Lang = 'tr' | 'en';
export type SectionId = 'profile' | 'missions' | 'confidants' | 'arsenal' | 'showtime' | 'calendar' | 'contact';

export const SECTION_ORDER: SectionId[] = ['profile', 'missions', 'confidants', 'arsenal', 'showtime', 'calendar', 'contact'];

export const LINKS = {
  email: 'mailto:erdemciburakemre@gmail.com',
  emailText: 'erdemciburakemre@gmail.com',
  github: 'https://github.com/BurakErdemci',
  linkedin: 'https://www.linkedin.com/in/burak-erdemci-a3994833b/',
  itch: 'https://burakerdemci.itch.io/',
  cvTr: `/Burak_Erdemci_CV.pdf?v=${CV_VERSION}`,
  cvEn: `/Burak_Erdemci_CV_EN.pdf?v=${CV_VERSION}`,
};

export interface MissionLink { label: string; href: string }
export type MissionMedia =
  // alt describes the loop; stillAlt the poster, when the poster is a different picture
  | { kind: 'loop'; src: string; poster: string; label: string; alt: string; stillAlt?: string }
  | { kind: 'shots'; srcs: string[]; label: string }
  | { kind: 'lanes'; arch: [string, string]; lane: string; review: [string, string] };

export interface Mission {
  id: string;
  title: string;
  // language of the title itself: CSS uppercases by the lang attribute, so an English
  // name under lang=tr would get a dotted İ (GAMACHİNE)
  titleLang: Lang;
  kind: string;
  status?: string;
  text: string;
  tech?: string[];
  links: MissionLink[];
  media: MissionMedia;
}

interface Copy {
  hud: {
    plain: string; plainAria: string; menu: string; langGroup: string; cvAria: string;
    skip: string; quick: string; email: string; back: string;
  };
  hint: string;
  name: { label: string; chipA: string; chipB: string; loc: string };
  items: Record<SectionId, { label: string; caption: string }>;
  missions: { title: string; sub: string; detailLabel: string; list: Mission[] };
  showtime: { title: string; sub: string; detailLabel: string; list: Mission[] };
  profile: {
    title: string; p1: string; p2: string; card: string;
    stats: { n: string; l: string }[];
    status: string; workLabel: string; steps: string[]; loop: string;
  };
  confidants: {
    title: string; intro: string; rankUp: string; merged: string; bond: [string, string];
    repos: { repo: string; url: string; rank: string; prs: { n: string; url: string; text: string }[] }[];
  };
  arsenal: {
    title: string; note: string; head: [string, string, string];
    rows: { k: string; tools: string[]; aff: string; main?: boolean; note: string }[];
    weak: { k: string; v: string; note: string };
  };
  calendar: { title: string; rows: { date: string; m: string; y: string; title: string; text: string; now?: boolean }[] };
  contact: {
    title: string; robot: string; button: string; pitch: string; others: string; footer: string;
    chat: string; sender: string; reward: string; rewardSub: string;
  };
  sr: { opened: (s: string) => string; menu: string };
}

const GAMACHINE_TECH = ['Electron', 'React', 'TypeScript', 'Python', 'FastAPI', 'MCP'];
const REPO = (r: string) => `https://github.com/BurakErdemci/${r}`;
// Music videos: facts from the music-video-lab README (see site-copy/site-metinleri.md).
const CLIP_TECH = ['Suno', 'Remotion', 'Three.js', 'Claude Code'];
const CLIP_SRC = (c: string) => REPO(`music-video-lab/tree/main/${c}`);
const CLIP_MEDIA = (c: string) => ({ src: `/media/clip-${c}.webp`, poster: `/media/clip-${c}-still.webp` });

const CONFIDANT_REPOS = (tr: boolean) => [
  {
    repo: 'CoplayDev/unity-mcp', url: 'https://github.com/CoplayDev/unity-mcp', rank: 'RANK 2',
    prs: [
      { n: '#1338', url: 'https://github.com/CoplayDev/unity-mcp/pull/1338', text: tr ? '`manage_sprite`: 2D sprite sheet animasyonu için yeni araç' : 'a new `manage_sprite` tool for 2D sprite sheet animation' },
      { n: '#1337', url: 'https://github.com/CoplayDev/unity-mcp/pull/1337', text: tr ? "Animator'ı hedefin alt nesnelerinde de bulma düzeltmesi" : 'find the Animator on child objects too' },
    ],
  },
  {
    repo: 'nrwl/nx', url: 'https://github.com/nrwl/nx', rank: 'RANK 1',
    prs: [{ n: '#37074', url: 'https://github.com/nrwl/nx/pull/37074', text: tr ? "`coverageDirectory`'yi Jest gibi çözme, yolları düz eğik çizgiyle yazma" : 'resolve `coverageDirectory` like Jest and emit forward-slash paths' }],
  },
  {
    repo: 'badges/shields', url: 'https://github.com/badges/shields', rank: 'RANK 1',
    prs: [{ n: '#12177', url: 'https://github.com/badges/shields/pull/12177', text: tr ? 'statik rozetlere genel sorgu parametresi izin listesi' : 'apply the global query-param allow-list to static badges' }],
  },
];

export const COPY: Record<Lang, Copy> = {
  tr: {
    hud: {
      plain: 'SADE GÖRÜNÜM', plainAria: 'Sade görünüm: tüm içerik tek sayfada, animasyonsuz',
      menu: 'MENÜ', langGroup: 'Dil', cvAria: 'CV (Türkçe, PDF)', skip: 'ATLA', quick: 'Hızlı erişim',
      email: 'E-POSTA', back: 'MENÜYE DÖN',
    },
    hint: '↑↓ SEÇ · ENTER AÇ · ESC MENÜ',
    name: {
      label: '// OYUN GELİŞTİRİCİ · AJANLAR İÇİN ARAÇ YAZARIM',
      chipA: 'OYUN YAPARIM', chipB: '& AJANLARIN KULLANDIĞI ARAÇLARI',
      loc: 'ESKİŞEHİR, TR · UZAKTAN ÇALIŞMAYA VE TAŞINMAYA AÇIK',
    },
    items: {
      profile: { label: 'PROFİL', caption: 'Ben kimim, nasıl çalışıyorum.' },
      missions: { label: 'GÖREVLER', caption: 'Oyunlar ve ajan araçları: beş görev.' },
      confidants: { label: 'SIRDAŞLAR', caption: "Başkalarının projelerinde birleşen 4 PR." },
      arsenal: { label: 'CEPHANELİK', caption: 'Oyun ve ajan aracı yazarken kullandıklarım.' },
      showtime: { label: 'SAHNE', caption: 'Üç müzik klibi; her görsel olay ölçülmüş bir vuruşa kilitli.' },
      calendar: { label: 'TAKVİM', caption: '2021 → bugün.' },
      contact: { label: 'İLETİŞİM', caption: 'Bir görevin mi var?' },
    },
    missions: {
      title: 'GÖREVLER', sub: '// 02 · GÖREV SEÇ', detailLabel: 'Görev ayrıntısı',
      list: [
        {
          id: 'gamachine', title: 'Gamachine', titleLang: 'en', kind: 'AI OYUN STÜDYOSU · AMİRAL GEMİSİ', status: 'SIZMA SÜRÜYOR (v4)',
          text: "Unity için yapay zeka oyun stüdyosu. Claude Code, Codex, Antigravity, Copilot, Cursor ve OpenCode'u tek masaüstü uygulamasında çalıştırıyor; Unity Editor'ü MCP üzerinden canlı yönetiyor. Son sürüm v3.2. Şu an v4'ü yazıyorum.",
          tech: GAMACHINE_TECH,
          links: [{ label: 'İNDİR', href: 'https://github.com/BurakErdemci/gamachine/releases' }, { label: 'KODU GÖR', href: REPO('gamachine') }],
          media: { kind: 'loop', src: '/media/gamachine-loop.webp', poster: '/media/gamachine-still.webp', label: '// v4 FRAGMANI', alt: 'Gamachine v4 fragmanından görüntü' },
        },
        {
          id: 'kagit', title: 'Kâğıt Kart', titleLang: 'tr', kind: 'TARAYICI OYUNU · THREE.JS', status: 'HAZİNE ELE GEÇİRİLDİ',
          text: 'Açılır bir kitabın sayfalarında geçen kart yarışı. Depoda tek bir resim, ses ya da model dosyası yok; sayfaları, harfleri ve müziği kod üretiyor. Deney diye başladım, en çok yıldız alan projem oldu.',
          links: [{ label: 'TARAYICIDA OYNA', href: 'https://burakerdemci.github.io/kagit-kart/' }, { label: 'KODU GÖR', href: REPO('kagit-kart') }],
          media: { kind: 'loop', src: '/media/kagit-loop.webp', poster: '/media/kagit-still.webp', label: '// OYUNDAN', alt: 'Kâğıt Kart oynanışı: açılır kitap yarış menüsüne açılıyor, sonra kâğıt tilki Boğaz Gecesi pistinde kıvılcımlar saçarak drift atıyor', stillAlt: 'Kâğıt Kart: kâğıt tilki alacakaranlıkta Boğaz Gecesi pistinde yarışıyor' },
        },
        {
          id: 'codex', title: 'codex-delegate', titleLang: 'en', kind: 'GELİŞTİRİCİ ARACI · CLAUDE CODE EKLENTİSİ',
          text: 'Claude mimar ve denetçi olarak kalıyor, kodu Codex işçilerine yazdırıyor. Her bulgu, koşturabileceğin bir kanıtla geliyor. Bu siteyi de bu düzenle geliştiriyorum.',
          links: [{ label: 'KODU GÖR', href: REPO('codex-delegate') }],
          media: { kind: 'lanes', arch: ['CLAUDE', 'MİMAR'], lane: 'CODEX', review: ['DENETİM', 'KOŞTURULABİLİR KANIT'] },
        },
        {
          id: 'ristorante', title: 'Ristorante Stellato', titleLang: 'en', kind: 'WEB · ERKEN DÖNEM',
          text: 'Bir restoran için Next.js 16 ve MongoDB ile yazdığım rezervasyon sistemi. Misafir kat planından masasını seçiyor, yönetici paneli korumalı, 53 test var.',
          links: [{ label: 'CANLI DEMO', href: 'https://ristorante-stellato-puum.vercel.app' }],
          media: { kind: 'shots', srcs: ['/media/ristorante-1.webp', '/media/ristorante-2.webp'], label: '// EKRANLAR' },
        },
        {
          id: 'workday', title: 'Workday Loop', titleLang: 'en', kind: 'UNITY 2D · ERKEN DÖNEM',
          text: 'Psikolojik gerilim oyunu. Ekiple yaptık; seviye tasarımını ve anlatıyı ben üstlendim.',
          links: [{ label: 'OYNA (ITCH.IO)', href: 'https://burakerdemci.itch.io/workdayloop' }],
          media: { kind: 'shots', srcs: ['/media/workday-1.webp', '/media/workday-2.webp'], label: '// OYUNDAN KARELER' },
        },
      ],
    },
    showtime: {
      title: 'SAHNE', sub: '// 05 · PARÇA SEÇ', detailLabel: 'Parça ayrıntısı',
      list: [
        {
          id: 'merge-conflict', title: 'Merge Conflict', titleLang: 'en', kind: 'KAWAII HEAVY-METAL DİSKO · 3:52',
          text: 'İki kızın tek bir kod satırı için kawaii heavy-metal disko düellosu; ta ki "accept both changes" spot ışığını bir gradyana çevirene kadar. Kesit: "Blue! Orange!" diye bağıran turuncu kız kendi çığlığıyla metale dönüşüyor.',
          tech: CLIP_TECH,
          links: [{ label: "YOUTUBE'DA İZLE", href: 'https://www.youtube.com/watch?v=J37b5WfH-7w' }, { label: 'KODU GÖR', href: CLIP_SRC('merge-conflict') }],
          media: { kind: 'loop', ...CLIP_MEDIA('merge-conflict'), label: '// KESİT · 0:38', alt: 'Merge Conflict kesiti: turuncu kız "Orange!" çığlığıyla metale dönüşüyor', stillAlt: 'Merge Conflict: turuncu metalci kız ve mavi diskocu kız gün doğumunda kol kola' },
        },
        {
          id: 'her-sabah-bastan', title: 'Her Sabah Baştan', titleLang: 'tr', kind: 'TÜRKÇE DÜET · 4:01',
          text: 'İnsanıyla her sabah ilk kez tanışan bir yapay zeka üzerine Türkçe düet; iki renkli serigrafi baskı gibi çizildi. Kesit: gece otobüsünde yapay zeka buğulu cama bir kalp çiziyor.',
          tech: CLIP_TECH,
          links: [{ label: "YOUTUBE'DA İZLE", href: 'https://www.youtube.com/watch?v=j-LT1IEJDvk' }, { label: 'KODU GÖR', href: CLIP_SRC('her-sabah-bastan') }],
          media: { kind: 'loop', ...CLIP_MEDIA('her-sabah-bastan'), label: '// KESİT · 2:30', alt: 'Her Sabah Baştan kesiti: gece otobüsünde yapay zeka buğulu cama kalp çiziyor', stillAlt: 'Her Sabah Baştan: bir insan ve bir yapay zeka yarım tonlu bir ayın önünde avuçlarını birleştiriyor' },
        },
        {
          id: 'vorathul-nerfed', title: 'Vorathul: NERFED', titleLang: 'en', kind: 'SENFONİK METAL · 4:33',
          text: 'Bir yamada nerf yiyen ve yaşadığı tablodan dışarı tırmanan son boss için senfonik metal marşı; grafik noir çizgi roman kesikleriyle. Kesit: ofis duvarındaki tablodan parçalar saçarak fırlıyor.',
          tech: CLIP_TECH,
          links: [{ label: "YOUTUBE'DA İZLE", href: 'https://www.youtube.com/watch?v=QUtyszbWdDg' }, { label: 'KODU GÖR', href: CLIP_SRC('vorathul-nerfed') }],
          media: { kind: 'loop', ...CLIP_MEDIA('vorathul-nerfed'), label: '// KESİT', alt: 'Vorathul: NERFED kesiti: son boss ofis duvarındaki tablodan fırlıyor', stillAlt: 'Vorathul: boyalı bir katedralde org borusu kanatlı mat siyah bir şövalye' },
        },
      ],
    },
    profile: {
      title: 'PROFİL',
      p1: "Ben Burak, Eskişehir'de yaşıyorum. Gemi makineleri okurken koda hiç dokunmamıştım. Bölümle yıldızım barışamayınca 2024'ün sonunda Unity'yi açtım ve bir daha kapatmadım. 2024'te gemi makinelerini bıraktım, 2025'te yatay geçişle Eskişehir'e geldim. Şimdi ESTÜ'de Bilgisayar Programcılığı son sınıftayım, Haziran 2027'de mezun oluyorum.",
      p2: 'İki işim var. Unity ve C# ile oyun yapıyorum; Python ve TypeScript ile yapay zeka ajanlarının kullandığı araçları yazıyorum. Mimariyi ben kuruyorum, kodu ajanlar yazıyor. Her işi ikinci bir ajan, ilkinin raporunu görmeden baştan denetliyor. Bulgu çıkarsa düzeltme de aynı denetimden geçiyor; sıfır bulgu gelmeden hiçbir şey yayına çıkmıyor.',
      card: '// ÇALIŞMA DÜZENİM: YAZ → KÖR DENETİM → DÜZELT → TEKRAR DENETLE',
      stats: [
        { n: '4', l: "birleştirilen açık kaynak PR'ı" },
        { n: '0', l: "Kâğıt Kart'taki asset dosyası" },
        { n: '2', l: 'alan: oyun ve ajan araçları' },
        { n: '2027', l: 'mezuniyet' },
      ],
      status: '// DURUM', workLabel: 'ÇALIŞMA DÜZENİM',
      steps: ['YAZ', 'KÖR DENETİM', 'DÜZELT', 'TEKRAR DENETLE'], loop: 'SIFIR BULGU GELMEDEN YAYIN YOK',
    },
    confidants: {
      title: 'SIRDAŞLAR',
      intro: "Başkalarının projelerine gönderdiğim ve birleşen PR'lar.", rankUp: 'RANK UP!', merged: 'BİRLEŞTİ', bond: ['BİRLEŞEN PR', 'PROJE'],
      repos: CONFIDANT_REPOS(true),
    },
    arsenal: {
      title: 'CEPHANELİK',
      note: '// GÖREVLERDE KULLANDIKLARIM', head: ['ALAN', 'ARAÇLAR', 'YAKINLIK'],
      rows: [
        { k: 'OYUN', tools: ['Unity', 'C#', 'Three.js'], aff: 'ANA İŞ', main: true, note: 'Kâğıt Kart · Workday Loop' },
        { k: 'AJANLAR', tools: ['Python', 'TypeScript', 'MCP', 'Claude Code', 'Codex'], aff: 'ANA İŞ', main: true, note: 'Gamachine · codex-delegate' },
        { k: 'BACKEND', tools: ['Python', 'FastAPI'], aff: 'GÖREVDE', note: 'Gamachine' },
        { k: 'WEB', tools: ['React', 'TypeScript', 'Next.js 16'], aff: 'GÖREVDE', note: 'Gamachine · Ristorante Stellato' },
        { k: 'MASAÜSTÜ', tools: ['Electron'], aff: 'GÖREVDE', note: 'Gamachine' },
        { k: 'VERİ', tools: ['MongoDB'], aff: 'GÖREVDE', note: 'Ristorante Stellato' },
      ],
      weak: { k: 'ZAYIF', v: 'Flutter', note: '// şimdilik' },
    },
    calendar: {
      title: 'TAKVİM',
      rows: [
        { date: 'EYL 2026 →', m: 'EYL', y: '2026', title: 'Eczacıbaşı VitrA (İME)', text: 'Stajyer, Dijital Tasarım', now: true },
        { date: '2025 → HAZ 2027', m: '→ HAZ 27', y: '2025', title: 'Eskişehir Teknik Üniversitesi', text: 'Bilgisayar Programcılığı (ön lisans), son sınıf' },
        { date: 'MAY 2025', m: 'MAY', y: '2025', title: 'İstanbul Arı Bilgi', text: 'Yazılım Uzmanlığı (C#) ve İleri JavaScript eğitimlerini bitirdim.' },
        { date: '2024 SONU', m: 'SONU', y: '2024', title: 'İlk satır', text: "Unity'yi açtım, C#'ı oyun yaparak öğrendim." },
        { date: '2021 → 2024', m: '→ 2024', y: '2021', title: 'Gemi Makineleri Mühendisliği', text: "Lisans, 2024'te bıraktım; 2025'te yatay geçişle ESTÜ. Koda hiç dokunmadığım yıllar. Bölümle yıldızım barışmadı; çıkışı yazılımda buldum." },
      ],
    },
    contact: {
      title: 'BİR GÖREVİN Mİ VAR?',
      robot: 'Oyun, ajan aracı ya da ikisinin arası. Yaz, okuyorum.',
      button: 'CALLING CARD GÖNDER',
      pitch: '// SON CANAVAR BOŞ BİR GELEN KUTUSUDUR',
      others: 'Diğer kanallar',
      footer: '© 2026 Burak Erdemci · Stille tasarlandı. Hiçbir soygun gerçekleştirilmedi.',
      chat: 'GÖREV HATTI', sender: 'BURAK', reward: 'CALLING CARD', rewardSub: 'E-POSTA UYGULAMAN AÇILIYOR',
    },
    sr: { opened: (s) => `${s} açıldı`, menu: 'Ana menü' },
  },
  en: {
    hud: {
      plain: 'PLAIN VIEW', plainAria: 'Plain view: all content on one page, no animation',
      menu: 'MENU', langGroup: 'Language', cvAria: 'CV (English, PDF)', skip: 'SKIP', quick: 'Quick access',
      email: 'EMAIL', back: 'BACK TO MENU',
    },
    hint: '↑↓ SELECT · ENTER OPEN · ESC MENU',
    name: {
      label: '// GAME DEVELOPER · I BUILD TOOLS FOR AI AGENTS',
      chipA: 'I MAKE GAMES', chipB: '& THE TOOLS AGENTS USE',
      loc: 'ESKİŞEHİR, TR · OPEN TO REMOTE WORK AND RELOCATION',
    },
    items: {
      profile: { label: 'PROFILE', caption: 'Who I am and how I work.' },
      missions: { label: 'MISSIONS', caption: 'Games and agent tools: five missions.' },
      confidants: { label: 'CONFIDANTS', caption: "4 PRs merged into other people's projects." },
      arsenal: { label: 'ARSENAL', caption: 'What I use to build games and agent tools.' },
      showtime: { label: 'SHOWTIME', caption: 'Three music videos, every visual event locked to a measured beat.' },
      calendar: { label: 'CALENDAR', caption: '2021 → now.' },
      contact: { label: 'CONTACT', caption: 'Got a mission?' },
    },
    missions: {
      title: 'MISSIONS', sub: '// 02 · SELECT A MISSION', detailLabel: 'Mission details',
      list: [
        {
          id: 'gamachine', title: 'Gamachine', titleLang: 'en', kind: 'AI GAME STUDIO · FLAGSHIP', status: 'INFILTRATION ONGOING (v4)',
          text: "An AI game studio for Unity. It runs Claude Code, Codex, Antigravity, Copilot, Cursor and OpenCode in one desktop app and drives the Unity Editor live over MCP. Latest release v3.2. I'm building v4 now.",
          tech: GAMACHINE_TECH,
          links: [{ label: 'DOWNLOAD', href: 'https://github.com/BurakErdemci/gamachine/releases' }, { label: 'VIEW CODE', href: REPO('gamachine') }],
          media: { kind: 'loop', src: '/media/gamachine-loop.webp', poster: '/media/gamachine-still.webp', label: '// v4 TRAILER', alt: 'Footage from the Gamachine v4 trailer' },
        },
        {
          id: 'kagit', title: 'Kâğıt Kart', titleLang: 'tr', kind: 'BROWSER GAME · THREE.JS', status: 'TREASURE SECURED',
          text: 'A kart racer inside a pop-up book. The repo holds no image, sound or model files; code generates every page, letter and note of music. I started it as an experiment and it became my most-starred project.',
          links: [{ label: 'PLAY IN BROWSER', href: 'https://burakerdemci.github.io/kagit-kart/' }, { label: 'VIEW CODE', href: REPO('kagit-kart') }],
          media: { kind: 'loop', src: '/media/kagit-loop.webp', poster: '/media/kagit-still.webp', label: '// GAMEPLAY', alt: 'Kâğıt Kart gameplay: the pop-up book opens to the race menu, then the paper fox drifts through Bosphorus Night with sparks under its wheels', stillAlt: 'Kâğıt Kart: the paper fox racing through Bosphorus Night at dusk' },
        },
        {
          id: 'codex', title: 'codex-delegate', titleLang: 'en', kind: 'DEVELOPER TOOL · CLAUDE CODE PLUGIN',
          text: 'Claude stays the architect and reviewer while Codex workers write the code. Every finding arrives with a proof you can run. I build this site with the same setup.',
          links: [{ label: 'VIEW CODE', href: REPO('codex-delegate') }],
          media: { kind: 'lanes', arch: ['CLAUDE', 'ARCHITECT'], lane: 'CODEX', review: ['REVIEW', 'A PROOF YOU CAN RUN'] },
        },
        {
          id: 'ristorante', title: 'Ristorante Stellato', titleLang: 'en', kind: 'WEB · EARLY WORK',
          text: 'A reservation system I built for a restaurant with Next.js 16 and MongoDB. Guests pick their table from the floor plan, the admin panel sits behind auth, 53 tests.',
          links: [{ label: 'LIVE DEMO', href: 'https://ristorante-stellato-puum.vercel.app' }],
          media: { kind: 'shots', srcs: ['/media/ristorante-1.webp', '/media/ristorante-2.webp'], label: '// SCREENS' },
        },
        {
          id: 'workday', title: 'Workday Loop', titleLang: 'en', kind: 'UNITY 2D · EARLY WORK',
          text: 'A psychological thriller. We made it as a team; I owned level design and narrative.',
          links: [{ label: 'PLAY (ITCH.IO)', href: 'https://burakerdemci.itch.io/workdayloop' }],
          media: { kind: 'shots', srcs: ['/media/workday-1.webp', '/media/workday-2.webp'], label: '// IN-GAME FRAMES' },
        },
      ],
    },
    showtime: {
      title: 'SHOWTIME', sub: '// 05 · SELECT A TRACK', detailLabel: 'Track details',
      list: [
        {
          id: 'merge-conflict', title: 'Merge Conflict', titleLang: 'en', kind: 'KAWAII HEAVY-METAL DISCO · 3:52',
          text: 'A kawaii heavy-metal disco battle of two girls over one line of code, until "accept both changes" turns the spotlight into a gradient. Excerpt: on "Blue! Orange!" the orange girl turns metal on her own shout.',
          tech: CLIP_TECH,
          links: [{ label: 'WATCH ON YOUTUBE', href: 'https://www.youtube.com/watch?v=J37b5WfH-7w' }, { label: 'VIEW CODE', href: CLIP_SRC('merge-conflict') }],
          media: { kind: 'loop', ...CLIP_MEDIA('merge-conflict'), label: '// EXCERPT · 0:38', alt: 'Merge Conflict excerpt: the orange girl turns metal on her own shout of "Orange!"', stillAlt: 'Merge Conflict: the orange metal girl and the blue disco girl walk arm in arm at sunrise' },
        },
        {
          id: 'her-sabah-bastan', title: 'Her Sabah Baştan', titleLang: 'tr', kind: 'TURKISH DUET · 4:01',
          text: 'A Turkish duet about an AI that meets its human for the first time every morning, drawn as a two-colour silk-screen print. Excerpt: on a night bus, the AI draws a heart in the fogged glass.',
          tech: CLIP_TECH,
          links: [{ label: 'WATCH ON YOUTUBE', href: 'https://www.youtube.com/watch?v=j-LT1IEJDvk' }, { label: 'VIEW CODE', href: CLIP_SRC('her-sabah-bastan') }],
          media: { kind: 'loop', ...CLIP_MEDIA('her-sabah-bastan'), label: '// EXCERPT · 2:30', alt: 'Her Sabah Baştan excerpt: on a night bus the AI draws a heart in the fogged window', stillAlt: 'Her Sabah Baştan: a human and an AI press palms on a halftone moon' },
        },
        {
          id: 'vorathul-nerfed', title: 'Vorathul: NERFED', titleLang: 'en', kind: 'SYMPHONIC METAL · 4:33',
          text: 'A symphonic metal anthem of a final boss who is nerfed in a patch and climbs out of the painting he lives in, told in graphic noir comic cut-outs. Excerpt: he bursts out of the painting on the office wall.',
          tech: CLIP_TECH,
          links: [{ label: 'WATCH ON YOUTUBE', href: 'https://www.youtube.com/watch?v=QUtyszbWdDg' }, { label: 'VIEW CODE', href: CLIP_SRC('vorathul-nerfed') }],
          media: { kind: 'loop', ...CLIP_MEDIA('vorathul-nerfed'), label: '// EXCERPT', alt: 'Vorathul: NERFED excerpt: the final boss bursts out of the painting on the office wall', stillAlt: 'Vorathul: a matte black knight with organ-pipe wings in a painted cathedral' },
        },
      ],
    },
    profile: {
      title: 'PROFILE',
      p1: "I'm Burak, based in Eskişehir. I studied marine engineering and had never written a line of code. The degree and I never got along, so at the end of 2024 I opened Unity and kept going. I left marine engineering in 2024 and transferred to Eskişehir in 2025. Now I'm in my final year of Computer Programming at ESTÜ, graduating in June 2027.",
      p2: "I work in two areas. I make games with Unity and C#, and I build the tools AI agents use with Python and TypeScript. I design the architecture and agents write the code. A second agent audits every change without seeing the first one's report. If it finds something, the fix goes through the same audit, and nothing ships until a round comes back with zero findings.",
      card: '// HOW I WORK: WRITE → BLIND AUDIT → FIX → AUDIT AGAIN',
      stats: [
        { n: '4', l: 'merged open-source PRs' },
        { n: '0', l: 'asset files in Kâğıt Kart' },
        { n: '2', l: 'fields: games and agent tools' },
        { n: '2027', l: 'graduation' },
      ],
      status: '// STATUS', workLabel: 'HOW I WORK',
      steps: ['WRITE', 'BLIND AUDIT', 'FIX', 'AUDIT AGAIN'], loop: 'NOTHING SHIPS BEFORE ZERO FINDINGS',
    },
    confidants: {
      title: 'CONFIDANTS',
      intro: "PRs I sent to other people's projects that got merged.", rankUp: 'RANK UP!', merged: 'MERGED', bond: ['MERGED PRS', 'PROJECTS'],
      repos: CONFIDANT_REPOS(false),
    },
    arsenal: {
      title: 'ARSENAL',
      note: '// WHAT THE MISSIONS RUN ON', head: ['FIELD', 'TOOLS', 'AFFINITY'],
      rows: [
        { k: 'GAMES', tools: ['Unity', 'C#', 'Three.js'], aff: 'MAIN', main: true, note: 'Kâğıt Kart · Workday Loop' },
        { k: 'AGENTS', tools: ['Python', 'TypeScript', 'MCP', 'Claude Code', 'Codex'], aff: 'MAIN', main: true, note: 'Gamachine · codex-delegate' },
        { k: 'BACKEND', tools: ['Python', 'FastAPI'], aff: 'ON A MISSION', note: 'Gamachine' },
        { k: 'WEB', tools: ['React', 'TypeScript', 'Next.js 16'], aff: 'ON A MISSION', note: 'Gamachine · Ristorante Stellato' },
        { k: 'DESKTOP', tools: ['Electron'], aff: 'ON A MISSION', note: 'Gamachine' },
        { k: 'DATA', tools: ['MongoDB'], aff: 'ON A MISSION', note: 'Ristorante Stellato' },
      ],
      weak: { k: 'WEAK', v: 'Flutter', note: '// for now' },
    },
    calendar: {
      title: 'CALENDAR',
      rows: [
        { date: 'SEP 2026 →', m: 'SEP', y: '2026', title: 'Eczacıbaşı VitrA (İME)', text: 'Intern, Digital Design', now: true },
        { date: '2025 → JUN 2027', m: '→ JUN 27', y: '2025', title: 'Eskişehir Technical University', text: 'Computer Programming (associate degree), final year' },
        { date: 'MAY 2025', m: 'MAY', y: '2025', title: 'İstanbul Arı Bilgi', text: 'Finished the Software Specialist (C#) and Advanced JavaScript courses.' },
        { date: 'LATE 2024', m: 'LATE', y: '2024', title: 'First line', text: 'I opened Unity and learned C# by making games.' },
        { date: '2021 → 2024', m: '→ 2024', y: '2021', title: 'Marine Engineering', text: 'BSc, left in 2024; transferred to ESTÜ in 2025. Years I never touched code. The degree and I never got along, and I found my way out through software.' },
      ],
    },
    contact: {
      title: 'GOT A MISSION?',
      robot: 'A game, an agent tool, or something in between. Write to me, I read everything.',
      button: 'SEND A CALLING CARD',
      pitch: '// THE FINAL BOSS IS AN EMPTY INBOX',
      others: 'Other channels',
      footer: '© 2026 Burak Erdemci · Designed with style. No heists were committed.',
      chat: 'MISSION LINE', sender: 'BURAK', reward: 'CALLING CARD', rewardSub: 'OPENING YOUR MAIL APP',
    },
    sr: { opened: (s) => `${s} opened`, menu: 'Main menu' },
  },
};
