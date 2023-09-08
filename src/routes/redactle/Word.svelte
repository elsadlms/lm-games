<script lang="ts">
	import { onMount } from 'svelte'
	import { clueMode } from './store'

	export let word: string
	export let hidden: boolean
	export let highlighted: boolean
	export let textStyle: string
	// export let displayLettersCount: boolean;

	$: width = 0
	$: displayLettersCount = false

	const handleClick = () => {
		if ($clueMode) console.log('clue!')
		else toggleLettersCount()
	}

	const toggleLettersCount = () => {
		displayLettersCount = !displayLettersCount
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

	$: wordClasses = ['word', highlighted ? 'word_highlighted' : '']
	$: cacheClasses = [
		'cache',
		!hidden ? 'cache_inactive' : '',
		displayLettersCount ? 'cache__letter-count' : '',
	]
	$: cacheVariables = [`--width: ${width};`]
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container" on:click={handleClick}>
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
			background-color: var(--c-bg-guess-highlighted-light);
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

		&.cache__letter-count::after {
			content: attr(data-word-length);
			color: #bbb;
			font-family: monospace;
			font-size: 0.7em;
			position: absolute;
			right: 0;
			line-height: 100%;
			padding: 0.1em;
		}

		&::before {
			// [WIP] trouver mieux
			content: 'i';
			color: transparent;
		}
	}
</style>
