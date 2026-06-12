import { useState, useEffect } from 'react';
import { 
  Settings, LogOut, Plus, Trash2, Save, Upload, ArrowLeft, 
  Check, FileText, Image as ImageIcon, ChevronUp, ChevronDown, RefreshCw 
} from 'lucide-react';
import { content as localContent } from '../data/content';
import type { LangContent, Project, TimelineItem } from '../data/content';

interface AdminPanelProps {
  onBack: () => void;
}

const OWNER = 'BurakErdemci';
const REPO = 'BurakErdemci.github.io';
const CONTENT_PATH = 'portfolio-react/src/data/content.ts';

interface TextKeyInfo {
  key: keyof LangContent;
  label: string;
  isTextarea?: boolean;
}

const EDITABLE_TEXT_KEYS: readonly TextKeyInfo[] = [
  { key: 'heroStatus', label: 'Kahraman Durumu / Hero Status' },
  { key: 'heroSubtitle', label: 'Kahraman Alt Başlığı / Hero Subtitle' },
  { key: 'aboutLabel', label: 'Hakkımda Etiketi / About Label' },
  { key: 'aboutTitle', label: 'Hakkımda Başlığı / About Title' },
  { key: 'aboutText', label: 'Hakkımda Paragrafı / About Bio', isTextarea: true },
  { key: 'status', label: 'Durum Bilgisi / Status Chip' },
  { key: 'role', label: 'Rol - Ünvan / Role' },
  { key: 'skillsLabel', label: 'Yetenekler Etiketi / Skills Label' },
  { key: 'skillsTitle', label: 'Yetenekler Başlığı / Skills Title' },
  { key: 'projectsLabel', label: 'Projeler Etiketi / Projects Label' },
  { key: 'projectsTitle', label: 'Projeler Başlığı / Projects Title' },
  { key: 'timelineLabel', label: 'Deneyim Etiketi / Timeline Label' },
  { key: 'timelineTitle', label: 'Deneyim Başlığı / Timeline Title' },
  { key: 'contactLabel', label: 'İletişim Etiketi / Contact Label' },
  { key: 'contactTitle', label: 'İletişim Başlığı / Contact Title' },
  { key: 'contactText', label: 'İletişim Alt Başlığı / Contact Subtitle', isTextarea: true }
];

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [token, setToken] = useState(() => localStorage.getItem('burak_pat') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Core content state (local copy loaded initially)
  const [data, setData] = useState<Record<'tr' | 'en', LangContent>>(localContent);
  const [activeTab, setActiveTab] = useState<'texts' | 'skills' | 'projects' | 'timeline' | 'files'>('texts');

  // Saving / Publishing states
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState('update: portfolio content via admin panel');
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({ type: null, msg: '' });

  // File states (CV & Image uploads)
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvStatus, setCvStatus] = useState('');
  const [isUploadingCv, setIsUploadingCv] = useState(false);

  // Verify token on mount or token state change
  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, []);

  async function verifyToken(pat: string) {
    setIsVerifying(true);
    setLoginError('');
    try {
      const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${CONTENT_PATH}`, {
        headers: {
          'Authorization': `token ${pat}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (res.ok) {
        localStorage.setItem('burak_pat', pat);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('burak_pat');
        setLoginError('Geçersiz GitHub Token veya yetki yetersiz.');
      }
    } catch {
      setLoginError('Bağlantı hatası oluştu.');
    } finally {
      setIsVerifying(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (token.trim()) {
      verifyToken(token.trim());
    }
  }

  function handleLogout() {
    localStorage.removeItem('burak_pat');
    setToken('');
    setIsLoggedIn(false);
  }

  // File conversion helper
  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const res = reader.result as string;
      resolve(res.substring(res.indexOf(',') + 1));
    };
    reader.onerror = error => reject(error);
  });

  // CV Upload logic
  async function handleCvUpload() {
    if (!cvFile) return;
    setIsUploadingCv(true);
    setCvStatus('CV dosyası yükleniyor...');
    try {
      // 1. Fetch existing file to get SHA if it exists
      let sha = '';
      const getRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/Burak_Erdemci_CV.pdf`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }

      // 2. Base64 encode the PDF file
      const base64Data = await toBase64(cvFile);

      // 3. Upload to GitHub
      const putRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/Burak_Erdemci_CV.pdf`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: 'upload: Burak_Erdemci_CV.pdf via admin panel',
          content: base64Data,
          sha: sha || undefined
        })
      });

      if (putRes.ok) {
        setCvStatus('CV Başarıyla Yüklendi! Değişiklikler birkaç dakika içinde canlıya geçecektir.');
        setCvFile(null);
      } else {
        const errData = await putRes.json();
        setCvStatus(`Yükleme hatası: ${errData.message}`);
      }
    } catch {
      setCvStatus('Yükleme sırasında teknik bir hata oluştu.');
    } finally {
      setIsUploadingCv(false);
    }
  }

  // Project Image Upload Logic
  async function handleProjectImageUpload(projectIndex: number, file: File) {
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const finalPath = `images/uploaded-${Date.now()}-${cleanFileName}`;
      
      const base64Data = await toBase64(file);

      const putRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${finalPath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `upload: project image ${cleanFileName} via admin panel`,
          content: base64Data
        })
      });

      if (putRes.ok) {
        // Update images in both languages (or just the current one? Better both since it's the same project asset)
        setData(prev => {
          const updated = { ...prev };
          const trProj = { ...updated.tr.projects[projectIndex] };
          const enProj = { ...updated.en.projects[projectIndex] };
          trProj.images = [...trProj.images, finalPath];
          enProj.images = [...enProj.images, finalPath];
          updated.tr.projects[projectIndex] = trProj;
          updated.en.projects[projectIndex] = enProj;
          return updated;
        });
      } else {
        alert('Görsel yüklenirken GitHub API hata döndürdü.');
      }
    } catch {
      alert('Görsel yüklenemedi.');
    }
  }

  // Publish content.ts
  async function handlePublish() {
    setIsPublishing(true);
    setPublishStatus({ type: null, msg: '' });
    try {
      // 1. Fetch file to get current SHA
      const getRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${CONTENT_PATH}`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (!getRes.ok) {
        throw new Error('Dosya SHA değeri alınamadı.');
      }
      const fileData = await getRes.json();
      const sha = fileData.sha;

      // 2. Build Content TS String
      const serialized = `export interface Project {
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

export const content: Record<'tr' | 'en', LangContent> = ${JSON.stringify(data, null, 2)};
`;

      // 3. Base64 encode file content
      // Use btoa escape characters safely for utf-8
      const encodedContent = btoa(unescape(encodeURIComponent(serialized)));

      // 4. PUT update back to GitHub
      const putRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${CONTENT_PATH}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: publishMessage.trim() || 'update: content via admin panel',
          content: encodedContent,
          sha: sha
        })
      });

      if (putRes.ok) {
        setPublishStatus({
          type: 'success',
          msg: 'Başarıyla Yayınlandı! Değişiklikler 1-2 dakika içinde canlı sitede aktif olacaktır.'
        });
      } else {
        const errData = await putRes.json();
        setPublishStatus({
          type: 'error',
          msg: `Hata oluştu: ${errData.message}`
        });
      }
    } catch (e: unknown) {
      setPublishStatus({
        type: 'error',
        msg: (e as Error).message || 'Yayınlama sırasında bir bağlantı hatası oluştu.'
      });
    } finally {
      setIsPublishing(false);
    }
  }

  // Dynamic input helper
  function updateTextVal(lang: 'tr' | 'en', key: keyof LangContent, val: string) {
    setData(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: val
      }
    }));
  }

  // Project item edit helpers
  function updateProjectField(projectIndex: number, field: keyof Project, val: string | string[]) {
    setData(prev => {
      const updated = { ...prev };
      updated.tr.projects[projectIndex] = { ...updated.tr.projects[projectIndex], [field]: val };
      updated.en.projects[projectIndex] = { ...updated.en.projects[projectIndex], [field]: val };
      return updated;
    });
  }

  function updateProjectFieldLang(lang: 'tr' | 'en', projectIndex: number, field: keyof Project, val: string) {
    setData(prev => {
      const updated = { ...prev };
      updated[lang].projects[projectIndex] = { ...updated[lang].projects[projectIndex], [field]: val };
      return updated;
    });
  }

  function addProject() {
    const newProj: Project = {
      title: 'Yeni Proje',
      brief: 'Kısa Açıklama',
      tag: 'Kategori Etiketi',
      link: '#',
      detail: 'Proje detayları (Markdown formatında yazabilirsiniz).',
      tech: ['React'],
      images: []
    };
    setData(prev => ({
      tr: { ...prev.tr, projects: [...prev.tr.projects, { ...newProj, title: 'Yeni Proje (TR)' }] },
      en: { ...prev.en, projects: [...prev.en.projects, { ...newProj, title: 'New Project (EN)' }] }
    }));
  }

  function deleteProject(index: number) {
    if (!confirm('Bu projeyi tamamen silmek istediğinizden emin misiniz?')) return;
    setData(prev => ({
      tr: { ...prev.tr, projects: prev.tr.projects.filter((_, i) => i !== index) },
      en: { ...prev.en, projects: prev.en.projects.filter((_, i) => i !== index) }
    }));
  }

  function moveProject(index: number, dir: 'up' | 'down') {
    const targetIdx = dir === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= data.tr.projects.length) return;

    setData(prev => {
      const trList = [...prev.tr.projects];
      const enList = [...prev.en.projects];

      const tempTr = trList[index];
      trList[index] = trList[targetIdx];
      trList[targetIdx] = tempTr;

      const tempEn = enList[index];
      enList[index] = enList[targetIdx];
      enList[targetIdx] = tempEn;

      return {
        tr: { ...prev.tr, projects: trList },
        en: { ...prev.en, projects: enList }
      };
    });
  }

  // Skills helpers
  function addSkillTag(category: string, tagName: string) {
    if (!tagName.trim()) return;
    setData(prev => {
      const updated = { ...prev };
      const trSkills = { ...updated.tr.skills };
      const enSkills = { ...updated.en.skills };

      trSkills[category] = [...(trSkills[category] || []), tagName];
      enSkills[category] = [...(enSkills[category] || []), tagName];

      updated.tr.skills = trSkills;
      updated.en.skills = enSkills;
      return updated;
    });
  }

  function deleteSkillTag(category: string, tagIdx: number) {
    setData(prev => {
      const updated = { ...prev };
      const trSkills = { ...updated.tr.skills };
      const enSkills = { ...updated.en.skills };

      trSkills[category] = trSkills[category].filter((_, i) => i !== tagIdx);
      enSkills[category] = enSkills[category].filter((_, i) => i !== tagIdx);

      updated.tr.skills = trSkills;
      updated.en.skills = enSkills;
      return updated;
    });
  }

  function addSkillCategory(catName: string) {
    if (!catName.trim() || data.tr.skills[catName]) return;
    setData(prev => {
      const updated = { ...prev };
      updated.tr.skills = { ...updated.tr.skills, [catName]: [] };
      updated.en.skills = { ...updated.en.skills, [catName]: [] };
      return updated;
    });
  }

  function deleteSkillCategory(catName: string) {
    if (!confirm(`"${catName}" kategorisini tamamen silmek istiyor musunuz?`)) return;
    setData(prev => {
      const updated = { ...prev };
      const trSkills = { ...updated.tr.skills };
      const enSkills = { ...updated.en.skills };
      delete trSkills[catName];
      delete enSkills[catName];
      updated.tr.skills = trSkills;
      updated.en.skills = enSkills;
      return updated;
    });
  }

  // Timeline helpers
  function updateTimelineItem(index: number, field: keyof TimelineItem, val: string) {
    setData(prev => {
      const updated = { ...prev };
      updated.tr.timeline[index] = { ...updated.tr.timeline[index], [field]: val };
      updated.en.timeline[index] = { ...updated.en.timeline[index], [field]: val };
      return updated;
    });
  }

  function updateTimelineItemLang(lang: 'tr' | 'en', index: number, field: keyof TimelineItem, val: string) {
    setData(prev => {
      const updated = { ...prev };
      updated[lang].timeline[index] = { ...updated[lang].timeline[index], [field]: val };
      return updated;
    });
  }

  function addTimelineItem() {
    const newItem: TimelineItem = {
      date: '2026',
      title: 'Yeni Deneyim / Pozisyon',
      subtitle: 'Şirket / Kurum',
      text: 'Gereksinimler ve açıklamalar buraya yazılır.'
    };
    setData(prev => ({
      tr: { ...prev.tr, timeline: [newItem, ...prev.tr.timeline] },
      en: { ...prev.en, timeline: [newItem, ...prev.en.timeline] }
    }));
  }

  function deleteTimelineItem(index: number) {
    if (!confirm('Bu deneyimi listeden çıkarmak istediğinize emin misiniz?')) return;
    setData(prev => ({
      tr: { ...prev.tr, timeline: prev.tr.timeline.filter((_, i) => i !== index) },
      en: { ...prev.en, timeline: prev.en.timeline.filter((_, i) => i !== index) }
    }));
  }

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="logo-center">BE.</div>
          <h2>YÖNETİM PANELİ GİRİŞİ</h2>
          <p className="desc">Lütfen devam etmek için GitHub Personal Access Token (PAT) giriniz.</p>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>GitHub Personal Access Token (PAT)</label>
              <input 
                type="password" 
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxx" 
                value={token}
                onChange={e => setToken(e.target.value)}
                required
              />
            </div>
            {loginError && <div className="login-error">{loginError}</div>}
            
            <button type="submit" disabled={isVerifying} className="btn-primary-admin w-full">
              {isVerifying ? <span className="flex-center"><RefreshCw className="animate-spin mr-2" size={16}/> Doğrulanıyor...</span> : 'Giriş Yap'}
            </button>
          </form>
          
          <button onClick={onBack} className="btn-secondary-admin w-full mt-4">
            <ArrowLeft className="mr-2" size={16}/> Portfolyoya Dön
          </button>
        </div>
      </div>
    );
  }

  // LOGGED IN SCREEN
  return (
    <div className="admin-layout">
      {/* Top Header */}
      <header className="admin-topbar">
        <div className="title-area">
          <span className="logo-mini">BE.</span>
          <h1>PORTFOLYO KONTROL PANELİ</h1>
        </div>
        <div className="actions-area">
          <button onClick={onBack} className="btn-secondary-admin">
            <ArrowLeft size={16} className="mr-2"/> Siteyi Gör
          </button>
          <button onClick={handleLogout} className="btn-secondary-admin border-red">
            <LogOut size={16} className="mr-2"/> Çıkış Yap
          </button>
        </div>
      </header>

      <div className="admin-body">
        {/* Left Sidebar Menu */}
        <aside className="admin-sidebar">
          <button 
            className={`sidebar-btn ${activeTab === 'texts' ? 'active' : ''}`}
            onClick={() => setActiveTab('texts')}
          >
            <Settings size={18}/> <span>Genel Metinler</span>
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <Check size={18}/> <span>Teknik Yetenekler</span>
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <ImageIcon size={18}/> <span>Projeler (Missions)</span>
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <FileText size={18}/> <span>Zaman Tüneli</span>
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'files' ? 'active' : ''}`}
            onClick={() => setActiveTab('files')}
          >
            <Upload size={18}/> <span>CV & Dosya Yükleme</span>
          </button>

          {/* Quick Publish Area */}
          <div className="publish-widget">
            <h3>Yayınlama Merkezi</h3>
            <textarea 
              placeholder="Commit mesajı..."
              value={publishMessage}
              onChange={e => setPublishMessage(e.target.value)}
            />
            <button 
              onClick={handlePublish} 
              disabled={isPublishing} 
              className="btn-primary-admin w-full"
            >
              {isPublishing ? <RefreshCw className="animate-spin mr-2" size={16}/> : <Save size={16} className="mr-2"/>}
              Değişiklikleri Yayınla
            </button>
            {publishStatus.type && (
              <div className={`publish-status ${publishStatus.type}`}>
                {publishStatus.msg}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-content">
          
          {/* TAB 1: TEXTS */}
          {activeTab === 'texts' && (
            <div className="tab-section">
              <h2>Genel Metinler ve Çeviriler</h2>
              <p className="tab-desc">Sitenin genelindeki tüm anahtar kelimeleri ve metinleri TR ve EN olarak düzenleyebilirsiniz.</p>
              
              <div className="texts-grid">
                {EDITABLE_TEXT_KEYS.map(({ key, label, isTextarea }) => (
                  <div key={key} className="text-field-pair">
                    <h3>{label}</h3>
                    <div className="dual-inputs">
                      <div className="input-tr">
                        <span className="lang-tag">TR</span>
                        {isTextarea ? (
                          <textarea 
                            value={data.tr[key] as string}
                            onChange={e => updateTextVal('tr', key, e.target.value)}
                          />
                        ) : (
                          <input 
                            type="text"
                            value={data.tr[key] as string}
                            onChange={e => updateTextVal('tr', key, e.target.value)}
                          />
                        )}
                      </div>
                      <div className="input-en">
                        <span className="lang-tag">EN</span>
                        {isTextarea ? (
                          <textarea 
                            value={data.en[key] as string}
                            onChange={e => updateTextVal('en', key, e.target.value)}
                          />
                        ) : (
                          <input 
                            type="text"
                            value={data.en[key] as string}
                            onChange={e => updateTextVal('en', key, e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS */}
          {activeTab === 'skills' && (
            <div className="tab-section">
              <h2>Teknik Yetenekler (Skills)</h2>
              <p className="tab-desc">Arsenal kısmında görüntülenecek yetenek kategorilerini ve içerisindeki etiketleri yönetin.</p>
              
              <div className="skills-editor-wrapper">
                <div className="add-category-bar">
                  <input 
                    type="text" 
                    id="new-cat-input" 
                    placeholder="Yeni Kategori Adı (Örn: DevOps)"
                  />
                  <button 
                    onClick={() => {
                      const input = document.getElementById('new-cat-input') as HTMLInputElement;
                      if (input && input.value.trim()) {
                        addSkillCategory(input.value.trim());
                        input.value = '';
                      }
                    }} 
                    className="btn-primary-admin"
                  >
                    Kategori Ekle
                  </button>
                </div>

                <div className="categories-grid">
                  {Object.entries(data.tr.skills).map(([category, tags]) => (
                    <div key={category} className="category-card">
                      <div className="card-head">
                        <h4>{category}</h4>
                        <button 
                          onClick={() => deleteSkillCategory(category)} 
                          className="btn-danger-icon"
                          title="Kategoriyi Sil"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                      
                      <div className="tags-list">
                        {tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="skill-tag-pill">
                            {tag}
                            <button onClick={() => deleteSkillTag(category, tagIdx)}>&times;</button>
                          </span>
                        ))}
                      </div>

                      <div className="add-tag-box">
                        <input 
                          type="text"
                          id={`new-tag-${category}`}
                          placeholder="Yeni yetenek..."
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              const input = e.currentTarget;
                              addSkillTag(category, input.value);
                              input.value = '';
                            }
                          }}
                        />
                        <button 
                          onClick={() => {
                            const input = document.getElementById(`new-tag-${category}`) as HTMLInputElement;
                            if (input) {
                              addSkillTag(category, input.value);
                              input.value = '';
                            }
                          }}
                          className="btn-secondary-admin py-1 px-2 text-xs"
                        >
                          Ekle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="tab-section">
              <div className="section-header-row">
                <h2>Missions (Projeler)</h2>
                <button onClick={addProject} className="btn-primary-admin">
                  <Plus size={16} className="mr-1"/> Yeni Proje Ekle
                </button>
              </div>
              <p className="tab-desc">Portfolyoda listelenen projeleri düzenleyin, sıralayın veya yenilerini ekleyin.</p>

              <div className="projects-list-stack">
                {data.tr.projects.map((proj, idx) => {
                  const enProj = data.en.projects[idx] || proj;
                  return (
                    <div key={idx} className="project-editor-card">
                      <div className="card-topbar">
                        <div className="project-title-meta">
                          <span className="index">#{idx + 1}</span>
                          <span className="title">{proj.title}</span>
                          <span className="tag-pill">{proj.tag}</span>
                        </div>
                        <div className="reorder-actions">
                          <button onClick={() => moveProject(idx, 'up')} disabled={idx === 0} title="Yukarı Taşı">
                            <ChevronUp size={16}/>
                          </button>
                          <button onClick={() => moveProject(idx, 'down')} disabled={idx === data.tr.projects.length - 1} title="Aşağı Taşı">
                            <ChevronDown size={16}/>
                          </button>
                          <button onClick={() => deleteProject(idx)} className="btn-danger-icon" title="Projeyi Sil">
                            <Trash2 size={16}/>
                          </button>
                        </div>
                      </div>

                      <div className="editor-card-body">
                        {/* Two Columns: Core Info & Markdown Details */}
                        <div className="editor-grid-2">
                          <div className="left-meta-fields">
                            <div className="form-group-admin">
                              <label>Proje Linki (GitHub / itch.io)</label>
                              <input 
                                type="text"
                                value={proj.link}
                                onChange={e => updateProjectField(idx, 'link', e.target.value)}
                              />
                            </div>
                            <div className="form-group-admin">
                              <label>Proje Etiketi / Badge (Örn: GAME - FLAGSHIP)</label>
                              <input 
                                type="text"
                                value={proj.tag}
                                onChange={e => updateProjectField(idx, 'tag', e.target.value)}
                              />
                            </div>
                            <div className="form-group-admin">
                              <label>Kullanılan Teknolojiler (Virgülle ayırın)</label>
                              <input 
                                type="text"
                                value={proj.tech.join(', ')}
                                onChange={e => {
                                  const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                  updateProjectField(idx, 'tech', arr);
                                }}
                              />
                            </div>

                            {/* Image Upload for Project */}
                            <div className="project-images-box">
                              <label>Proje Görselleri</label>
                              <div className="images-thumb-row">
                                {proj.images.map((img, imgIdx) => (
                                  <div key={imgIdx} className="thumb-container">
                                    <span className="img-path" title={img}>{img.substring(img.lastIndexOf('/') + 1)}</span>
                                    <button 
                                      className="delete-thumb" 
                                      onClick={() => {
                                        const cleanImages = proj.images.filter((_, i) => i !== imgIdx);
                                        updateProjectField(idx, 'images', cleanImages);
                                      }}
                                    >
                                      &times;
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="file-upload-admin-box mt-2">
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  id={`proj-img-input-${idx}`}
                                  className="hidden-file-input"
                                  onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleProjectImageUpload(idx, file);
                                    }
                                  }}
                                />
                                <button 
                                  onClick={() => document.getElementById(`proj-img-input-${idx}`)?.click()} 
                                  className="btn-secondary-admin text-xs"
                                >
                                  <Upload size={12} className="mr-1"/> Görsel Yükle (.png/.jpg)
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="right-translations-fields">
                            <div className="form-group-admin">
                              <label>Proje Başlığı (TR)</label>
                              <input 
                                type="text"
                                value={proj.title}
                                onChange={e => updateProjectFieldLang('tr', idx, 'title', e.target.value)}
                              />
                            </div>
                            <div className="form-group-admin">
                              <label>Başlık (EN)</label>
                              <input 
                                type="text"
                                value={enProj.title}
                                onChange={e => updateProjectFieldLang('en', idx, 'title', e.target.value)}
                              />
                            </div>
                            
                            <div className="form-group-admin">
                              <label>Kısa Açıklama / Brief (TR)</label>
                              <input 
                                type="text"
                                value={proj.brief}
                                onChange={e => updateProjectFieldLang('tr', idx, 'brief', e.target.value)}
                              />
                            </div>
                            <div className="form-group-admin">
                              <label>Kısa Açıklama (EN)</label>
                              <input 
                                type="text"
                                value={enProj.brief}
                                onChange={e => updateProjectFieldLang('en', idx, 'brief', e.target.value)}
                              />
                            </div>

                            <div className="form-group-admin">
                              <label>Detaylı Açıklama / Markdown (TR)</label>
                              <textarea 
                                rows={6}
                                value={proj.detail}
                                onChange={e => updateProjectFieldLang('tr', idx, 'detail', e.target.value)}
                              />
                            </div>
                            <div className="form-group-admin">
                              <label>Detaylı Açıklama / Markdown (EN)</label>
                              <textarea 
                                rows={6}
                                value={enProj.detail}
                                onChange={e => updateProjectFieldLang('en', idx, 'detail', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="tab-section">
              <div className="section-header-row">
                <h2>Journey (Zaman Tüneli / Deneyimler)</h2>
                <button onClick={addTimelineItem} className="btn-primary-admin">
                  <Plus size={16} className="mr-1"/> Yeni Deneyim Ekle
                </button>
              </div>
              <p className="tab-desc">Zaman tünelindeki deneyim kartlarını yönetin.</p>

              <div className="timeline-stack-admin">
                {data.tr.timeline.map((item, idx) => {
                  const enItem = data.en.timeline[idx] || item;
                  return (
                    <div key={idx} className="timeline-item-admin-card">
                      <div className="card-head">
                        <span className="index">Adım #{idx + 1}</span>
                        <div className="reorder-actions">
                          <button onClick={() => deleteTimelineItem(idx)} className="btn-danger-icon" title="Sil">
                            <Trash2 size={16}/>
                          </button>
                        </div>
                      </div>
                      
                      <div className="timeline-card-inputs">
                        <div className="col-1">
                          <div className="form-group-admin">
                            <label>Tarih / Yıl Aralığı (Örn: 2024 - 2026)</label>
                            <input 
                              type="text"
                              value={item.date}
                              onChange={e => updateTimelineItem(idx, 'date', e.target.value)}
                            />
                          </div>
                          <div className="form-group-admin">
                            <label>Alt Başlık / Kurum (TR & EN Ortak)</label>
                            <input 
                              type="text"
                              value={item.subtitle}
                              onChange={e => updateTimelineItem(idx, 'subtitle', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-2-lang">
                          <div className="lang-col">
                            <span className="lang-badge">TR</span>
                            <div className="form-group-admin">
                              <label>Pozisyon Başlığı</label>
                              <input 
                                type="text"
                                value={item.title}
                                onChange={e => updateTimelineItemLang('tr', idx, 'title', e.target.value)}
                              />
                            </div>
                            <div className="form-group-admin">
                              <label>Açıklamalar</label>
                              <textarea 
                                rows={3}
                                value={item.text}
                                onChange={e => updateTimelineItemLang('tr', idx, 'text', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="lang-col">
                            <span className="lang-badge">EN</span>
                            <div className="form-group-admin">
                              <label>Job Title</label>
                              <input 
                                type="text"
                                value={enItem.title}
                                onChange={e => updateTimelineItemLang('en', idx, 'title', e.target.value)}
                              />
                            </div>
                            <div className="form-group-admin">
                              <label>Description Details</label>
                              <textarea 
                                rows={3}
                                value={enItem.text}
                                onChange={e => updateTimelineItemLang('en', idx, 'text', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: FILES */}
          {activeTab === 'files' && (
            <div className="tab-section">
              <h2>CV & Dosya Yükleme</h2>
              <p className="tab-desc">Repoda barınan statik dosyaları (örneğin CV PDF dosyasını) doğrudan buradan güncelleyebilirsiniz.</p>

              <div className="cv-uploader-card">
                <h3>Özgeçmiş (CV) Dosyasını Güncelle</h3>
                <p className="desc text-xs text-stone-400">
                  Dosyayı seçip "CV'yi Yükle" butonuna basın. Yüklenen dosya doğrudan repodaki **`Burak_Erdemci_CV.pdf`** dosyasının üzerine yazılacaktır.
                </p>

                <div className="upload-controls mt-4">
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) setCvFile(file);
                    }}
                  />
                  
                  <button 
                    onClick={handleCvUpload}
                    disabled={!cvFile || isUploadingCv}
                    className="btn-primary-admin mt-4"
                  >
                    {isUploadingCv ? <RefreshCw className="animate-spin mr-2" size={16}/> : <Upload size={16} className="mr-2"/>}
                    CV'yi Yükle
                  </button>
                </div>

                {cvStatus && (
                  <div className="upload-feedback-msg mt-4">
                    {cvStatus}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
