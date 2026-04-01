import { nl } from '../translations'
import { R } from '../utils/routes'
import BlogDetail from './BlogDetail'

function NieuwsDetail() {
  return (
    <BlogDetail
      backRoute={R.nieuws}
      sectionLabel={nl('nav.nieuws')}
    />
  )
}

export default NieuwsDetail
