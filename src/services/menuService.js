/**
 * Menu API
 * GET /menus/header – mega menu tree (url, slug, page_type per item)
 * GET /menus/footer – footer columns
 * Frontend maps API URLs to frontend routes.
 */

import { get } from './api'

export async function getHeaderMenu() {
  const data = await get('menus/header')
  return {
    items: data?.items ?? [],
    settings: data?.settings ?? { sticky: false, login_link_enabled: false, login_link_url: null },
  }
}

export async function getFooterMenu() {
  const data = await get('menus/footer')
  return {
    columns: data?.columns ?? [],
  }
}

export async function getMenus() {
  const [headerRes, footerRes] = await Promise.all([
    get('menus/header').catch(() => ({ items: [], settings: {} })),
    get('menus/footer').catch(() => ({ columns: [] })),
  ])
  return {
    header: {
      items: headerRes?.items ?? [],
      settings: headerRes?.settings ?? { sticky: false, login_link_enabled: false, login_link_url: null },
    },
    footer: {
      columns: footerRes?.columns ?? [],
    },
  }
}
