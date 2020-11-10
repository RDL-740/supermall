<template>
	<div class="goods">
		<GoodsListItem v-for="(item, index) in goods" :key="index" :goodsItem="item"></GoodsListItem>
	</div>
</template>

<script type="text/javascript">

	import GoodsListItem from './GoodsListItem'

	export default {

		name: 'GoodsList',
		data() {
			return {
				scroll: null
			}
		},

		components: {
			GoodsListItem,
		},

		props: {
			goods: {
				type: Array,
				default() {
					return []
				}
			}
		},

		// mounted() {
		// 	this.scroll = new BScroll(document.querySelector('.wrapper'), {})
		// }
	}
</script>




<style type="text/css">
	.goods {
		display: -webkit-flex;
		display: -moz-flex; 
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		-moz-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		-o-flex-wrap: wrap;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 2px;
		background-color: #fff;
	}
</style>