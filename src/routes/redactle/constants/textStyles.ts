import type { ArticleNodeStyle } from '~/types'

const textStyles: ArticleNodeStyle[] = [
  {
    type: 'publication',
    fontFamily: 'Marr-Sans',
    fontSize: 14,
    fontWeight: 500,
  },
  {
    type: 'title',
    fontFamily: "The-Antiqua-B",
    fontSize: 42,
    fontWeight: 500,
  },
  {
    type: 'heading',
    fontFamily: "Marr-Sans",
    fontSize: 24,
    fontWeight: 500,
  },
  {
    type: 'subtitle',
    fontFamily: "The-Antiqua-B",
    fontSize: 32,
    fontWeight: 500,
  },
  {
    type: 'paragraph',
    fontFamily: "The-Antiqua-B",
    fontSize: 18,
    fontWeight: 500,
  },
]

export const getTextStyle = (textType: string): ArticleNodeStyle => {
  return textStyles.find((el) => el.type === textType) as ArticleNodeStyle
}
