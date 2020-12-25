<template>
	<div class="homerecomend">
		<div class="homerecomend_item" v-for="(item, index) in recommends" :key="index">
			<a :href="item.link">
				<img :src="item.image">
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'HomeRecomend',
		props: {
			recommends: {
				type: Array,
				default() {
					return [] 
				}
			}
		}
	}
</script>

<style type="text/css">
	.homerecomend {
		display: flex;
		width: 100%;
		font-size: 12px
	}
	.homerecomend_item {
		flex: 1;
		text-align: center;
		padding: 10px 0 20px 0;
		border-bottom: 10px solid #eee;
	}
	.homerecomend_item img {
		width: 65px; 
		height: 65px;
		margin-bottom: 10px;
	}
</style>