<template>
	<Swiper>
		<SwiperItem v-for="(item,index) in banners" :key='index'>
			<a :href="item.link">
				<img :src="item.image" @load="imageLoad">
			</a>
		</SwiperItem>
	</Swiper>
</template>

<script type="text/javascript">
	import {Swiper, SwiperItem} from 'components/common/swiper'
	export default {
		name: 'HomeSwiper',
		components: {
			Swiper,
			SwiperItem
		},
		props: {
			banners: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				isLoad: false
			}
		},
		methods: {
			imageLoad() {

				// 使用 isload 记录，避免多次调用， 这里图片加载一张完成就可以满足计算 tab-controll 的offsettop了 
				if (!this.isLoad) {
					this.$emit('swiperImageLoad')
					this.isLoad = true
				}
			}
		}
	}
</script>