import type { Article, ArticleNode, ArticleElement } from '~/types'

import { getWordGroup } from '~/utils/dictionary'
import { findPunctuationInString, normalizeString } from '~/utils/textFunctions'

export const prepareArticle = (article: Article) => {
	return article.nodes.map((node) => {
		const blockData = node.content.split(' ').flatMap((element) => {
			if (findPunctuationInString(element) !== null) {
				const punctuationArray = []

				if (findPunctuationInString(element)?.start) {
					punctuationArray.push({
						type: 'word',
						content: findPunctuationInString(element)?.start as string,
					} as ArticleElement)
				}

				punctuationArray.push({
					type: 'punctuation',
					content: findPunctuationInString(element)?.punctuation as string,
				} as ArticleElement)

				if (findPunctuationInString(element)?.end) {
					punctuationArray.push({
						type: 'word',
						content: findPunctuationInString(element)?.end as string,
					} as ArticleElement)
				}

				return punctuationArray
			}

			return {
				type: 'word',
				content: element,
			} as ArticleElement
		})

		return {
			type: node.type,
			content: blockData,
		}
	})
}

export const getWordFrequencyInArticle = (word: string, article: ArticleNode[]) => {
	const wordGroup = getWordGroup(word)
	const articleElements = article.map((node) => node.content).flat()

	const wordOccurences = articleElements.filter((element) => {
		return wordGroup.includes(normalizeString(element.content))
	})

	return wordOccurences.length
}
