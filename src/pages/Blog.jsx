import { nl } from '../translations'
import { R } from '../utils/routes'
import { PostListView } from '../components/listing'

function Blog() {
  return (
    <PostListView
      blogTypeName="Blogs"
      postRoute={R.blogPost}
      heroTitle={nl('blog.title')}
      heroSubtitle={nl('blog.subtitle')}
      heroBreadcrumb={nl('nav.blog')}
      heroSearchPlaceholder={nl('blog.searchPlaceholder')}
    />
  )
}

export default Blog
