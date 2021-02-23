<template>
	<div class="category">
		<!-- 导航 -->
		<nav-bar class="navbar">
	    	<div slot="center">商品分类</div>
	    </nav-bar>

	    <!-- 分类列表 -->
	    <scroll id="content1" ref="scroll">
   			<categ-list :CList="categories" @ClistClick="clClick"></categ-list>
	  	</scroll>
	  	<scroll id="content2">		
			<categ-content :CategoryList="categoryDate"></categ-content>
	  	</scroll>
	</div>
</template>

<script type="text/javascript">
	import NavBar from 'components/common/navbar/NavBar'
	import Scroll from 'components/common/scroll/Scroll'

	import CategList from './childComp/CategList'
	import CategContent from './childComp/CategContent'

	import { getCategory, getSubcategory, getCategoryDetail} from 'network/category'

	export default {
		name: 'Category',
		components: {
			NavBar,
			CategList,
			CategContent,
			Scroll
		},
		data() {
			return {
				categories: [],
				categoryDate: [],
			}
		},
		methods: {
			// 获取分类列表
			_getCategory() {
				getCategory().then(res => {
					// 1.获取分类数据
					this.categories = res.data.data.category.list
					// 2. 请求第一个分类的子数据
					this._getSubcategories(0)
				})
			},

			// 请求分类右侧图文数据
			_getSubcategories(index) {
				const mailKey = this.categories[index].maitKey
				getSubcategory(mailKey).then(res => {
					this.categoryDate = res.data.data.list
				})
			},
			clClick(params) {
				this._getSubcategories(params) 
			},
			
		},
		mounted() {
			// 1.请求分类左侧导航栏数据
			this._getCategory()
		},
	}
</script>

<style type="text/css">
	.category {
		position: relative;
		height: 100vh;
	}
	.navbar {
		background-color: var(--color-tint);
		color: #fff;
		font-weight: 500;
	}
	#content1 {
		width: 25%;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		overflow: hidden;
	}
	#content2 {
		width: 75%;
		position: absolute;
		top: 44px;
		bottom: 49px;
		right: 0;
		overflow: hidden;
	}
</style>