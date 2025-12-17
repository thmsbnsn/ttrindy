import { Studio } from 'sanity'
import config from '../../sanity.config'
import '../../sanity/styles/studio.css'

const StudioPage = () => {
  return <Studio config={config} />
}

export default StudioPage

