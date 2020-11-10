<template>
	<div class="goods-item" @click="goodItemClick">
		<!-- <a :href="goodsItem.link"> -->
			<img :src="showImg" @load="imgLoad">
			<div class="goods-info">
				<p>{{goodsItem.title}}</p>
				<span class="price">{{goodsItem.price}}</span>
				<span class="collect">{{goodsItem.cfav}}</span>
			</div>
		<!-- </a> -->
	</div>
</template>

<script type="text/javascript">

	export default {

		name: 'GoodsListItem',

		props: {
			goodsItem: {
				type: Object,
				default() {
					return {}
				} 
			}
		}, 

		methods: {
			imgLoad() {
				//console.log('图片加载完成')
				// 用事件总线发射事件
				this.$bus.$emit('itemImageLoad')
			},
			goodItemClick() {
				this.$router.push('/detail/' + this.goodsItem.iid)
				//console.log('详情页')
			}
		},
		computed: {
			showImg() {
				// 满足不同结构的数据需要
				return this.goodsItem.image || this.goodsItem.show.img
			}
		}
		// created() {
		// 	console.log(this.goodsItem)
		// }
	}
</script>

<style type="text/css">
	.goods-item {
		width: 48%;
		padding-bottom: 40px;
		position: relative;
	}
	.goods-item img {
		width: 100%;
		border-radius: 5px;
	}
	.goods-info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}
	.goods-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}
	.goods-info .price {
		color: var(--color-high-text);
		margin-right: 20px;
	}
	.goods-info .collect {
		position: relative;
	}
	.good-info .collect::before {
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
	} 
</style>