import { useState } from 'react'
import { motion } from 'framer-motion'
import Project from './Project'
import Radios from './Radios'

const tabs = ['VFX', 'AI', 'ART']

function App() {
  const [navIndex, setNavIndex] = useState(0)

  return (
    <>
      {/* <div className="container">
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
            >
              <span className="tab-text">{tab}</span>
            </motion.div>
          ))}
        </div>
      </div> */}
      <Project url='https://www.youtube.com/embed/P96w4TTkR7I' title={"title"} description={"yo"}/>
      <Radios navIndex={navIndex} setNavIndex={setNavIndex} />
      <div className="rights">
        &copy; 2026 JAEMIN RYU ALL RIGHTS RESERVED
      </div>
    </>
  )
}

export default App
