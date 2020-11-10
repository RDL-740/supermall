<template>
	<div id="detail">
		<detail-child class="detail-Nav"/>
		<scroll class="content" ref="scroll">
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-goods-info :detail-info="detailInfo"/>
			<detail-param-info :paramInfo="paramInfo" />
			<detail-comment-info :comment-info="commentInfo"/>
			<p class="dtitle">推荐</p>
			<goods-list :goods="recommend" id="recommend"/>
		</scroll>
	</div>
</template>

<script type="text/javascript">

	import DetailChild from './detailChild/DetailChild'
	import DetailSwiper from './detailChild/DetailSwiper'
	import DetailBaseInfo from './detailChild/DetailBaseInfo'
	import DetailShopInfo from './detailChild/DetailShopInfo'
	import DetailGoodsInfo from './detailChild/DetailGoodsInfo'
	import DetailParamInfo from './detailChild/DeatilParamsInfo'
	import DetailCommentInfo from './detailChild/DeatilCommentInfo'

	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'

	import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
	
	export default {
		name: 'Detail',
		components: {
			DetailChild,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
			Scroll
		},
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommend: [],
				name: 'rdl'
			}
		},
		methods: {
			imageLoad() {
				 this.$refs.scroll.refresh()
			}
		},
		created() {
			// 保存传入的id 
			this.iid = this.$route.params.id

			// 2. 根据id请求详细数据
			getDetail(this.iid).then(res => {

				const data = res.data.result
				//console.log(data)
				// 1.获取轮播图数据
				this.topImages = Object.values((data.itemInfo.topImages))
				
				// 2.获取商品数据
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				//console.log(this.goods)
				
				// 3. 获取店铺信息
				this.shop = new Shop(data.shopInfo)

				// 4.保存商品的详细数据
				this.detailInfo = data.detailInfo

				// 5.获取商品尺码参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

				// 6.获取评论数据
				if(data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0]
				}
			}) 
			// 3.请求推荐数据
			getRecommend().then(res => {
				//console.log(res)
				this.recommend = res.data.data.list
				//console.log(this.recommend)
			})
		},

	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 99;
		background-color: #fff;
		height: 100vh;
	}
	.detail-nav {
		position: relative;
		z-index: 99;
		background-color: #fff;
	}
	.content {
		height: calc(100% - 44px);
		overflow: hidden;
	}
	#recommend {
		position: relative;
	}
	.dtitle {
		text-align: center;
		font-size: 12px;
	}
</style>