import { nl } from '../translations'
import { R } from '../utils/routes'
import { PostListView } from '../components/listing'

function Nieuws() {
  return (
    <PostListView
      blogTypeName="Nieuws"
      postRoute={R.nieuwsPost}
      heroTitle={nl('nieuwsPage.title')}
      heroSubtitle={nl('nieuwsPage.subtitle')}
      heroBreadcrumb={nl('nav.nieuws')}
      heroSearchPlaceholder={nl('nieuwsPage.searchPlaceholder')}
    />
  )
}

export default Nieuws
