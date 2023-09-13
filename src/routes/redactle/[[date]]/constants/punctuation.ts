interface punctuationSpaceRule {
  value: string
  spaceBefore: boolean | 'if-empty-start' | 'if-empty-end'
  spaceAfter: boolean | 'if-empty-start' | 'if-empty-end'
}

export const punctuationSpaceRules: punctuationSpaceRule[] = [
  {
    value: ',',
    spaceBefore: false,
    spaceAfter: true,
  },
  {
    value: '.',
    spaceBefore: false,
    spaceAfter: true,
  },
  {
    value: '!',
    spaceBefore: true,
    spaceAfter: true,
  },
  {
    value: '?',
    spaceBefore: true,
    spaceAfter: true,
  },
  {
    value: '…',
    spaceBefore: false,
    spaceAfter: true,
  },
  {
    value: ':',
    spaceBefore: true,
    spaceAfter: true,
  },
  {
    value: ';',
    spaceBefore: true,
    spaceAfter: true,
  },
  {
    value: '"',
    spaceBefore: 'if-empty-start',
    spaceAfter: 'if-empty-end',
  },
  {
    value: "'",
    spaceBefore: false,
    spaceAfter: false,
  },
  {
    value: '«',
    spaceBefore: true,
    spaceAfter: true,
  },
  {
    value: '»',
    spaceBefore: true,
    spaceAfter: true,
  },
  {
    value: '(',
    spaceBefore: true,
    spaceAfter: false,
  },
  {
    value: ')',
    spaceBefore: false,
    spaceAfter: true,
  },
  {
    value: '’',
    spaceBefore: false,
    spaceAfter: false,
  },
  {
    value: '-',
    spaceBefore: false,
    spaceAfter: false,
  },
  {
    value: '–',
    spaceBefore: true,
    spaceAfter: true,
  },
  {
    value: '—',
    spaceBefore: true,
    spaceAfter: true,
  },
  {
    value: '·',
    spaceBefore: false,
    spaceAfter: false,
  },
]
