<template>
	<div v-on:click="onclick()">
		<img class="order-item-icon" v-bind:src="icon" />
		<label class="item-title order-item-title">{{ title }}</label>
		<span
			class="number"
			v-if="
				orderNumber == 0
					? ''
					: orderNumber && isEmpty == false
					? ''
					: orderNumber
			"
			>{{ orderNumber }}</span
		>
	</div>
</template>

<script>
import { orderList, orderSubtotal } from '../../../api/order'
import { mapState, mapMutations } from 'vuex'

export default {
	props: {
		icon: {
			type: String
		},
		title: {
			type: String
		},
		testAttr: {
			type: String
		},
		id: {
			default: 0
		},
		orderNumber: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			isEmpty: false
		}
	},
	computed: mapState({
		height: state => state.cart.height,
		isOnline: state => state.auth.isOnline
	}),
	created() {
		this.isSignin()
	},
	methods: {
		...mapMutations({
			changeStatus: 'changeStatus'
		}),
		onclick() {
			// Code Review: 去掉testAttr
			if (this.isOnline) {
				if (this.testAttr == 'order') {
					this.changeStatus(this.id)
				}
				this.$router.push({ name: this.testAttr, params: { order: this.id } })
			} else {
				this.$router.push({ name: 'signin' })
			}
		},
		// 是否登录
		isSignin() {
			if (this.isOnline) {
				this.isEmpty = true
			} else {
				this.isEmpty = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.order-item {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.item-title {
	font-size: 14px;
	color: #4e545d;
}
.order-item-icon {
	width: 28px;
	height: 28px;
	margin-top: 19px;
}
.order-item-title {
	margin-top: 8px;
}
span.number {
	width: 16px;
	height: 16px;
	line-height: 16px;
	margin-top: -55px;
	margin-left: 17px;
	background: $primaryColor;
	border-radius: 8px;
	font-size: 11px;
	text-align: center;
	color: RGBA(255, 255, 255, 1);
	font-weight: normal;
}
</style>
