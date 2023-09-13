<script lang="ts">
	import type { Article } from '~/types/Article'

	import { getRandomElementFromArray } from '~/utils'

	import { onboarding } from './constants/onboarding'

	import { articles } from '~/data/date-article/articles'

	import CloseIcon from '~/components/icons/CloseIcon.svelte'

	const article: Article = getRandomElementFromArray(articles as [])

	const yearStart = 1944
	const yearEnd = new Date().getFullYear()

	$: displayUserGuide = false

	$: isYearSubmitted = false
	$: isArticleFullyDisplayed = false
	$: nodesToDisplayCount = 1
	$: nodesToDisplay = article.nodes.slice(0, nodesToDisplayCount)
	$: selectedYear = yearEnd
	$: score = Math.abs(article.publicationYear - selectedYear)

	const closeUserGuide = () => {
		displayUserGuide = false
	}

	const displayNextNode = () => {
		if (isArticleFullyDisplayed === true) return

		nodesToDisplayCount++
		if (nodesToDisplayCount === article.nodes.length) isArticleFullyDisplayed = true
	}

	const submitDate = () => {
		isYearSubmitted = true
	}

	$: displayNextNodeButton = [
		'display-next-button',
		isArticleFullyDisplayed === true ? 'display-next-button_disabled' : '',
	]
	$: sliderClasses = ['slider', isYearSubmitted === true ? 'slider-inactive' : '']
	$: userInfoClasses = ['user-guide', displayUserGuide === true ? '' : 'user-guide_hidden']
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<div class="container">
	<div class={userInfoClasses.join(' ')}>
		<div>
			{#each onboarding as paragraph}
				<p>{@html paragraph}</p>
			{/each}
		</div>
		<span class="close-icon" on:click={closeUserGuide}>
			<CloseIcon fillColor={'var(--lmui-c-sea-medium)'} />
		</span>
	</div>

	<div class="article">
		<div class="article__content">
			{#each nodesToDisplay as node}
				<p class={node.type}>
					{node.content}
				</p>
			{/each}
		</div>

		<p class={displayNextNodeButton.join(' ')} on:click={displayNextNode}>
			Afficher le paragraphe suivant
		</p>
	</div>

	<div>
		<div>
			<input
				bind:value={selectedYear}
				type="range"
				min={yearStart}
				max={yearEnd}
				class={sliderClasses.join(' ')}
			/>
			<p>{selectedYear}</p>
		</div>

		<p on:click={submitDate}>Valider</p>

		{#if isYearSubmitted === true}
			<div>
				<p>Cet article a été publié en {article.publicationYear}</p>
				<p>Écart : {score}</p>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		width: var(--main-column-width);
		max-width: var(--main-column-max-width);
		height: 100vh;
		display: grid;
		grid-template-rows: 1fr auto;
		margin: 0 auto;
		padding: 48px 0;
		justify-content: center;
	}

	.user-guide {
		position: absolute;
		top: 24px;
		width: var(--main-column-width);
		max-width: var(--main-column-max-width);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 48px;
		transition: opacity 200ms;
		background-color: var(--lmui-c-sea-lighter);
		color: var(--lmui-c-sea-medium);
		padding: 24px;
		border-radius: 12px;

		p + p {
			margin-top: 0.6em;
		}

		.close-icon {
			height: 10px;
			width: 10px;
			line-height: 0;
			cursor: pointer;
			flex-shrink: 0;
			align-self: flex-start;
		}

		&.user-guide_hidden {
			opacity: 0;
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
		color: var(--c-primary);
		font-family: var(--ff-the-antiqua-b-non-variable);
		font-style: normal;
		font-weight: 500;
		font-size: 18px;

		padding: 64px;
		padding-bottom: 0;
		overflow-y: scroll;
		display: grid;
		grid-template-rows: 1fr auto;
		box-shadow: inset 0 -20px 30px #fff;

		p + p {
			margin-top: 1em;
		}

		.title {
			font-weight: 800;
			font-size: 42px;
		}

		> div p:last-child {
			padding-bottom: 64px;
		}
	}

	.display-next-button {
		position: sticky;
		bottom: 24px;
		justify-self: center;
		background-color: var(--lmui-c-white);
		padding: 8px 18px;
		border-radius: 24px;
		font-family: var(--ff-marr-sans);
		cursor: pointer;
		background: var(--lmui-c-sea-lighter);
		color: var(--lmui-c-sea-medium);
	}

	.slider.slider-inactive {
		pointer-events: none;
		filter: grayscale(1);
	}
</style>
