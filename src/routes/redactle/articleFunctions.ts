import type { Article, ArticleNode, ArticleElement } from '~/types'

import { getCloseWords } from '~/utils/dictionary'
import { punctuationSpaceRules } from '~/utils/punctuation'
import { findPunctuationInString, normalizeString } from '~/utils/textFunctions'

export const prepareArticle = (article: Article) => {
	return article.nodes.map((node) => {
		const blockData = node.content.split(' ').flatMap((element) => {
			const stringWithPunctuation = findPunctuationInString(element)

			if (stringWithPunctuation !== null) {
				const punctuationArray = []

				const punctuationSpaceRule = punctuationSpaceRules.find(
					(punctuation) => punctuation.value === stringWithPunctuation.punctuation,
				)

				// if (punctuationSpaceRule === undefined) console.log(stringWithPunctuation.punctuation)

				if (stringWithPunctuation.start) {
					punctuationArray.push({
						type: 'word',
						content: stringWithPunctuation.start as string,
						spaceAfter: punctuationSpaceRule?.spaceBefore,
					} as ArticleElement)
				}

				punctuationArray.push({
					type: 'punctuation',
					content: stringWithPunctuation.punctuation as string,
					spaceAfter: punctuationSpaceRule?.spaceAfter,
				} as ArticleElement)

				if (stringWithPunctuation.end) {
					punctuationArray.push({
						type: 'word',
						content: stringWithPunctuation.end as string,
						spaceAfter: true,
					} as ArticleElement)
				}

				if (stringWithPunctuation.punctuation === '"') console.log(punctuationArray)

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

export const getWordFrequencyInArticle = (word: string, article: ArticleNode[]) => {
	const normalizedWord = normalizeString(word)
	const closeWords = getCloseWords(normalizedWord)
	const articleElements = article.map((node) => node.content).flat()

	const wordOccurences = articleElements.filter((element) => {
		return closeWords.includes(normalizeString(element.content))
	})

	return wordOccurences.length
}
