import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Project from './Project'
import Radios from './Radios'
import projects from './data/projects.json'

const tabs = ['VFX', 'AI', 'ART']

function App() {
  const [navIndex, setNavIndex] = useState(0)
  const [showProjects, setShowProjects] = useState(false)
  const [projectIndex, setProjectIndex] = useState(0)

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
              {hasPrev && (
                <motion.button
                  className="arrow arrow-left glass-panel"
                  onClick={() => setProjectIndex(projectIndex - 1)}
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
              />
              {hasNext && (
                <motion.button
                  className="arrow arrow-right glass-panel"
                  onClick={() => setProjectIndex(projectIndex + 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ›
                </motion.button>
              )}
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
