import { ExternalLink } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { content, type Project } from '../data/content'
import { useState } from 'react'
import { ProjectModal } from './ProjectModal'

function ProjectItem({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="reveal flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300 group w-full text-left"
    >
      <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.08] transition-colors">
        <ExternalLink size={18} className="text-[#666] group-hover:text-white transition-colors" />
      </div>
      <div>
        <h3 className="text-base font-medium text-white group-hover:text-[#ccc] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[#666] mt-1 leading-relaxed line-clamp-2">
          {project.brief}
        </p>
      </div>
    </button>
  )
}

export function Projects() {
  const { lang } = useTheme()
  const t = content[lang]

  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null)

  // Dynamically find the project in the current language's content
  const selectedProject = selectedProjectTitle 
    ? t.projects.find(p => p.title === selectedProjectTitle) 
    : null

  return (
    <section id="projects" className="py-32 bg-transparent">
      <div className="section-container">
        <h2 className="reveal text-5xl font-bold text-white mb-4 tracking-tighter">{t.projectsTitle}</h2>
        <p className="reveal text-base italic text-[#777] mb-20 tracking-widest">{t.projectsLabel} 🏗️</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
          {t.projects.map((project) => (
            <div key={project.title} className="flex justify-center">
              <ProjectItem 
                project={project} 
                onClick={() => setSelectedProjectTitle(project.title)} 
              />
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProjectTitle(null)} 
        />
      )}
    </section>
  )
}
