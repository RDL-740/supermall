<template>
	<div class="cart">
		<!-- 导航 -->
	  <nav-bar class="navbar">
	    <div slot="center">购物车({{length}})</div>
	  </nav-bar>

	  <!-- 商品列表 -->
	  <scroll id="content" ref="scroll">
        <cart-list class="cartlist" ></cart-list>
	  </scroll>

	  <!-- 底部汇总 -->
	  <cart-bottom-bar class="cbb"></cart-bottom-bar>
	</div>
</template>

<script type="text/javascript">

	import NavBar from 'components/common/navbar/NavBar'
	import Scroll from 'components/common/scroll/Scroll'


	import cartList from './childComponents/cartList.vue'
	import cartBottomBar from './childComponents/cartBottomBar.vue'

	

	import { mapGetters } from 'vuex'
	
	export default {
		name: 'Cart',
		components: {
			NavBar,
			Scroll,
			cartList,
			cartBottomBar
		},
		computed: {
			// cartLength() {
			// 	return this.$store.state.cartList.length
			// }
			// 两种语法
			// ...mapGetters(['cartLength'])
			...mapGetters({
				length: 'cartLength',
			})
		},
		activated() {
		    this.$refs.scroll.refresh()
		}
	}
</script> 
<style type="text/css">
.cart {
	height: 100vh;
	position: relative;
}
#content {
	position: absolute;
	top: 44px;
	bottom: 49px;
	left: 0;
	right: 0;
	overflow: hidden;
}
.cartlist {
	height: 100%;
}
.navbar {
	background-color: var(--color-tint);
	color: #fff;
	font-weight: 500;
}
.cbb {
	height: 40px!important;
	position: absolute;
	bottom: 49px!important;
}
</style>