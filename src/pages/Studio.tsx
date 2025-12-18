import { Studio } from 'sanity'
import config from '../../sanity.config'
import '../../sanity/styles/studio.css'

const StudioPage = () => {
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Studio config={config} />
    </div>
  )
}

export default StudioPage

