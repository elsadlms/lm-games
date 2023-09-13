export const normalizeString = (string: string) => {
  let normalizedString = string.toString().toLowerCase()
  normalizedString = removeAccentsFromString(normalizedString)
  normalizedString = removeSpecialCharactersFromString(normalizedString)
  return normalizedString.trim()
}

const specialCharaRegexString = `[^A-Za-zÀ-ÖØ-öø-ÿœű\\s\\d]`

export const findPunctuationInString = (string: string) => {
  const specialCharaRegex = new RegExp(specialCharaRegexString, 'g')

  const capturingRegexString = `(.+)?(${specialCharaRegexString})(.+)?`
  const capturingRegex = new RegExp(capturingRegexString, '')

  const result = []
  let remainingString = string

  while (remainingString !== null) {
    const matchesArray = [...remainingString.matchAll(specialCharaRegex)]
    if (matchesArray.length === 0) break

    const capturedGroup = capturingRegex.exec(remainingString)
    if (capturedGroup === null) break

    const [_, start, punctuation, end] = capturedGroup

    result.unshift({
      start: matchesArray.length === 1 ? start : '',
      punctuation,
      end,
    })

    remainingString = start ?? null
  }

  return result
}

export const removeSpecialCharactersFromString = (string: string) => {
  const specialCharaRegex = new RegExp(specialCharaRegexString, 'g')
  let cleanString = string.replaceAll(specialCharaRegex, '')
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
