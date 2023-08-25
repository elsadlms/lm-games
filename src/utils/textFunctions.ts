export const normalizeString = (string: string) => {
	let normalizedString = string.toString()
	normalizedString = removeAccentsFromString(normalizedString)
	normalizedString = removeSpecialCharactersFromString(normalizedString)
	return normalizedString.trim().toLowerCase()
}

const specialCharaRegex = '[^A-Za-zÀ-ÖØ-öø-ÿsd]'

export const findPunctuationInString = (string: string) => {
	const regexExpression = `/(.+)?(${specialCharaRegex})(.+)?/`
	const regex = new RegExp(regexExpression, 'g')
	const stringPunctuationMatch = regex.exec(string)

	if (stringPunctuationMatch === null) return null

	return {
		start: stringPunctuationMatch[1],
		punctuation: stringPunctuationMatch[2],
		end: stringPunctuationMatch[3],
	}
}

export const removeSpecialCharactersFromString = (string: string) => {
	const regex = new RegExp(specialCharaRegex, 'g')
	let cleanString = string.replaceAll(regex, '')
	return cleanString
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
