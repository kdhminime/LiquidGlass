import { motion } from 'framer-motion'

const tabs = ['VFX', 'AI', 'ART']

function App() {
  return (
    <>
      <div className="container">
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
      </div>
      <div className="rights">
        &copy; 2026 JAEMIN RYU ALL RIGHTS RESERVED
      </div>
    </>
  )
}

export default App
