import { nl } from '../translations'
import { R } from '../utils/routes'
import { PostListView } from '../components/listing'

function Succesverhalen() {
  return (
    <PostListView
      blogTypeName="Succesverhalen"
      postRoute={R.succesverhalenPost}
      heroTitle={nl('succesverhalenPage.title')}
      heroSubtitle={nl('succesverhalenPage.subtitle')}
      heroBreadcrumb={nl('zoDoenZijHet.title')}
      heroSearchPlaceholder={nl('succesverhalenPage.searchPlaceholder')}
    />
  )
}

export default Succesverhalen
