<!-- OrderDetailBody.vue -->
<template>
	<div>
		<div
			class="order-body"
			v-if="orderDetail && orderDetail.order"
			v-bind:class="{ ship: orderDetail.order.status == 1 }"
		>
			<div class="image" v-if="orderDetail.order.status == 0">
				<img src="../../../assets/image/change-icon/e5_clock@2x.png" />
				<span>等待付款</span>
			</div>

			<div class="image" v-if="orderDetail.order.status == 1">
				<img src="../../../assets/image/change-icon/e5_box_white@2x.png" />
				<span>待发货</span>
			</div>

			<div
				class="receipt"
				v-if="orderDetail.order.status == 1 && trackList.length >= 1"
				v-on:click="goOrderrack(order.id)"
			>
				<label>
					<img src="../../../assets/image/change-icon/e0_delivery@2x.png" />
					<span>{{ trackList[0].content }}</span>
				</label>
				<img
					class="arrow"
					src="../../../assets/image/change-icon/enter@2x.png"
				/>
			</div>

			<div class="image" v-if="orderDetail.order.status == 2">
				<img src="../../../assets/image/change-icon/e5_box_white@2x.png" />
				<span>配送中</span>
			</div>

			<div
				class="receipt"
				v-if="orderDetail.order.status == 2 && trackList.length >= 1"
				v-on:click="goOrderrack(order.id)"
			>
				<label>
					<img src="../../../assets/image/change-icon/icon_car@2x.png" />
					<span>{{ trackList[0].content }}</span>
				</label>
				<img
					class="arrow"
					src="../../../assets/image/change-icon/enter@2x.png"
				/>
			</div>

			<div class="image" v-if="orderDetail.order.status == 3">
				<img src="../../../assets/image/change-icon/e5_evaluation@2x.png" />
				<span>待评价</span>
			</div>

			<div
				class="receipt"
				v-if="orderDetail.order.status == 3 && trackList.length >= 1"
				v-on:click="goOrderrack(order.id)"
			>
				<label>
					<img src="../../../assets/image/change-icon/icon_car@2x.png" />
					<span>{{ trackList[0].content }}</span>
				</label>
				<img
					class="arrow"
					src="../../../assets/image/change-icon/enter@2x.png"
				/>
			</div>

			<div class="image" v-if="orderDetail.order.status == 4">
				<img src="../../../assets/image/change-icon/e5_checkmark@2x.png" />
				<span>已完成</span>
			</div>

			<div class="image" v-if="orderDetail.order.status == 5">
				<img src="../../../assets/image/change-icon/e5_info@2x.png" />
				<span>已取消</span>
			</div>

			<div class="image" v-if="orderDetail.order.status == 6">
				<img src="../../../assets/image/change-icon/e5_box_white@2x.png" />
				<span>配货中</span>
			</div>

			<div
				class="receipt"
				v-if="orderDetail.order.status == 6 && trackList.length >= 1"
				v-on:click="goOrderrack(order.id)"
			>
				<label>
					<img src="../../../assets/image/change-icon/e0_delivery@2x.png" />
					<span>{{ trackList[0].content }}</span>
				</label>
				<img
					class="arrow"
					src="../../../assets/image/change-icon/enter@2x.png"
				/>
			</div>

			<div class="address">
				<div>
					<img src="../../../assets/image/change-icon/e5_address@2x.png" />
					<span>{{ orderDetail.order.consignee.name }}</span>
					<span class="mobile">{{ orderDetail.order.consignee.mobile }}</span>
				</div>
				<p style="-webkit-box-orient: vertical; -webkit-line-clamp: 2;">
					{{ orderDetail.order.consignee.regions }}
					{{ orderDetail.order.consignee.address }}
				</p>
			</div>

			<div
				class="containers"
				v-for="(item, index) in orderDetail.order.goods"
				v-bind:key="item.id"
				v-on:click="
					getOrderDetail(item.product.id, orderDetail.order.extension_code)
				"
				v-if="index <= orderIndex"
			>
				<img
					class="photo"
					src="../../../assets/image/change-icon/default_image_02@2x.png"
					v-if="item.product.photos <= 0"
				/>
				<img
					class="photo"
					v-bind:src="item.product.photos[0].thumb"
					v-if="item.product.photos.length > 0"
					data-src="../../../assets/image/change-icon/default_image_02@2x.png"
				/>
				<div class="right-wrapper">
					<label class="title">{{ item.product.name }}</label>
					<label class="property">{{ item.property }}</label>
					<div
						class="desc-wrapper"
						v-bind:class="{ propertyOrder: item.property == '' }"
					>
						<label class="price" v-if="!orderDetail.order.extension_code"
							>￥ {{ utils.currencyPrice(item.product_price) }}</label
						>
						<label
							class="price"
							v-if="orderDetail.order.extension_code == isExchangeGood"
							>{{ orderDetail.order.use_score.score }}积分</label
						>
						<label class="count">x{{ item.total_amount }}</label>
					</div>
				</div>
			</div>

			<div class="onClick" v-if="orderDetail.order.goods.length > 3 && !isShow">
				<p v-on:click="getNumber()">
					还有 {{ orderDetail.order.goods.length - 3 }} 件
				</p>
			</div>

			<div class="detail">
				<div class="number">
					<label
						>订单编号：{{ orderDetail.order.sn }} &nbsp;
						<button
							class="tag-read"
							:data-clipboard-text="orderDetail.order.sn"
							v-on:click="getCopy()"
						>
							复制
						</button>
					</label>
					<p>
						下单时间：{{ (orderDetail.order.created_at * 1000) | convertTime }}
					</p>
				</div>
				<div class="pay" v-if="orderDetail.order.status !== 0">
					<p v-if="orderDetail.order.extension_code == isExchangeGood">
						支付方式：积分兑换
					</p>
					<p v-else>支付方式：{{ orderDetail.order.payment.name }}</p>
				</div>
				<div class="givetime">
					<p>配送方式：{{ orderDetail.order.shipping.name }}</p>
				</div>
			</div>

			<div
				class="desc section-header section-footer"
				v-bind:class="{ ship: orderDetail.order.status == 1 }"
			>
				<checkout-desc
					class="desc-item"
					title="商品总额"
					:subtitle="getOrderProductPrice"
				>
				</checkout-desc>
				<checkout-desc
					v-if="orderDetail.order.tax > 0"
					class="desc-item"
					title="发票税额"
					:subtitle="getOrderTaxPrice"
				>
				</checkout-desc>
				<checkout-desc
					class="desc-item"
					title="运费"
					:subtitle="getOrderShippingPrice"
				>
				</checkout-desc>
				<checkout-desc
					class="desc-item"
					v-for="(item, index) in getPromos"
					:key="index"
					:title="getPromoTitle(item)"
					:subtitle="'-' + getOrderDiscountPrice(item)"
				>
				</checkout-desc>
				<label class="amount"
					>实付款 : <span> {{ getOrderTotalPrice }}</span>
				</label>
			</div>

			<!-- 待付款按钮 -->
			<div class="btn" v-if="orderDetail.order.status == 0">
				<button v-on:click="cancel()">取消订单</button>
				<mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
					<div class="cancels">
						<div class="cancelInfo">
							<span class="cancel" v-on:click="cancelInfo()">取消</span>
							<span class="success" v-on:click="complete(orderDetail.order.id)"
								>完成</span
							>
						</div>
						<div class="reason">
							<p
								v-for="(item, list) in reasonList"
								v-bind:key="list"
								v-on:click="getReasonItem(item)"
							>
								{{ item.name }}
							</p>
						</div>
					</div>
				</mt-popup>
				<button class="buttonbottom" v-on:click="payment()">去支付</button>
			</div>

			<!-- 待发货按钮 -->
			<div
				class="btn"
				v-if="orderDetail.order.status == 1 ? '' : checkState"
			></div>

			<!-- 待收货按钮 -->
			<div class="btn" v-if="orderDetail.order.status == 2">
				<button
					class="buttonbottom"
					v-on:click="confirm(orderDetail.order.id, index)"
				>
					确认收货
				</button>
			</div>

			<!-- 配货中 -->
			<div class="btn" v-if="orderDetail.order.status == 6">
				<button
					class="buttonbottom"
					v-on:click="confirm(orderDetail.order.id, index)"
				>
					确认收货
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { ORDERSTATUS, ORDERNAV } from '../static'
import OrderPrice from './OrderPrice'
import { Indicator, MessageBox, Popup } from 'mint-ui'
import CheckoutDesc from './CheckoutDesc'
import Promos from '../../checkout/Promos'
import { ENUM } from '../../../const/enum'

