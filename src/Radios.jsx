import { motion } from 'framer-motion'

const options = ['VFX', 'API', 'ART']

function Radios({ navIndex, setNavIndex }) {
  return (
    <div className='radio-container glass-panel'>
      <div className='radio-text-container'>
        {options.map((option, index) => (
          <div
            key={option}
            className='radio-text'
            onClick={() => setNavIndex(index)}
            style={{ cursor: 'pointer', zIndex: 1 }}
          >
            {option}
          </div>
        ))}
      </div>
      <motion.div
        className='radio glass-panel'
        animate={{
          x: navIndex * 128
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
      />
    </div>
  )
}

export default Radios
