function Project({ url, title, description, aspectRatio = '16 / 9' }) {
  return (
    <div className='glass-panel project-container'>
      <div className='video-container' style={{ aspectRatio }}>
        <div className='video-wrapper'>
          <iframe
            src={url}
            width='100%'
            height='100%'
            style={{ border: 'none' }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </div>
      <div className='description-container'>
        <div className='project-description glass-panel'>
          <div className='title'>{title}</div>
          <div className='project-description-text'>{description}</div>
        </div>
      </div>
    </div>
  )
}

export default Project
