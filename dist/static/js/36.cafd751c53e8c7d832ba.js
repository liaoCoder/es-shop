webpackJsonp([36],{"2/07":function(t,e,i){"use strict";var a=i("RuWt"),s={props:{item:{type:Object},isSelected:{type:Boolean}},computed:{isAvaiable:function(){return!(!this.item||this.item.status!==a.a.COUPON_STATUS.AVAILABLE)},getTopBg:function(){return this.isAvaiable?i("idTU"):i("gtFA")},getName:function(){var t="";return this.item&&(t=this.item.name),t},getPrice:function(){var t="";return this.item&&(t=this.item.value),t},getCondition:function(){var t="";return this.item&&(t=this.item.condition),t},getTypeItems:function(){var t=[];return this.item&&this.item.infos&&(t=this.item.infos),t},getDuration:function(){var t="",e=this.item;if(e&&e.effective&&e.expires){var i=new Date(1e3*e.effective),a=new Date(1e3*e.expires);t=this.utils.formatDate(i,"YYYY-MM-DD")+" ~ "+this.utils.formatDate(a,"YYYY-MM-DD")}return t}},methods:{onclick:function(){this.$emit("onclick")}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"coupon-item-container",on:{click:t.onclick}},[a("img",{staticClass:"top-img",attrs:{src:t.getTopBg}}),t._v(" "),a("div",[a("label",{staticClass:"title",class:{enableText:t.isAvaiable,disableText:!t.isAvaiable}},[t._v(t._s(t.getName))]),t._v(" "),a("label",{staticClass:"price",class:{enableText:t.isAvaiable,disableText:!t.isAvaiable}},[t._v("¥"+t._s(t.getPrice))])]),t._v(" "),a("label",{staticClass:"subtitle"},[t._v("满"+t._s(t.getCondition)+"元可使用")]),t._v(" "),a("div",{staticClass:"desc-wrapper"},[t._l(t.getTypeItems,function(e,i){return a("label",{key:i},[t._v(t._s(e))])}),t._v(" "),a("div",{staticClass:"row-wrapper"},[a("label",[t._v(t._s(t.getDuration))])])],2),t._v(" "),t.isSelected?a("img",{staticClass:"indicator",attrs:{src:i("hdOP")}}):t._e()])},staticRenderFns:[]};var o=i("C7Lr")(s,n,!1,function(t){i("WxsB")},"data-v-67fb9460",null);e.a=o.exports},G2hY:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("wSez"),i("vAZe");var a=i("2/07"),s=i("RuWt"),n=i("4cjj"),o={components:{CouponItem:a.a},data:function(){return{currentIndex:0,tabs:[{id:1,title:"未使用"},{id:2,title:"已使用"},{id:3,title:"已过期"}],isLoaded:!1,page:1,items:[],isMore:0}},created:function(){this.loadFirstPageData()},methods:{goBack:function(){this.$router.go(-1)},loadFirstPageData:function(){this.loadPageData(!0)},loadMorePageData:function(){this.loadPageData(!1)},loadPageData:function(t){var e=this,i=1;i=t?1:this.page+1;var a=null;0===this.currentIndex?a=s.a.COUPON_STATUS.AVAILABLE:1===this.currentIndex?a=s.a.COUPON_STATUS.EXPIRED:2===this.currentIndex&&(a=s.a.COUPON_STATUS.USED),Object(n.b)(i,10,a).then(function(i){i&&i.coupons&&(e.items=t?i.coupons:e.items.concat(i.coupons),e.isMore=i.paged.more,e.isLoaded=!0,i.paged&&i.paged.page&&(e.page=parseInt(i.paged.page)))},function(t){})},onIndexChange:function(t){this.currentIndex=t,this.loadFirstPageData()},loadMore:function(){this.isMore&&this.loadMorePageData()}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("mt-header",{staticClass:"header",attrs:{fixed:"",title:"我的优惠券"}},[a("header-item",{attrs:{slot:"left",isBack:!0},on:{onclick:t.goBack},slot:"left"})],1),t._v(" "),a("top-list",{staticClass:"topList",attrs:{items:t.tabs},on:{onIndexChange:t.onIndexChange}}),t._v(" "),a("base-list",{staticClass:"list-wrapper",attrs:{items:t.items,isMore:t.isMore,isLoaded:t.isLoaded},on:{loadMore:t.loadMore}},t._l(t.items,function(t,e){return a("coupon-item",{key:e,attrs:{item:t}})}),1),t._v(" "),t.isLoaded&&t.items.length<=0?a("empty-item",{attrs:{title:"暂无优惠券",photo:i("Ab74")}}):t._e()],1)},staticRenderFns:[]};var c=i("C7Lr")(o,r,!1,function(t){i("z7So")},"data-v-36baa216",null);e.default=c.exports},WxsB:function(t,e){},z7So:function(t,e){}});
//# sourceMappingURL=36.cafd751c53e8c7d832ba.js.map