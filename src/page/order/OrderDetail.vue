<!--OrderDetail -->
<template>
	<div class="container">
		<mt-header class="header" title="订单详情">
			<header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack">
			</header-item>
		</mt-header>
		<order-detail-body></order-detail-body>
	</div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import OrderDetailBody from '../order/child/OrderDetailBody'
import { ENUM } from '../../const/enum'
export default {
	components: {
		OrderDetailBody
	},
	methods: {
		goBack() {
			let isFromPay = this.$route.query.isFromPay
			let isSuccess = this.$route.query.isSuccess
			let id = this.$route.query.id ? this.$route.query.id : ''
			if (isFromPay) {
				this.$router.push({
					name: 'order',
					params: { order: ENUM.ORDER_STATUS.PAID }
				})
			} else if (isSuccess) {
				this.$router.push({ name: 'orderTrade', query: { id: id } })
			} else {
				this.$router.go(-1)
				// this.$router.push({name: 'order', query: { 'id' : id}});
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	@include header;
	top: 0;
	right: 0;
	left: 0;
	position: fixed;
	z-index: 1;
	border-bottom: 1px solid #e8eaed;
}
</style>
