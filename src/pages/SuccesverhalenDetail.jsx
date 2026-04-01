import { nl } from '../translations'
import { R } from '../utils/routes'
import BlogDetail from './BlogDetail'

function SuccesverhalenDetail() {
  return (
    <BlogDetail
      backRoute={R.succesverhalen}
      sectionLabel={nl('succesverhalenPage.title')}
    />
  )
}

export default SuccesverhalenDetail
