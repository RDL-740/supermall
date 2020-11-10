<template>
	<NavBar>
		<div slot="left" class="back" @click="backClick">
			<img src="~assets/img/common/back.svg">
		</div>
		<div slot="center" class="title">
			<span v-for="(item, index) in title" class="titleItem" :class="{titleActive: index === currentIndex}" @click="titleClick(index)">{{item}}</span>
		</div>
	</NavBar>
</template>

<script type="text/javascript">
	
	import NavBar from 'components/common/navbar/NavBar'

	export default {
		name: 'DetailChild',
		components: {
			NavBar
		},
		data() {
			return {
				title: ['商品','参数','评论','推荐'],
				currentIndex: 0
			}
		},
		methods: {
			backClick() {
				this.$router.back()
			},
			titleClick(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style scoped>
 	.back {
 		vertical-align: middle;
 	}
	.back img {
		width: 15px;
	}
	.title {
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		font-size: 12px;
	}
	.titleItem {
		flex: 1px;
	}
	.titleActive {
		color: var(--color-high-text)
	}
</style>