import type { Article, ArticleNode, ArticleElement } from '~/types'

import { punctuationSpaceRules } from '~/utils/punctuation'
import { findPunctuationInString, normalizeString } from '~/utils/textFunctions'

export const prepareArticle = (article: Article) => {
	return article.nodes.map((node) => {
		const blockData = node.content.split(' ').flatMap((element) => {
			const stringWithPunctuation = findPunctuationInString(element)

			if (stringWithPunctuation !== undefined && stringWithPunctuation?.length !== 0) {
				const punctuationArray = []
				for (const [i, element] of stringWithPunctuation.entries()) {
					const punctuationSpaceRule = punctuationSpaceRules.find(
						(punctuation) => punctuation.value === element.punctuation,
					)

					if (element?.start !== undefined && element?.start !== '') {
						punctuationArray.push({
							type: 'word',
							content: element.start as string,
							spaceAfter: punctuationSpaceRule?.spaceBefore,
						} as ArticleElement)
					}

					punctuationArray.push({
						type: 'punctuation',
						content: element.punctuation as string,
						spaceAfter: punctuationSpaceRule?.spaceAfter,
					} as ArticleElement)

					if (element?.end !== undefined && element?.end !== '') {
						const isLastElement = i === stringWithPunctuation.length - 1

						punctuationArray.push({
							type: 'word',
							content: element.end as string,
							spaceAfter: isLastElement ? true : false,
						} as ArticleElement)
					}

					// if (element.punctuation === '"') console.log(punctuationArray)
				}

				return punctuationArray
			}

			return {
				type: 'word',
				content: element,
				spaceAfter: true,
			} as ArticleElement
		})

		return {
			type: node.type,
			content: blockData,
		}
	})
}

export const getWordsOccurencesInArticle = (words: string[], article: ArticleNode[]) => {
	const articleElements = article.map((node) => node.content).flat()

	const wordOccurences = articleElements.filter((element) => {
		return words.includes(normalizeString(element.content))
	})

	return wordOccurences.length
}
