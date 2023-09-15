export interface Article {
  id: number
  url: string
  publicationYear: number
  publicationDate: string
  nodes: ArticleRawNode[]
}

export type ArticleNodeType = 'title' | 'heading' | 'paragraph' | 'subtitle' | 'publication'

// [WIP] clean definition ArticleNode

export interface ArticleRawNode {
  type: ArticleNodeType
  content: string
}

export interface ArticleNode {
  type: ArticleNodeType
  content: ArticleElement[]
}

export interface ArticleNodeStyle {
  type: ArticleNodeType
  fontFamily: string
  fontSize: number
  fontWeight: number
}

export interface ArticleElement {
  index: number
  last: boolean
  type: 'word' | 'punctuation'
  content: string
}
