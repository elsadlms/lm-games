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
	$: cacheClasses = ['cache', displayLettersCount ? 'cache-letter-count' : '']
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container" on:click={toggleLettersCount}>
	{#if hidden === false}
		<span class={wordClasses.join(' ')}>
			{word}
		</span>
	{:else}
		<span
			class={cacheClasses.join(' ')}
			data-word-length={word.length}
			style="--width: {width}px;"
		/>
	{/if}
</div>

<style lang="scss">
	.container {
		display: inline-grid;
	}

	.word,
	.cache {
		grid-area: 1 / -1;
	}

	// [WIP] hidden low-cost !!
	.word.word-hidden {
		background-color: pink;
		color: plum;
		color: pink;
		position: relative;
	}

	.word.word-highlighted {
		background-color: yellow;
	}

	.cache {
		height: 1em;
		width: var(--width);
		background-color: var(--c-primary);
		position: relative;
		top: 0.2em;
		cursor: pointer;

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
	}
</style>
