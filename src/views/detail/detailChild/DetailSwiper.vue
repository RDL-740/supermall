<template>
	<Swiper class="detailSwiper">
		<SwiperItem v-for="item in topImages">
			<img :src="item">
		</SwiperItem>
	</Swiper>
</template>

<script type="text/javascript">

	import {Swiper, SwiperItem} from 'components/common/swiper'

	export default {
		name: 'DetailSwiper',
		components: {
			Swiper,
			SwiperItem
		},
		props: {
			topImages: {
				type: Array,
				default() {
					return []
				}
			}
		},
		mounted() {
			// console.log(this.topImages)
			// console.log(typeof(this.topImages))
		}
	}
</script>

<style type="text/css">
	.detailSwiper {
		height: 250px!important;
	}
</style>