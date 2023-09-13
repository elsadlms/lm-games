import { articles } from '~/data/redactle/articles'
import { calendar } from '~/data/redactle/calendar'

export const load = ({ params }) => {
  const todaysDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).replaceAll('/', '')

  const articleDate = params.date !== undefined && calendar.has(params.date)
    ? params.date
    : todaysDate

  const articleId = calendar.get(articleDate)

  const article = articles.find(
    (article) => article.id.toString() === articleId,
  )

  return {
    article
  }
}
