export interface PlabPost {
  id: number
  bookmarked: boolean
  category: string
  complete?: boolean
  download_date?: string
  favorited: boolean
  mark?: boolean
  title: string
  link: string
  related: string[]
  size: string
  post_date: string
  torrentId?: number
  image_sources: string[]
  screenshot_containers_html: string[]
  visited?: boolean
}
