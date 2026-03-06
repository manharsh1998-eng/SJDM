import React, { useEffect, useMemo, useState } from 'react'
import { projects, siteContent } from '../data/site'

export default function Projects({ lang }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeProject, setActiveProject] = useState(null)
  const [comparisonValue, setComparisonValue] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
  const content = siteContent[lang] || siteContent.en

  const filters = useMemo(() => {
    const tags = [...new Set(projects.map(project => project.tag[lang]))]
    return [{ id: 'all', label: 'All' }, ...tags.map(tag => ({ id: tag, label: tag }))]
  }, [lang])

  const visibleProjects = projects.filter(project => (
    activeFilter === 'all' ? true : project.tag[lang] === activeFilter
  ))

  useEffect(() => {
    setActiveFilter('all')
  }, [lang])

  useEffect(() => {
    if (!activeProject) return

    const onEscape = event => {
      if (event.key === 'Escape') setActiveProject(null)
    }

    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onEscape)

    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onEscape)
    }
  }, [activeProject])

  const openProject = project => {
    setActiveProject(project)
    setComparisonValue(50)
    setActiveGalleryIndex(0)
  }

  const updateFromPointer = (clientX, rect) => {
    if (!rect.width) return
    const raw = ((clientX - rect.left) / rect.width) * 100
    const clamped = Math.min(100, Math.max(0, raw))
    setComparisonValue(Math.round(clamped))
  }

  const onComparePointerDown = event => {
    const container = event.currentTarget
    const rect = container.getBoundingClientRect()
    updateFromPointer(event.clientX, rect)
    setIsDragging(true)

    const onMove = moveEvent => {
      updateFromPointer(moveEvent.clientX, rect)
    }

    const onUp = () => {
      setIsDragging(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp, { once: true })
  }

  const activeGalleryImage = activeProject?.gallery?.[activeGalleryIndex] || activeProject?.image || ''

  return (
    <section id="projects" className="section alt">
      <div className="container">
        <div className="section__head">
          <h2>{content.projects.title}</h2>
          <div className="chip-group" role="tablist" aria-label={content.projects.filterLabel}>
            {filters.map(filter => (
              <button
                key={filter.id}
                type="button"
                className={`chip ${activeFilter === filter.id ? 'is-active' : ''}`}
                aria-selected={activeFilter === filter.id}
                role="tab"
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.id === 'all' ? (lang === 'pa' ? 'ਸਭ' : 'All') : filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="cards cards--projects">
          {visibleProjects.map(project => (
            <article key={project.title.en} className="card project">
              <div className="project__thumb">
                <img
                  src={project.image}
                  alt={project.alt[lang]}
                  loading="lazy"
                  decoding="async"
                  width="1600"
                  height="1000"
                />
              </div>
              <div className="project__body">
                <span className="tag">{project.tag[lang]} • {project.location[lang]}</span>
                <h3>{project.title[lang]}</h3>
                <p>{project.blurb[lang]}</p>
                <button type="button" className="btn btn--ghost project__btn" onClick={() => openProject(project)}>
                  {content.projects.expand}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${activeProject.title[lang]} ${content.projects.modalLabel}`}>
          <button type="button" className="lightbox__backdrop" aria-label={content.projects.close} onClick={() => setActiveProject(null)}></button>
          <div className="lightbox__panel">
            <div className="lightbox__head">
              <div>
                <p className="tag">{activeProject.tag[lang]} • {activeProject.location[lang]}</p>
                <h3>{activeProject.title[lang]}</h3>
              </div>
              <button type="button" className="lightbox__close" onClick={() => setActiveProject(null)}>
                {content.projects.close}
              </button>
            </div>

            <div className="project-modal__grid">
              <div>
                <div className="project-modal__hero">
                  <img src={activeGalleryImage} alt={activeProject.alt[lang]} decoding="async" width="1600" height="1000" />
                </div>
                <div className="project-modal__thumbs" role="list" aria-label={content.projects.galleryLabel}>
                  {activeProject.gallery.map((image, index) => (
                    <button
                      key={`${activeProject.title.en}-${image}-${index}`}
                      type="button"
                      className={`project-modal__thumb ${activeGalleryIndex === index ? 'is-active' : ''}`}
                      onClick={() => setActiveGalleryIndex(index)}
                      aria-label={`${content.projects.expand} ${index + 1}`}
                    >
                      <img src={image} alt={`${activeProject.title[lang]} ${index + 1}`} loading="lazy" decoding="async" width="1600" height="1000" />
                    </button>
                  ))}
                </div>
              </div>

              <aside className="project-modal__info">
                <p>{activeProject.details[lang]}</p>
                <ul className="checks" role="list">
                  {activeProject.highlights.map(highlight => (
                    <li key={highlight.en}>{highlight[lang]}</li>
                  ))}
                </ul>
              </aside>
            </div>

            <div
              className={`compare ${isDragging ? 'is-dragging' : ''}`}
              style={{ '--split': `${comparisonValue}%` }}
              onPointerDown={onComparePointerDown}
            >
              <img src={activeProject.beforeImage} alt={`${activeProject.title[lang]} ${content.projects.before}`} className="compare__img" decoding="async" />
              <img src={activeProject.afterImage} alt={`${activeProject.title[lang]} ${content.projects.after}`} className="compare__img compare__img--after" decoding="async" />
              <span className="compare__label compare__label--before">{content.projects.before}</span>
              <span className="compare__label compare__label--after">{content.projects.after}</span>
              <div className="compare__divider" aria-hidden="true">
                <span className="compare__handle">|||</span>
              </div>
            </div>

            <div className="compare__slider-wrap">
              <label htmlFor="compareSlider">{content.projects.compareLabel}</label>
              <input
                id="compareSlider"
                type="range"
                min="0"
                max="100"
                value={comparisonValue}
                onChange={event => setComparisonValue(Number(event.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
