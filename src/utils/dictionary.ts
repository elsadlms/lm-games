import { text } from '@sveltejs/kit'
import { normalizeString } from './textFunctions'

// [WIP] renommer
export const smallWords = [
	'le',
	'la',
	'l',
	'les',
	'un',
	'une',
	'd',
	'du',
	'de',
	'des',
	'c',
	'ce',
	'cet',
	'cette',
	'ces',
	'mais',
	'dans',
	'pour',
	'leur',
	'avec',
	'qui',
	'a',
]

export const dictionary = [
	[
		'être',
		'suis',
		'es',
		'est',
		'sommes',
		'êtes',
		'sont',
		'fus',
		'fut',
		'fûmes',
		'fûtes',
		'furent',
		'été',
		'étais',
		'était',
		'étions',
		'étiez',
		'étaient',
		'serai',
		'seras',
		'sera',
		'serons',
		'serez',
		'seront',
		'sois',
		'soit',
		'soyons',
		'soyez',
		'soient',
		'fusse',
		'fusses',
		'fût',
		'fussions',
		'fussiez',
		'fussent',
		'serais',
		'serait',
		'serions',
		'seriez',
		'seraient',
		'étant',
	],
	[
		'avoir',
		'ai',
		'as',
		'a',
		'avons',
		'avez',
		'ont',
		'avais',
		'avait',
		'avions',
		'aviez',
		'avaient',
		'eu',
		'eus',
		'eut',
		'eûmes',
		'eûtes',
		'eurent',
		'aurai',
		'auras',
		'aura',
		'aurons',
		'aurez',
		'auront',
		'aie',
		'aies',
		'ait',
		'ayons',
		'ayez',
		'aient',
		'eusse',
		'eusses',
		'eût',
		'eussions',
		'eussiez',
		'eussent',
		'aurais',
		'aurait',
		'aurions',
		'auriez',
		'auraient',
		'eue',
		'eues',
		'ayant',
	],
	['son', 'ses', 'sa'],
	['ton', 'tes', 'ta'],
	['mon', 'mes', 'ma'],
	['notre', 'nos'],
	['votre', 'vos'],
	['leur', 'leurs'],
]

export const unaccentedDictionary = dictionary.map((group) => {
	return group.map((word) => normalizeString(word))
})

const suffixes = ['e', 's', 'es', 'se', 'r', 'x', 'al', 'ale', 'ales', 'aux', 't', 'te', 'tes']

export const getWordPotentialRoots = (word: string) => {
	const potentialRoots = [word]

	for (const suffix of suffixes) {
		const regex = new RegExp(`${suffix}$`, 'g')
		if (word.match(regex) !== null) potentialRoots.push(word.replace(regex, ''))
	}

	return potentialRoots
}

export const getCloseWords = (word: string) => {
  if (word === '') return []

	const closeWords = [word]
	const normalizedWord = normalizeString(word)

	for (const group of unaccentedDictionary) {
		if (group.includes(normalizedWord)) {
			closeWords.push(...group)
		}
	}

	// [WIP] moins bourrin ??
	// [WIP] enlever les suffixes dans l'ordre (s, e, suffixes)
	// [WIP] essayer de les remettre dans l'ordre
	// [WIP] (suffixes -si ça colle avec mot d'origine? al/aux etc. -, e, s)

	// const potentialRoots = getWordPotentialRoots(normalizedWord)
	// closeWords.push(...potentialRoots)

	// for (const element of potentialRoots) {
	// 	for (const suffix of suffixes) {
	// 		closeWords.push(`${element}${suffix}`)
	// 	}
	// }

	// [WIP] en attendant
	for (const suffix of ['e', 's', 'es', 'r']) {
		closeWords.push(`${word}${suffix}`)
	}

	return closeWords
}
