<script lang="ts">
	export let width: number = 20
	export let height: number = 20
	export let fillColor: string = '#000000'
</script>

<svg xmlns="http://www.w3.org/2000/svg" {width} {height} viewBox="0 0 {width} {height}" fill="none">
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M9.4266 11.648L1.88525 19.1894L-8.11815e-05 17.304L7.54126 9.76269L2.14544e-06 2.22143L1.88534 0.3361L9.4266 7.87736L16.9679 0.336037L18.8533 2.22137L11.3119 9.76269L18.8533 17.3041L16.968 19.1894L9.4266 11.648Z"
		fill={fillColor}
	/>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}
</style>
