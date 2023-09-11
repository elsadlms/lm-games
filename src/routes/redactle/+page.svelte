<script lang="ts">
	import { onMount } from 'svelte'

	import type { Article, ArticleElement, ArticleNode } from '~/types'
	import { clueMode } from './store'

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

	$: ready = false

	const toggleClueMode = () => {
		clueMode.update((value) => {
			if (value === false) return true
			else return false
		})
	}

	onMount(() => {
		ready = true
	})

	// [WIP] à clean
	$: articleIsSolved = () => {
		return answerArray.every((word) => revealedWords.includes(word))
	}
	$: articleIsRevealed = false

	$: finishGame = () => {
		articleIsRevealed = true
	}

	$: isInAnswer = (word: string) => {
		return answerArray.includes(normalizeString(word))
	}

	$: guesses = [] as { word: string; occurrences: number }[]
	$: revealedWords = [...smallWords] as string[]

	$: isRevealed = (word: string) => {
		let normalizedWord = normalizeString(word)
		return revealedWords.includes(normalizedWord)
	}

	$: highlightedGuess = '' as string
	$: wordsToHighlight = getCloseWords(highlightedGuess)
	$: highlightedWords = [] as ArticleElement[]
	$: indexIntoView = 0

	$: highlightGuess = (word?: string) => {
		if (word === undefined) return

		if (highlightedGuess === normalizeString(word)) {
			scrollToNextWord()
			return
		}

		resetHighlight()
		highlightedGuess = normalizeString(word)
	}

	$: isWordHighlighted = (word: ArticleElement) => {
		const normalizedWord = normalizeString(word.content)

		if (wordsToHighlight.includes(normalizedWord)) {
			highlightedWords.push(word)
			if (highlightedWords.length === 1) scrollToWord(word)
			return true
		}

		return false
	}

	$: isGuessHighlighted = (guess: string) => {
		let normalizedWord = normalizeString(guess)
		return wordsToHighlight.includes(normalizedWord)
	}

	const scrollToNextWord = () => {
		indexIntoView++
		if (indexIntoView === highlightedWords.length) indexIntoView = 0
		scrollToWord(highlightedWords[indexIntoView])
	}

	const scrollToWord = (word: ArticleElement) => {
		document.querySelector(`#word_${word.index}`)?.scrollIntoView({ behavior: 'smooth' })
	}

	let inputText = ''

	const revealWord = (word: string) => {
		const normalizedWord = normalizeString(word)

		// si on soumet un mot déjà révélé
		if (revealedWords.includes(normalizedWord)) {
			const duplicateGuess = guesses.find((guess) => {
				return getCloseWords(guess.word).includes(normalizedWord)
			})
			// ...on highlight à nouveau le mot
			highlightGuess(duplicateGuess?.word)
			return
		}

		const wordsToReveal = getCloseWords(normalizedWord)
		const guessOccurrences = getWordsOccurencesInArticle(wordsToReveal, articleData)

		// guesses.push()
		guesses = [{ word, occurrences: guessOccurrences }, ...guesses]
		revealedWords = [...revealedWords, ...wordsToReveal]

		if (articleIsSolved()) articleIsRevealed = true
		highlightGuess(word)
	}

	const resetHighlight = () => {
		highlightedWords = []
		indexIntoView = 0
	}

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			e.preventDefault()

			// si article dévoilé, on ne fait rien
			if (articleIsRevealed === true) return

			// si champ vide, on scrolle au mot suivant
			if (inputText.trim() === '') {
				if (wordsToHighlight.length > 0) scrollToNextWord()
				return
			}

			const cleanGuess = inputText.trim().toLowerCase()
			revealWord(cleanGuess)
			resetHighlight()
			inputText = ''
		}
	}

	$: articleClasses = ['article', ready ? 'article_ready' : '']
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div>
	<!-- [DEV] REVEALED WORDS -->
	<!-- <div style="border-bottom: 1px solid #ddd;">
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
	</div> -->
	<!-- <div>
		<p on:click={toggleClueMode}>toggle clueMode</p>
		<p>clueMode? {$clueMode}</p>
	</div> -->

	<!-- ARTICLE -->
	<div class={articleClasses.join(' ')}>
		{#each articleData as block, j}
			{@const { fontFamily, fontSize, fontWeight } = getTextStyle(block.type)}

			{@const blockClasses = ['block', `block_${block.type}`]}
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
							j === 0 && i === 0 && normalizeString(element.content) === 'publié'
								? false
								: !isRevealed(element.content)}
						<Word
							index={element.index}
							word={element.content}
							hidden={articleIsRevealed ? false : isHidden}
							highlighted={isWordHighlighted(element)}
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

		<ul class="history">
			{#each guesses as guess, i (i)}
				{@const guessClasses = [
					'guess',
					isGuessHighlighted(guess.word) ? 'guess_highlighted' : '',
					guess.occurrences === 0 ? 'guess_no-occurrence' : '',
				]}
				<li class={guessClasses.join(' ')} on:click={() => highlightGuess(guess.word)}>
					<!-- {i + 1} -->
					<span class="guess__word">{guess.word}</span>{' '}
					<span class="guess__occurrences">{guess.occurrences}</span>
				</li>
			{/each}
		</ul>

		<div class="bar">
			<div class="bar__stats">
				<p>{guesses.length} essai{guesses.length > 1 ? 's' : ''}</p>
			</div>
			<div class="bar__quit">
				<p on:click={finishGame}>Abandonner</p>
			</div>
		</div>
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
		opacity: 0;
		transition: opacity 200ms;

		&.article_ready {
			opacity: 1;
		}

		p + p {
			margin-top: 1em;
		}

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
		left: 0;
		height: 20vh;
		width: 100%;
		background-color: var(--lmui-c-slate-darker);
		box-shadow: 0px -6px 24px 0px rgba(0, 0, 0, 0.25);
		color: var(--lmui-c-smoke-light);
		border-radius: 12px 12px 0 0;
		padding: 24px;
		display: flex;
		flex-direction: column;

		.input {
			--input-height: 42px;
			box-sizing: border-box;
			height: var(--input-height);
			line-height: var(--input-height);
			width: 100%;
			padding: 0 0 0 16px;
			border-radius: var(--lmui-c-rounded-search-radius);
			border: 1px solid var(--lmui-c-main-search-border);
			font-family: var(--ff-marr-sans);
			font-size: 16px;
			font-weight: 400;
			letter-spacing: -0.015em;
			color: var(--lmui-c-main-search-type);
			color: #fff;

			background: transparent;
			box-shadow: inset 0px 1px 1px 1px rgba(0, 0, 0, 0.09), 0px 4px 6px 2px rgba(0, 0, 0, 0);
			transition: 0.3s ease-in;
		}

		.history {
			display: flex;
			gap: 8px;
			flex-wrap: wrap;
			list-style: none;
			// overflow-y: scroll;
			padding: 16px 0;
		}

		.guess {
			padding: 4px 8px;
			border-radius: 1em;
			font-weight: 200;
			background-color: var(--c-bg-guess);
			color: var(--c-text-guess);
			transition: color 400ms, background-color 400ms;
			cursor: pointer;

			&.guess_highlighted {
				background-color: var(--c-bg-guess-highlighted);
				color: var(--c-text-guess-highlighted);
			}

			&.guess_no-occurrence {
				background-color: var(--c-bg-guess-highlighted-no-occurrence);
				color: var(--c-text-guess-highlighted-no-occurrence);
				cursor: default;
			}

			&__word {
				font-weight: 500;
			}
		}

		.bar {
			margin-top: auto;
			display: flex;
			justify-content: space-between;
			font-weight: 500;

			&__stats {
				font-family: var(--ff-marr-sans-condensed);
				text-transform: uppercase;
				letter-spacing: 0.08em;
			}

			&__quit {
				text-decoration: underline;
				text-decoration-thickness: 0.1em;
				text-underline-offset: 0.3em;
				cursor: pointer;
				transition: color 200ms;

				&:hover {
					color: var(--lmui-c-snow-darker);
				}
			}
		}
	}

	:global(.block.block_publication .cache) {
		top: 0;
	}

	:global(.block.block_publication .word) {
		opacity: 0.8;
	}
</style>
