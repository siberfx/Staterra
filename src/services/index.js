/**
 * Services barrel – re-export for convenience
 */

export { get, post, put, patch, del, request, ApiError, default as api } from './api'
export { getSettings } from './settingsService'
export { getBlogPosts, getBlogPost, getBlogList } from './blogService'
export { getChangelogList, getChangelogEntry } from './changelogService'
export {
  getAcademyIndex,
  getAcademyCategories,
  getAcademyCategory,
  getAcademyVideo,
} from './academyService'
export { getHeaderMenu, getFooterMenu, getMenus } from './menuService'
export { getPage } from './pageService'
export { getSolutions, getSolutionByAnchor } from './solutionsService'
