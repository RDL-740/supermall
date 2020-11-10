<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script type="text/javascript">

	import BScroll from 'better-scroll'

	export default {
		name: 'Sroll',
		props: {
			probeType: {
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		data() {
		    return {
				scroll: null
			}
		},
		mounted() {
			// 1.创建BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper,{
				click: true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})

			// 2.监听滚动区域
			if (this.probeType === 2 || this.probeType === 3) {
				this.scroll.on('scroll', (position)=> {
					this.$emit('scroll', position)
				})	
			}
			

			// 3.监听上拉加载更多事件
			if (this.pullUpLoad) {
				this.scroll.on('pullingUp', () => {
					this.$emit('pullingUp')
				})
				//console.log(this.scroll)
			}
			
		},
		methods: {
			scrollTo(x, y, time=500) {
				this.scroll.scrollTo(x, y, time)
			},
			finishPullUp() {
				this.scroll.finishPullUp()
			},
			refresh() {
				this.scroll.refresh()
				//console.log('已重新计算滚动区域高度')
			}
		}	
	}
</script>

<style scoped>

</style>