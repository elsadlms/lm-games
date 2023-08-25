<script lang="ts">
	import { onMount } from 'svelte'

	export let word: string
	export let hidden: boolean
	export let highlighted: boolean
	export let textStyle: string
	// export let displayLettersCount: boolean;

	$: width = 0
	$: displayLettersCount = false

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

	$: wordClasses = ['word', highlighted ? 'word-highlighted' : '']
	$: cacheClasses = [
		'cache',
		!hidden ? 'cache-inactive' : '',
		displayLettersCount ? 'cache-letter-count' : '',
	]
	$: cacheVariables = [`--width: ${width};`]
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container" on:click={toggleLettersCount}>
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

		&.word-highlighted {
			&::before {
				content: '';
				display: inline-block;
				position: absolute;
				height: 1.1em;
				top: 0.2em;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: -1;
				animation: 600ms ease-out highlightBackground forwards;
			}
		}
	}

	@keyframes highlightBackground {
		100% {
			background-color: yellow;
		}
	}

	.cache {
		height: 1.1em;
		width: calc(var(--width) * 1px);
		background-color: var(--c-primary);
		position: relative;
		top: 0.2em;
		cursor: pointer;
		transition: calc(var(--width) * 10ms) ease-in;
		transform-origin: 0;

		&.cache-inactive {
			transform: scaleX(0);
		}

		&.cache-letter-count::after {
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
			content: 'cache';
			color: transparent;
		}
	}
</style>
