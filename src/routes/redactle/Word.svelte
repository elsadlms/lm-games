<script lang="ts">
	import { onMount } from 'svelte'
	import { clueCount, clueMode } from './store'

	export let index: number
	export let word: string
	export let hidden: boolean
	export let highlighted: boolean
	export let canBeClue: boolean
	export let textStyle: string
	export let revealWord: (word: string) => void

	// export let displayLettersCount: boolean;

	$: width = 0
	$: displayLettersCount = false

	let lettersCountTimeout: number | null = null

	const handleClick = () => {
		if ($clueMode === true) {
			if (canBeClue === false) return
			if (hidden === false) return

			clueCount.update((value) => {
				if (value === 0) return 0
				else return value - 1
			})

			revealWord(word)
			return
		}

		revealLettersCount()
	}

	const revealLettersCount = () => {
		if (lettersCountTimeout != null) clearTimeout(lettersCountTimeout)

		displayLettersCount = true

		lettersCountTimeout = setTimeout(() => {
			displayLettersCount = false
		}, 2000)
	}

	const getWordWidth = (word: string, font: string) => {
		const canvas = document.createElement('canvas')
		const context = canvas.getContext('2d')

		if (context === null || context === undefined) return

		context.font = font

		return context.measureText(word).width
	}

	onMount(() => {
		width = getWordWidth(word, textStyle) ?? 0
	})

	const wordId = `word_${index}`

	$: wordClasses = ['word', highlighted ? 'word_highlighted' : '']
	$: cacheClasses = [
		'cache',
		canBeClue ? 'cache_clue' : '',
		!hidden ? 'cache_inactive' : '',
		displayLettersCount ? 'cache_letter-count' : '',
	]
	$: cacheVariables = [`--width: ${width};`]
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id={wordId} class="container" on:click={handleClick}>
	{#if hidden === false}
		<span class={wordClasses.join(' ')}>
			{word}
		</span>
	{/if}
	<span
		class={cacheClasses.join(' ')}
		data-word-length={word.length}
		style={cacheVariables.join(' ')}
	/>
</div>

<style lang="scss">
	.container {
		display: inline-grid;
	}

	.word,
	.cache {
		grid-area: 1 / -1;
	}

	.word {
		background-color: transparent;
		transition: 2000ms;
		position: relative;
		z-index: 0;

		&.word_highlighted {
			&::before {
				content: '';
				display: inline-block;
				position: absolute;
				border-radius: 2px;
				height: 1.1em;
				top: 0.2em;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: -1;
				animation: 200ms ease-out highlightBackground forwards;
			}
		}
	}

	@keyframes highlightBackground {
		100% {
			background-color: var(--c-highlight-light);
		}
	}

	.cache {
		height: 1.1em;
		width: calc(var(--width) * 1px);
		background-color: var(--c-primary);
		position: relative;
		top: 0.2em;
		cursor: pointer;
		transition: calc(var(--width) * 5ms) ease-in;
		transform-origin: 100%;

		&.cache_inactive {
			transform: scaleX(0);
		}

		&::after {
			content: attr(data-word-length);
			color: #bbb;
			font-family: monospace;
			font-size: 0.7em;
			position: absolute;
			right: 0;
			line-height: 100%;
			padding: 0.1em;
			opacity: 0;
			transition: opacity 400ms;
		}

		&.cache_letter-count::after {
			opacity: 1;
		}

		&::before {
			// [WIP] trouver mieux
			content: 'i';
			color: transparent;
		}
	}

	:global(.container_clue-mode .cache.cache_clue) {
		background-color: var(--c-highlight-light);
	}
</style>
