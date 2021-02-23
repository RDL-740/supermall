<template>
	<Swiper class="detailSwiper">
		<SwiperItem v-for="(item, index) in topImages" :key=index>
			<img v-if="item" :src="item">
			<img v-else src="~assets/img/common/placeholder.png">
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
		}
	}
</script>

<style type="text/css">
	.detailSwiper {
		height: 250px!important;
	}
</style>