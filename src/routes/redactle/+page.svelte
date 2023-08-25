<script lang="ts">
	import type { Article, ArticleNode } from '~/types'

	import { getRandomElementFromArray } from '~/utils/index'
	import { normalizeString } from '~/utils/textFunctions'
	import { smallWords, getCloseWords } from '~/utils/dictionary'

	import { articles } from '~/data/redactle/articles'

	import { prepareArticle, getWordsOccurencesInArticle } from './articleFunctions'
	import { getTextStyle } from './textStyles'

	import Word from './Word.svelte'

	const article: Article = getRandomElementFromArray(articles as [])
	const articleData: ArticleNode[] = prepareArticle(article)

	const answerArray: string[] = article.personality
		? article.personality.split(' ').map((word) => normalizeString(word))
		: []

	// [DEV]
	$: displayRevealedWords = false

	// [WIP] à clean
	$: articleIsSolved = () => {
		return answerArray.every((word) => revealedWords.includes(word))
	}
	$: articleIsRevealed = false

	$: isInAnswer = (word: string) => {
		return answerArray.includes(normalizeString(word))
	}

	const guesses = [] as { word: string; occurrences: number }[]
	$: revealedWords = [...smallWords] as string[]

	$: isRevealed = (word: string) => {
		let normalizedWord = normalizeString(word)
		return revealedWords.includes(normalizedWord)
	}

	$: highlightedGuess = '' as string
	$: highlightedWords = getCloseWords(highlightedGuess)

	$: highlightGuess = (word?: string) => {
		if (word === undefined) return
		highlightedGuess = normalizeString(word)
	}

	$: isHighlighted = (word: string) => {
		let normalizedWord = normalizeString(word)
		return highlightedWords.includes(normalizedWord)
	}

	let inputText = ''

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			e.preventDefault()

			// si champ vide, on ignore
			if (inputText.trim() === '') return

			const cleanGuess = inputText.trim().toLowerCase()
			const normalizedGuess = normalizeString(cleanGuess)

			// si on soumet un mot déjà révélé
			if (revealedWords.includes(normalizedGuess)) {
				const duplicateGuess = guesses.find((guess) => {
					return getCloseWords(guess.word).includes(normalizedGuess)
				})
				// ...on highlight à nouveau le mot
				highlightGuess(duplicateGuess?.word)
				inputText = ''
				return
			}

			const wordsToReveal = getCloseWords(normalizedGuess)
			const guessOccurrences = getWordsOccurencesInArticle(wordsToReveal, articleData)

			// guesses = [...guesses, cleanGuess]
			guesses.push({ word: cleanGuess, occurrences: guessOccurrences })
			revealedWords = [...revealedWords, ...wordsToReveal]

			if (articleIsSolved()) articleIsRevealed = true

			highlightGuess(cleanGuess)
			inputText = ''
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div>
	<!-- [DEV] REVEALED WORDS -->
	<div style="border-bottom: 1px solid #ddd;">
		<p>Solved?? {articleIsSolved()}</p>
		<p
			on:click={() => {
				displayRevealedWords = !displayRevealedWords
			}}
			style="text-decoration: underline; cursor: pointer;"
		>
			Mots révélés
		</p>
		{#if displayRevealedWords}
			<p>
				{#each revealedWords as word}
					<span>{word}, </span>
				{/each}
			</p>
		{/if}
	</div>

	<!-- ARTICLE -->
	<div class="article">
		{#each articleData as block, j}
			{@const { fontFamily, fontSize, fontWeight } = getTextStyle(block.type)}

			{@const blockClasses = ['block', `block-${block.type}`]}
			{@const blockVariables = [
				`--font-family: ${fontFamily};`,
				`--font-size: ${fontSize}px;`,
				`--font-weight: ${fontWeight};`,
			]}

			<p class={blockClasses.join(' ')} style={blockVariables.join(' ')}>
				<!-- [WIP] meilleure solution pour les {' '} -->
				{#each block.content as element, i}
					{#if element.type === 'word'}
						<!-- [WIP] exception pour le premier "publié" -->
						{@const isHidden =
							j === 0 && i === 0 && element.content === 'Publié'
								? false
								: !isRevealed(element.content)}
						<Word
							word={element.content}
							hidden={articleIsRevealed ? false : isHidden}
							highlighted={isHighlighted(element.content)}
							textStyle="{fontWeight} {fontSize}px {fontFamily}"
						/>{#if element.spaceAfter === true}{' '}{/if}
					{:else if element.type === 'punctuation'}
						<span class="punctuation">{element.content}</span
						>{#if element.spaceAfter === true}{' '}{/if}
					{/if}
				{/each}
			</p>
		{/each}
	</div>

	<!-- GUESS -->
	<div class="guesses">
		<p
			class="input"
			contenteditable="true"
			bind:innerText={inputText}
			on:keypress={handleKeyPress}
		/>

		<p>{guesses.length} essai{guesses.length > 1 ? 's' : ''}</p>
		<ul class="history">
			{#each guesses as guess, i (i)}
				{@const guessClasses = [
					'guess',
					isHighlighted(guess.word) ? 'guess-highlighted' : '',
					guess.occurrences === 0 ? 'guess-no-occurrence' : '',
				]}
				<li class={guessClasses.join(' ')} on:click={() => highlightGuess(guess.word)}>
					{i + 1}
					{guess.word} ({guess.occurrences}),
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss">
	.article {
		color: var(--c-primary);
		font-family: var(--ff-the-antiqua-b);
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		padding-bottom: 20vh;

		.block {
			line-height: 140%;
			font-family: var(--font-family), var(--ff-the-antiqua-b);
			font-size: var(--font-size);
			font-weight: var(--font-weight);
		}
	}

	.guesses {
		position: fixed;
		bottom: 0;
		height: 20vh;
		width: 100%;
		background-color: white;
		display: flex;
		flex-direction: column;

		.input {
			background-color: #ddd;
			border-bottom: 1px solid black;
		}

		.history {
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			overflow-y: scroll;
		}

		.guess.guess-highlighted {
			background-color: yellow;

			&.guess-no-occurrence {
				background-color: transparent;
				color: grey;
			}
		}
	}
</style>
