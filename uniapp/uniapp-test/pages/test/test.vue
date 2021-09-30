<template>
	<view>
		<view class="title">{{msg}}</view>
		<button type="default" @click="clickMethods">点击</button>
		<view>{{bool}}</view>
		<view class="arr" v-for="(item,index) in arr">{{item}}</view>

		<navigator url="../about/about">
			<button type="default">about</button>
		</navigator>

		<button type="default" @click="scan">扫码</button>
		<button type="default" @click="phone">拨打电话</button>

		<view class="swp">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="true">
				<swiper-item>
					<view class="swiper-item uni-bg-red">A</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">C</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: "hello uniapp",
				bool: false,
				arr: ['nick', 'make', 'jack']
			}
		},
		methods: {
			clickMethods() {
				this.msg = "clickMethods",
					this.bool = !this.bool
			},
			scan() {
				uni.scanCode({
					success(res) {
						console.log(res)
					}
				});

			},
			phone() {
				uni.makePhoneCall({
					phoneNumber: '166565', //仅为示例
					success(res) {
						console.log(res)
					}
				});
			}
		},
		onLoad() {
			console.log('load');
			uni.request({
				url: "https://novel.kele8.cn/rank/564d8494fe996c25652644d2",
				success(res) {
					console.log(res);
				}
			})
		}
	}
</script>

<style>

</style>
