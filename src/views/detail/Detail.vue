<template>
	<div id="detail">
		<detail-child class="detail-Nav" @titleClick="titleClick" ref="nav"/>
		<scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-goods-info :detail-info="detailInfo" @detailImageLoad="imageLoad" />
			<detail-param-info ref="params" :paramInfo="paramInfo" />
			<detail-comment-info ref="comments" :comment-info="commentInfo"/>
			<p class="dtitle">推荐</p>
			<goods-list ref="recommends" :goods="recommend" id="recommend"/>
		</scroll>
		<detail-bottom-bar class="d-bar"  @adCart="addToCart" @toBuy="toBuy"/>
		<BackTop @click.native="backClick" v-show="isshowBackTop" />
		<toast :message="message" :show="show"/>
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
	import DetailBottomBar from './detailChild/DetailBottomBar'

	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'
	import Toast from 'components/common/toast/Toast'

	import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
	import {debounce} from 'common/utils.js'
	import {itemListenerMinix, backTopMixin} from 'common/mixin.js'
	import { mapActions } from 'vuex'
	
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
			DetailBottomBar,
			GoodsList,
			Scroll,
			Toast
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
				name: 'rdl',
				contenTopys: Array,
				currentIndex: 0,
				message: '',
				show: false

			}
		},
		methods: {
			// 运用mapActions将action中的方法映射到普通方法中
			...mapActions(['addCart']),
			imageLoad() {
				 this.Refresh()

				 //  给顶部navbar点击跳转到对应区域
				 this.$nextTick( ()=> {
					// 每次进入时赋空一下
					this.contenTopys = []
					this.contenTopys.push(0)
					this.contenTopys.push(this.$refs.params.$el.offsetTop)
					this.contenTopys.push(this.$refs.comments.$el.offsetTop)
					this.contenTopys.push(this.$refs.recommends.$el.offsetTop-45 )
					this.contenTopys.push(Number.MAX_VALUE)
					// console.log(this.contenTopys)
				 }) 
			}, 
			contentScroll(position) {
				// 1.获取y值
				const positiony = -position.y 
				//console.log(positiony)
				//
				this.isshowBackTop = (-position.y) > 1000

				// 2.与nav中主题的值进行比较
				
				let length = this.contenTopys.length
				for(let i = 0; i < length; i++) {

					// hack一点的方法
					if(this.currentIndex !== i && (positiony >= this.contenTopys[i] && positiony <= this.contenTopys[i+1])){
						this.currentIndex = i
						this.$refs.nav.currentIndex = this.currentIndex
					}
				} 
			},
			titleClick(index) {
				this.$refs.scroll.scrollTo(0, -this.contenTopys[index], 800)
				// console.log(index)
			},

			// 加入购物车
			addToCart() {
				// 获取购物车需要展示的信息
				const product = {}
				product.image = this.topImages[0]
				product.title = this.goods.title
				this.desc = this.goods.desc
				product.price = this.goods.realPrice
				product.iid = this.iid
				this.addCart(product).then(res => {
					// 将totast封装后直接调用
					this.$toast.show(res,1500)
				})
			},
			toBuy() {
				const product = {}
				product.image = this.topImages[0]
				product.title = this.goods.title
				this.desc = this.goods.desc
				product.price = this.goods.realPrice
				product.iid = this.iid
				this.addCart(product).then(res => {
					// 跳转到购物车页面
					this.$router.replace({path: '/cart'})
				})
				console.log("购买")
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
				// console.log(this.recommend)
			})
			// 4.获取各组件的offsetTop的值
			// 组件挂载就进行一次计算
			 this.$nextTick( ()=> {
					// 每次进入时赋空一下
					this.contenTopys = []

					this.contenTopys.push(0)
					this.contenTopys.push(this.$refs.params.$el.offsetTop)
					this.contenTopys.push(this.$refs.comments.$el.offsetTop)
					this.contenTopys.push(this.$refs.recommends.$el.offsetTop-45 )
					this.contenTopys.push(Number.MAX_VALUE)
					// console.log(this.contenTopys)
				 })
		},
		// 使用混入技术解决事件总线监听
		mixins: [itemListenerMinix, backTopMixin],
		mounted() {
		},
		destroyed() {
			this.$bus.$off('itemImageLoad', this.itemImgListener)
			console.log('destroyed')
		}

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
		height: calc(100% - 93px);
		overflow: hidden;
	}
	#recommend {
		position: relative;
	}
	.dtitle {
		text-align: center;
		font-size: 12px;
	}
	.d-bar {
		height: 49px;
		width: 100%;
		/*background-color: deeppink;*/
		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>