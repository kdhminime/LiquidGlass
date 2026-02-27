import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Project from './Project'
import Radios from './Radios'
import projects from './data/projects.json'

const tabs = ['VFX', 'AI', 'ART']

// Get all Vimeo URLs from projects
const getAllVimeoUrls = () => {
  const urls = []
  Object.values(projects).forEach(category => {
    category.forEach(project => {
      if (project.url.includes('vimeo')) {
        urls.push(project.url)
      }
    })
  })
  return urls
}

function App() {
  const [navIndex, setNavIndex] = useState(0)
  const [showProjects, setShowProjects] = useState(false)
  const [projectIndex, setProjectIndex] = useState(0)
  const [aspectRatios, setAspectRatios] = useState({})

  // Pre-fetch all Vimeo aspect ratios on initial load
  useEffect(() => {
    async function prefetchAspectRatios() {
      const vimeoUrls = getAllVimeoUrls()
      const ratios = {}

      await Promise.all(
        vimeoUrls.map(async (url) => {
          try {
            const videoId = url.split('/').pop()
            const response = await fetch(
              `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`
            )
            const data = await response.json()
            ratios[url] = `${data.width} / ${data.height}`
          } catch (error) {
            console.error('Failed to fetch video dimensions:', error)
            ratios[url] = '16 / 9'
          }
        })
      )

      setAspectRatios(ratios)
    }

    prefetchAspectRatios()
  }, [])

  const currentProjects = projects[tabs[navIndex]]
  const currentProject = currentProjects[projectIndex]
  const hasPrev = projectIndex > 0
  const hasNext = projectIndex < currentProjects.length - 1

  const handleTabClick = (index) => {
    setNavIndex(index)
    setProjectIndex(0)
    setShowProjects(true)
  }

  const handleCategoryChange = (index) => {
    setNavIndex(index)
    setProjectIndex(0)
  }

  const handlePrev = () => {
    setProjectIndex(projectIndex - 1)
  }

  const handleNext = () => {
    setProjectIndex(projectIndex + 1)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!showProjects ? (
          <motion.div
            key="intro"
            className="container"
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="description">
              a designer based in Vancouver
            </div>
            <div className="name">
              Jaemin Ryu
            </div>
            <div className="tabs">
              {tabs.map((tab, index) => (
                <motion.div
                  key={tab}
                  className={`tab tab-${index + 1} glass-panel`}
                  whileHover={{ y: -8, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTabClick(index)}
                >
                  <span className="tab-text">{tab}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="projects"
            className="main-content"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Radios navIndex={navIndex} setNavIndex={handleCategoryChange} />
            <div className="project-viewer">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${navIndex}-${projectIndex}`}
                  className="project-with-arrows"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.4 } }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                >
                  {hasPrev && (
                    <motion.button
                      className="arrow arrow-left glass-panel"
                      onClick={handlePrev}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ‹
                    </motion.button>
                  )}
                  <Project
                    url={currentProject.url}
                    title={currentProject.title}
                    description={currentProject.description}
                    aspectRatio={aspectRatios[currentProject.url] || '16 / 9'}
                  />
                  {hasNext && (
                    <motion.button
                      className="arrow arrow-right glass-panel"
                      onClick={handleNext}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ›
                    </motion.button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="rights">
        &copy; 2026 JAEMIN RYU ALL RIGHTS RESERVED
      </div>
    </>
  )
}

export default App
