import { createRoot } from 'react-dom/client'
import { Studio } from 'sanity'
import config from '../../sanity.config'

function StudioPage() {
  return <Studio config={config} />
}

const root = createRoot(document.getElementById('root')!)
root.render(<StudioPage />)

