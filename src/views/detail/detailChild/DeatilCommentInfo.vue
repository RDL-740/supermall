<template>
	<div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">

		<div class="info-header">
			<div class="head-title">用户评价</div>
			<div class="head-more">更多 ＞</div>
			<i class="arrow-right"></i>
		</div> 

		<div class="info-user">
			<img :src="commentInfo.user.avatar">
			<span>{{commentInfo.user.uname}}</span>
		</div>

		<div class="info-detail">
			<p>{{commentInfo.content}}</p>
			<div class="info-other">
				<span class="date">{{commentInfo.created | showDate}}</span>
				<span>{{commentInfo.style}}</span>
			</div>
		</div>

		<div class="info-imgs">
			<img :src="item" v-for="(item, index) in commentInfo.images" :key="index" @load="cimgLoad">
		</div>
	</div>
</template>

<script>
	import {formateDate} from 'common/utils.js'
	export default {
		name: 'DeatilCommentInfo',
		props: {
			commentInfo: {
				type: Object,
				default() {
					return {}  
				}
			}
		},
		filters: {
			showDate(value) {
				// 1. 将时间戳转换成date对象
				const date = new Date(value * 1000)
				return formateDate(date, 'yyyy-MM-dd hh:mm:ss')
			}
		},
		methods: {
			cimgLoad() {
				this.$emit("cImgLoad")
			}
		}
	}
</script>

<style type="text/css">
	.comment-info {
		position: relative;
		z-index: 99;
		background-color: #fff;
	}
	.info-header {
		width: 95%;
		height: 54px;
		line-height: 54px;
		margin: 0 auto;
		border-bottom: 1px solid #aaa;
	}
	.head-title {
		float: left;
	}
	.head-more {
		float: right;
	}
	.info-user {
		clear: both;
		line-height: 64PX;
	}
	.info-user img {
		height: 42px;
		margin-left: 10px;
		margin-right: 10px;
		vertical-align: middle;
	}
	.info-detail {
		margin-left: 10px;
	}
	.info-detail .info-other {
		font-size: 12px; 
		color: #999;
		margin-top: 10px;
	}
	.info-other .date {
		margin-right: 8px;

	}
	.info-other {
		display: block;
	}
	.info-imgs {
		margin-top: 10px;
	}
	.info-imgs img {
		width: 70px;
		margin-right: 5px;
	}
</style>