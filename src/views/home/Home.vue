<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
			<HomeSwiper :banners="banners"></HomeSwiper>
			<HomeRecomend :recommends="recommends"></HomeRecomend>
			<FeatureView></FeatureView>
			<TabControl :title="['流行', '新款', '精选']" @tabClick="tabClick"></TabControl>	
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
				scroll: null
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
			},
			backClick() {
				this.$refs.scroll.scrollTo(0,0, 500)
			},
			contentScroll(position) {
				this.isshowBackTop = (-position.y) > 1000
				//console.log(position)
			},
			loadMore() {
				this.getHomeGoods(this.currentType)
				console.log('加载更多')
			},


			//  网络请求方法
			getHomeMutidata() {
				// 请求多个数据
				getHomeMutidata().then(res => {
					//console.log(res)
					this.banners = res.data.data.banner.list
					this.recommends = res.data.data.recommend.list
					this.$refs.scroll.finishPullUp()
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
		// mounted() {
		// 	this.scroll = new BScroll(document.querySelector('.wrapper'), {})
		// },
		created() {
			//请求多个数据
			this.getHomeMutidata()
			//请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		}	
	}
</script>

<style scoped> 
 /*	.wrapper {
		height: 600px;
		overflow: hidden;
 	}*/

	#home {
		height: 100vh;
		padding-top: 44px;
		position: relative;
	}

	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 99;
	}
	.content {
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		overflow: hidden;
	}
</style>