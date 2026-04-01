import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'

export default function NotFound({ backRoute, backLabel }) {
  return (
    <div className="container-page py-16">
      <p className="text-gray-500">{nl('blog.notFound')}</p>
      <Link to={backRoute ?? R.blog} className="text-primary hover:underline mt-4 inline-block">
        ← {backLabel ?? nl('blog.backToBlog')}
      </Link>
    </div>
  )
}
