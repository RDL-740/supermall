<template>
	<div>
		<profile-head></profile-head>
		<profile-content></profile-content>
	</div>
</template>

<script type="text/javascript">
	import ProfileHead from './childComp/ProfileHead'
	import ProfileContent from './childComp/ProfileContent'
	export default {
		name: 'Profile',
		components: {
			ProfileHead,
			ProfileContent,
		}
	}
</script>

<style type="text/css">

</style>