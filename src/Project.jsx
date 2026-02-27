import { useState, useEffect } from 'react'

function Project({ url, title, description }) {
  const [aspectRatio, setAspectRatio] = useState('16 / 9')

  useEffect(() => {
    async function fetchAspectRatio() {
      try {
        // Extract video ID and platform
        if (url.includes('vimeo')) {
          const videoId = url.split('/').pop()
          const response = await fetch(
            `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`
          )
          const data = await response.json()
          setAspectRatio(`${data.width} / ${data.height}`)
        }
        // YouTube doesn't have a simple public API for this, defaults to 16:9
      } catch (error) {
        console.error('Failed to fetch video dimensions:', error)
      }
    }

    fetchAspectRatio()
  }, [url])

  return (
    <>
     <div className='glass-panel project-container'>
        <div className='video-container' style={{ aspectRatio }}>
          <iframe
            src={url}
            width='100%'
            height='100%'
            style={{ border: 'none', borderRadius: '73.5px', padding: '48px' }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
        <div className='description-container'>
            <div className='project-description glass-panel'>
                <div className='title'>{title}</div>
                <div className='description'>{description}</div>
            </div>
        </div>
     </div>
    </>
  )
}

export default Project
