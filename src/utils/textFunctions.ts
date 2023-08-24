export const normalizeString = (string: string) => {
	const normalizedString = removeAccentsFromString(string.toString()).trim().toLowerCase()
	return normalizedString
}

export const findPunctuationInString = (string: string) => {
	const punctuationRegex = /(.+)?([^A-Za-zÀ-ÖØ-öø-ÿ\s\d])(.+)?/g
	const stringPunctuationMatch = punctuationRegex.exec(string)

	if (stringPunctuationMatch === null) return null

	return {
		start: stringPunctuationMatch[1],
		punctuation: stringPunctuationMatch[2],
		end: stringPunctuationMatch[3],
	}
}

import { accents } from './accents'

export const removeAccentsFromString = (string: string) => {
	let unaccentedString = string

	for (const key in accents) {
		const accentsList = accents[key].join().replaceAll(',', '')
		const accentRegex = new RegExp(`[${accentsList}]`, 'g')
		unaccentedString = unaccentedString.replaceAll(accentRegex, key)
	}

	return unaccentedString
}
