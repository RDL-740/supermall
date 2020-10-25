<template>
	<Swiper>
		<SwiperItem v-for="(item,index) in banners" :key='index'>
			<a :href="item.link">
				<img :src="item.image">
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
		}
	}
</script>