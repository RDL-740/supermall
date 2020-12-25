<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<TabControl :title="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" v-show="isfixed"></TabControl class="tab-control">	
		<Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
			<HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
			<HomeRecomend :recommends="recommends"></HomeRecomend>
			<FeatureView></FeatureView>
			<TabControl :title="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></TabControl>	
			<GoodsList :goods="showGoods"></GoodsList>
		</Scroll>
		<BackTop @click.native="backClick" v-show="isshowBackTop"></BackTop>
	</div>
</template>
<script type="text/javascript">

	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabControl/TabControl'
	import Scroll from 'components/common/scroll/Scroll'
	import BackTop from 'components/content/backTop/BackTop'

	import HomeSwiper from './childComps/HomeSwiper'
	import HomeRecomend from './childComps/HomeRecomend'
	import FeatureView from './childComps/FaetureView'
	import GoodsList from 'components/content/goods/GoodsList'

	import {getHomeMutidata, getHomeGoods} from 'network/home.js'
	import {debounce} from 'common/utils.js'


	export default {
		name: 'Home',
		components: {
			NavBar,
			TabControl,
			Scroll,
			BackTop,
			FeatureView,
			HomeSwiper,
			HomeRecomend,
			GoodsList
		},
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					'pop': {page: 0, list: []},
					'new': {page: 0, list: []},
					'sell': {page: 0, list: []}
				},
				currentType: 'pop',
				isshowBackTop: false,
				scroll: null,
				tabOffsettop: 0,
				isfixed: false,
				saveY: 0
			}
		},

		methods: {

			// 事件处理方法
			tabClick(index) {
				switch(index) {
					case 0: this.currentType = 'pop' 
					break
					case 1: this.currentType = 'new' 
					break
					case 2: this.currentType = 'sell' 
					break
				}
				this.$refs.tabControl1.currentIndex =index
				this.$refs.tabControl2.currentIndex = index
			},
			backClick() {
				this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 1000)
			},
			contentScroll(position) {
				// position 是子组件通过 $emit 传出来的
				this.isshowBackTop = (-position.y) > 1000
				//console.log(position)
				if ((-position.y) > this.tabOffsettop) {
					this.isfixed = true
				} else {
					this.isfixed = false
				}
			},
			loadMore() {
				this.getHomeGoods(this.currentType)
				//调用 scroll.finishPullUp 才能继续使用上拉加载更多
				this.$refs.scroll.finishPullUp()
				//console.log('加载更多')
			},
			swiperImageLoad() {
				//  在这里拿到的 offsetTop才是正确的
				this.tabOffsettop = this.$refs.tabControl2.$el.offsetTop
				//console.log('--')
			},


			//  网络请求方法
			getHomeMutidata() {
				// 请求多个数据
				getHomeMutidata().then(res => {
					//console.log(res)
					this.banners = res.data.data.banner.list
					this.recommends = res.data.data.recommend.list
					
				})
			},
			getHomeGoods(type) {
					// 请求商品数据
					const page = this.goods[type].page+1
					getHomeGoods(type, page).then(res => {
					//console.log(res.data.data.list)
					const list = res.data.data.list
					this.goods[type].list.push(...list)
					this.goods[type].page += 1
				})

			} 
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			} 
		},	
		created() {
			//请求多个数据
			this.getHomeMutidata()
			//请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted() {
			// 监听事件总线事件
			const refresh = this.$refs.scroll && debounce(this.$refs.scroll.refresh, 500)
			this.$bus.$on('itemImageLoad', () => {
				//console.log('监听到事件总线事件')
				// 图片加载完成就调用 scroll.refresh() 重新计算滚动区域的高度
				//  调用之前判断  scroll 对象是否挂载了，如果是undefine会报错  逻辑运算符
				this.$refs.scroll && refresh()
			})
			// 2.获取 tabcontrol 的 offsettop
			// 所有的组件都有应该 $el 属性， 用于获取组件中的元素
			//console.log(this.$refs.tabControl.$el)
			
		},
		activated() {
			// console.log('home actived')
			// console.log(this.saveY)
			this.$refs.scroll.scrollTo(0, this.saveY, 0)
			this.$refs.scroll.refresh()
		},
		deactivated() { 
			// 1. 保存 Y 值
			// console.log('home deactivated')
			this.saveY = this.$refs.scroll.getScrollY()
			// console.log(this.saveY)
		},	

	}
</script>

<style scoped> 
 /*	.wrapper {
		height: 600px;
		overflow: hidden;
 	}*/

	#home {
		height: 100vh;
		position: relative;
	}

	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
	}
	.content {
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.tab-control {
		position: relative;
		z-index: 9;
		top: -1px;
	}
</style>