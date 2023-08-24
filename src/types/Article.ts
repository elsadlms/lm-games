export interface Article {
	id: number
	url: string
	publicationYear: number
	nodes: ArticleRawNode[]
	personality?: string
}

export type ArticleNodeType = 'title' | 'heading' | 'paragraph' | 'subtitle'

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
	type: 'word' | 'punctuation'
	content: string
}
