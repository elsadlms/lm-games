const calendarURL = 'https://assets-decodeurs.lemonde.fr/redacweb/redactle-calendar/calendar.json'
const articleRootURL = 'https://assets-decodeurs.lemonde.fr/redacweb/redactle-articles/'

const loadJson = async (fetch: (url: string) => any, jsonURL: string) => {
  try {
    const res = await fetch(jsonURL)

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const item = await res.json()
    return item
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

const isValidDate = (date: string | undefined) => {
  const validDateRegex = new RegExp(/^\d{6}$/)
  return date !== undefined && validDateRegex.test(date) === true
}

const dateToString = (date: Date) => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).replaceAll('/', '')
}

const stringToDate = (string: string) => {
  const day = Number(string.substring(0, 2))
  const month = Number(string.substring(2, 4))
  const year = Number('20' + string.substring(4, 6))
  return new Date(year, month - 1, day)
}

const getClosestDate = (dateMap: Map<string, string>, targetDate: Date) => {
  let closestDate
  let closestDateDistance

  for (const [key] of dateMap) {
    const date = stringToDate(key)

    if (date > new Date()) continue

    const distance = Math.abs(targetDate.getTime() - date.getTime())

    if (closestDate === undefined || (closestDateDistance !== undefined && distance < closestDateDistance)) {
      closestDate = key
      closestDateDistance = distance
    }
  }

  return closestDate as string
}

export const load = async ({ fetch, params }) => {
  // on récupère le calendrier
  const calendar = await loadJson(fetch, calendarURL)
  const calendarMap = new Map(Object.entries(calendar)) as Map<string, string>

  const todaysDate = new Date()

  // on récupère la date de l'article à charger...
  let articleDate: string
  // soit celle passée en paramètre si valide et antérieure à la date du jour
  if (isValidDate(params.date) && stringToDate(params.date as string) < todaysDate) {
    articleDate = params.date as string
  } else {
    // soit la date du jour
    articleDate = dateToString(todaysDate)
  }

  // on récupère l'id de l'article à charger...
  let articleId: string
  // celui de la date exacte s'il existe
  if (calendarMap.get(articleDate) !== undefined) {
    articleId = calendarMap.get(articleDate) as string
  } else {
    // le plus proche (à une date antérieure à aujourd'hui) sinon
    const closestDateInCalendar = getClosestDate(calendarMap, stringToDate(articleDate))
    articleId = calendarMap.get(closestDateInCalendar) as string
  }

  const articleURL = `${articleRootURL}${articleId}.json`
  const article = await loadJson(fetch, articleURL)

  return {
    article
  }
}
