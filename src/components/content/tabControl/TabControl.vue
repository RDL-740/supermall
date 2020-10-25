<template>
	<div class="tab-control">
		<div class="tab-control-item" v-for="(item, index) in title">
			<span :class="{active: index === currentIndex}" @click="itemClick(index)">{{item}}</span>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'TabControl',
		props: {
			title: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index
				this.$emit('tabClick', index)
			}
		}
	}
</script>

<style type="text/css">
	.tab-control {
		display: flex;
		text-align: center;
		line-height: 44px;
		height: 44px;
		background: #fff;
		font-size: 14px;
		position: sticky;
		top: 44px;
		z-index: 99
	}

	.tab-control-item {
		flex: 1; 
	}

	.tab-control span {
		padding: 5px;
	}

	.active {
		color: var(--color-high-text);
		border-bottom: 2px solid var(--color-tint);
	}

</style>