import {
	orderGet,
	orderReasonList,
	orderCancel,
	orderConfirm,
	orderRebuy
} from '../../../api/order'
import { shippingStatusGet } from '../../../api/shipping' //订单跟踪
import { Toast } from 'mint-ui'
import Clipboard from 'clipboard'
import { mapState, mapMutations } from 'vuex'
export default {
	mixins: [Promos],

	data() {
		return {
			orderDetail: {},
			popupVisible: false,
			reasonList: [],
			orderCancel: [],
			checkState: '',
			ORDERSTATUS: ORDERSTATUS,
			currentNAVId: '',
			orderListParams: { page: 0, per_page: 10, status: '' },
			index: '',
			order: {},
			total_price: [],
			orderIndex: 2,
			isShow: false,
			trackList: [],
			isExchangeGood: ENUM.ORDER_EXTENSION_CODE.EXCHANGE_GOODS
		}
	},

	props: {
		item: {
			type: Object
		}
	},

	components: {
		OrderPrice,
		CheckoutDesc
	},

	created() {
		let id = this.$route.query.id ? this.$route.query.id : null
		this.orderInfo(id)
		this.orderReasonList()
		this.getShippingStatusGet(id)
	},

	methods: {
		...mapMutations({
			changeItem: 'changeItem'
		}),

		// 获取订单详情数据
		orderInfo(id) {
			orderGet(id).then(res => {
				if (res) {
					this.orderDetail = res
					this.order = res.order
					this.total_price = res.order.goods
				}
			})
		},

		// 取消订单
		cancel() {
			this.popupVisible = true
		},

		cancelInfo() {
			this.popupVisible = false
		},

		complete(id, index) {
			this.popupVisible = false
			this.getordersuccess(id, index)
		},

		// 去支付
		payment() {
			let order = this.orderDetail ? this.orderDetail.order : null
			if (order) {
				this.$router.push({
					name: 'payment',
					query: { order: order.id, total: order.total }
				})
			}
		},

		// 获取退货原因数据
		orderReasonList() {
			orderReasonList().then(res => {
				if (res) {
					this.reasonList = Object.assign([], this.reasonList, res.reasons)
				}
			})
		},

		// 获取取消订单数据
		getordersuccess(id, index) {
			if (this.reasonId) {
				orderCancel(id, this.reasonId)
					.then(
						res => {
							if (res) {
								this.orderList = []
								window.location.reload()
							}
						},
						error => {
							Toast('请选择取消原因')
						}
					)
					.catch(error => {
						Toast('请选择取消原因')
					})
			} else {
				Toast('请选择取消原因')
			}
		},

		getReasonItem(item) {
			this.reasonId = item.id
		},

		// 查看物流
		track(id) {
			this.$router.push({ name: 'orderTrack', params: { orderTrack: id } })
		},

		// 获取物流状态数据
		getShippingStatusGet(id) {
			shippingStatusGet(id).then(res => {
				if (res) {
					this.trackList = res.status
				}
			})
		},

		// 确认收货
		confirm(id, index) {
			MessageBox.confirm('是否确认收货？', '确认收货').then(action => {
				this.orderConfirms(id)
				// window.location.reload();
			})
		},

		// 获取确认收货数据
		orderConfirms(id, index) {
			orderConfirm(id).then(res => {
				if (res) {
					// this.orderDetail = Object.assign({}, res);
					this.orderDetail.order.status = res.order.status
				}
			})
		},

		// 晒单评价
		goComment(data) {
			this.changeItem(data)
			this.$router.push({ name: 'orderComment', query: { order: data.id } })
		},

		// 获取再次购买数据
		goBuy(id) {
			Indicator.open({
				spinnerType: 'fading-circle'
			})
			orderRebuy(id).then(res => {
				if (res) {
					Indicator.close()
					this.$router.push('/cart')
				}
			})
		},

		getOrderDiscountPrice(item) {
			return '￥ ' + (item.price ? item.price : 0)
		},

		getFormatPrice(key) {
			let price = this.getPriceByKey(key)
			let priceStr = '￥ ' + (price ? this.utils.currencyPrice(price) : '0')
			return priceStr
		},

		getPriceByKey(key) {
			let total = ''
			let order = this.order
			if (order && order[key]) {
				total = order[key]
			}
			return total
		},

		// 计算商品总额
		goodsTotalPrice() {
			let totalPrice = 0
			let total_price = this.total_price
			if (total_price.length > 0) {
				for (let i = 0, len = total_price.length; i <= len - 1; i++) {
					if (total_price[i].total_price) {
						totalPrice += parseFloat(total_price[i].total_price)
					}
				}
				return '￥ ' + this.utils.currencyPrice(totalPrice)
			} else {
				return '￥ ' + this.utils.currencyPrice(totalPrice)
			}
		},

		// 复制
		getCopy() {
			var clipboard = new Clipboard('.tag-read')
			clipboard.on('success', e => {
				console.log('复制成功')
				// 释放内存
				clipboard.destroy()
			})
			clipboard.on('error', e => {
				// 不支持复制
				console.log('该浏览器不支持自动复制')
				// 释放内存
				clipboard.destroy()
			})
			Toast({
				message: '复制成功',
				iconClass: 'mintui mintui-field-success',
				duration: 2000
			})
		},

		// 去商品详情
		getOrderDetail(orderId, code) {
			this.$router.push({
				name: 'product',
				query: { id: orderId, isExchange: code == this.isExchangeGood }
			})
		},

		// 点击展示所有商品
		getNumber() {
			this.orderIndex = this.orderDetail.order.goods.length - 1
			this.isShow = true
		},

		// 从订单详情去订单跟踪页面
		goOrderrack(id) {
			this.$router.push({
				name: 'orderTrack',
				params: { orderTrack: id, isTrack: true }
			})
		}
	},

	computed: {
		...mapState({
			orderItem: state => state.order.orderItem,
			isOnline: state => state.auth.isOnline,
			user: state => state.auth.user
		}),
		getPromos: function() {
			return this.getPriceByKey('promos')
		},

		getOrderTotalPrice: function() {
			return this.getFormatPrice('total')
		},

		getOrderProductPrice: function() {
			return this.goodsTotalPrice()
		},

		getOrderTaxPrice: function() {
			return this.getFormatPrice('tax')
		},

		getOrderShippingPrice: function() {
			let priceStr = ''
			let price = this.getPriceByKey('shipping')
			if (price) {
				priceStr = '￥ ' + this.utils.currencyPrice(price.price)
			} else {
				priceStr = '免运费'
			}
			return priceStr
		},
	}
}
</script>
<style lang="scss" scoped>
.order-body {
	overflow: auto;
	height: 100%;
	position: absolute;
	width: 100%;
	margin-top: 44px;
}
.image {
	background-image: url('../../../assets/image/change-icon/g1_bg_order@2x.png');
	background-size: cover;
	height: 70px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	img {
		height: 18px;
		padding: 0px 12px;
	}
	span {
		font-size: 17px;
		color: #fff;
	}
}
.receipt {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: auto;
	padding: 13px;
	background-color: #fff;
	margin-bottom: 8px;
	label {
		display: flex;
		align-items: center;
	}
	img {
		height: 16px;
		margin: 0px 15px 0px 10px;
	}
	.arrow {
		width: 5px;
		height: 10px;
	}
	span {
		font-size: 14px;
		color: #4e545d;
	}
}
.containers {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: stretch;
	background-color: #fff;
	border-bottom: 1px solid #e8eaed;
}
.onClick {
	height: 44px;
	line-height: 44px;
	text-align: center;
	background-color: #fff;
	p {
		font-size: 14px;
		color: #4e545d;
	}
}
.photo {
	width: 80px;
	height: 80px;
	margin: 15px 10px 15px 15px;
	border: 1px solid #e8eaed;
	flex-basis: 80px;
	flex-shrink: 0;
}
.right-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	padding: 0px 15px 0px 0px;
	width: 100%;
	overflow: hidden;
}
.title {
	margin-top: 15px;
	color: #4e545d;
	font-size: 14px;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.property {
	font-size: 13px;
	color: #7c7f88;
	padding-top: 10px;
}
.count {
	margin-top: 4px;
	color: #7c7f88;
	font-size: 13px;
	margin-right: 10px;
}
.desc-wrapper {
	height: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: 21px;
}
.propertyOrder {
	padding-top: 34px;
}
.price {
	color: $primaryColor;
	font-size: 17px;
	margin-left: 0px;
}
.count {
	color: #7c7f88;
	font-size: 16px;
	margin-right: 10px;
}
.address {
	height: 87px;
	background-color: #fff;
	margin-bottom: 10px;
	div {
		padding: 11px 10px 0px;
	}
	img {
		height: 16px;
	}
	span {
		color: #4e545d;
		font-size: 16px;
		&.mobile {
			padding-left: 21px;
		}
	}
	p {
		margin: 5px 18px 11px 32px;
		font-size: 14px;
		color: #7c7f88;

		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
}

.contact {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 46px;
	background-color: #fff;
	margin-top: 8px;
	border-bottom: 1px solid $lineColor;
	padding: 0 13px;
	span {
		font-size: 12px;
		color: #4e545d;
		padding-right: 6px;
	}
	img {
		width: 12px;
		height: 13px;
	}
}

.detail {
	display: flex;
	flex-direction: column;
	font-size: 14px;
	color: #7c7f88;
	background-color: #fff;
	margin: 8px 0;
	box-sizing: border-box;
	.number {
		padding: 14px 16px;
		border-bottom: 1px solid $lineColor;
		p {
			padding-top: 6px;
			font-size: 14px;
		}
		button {
			color: #7c7f88;
			height: 20px;
			background-color: #fff;
			border: 1px solid #7c7f88;
			width: 54px;
			height: 20px;
			border-radius: 2px;
			font-size: 14px;
		}
	}
	.pay {
		border-bottom: 1px solid $lineColor;
		padding: 14px 16px;
	}
	.givetime {
		padding: 14px 16px;
		font-size: 14px;
	}
	input {
		background-color: #fff;
		border: 1px solid #7c7f88;
	}
}
.desc {
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	padding-top: 12px;
	box-sizing: border-box;
	margin-bottom: 80px;
	.desc-item {
		flex: 1;
		margin-top: 10px;
	}
	.amount {
		display: flex;
		justify-content: flex-end;
		font-size: 14px;
		color: #4e545d;
		padding-right: 15px;
		border-top: 1px solid $lineColor;
		margin-top: 12px;
		height: 45px;
		line-height: 45px;
		span {
			font-size: 16px;
			color: $primaryColor;
		}
	}
}
.btn {
	position: fixed;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 54px;
	display: flex;
	justify-content: flex-end;
	background-color: #fff;
	align-items: center;
	border-top: 1px solid #e8eaed;
	button {
		width: 82px;
		height: 36px;
		font-size: 14px;
		margin-right: 7px;
		background-color: #fff;
		border: 1px solid #ccc;
	}
	.buttonbottom {
		color: $primaryColor;
		border: 1px solid $primaryColor;
	}
	.mint-popup {
		width: 100%;
		height: 235px;
	}
	.cancels {
		height: 100%;
		.cancelInfo {
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			border-bottom: 1px solid #f0f0f0;
			span {
				color: #000;
				font-size: 14px;
			}
			.cancel {
				padding: 10px 15px;
			}
			.success {
				padding: 10px 15px;
			}
		}
		.reason {
			margin-top: 10px;
			p {
				height: 16px;
				line-height: 16px;
				text-align: center;
				padding: 10px;
				&:hover {
					color: red;
				}
			}
		}
	}
}
.ship {
	margin-bottom: 0px;
}
</style>

<!-- 字体图标样式覆盖 -->
<style>
.mint-toast-icon {
	font-size: 38px;
}
button {
	padding: 0;
}
</style>
