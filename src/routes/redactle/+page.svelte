<script lang="ts">
	import type { Article } from '~/types'

	import { getRandomElementFromArray } from '~/utils/index'
	import { normalizeString } from '~/utils/textFunctions'
	import { smallWords, getWordGroup } from '~/utils/dictionary'

	import { articles } from '~/data/redactle/articles'

	import { prepareArticle, getWordFrequencyInArticle } from './articleFunctions'
	import { getTextStyle } from './textStyles'

	import Word from './Word.svelte'

	const article: Article = getRandomElementFromArray(articles as [])
	const articleData = prepareArticle(article)

	$: guesses = [] as string[]
	$: revealedWords = [...smallWords] as string[]

	$: isRevealed = (word: string) => {
		let normalizedWord = normalizeString(word)
		return revealedWords.includes(normalizedWord)
	}

	$: highlightedGuess = '' as string
	$: highlightedWords = getWordGroup(highlightedGuess)

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

			// si on soumet un mot déjà révélé
			if (revealedWords.includes(normalizeString(cleanGuess))) {
				const duplicateGuess = guesses.find((guess) => {
					return getWordGroup(guess).includes(normalizeString(cleanGuess))
				})
				// ...on highlight à nouveau le mot
				highlightGuess(duplicateGuess)
				inputText = ''
				return
			}

			const wordsToReveal = getWordGroup(cleanGuess)

			guesses = [...guesses, cleanGuess]
			revealedWords = [...revealedWords, ...wordsToReveal]

			highlightGuess(cleanGuess)
			inputText = ''
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div>
	<!-- ARTICLE -->
	<div class="article">
		{#each articleData as block}
			{@const { fontFamily, fontSize, fontWeight } = getTextStyle(block.type)}

			{@const blockClasses = ['block', `block-${block.type}`]}
			{@const blockVariables = [
				`--font-family: ${fontFamily};`,
				`--font-size: ${fontSize}px;`,
				`--font-weight: ${fontWeight};`,
			]}

			<p class={blockClasses.join(' ')} style={blockVariables.join(' ')}>
				{#each block.content as element}
					{#if element.type === 'word'}
						<Word
							word={element.content}
							hidden={!isRevealed(element.content)}
							highlighted={isHighlighted(element.content)}
							textStyle="{fontWeight} {fontSize}px {fontFamily}"
						/>
					{:else if element.type === 'punctuation'}
						<span class="punctuation">{element.content}</span>
					{/if}
					{' '}
				{/each}
			</p>
		{/each}
	</div>

	<!-- GUESS -->
	<div class="guesses">
		<p
			class="input"
			contenteditable="true"
			bind:innerHTML={inputText}
			on:keypress={handleKeyPress}
		/>

		<ul class="history">
			{#each guesses as guess}
				{@const guessOccurrencies = getWordFrequencyInArticle(guess, articleData)}
				{@const guessClasses = [
					'guess',
					isHighlighted(guess) ? 'guess-highlighted' : '',
					guessOccurrencies === 0 ? 'guess-no-occurrence' : '',
				]}
				<li class={guessClasses.join(' ')} on:click={() => highlightGuess(guess)}>
					{guess} ({guessOccurrencies}),
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
				background-color: grey;
			}
		}
	}
</style>
