<script lang="ts">
	import { onMount } from 'svelte'

	import type { Article, ArticleElement, ArticleNode } from '~/types'
	import { clueMode, clueCount } from './store'

	import { getRandomElementFromArray } from '~/utils/index'

	import { articles } from '~/data/redactle/articles'

	import { normalizeString } from './constants/textFunctions'
	import { smallWords, getCloseWords } from './constants/dictionary'
	import { prepareArticle, getWordsOccurencesInArticle } from './constants/articleFunctions'
	import { getTextStyle } from './constants/textStyles'
	import { onboarding } from './constants/onboarding'

	import Word from './components/Word.svelte'
	import CloseIcon from './components/icons/CloseIcon.svelte'
	import ToggleIcon from './components/icons/ToggleIcon.svelte'

	const personalityOfTheDay = 'David Bowie'
	const article: Article = articles.find(
		(article) => article.personality === personalityOfTheDay,
	) as Article
	const articleData: ArticleNode[] = prepareArticle(article)

	const answerArray: string[] = article.personality
		? article.personality.split(' ').map((word) => normalizeString(word))
		: []

	// DEV
	$: displayRevealedWords = false

	$: isArticleReady = false
	$: isArticleRevealed = false
	$: isGuessesPanelOpen = true
	$: displayUserGuide = true
	$: displayCluePanel = $clueMode === true && $clueCount > 0

	$: userGuideHeight = 0
	$: cluePanelHeight = 0

	let inputText = ''

	onMount(() => {
		setTimeout(() => {
			isArticleReady = true
		}, 200)
	})

	const closeUserGuide = () => {
		displayUserGuide = false
	}

	const toggleGuessesPanel = () => {
		if (isGuessesPanelOpen === false) isGuessesPanelOpen = true
		else isGuessesPanelOpen = false
	}

	const toggleClueMode = () => {
		clueMode.update((value) => {
			if (value === false) return true
			else return false
		})

		if ($clueMode === true) {
			highlightedGuess = ''
			resetHighlight()
		}
	}

	const finishGame = () => {
		isArticleRevealed = true
		highlightedGuess = ''
		resetHighlight()
	}

	$: isArticleSolved = () => {
		return answerArray.every((word) => revealedWords.includes(word))
	}

	$: isWordInAnswer = (word: string) => {
		return answerArray.includes(normalizeString(word))
	}

	$: canBeClue = ({ word, type }: { word: string; type: string }) => {
		if (type === 'title') return false
		if (type === 'publication') return false
		if (isWordInAnswer(word)) return false
		return true
	}

	$: guesses = [] as { word: string; occurrences: number }[]
	$: revealedWords = [...smallWords] as string[]

	$: isWordRevealed = (word: string) => {
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

	const scrollToWord = (word: ArticleElement) => {
		if ($clueMode === true) {
			if ($clueCount === 0) clueMode.set(false)
			return
		}

		document.querySelector(`#word_${word.index}`)?.scrollIntoView({ behavior: 'smooth' })
	}

	const scrollToNextWord = () => {
		indexIntoView++
		if (indexIntoView === highlightedWords.length) indexIntoView = 0
		scrollToWord(highlightedWords[indexIntoView])
	}

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

		if (isArticleSolved() === true) isArticleRevealed = true
		highlightGuess(word)
	}

	const resetHighlight = () => {
		highlightedWords = []
		indexIntoView = 0
	}

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			e.preventDefault()

			// si article dévoilé ou mode indice, on ne fait rien
			if (isArticleRevealed === true) return
			if ($clueMode === true) return

			// si champ vide, on scrolle au mot suivant
			if (inputText.trim() === '') {
				if (wordsToHighlight.length > 0) scrollToNextWord()
				return
			}

			if (inputText.includes(' ')) {
				// [WIP] ajouter erreur/avertissement/explication
				return
			}

			const cleanGuess = inputText.trim().toLowerCase()
			revealWord(cleanGuess)
			resetHighlight()
			inputText = ''
		}
	}

	$: containerClasses = [
		'container',
		isArticleReady ? 'container_ready' : '',
		displayCluePanel ? 'container_clue-mode' : '',
	]
	$: containerVariables = [
		`--user-guide-height: ${userGuideHeight}px;`,
		`--clue-panel-height: ${cluePanelHeight}px;`,
	]
	$: guessesPanelClasses = ['guesses', isGuessesPanelOpen ? '' : 'guesses_hidden']
	$: userGuideClasses = ['info-block', 'user-guide', displayUserGuide ? '' : 'user-guide_hidden']
	$: clueButtonClasses = ['clue-button', $clueCount === 0 ? 'clue-button_disabled' : '']
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<div class={containerClasses.join(' ')} style={containerVariables.join(' ')}>
	<!-- CLUE MODE -->
	<div bind:offsetHeight={cluePanelHeight} class="clue-panel__container">
		<div class="info-block clue-panel">
			<span>
				Tapez sur un mot pour le révéler. Vous pouvez encore utiliser
				<span class="bold">{$clueCount} indice{$clueCount > 1 ? 's' : ''}</span>.
			</span>
			<span class="clue-panel__quit" on:click={toggleClueMode}>
				<span>Revenir au jeu</span>
				<span class="close-icon">
					<CloseIcon fillColor={'var(--c-highlight-dark)'} />
				</span>
			</span>
		</div>
	</div>

	<!-- GUIDE -->
	<div bind:offsetHeight={userGuideHeight} class="user-guide__container">
		<div class={userGuideClasses.join(' ')}>
			<div>
				{#each onboarding as paragraph}
					<p>{@html paragraph}</p>
				{/each}
			</div>
			<span class="close-icon" on:click={closeUserGuide}>
				<CloseIcon fillColor={'var(--lmui-c-sea-medium)'} />
			</span>
		</div>
	</div>

	<!-- ARTICLE -->
	<div class="article">
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
						{@const isWordHidden =
							j === 0 && i === 0 && normalizeString(element.content) === 'publié'
								? false
								: !isWordRevealed(element.content)}
						<Word
							{revealWord}
							canBeClue={canBeClue({ word: element.content, type: block.type })}
							index={element.index}
							word={element.content}
							hidden={isArticleRevealed ? false : isWordHidden}
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
	<div class={guessesPanelClasses.join(' ')}>
		<span class="guesses__toggle" on:click={toggleGuessesPanel}>
			<ToggleIcon fillColor={'var(--lmui-c-smoke-medium)'} />
		</span>

		<div class="input__flex-container">
			<input
				class="input"
				placeholder="Devinez un mot"
				type="text"
				contenteditable="true"
				bind:value={inputText}
				on:keypress={handleKeyPress}
			/>
			<p class={clueButtonClasses.join(' ')} on:click={toggleClueMode}>Un&nbsp;indice&nbsp;?</p>
		</div>

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
				<p>{$clueCount}/3 indices</p>
			</div>
			<div class="bar__quit">
				<p on:click={finishGame}>Abandonner</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.bold {
		font-weight: 500;
	}

	.container {
		width: var(--main-column-width);
		max-width: var(--main-column-max-width);
		margin: 48px auto;

		--user-guide-row-height: var(--user-guide-height);
		--clue-panel-row-height: 0;

		display: grid;
		grid-template-rows: var(--clue-panel-row-height) var(--user-guide-row-height) 1fr;
		transition: grid-template-rows 200ms, grid-gap 200ms;

		&.container_clue-mode {
			--clue-panel-row-height: var(--clue-panel-height);
		}

		&:has(.user-guide_hidden) {
			--user-guide-row-height: 0;

			.clue-panel__container {
				padding-bottom: 48px;
			}
		}
	}

	.info-block {
		padding: 24px;
		border-radius: 12px;
		display: flex;
		gap: 12px;
		align-items: center;
		justify-content: space-between;
		transition: opacity 200ms;
	}

	.close-icon {
		height: 10px;
		width: 10px;
		line-height: 0;
		cursor: pointer;
		flex-shrink: 0;
	}

	.clue-panel__container {
		padding-bottom: 16px;
		height: max-content;
		position: sticky;
		top: 0;
		z-index: 5;
		opacity: 0;
		transition: opacity 200ms;
		pointer-events: none;
	}

	.clue-panel {
		border-radius: 0;
		background-color: var(--c-highlight-dark);
		height: max-content;
		color: #fff;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: flex-start;
		gap: 18px;

		&__quit {
			display: flex;
			align-items: center;
			gap: 12px;
			background: #fff;
			border-radius: 24px;
			padding: 8px 16px;
			font-weight: 500;
			color: var(--c-highlight-dark);
			cursor: pointer;
			transition: opacity 200ms;

			&:hover {
				opacity: 0.8;
			}
		}
	}

	.user-guide__container {
		padding-bottom: 48px;
		height: max-content;
	}

	.user-guide {
		background-color: var(--lmui-c-sea-lighter);
		color: var(--lmui-c-sea-medium);
		position: relative;
		gap: 48px;
		opacity: 0;

		p + p {
			margin-top: 0.6em;
		}

		.close-icon {
			align-self: flex-start;
		}

		@media (max-width: 800px) {
			flex-direction: column-reverse;
			align-self: flex-end;
			gap: 12px;

			.close-icon {
				align-self: flex-end;
			}
		}
	}

	.article {
		background-color: var(--lmui-c-white);
		box-shadow: 0px 15px 60px 2px rgba(1, 54, 79, 0.07);
		padding: 64px;
		color: var(--c-primary);
		font-family: var(--ff-the-antiqua-b-non-variable);
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		padding-bottom: 20vh;
		opacity: 0;
		transition: opacity 200ms, margin-top 200ms;

		p + p {
			margin-top: 1em;
		}

		.block {
			line-height: 140%;
			font-family: var(--font-family), var(--ff-the-antiqua-b-non-variable);
			font-size: var(--font-size);
			font-weight: var(--font-weight);

			&.block_title {
				margin-top: 0.33em;
			}
		}

		@media (max-width: 800px) {
			padding: 24px;
		}
	}

	.guesses {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%) translateY(0);
		width: calc(var(--main-column-width) + 64px);
		max-width: calc(var(--main-column-max-width) + 64px);
		height: auto;
		max-height: 50vh;
		min-height: 20vh;
		width: 100%;
		background-color: var(--lmui-c-slate-darker);
		box-shadow: 0px -6px 24px 0px rgba(0, 0, 0, 0.25);
		color: var(--lmui-c-smoke-light);
		border-radius: 12px 12px 0 0;
		padding: 24px;
		padding-top: 12px;
		display: flex;
		flex-direction: column;
		opacity: 0;
		transition: opacity 200ms, transform 200ms;

		.guesses__toggle {
			align-self: center;
			padding-bottom: 8px;
			cursor: pointer;

			svg {
				transition: transform 200ms;
				transform: rotate(180deg);
			}
		}

		.input__flex-container {
			display: flex;
			align-items: center;
			gap: 16px;
		}

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

		.clue-button {
			background-color: var(--lmui-c-snow-darker);
			color: var(--lmui-c-slate-dark);
			padding: 8px;
			align-self: stretch;
			display: flex;
			align-items: center;
			padding: 0 12px;
			border-radius: var(--lmui-c-rounded-search-radius);
			font-weight: 500;
			cursor: pointer;
			transition: background-color 200ms;

			&:hover {
				background-color: var(--lmui-c-snow-light);
			}

			&.clue-button_disabled {
				cursor: default;
				opacity: 0.2;
			}
		}

		.history {
			display: flex;
			gap: 8px;
			flex-wrap: wrap;
			list-style: none;
			overflow-y: scroll;
			scrollbar-color: var(--lmui-c-slate-darker);
			padding: 16px 0;

			&::-webkit-scrollbar {
				background-color: var(--lmui-c-slate-darker);
			}
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
				background-color: var(--c-highlight-medium);
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
				display: flex;
				gap: 16px;
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

	.guesses.guesses_hidden {
		transform: translateX(-50%) translateY(calc(100% - 40px));

		.guesses__toggle {
			svg {
				transform: rotate(0);
			}
		}
	}

	.container_ready {
		.guesses {
			opacity: 1;
		}

		.article {
			opacity: 1;
		}

		/* WIP - clean et aligner sur clue-panel */
		.user-guide {
			opacity: 1;

			&.user-guide_hidden {
				opacity: 0;
			}
		}
	}

	.container_clue-mode {
		.clue-panel__container {
			opacity: 1;
			pointer-events: all;
		}

		.guesses > * {
			opacity: 0.2;
			pointer-events: none;

			input {
				pointer-events: none;
			}
		}
	}

	:global(.block.block_publication .cache) {
		top: 0;
	}

	:global(.block.block_publication .word.word_highlighted::before) {
		top: 0;
	}

	:global(.block.block_publication .word) {
		opacity: 0.8;
	}
</style>
