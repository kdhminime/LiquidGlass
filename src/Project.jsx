import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CONTAINER_HEIGHT = 800

function Project({ url, title, description }) {
  const [videoWidth, setVideoWidth] = useState(CONTAINER_HEIGHT * (16 / 9))

  useEffect(() => {
    async function fetchAspectRatio() {
      try {
        if (url.includes('vimeo')) {
          const videoId = url.split('/').pop()
          const response = await fetch(
            `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`
          )
          const data = await response.json()
          const newWidth = CONTAINER_HEIGHT * (data.width / data.height)
          setVideoWidth(Math.min(newWidth, 1200))
        } else {
          // YouTube defaults to 16:9
          setVideoWidth(CONTAINER_HEIGHT * (16 / 9))
        }
      } catch (error) {
        console.error('Failed to fetch video dimensions:', error)
        setVideoWidth(CONTAINER_HEIGHT * (16 / 9))
      }
    }

    fetchAspectRatio()
  }, [url])

  return (
    <>
     <div className='glass-panel project-container'>
        <motion.div
          className='video-container'
          animate={{ width: videoWidth }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <iframe
            src={url}
            width='100%'
            height='100%'
            style={{ border: 'none', borderRadius: '73.5px', padding: '48px' }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </motion.div>
        <div className='description-container'>
            <div className='project-description glass-panel'>
                <div className='title'>{title}</div>
                <div className='project-description-text'>{description}</div>
            </div>
        </div>
     </div>
    </>
  )
}

export default Project
