webpackJsonp([55],{"Ru/K":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("aA9S"),o=r.n(n),s=r("3cXf"),i=r.n(s),a=(r("vAZe"),r("wSez")),c=r("FWz8"),d=r("q1Mq"),u=(r("RuWt"),r("2bvH"),{data:function(){return{orderItem:this.$store.state.order.orderItem?this.$store.state.order.orderItem:null,IMAGE:d.a}},created:function(){this.orderItem&&this.buildData()},methods:{goBack:function(){this.$router.go(-1)},submit:function(){var t=this.$route.query.order?this.$route.query.order:"";this.getComment(t)},getComment:function(t){var e=this,r=this.getCommentData();if(!(r&&r.length>0))return Object(a.Toast)("请评价商品"),!1;r=i()(r),Object(c.h)(t,r,0).then(function(t){t&&e.$router.push("orderSubmit")})},getCommentData:function(){for(var t=this.orderItem.goods,e=[],r=0;r<=t.length-1;r++)if(0!==t[r].currentIndex){var n={goods:t[r].product.id,grade:t[r].currentIndex,content:t[r].content};e.push(n)}return e},buildData:function(){var t=this.orderItem?this.orderItem.goods:[];if(t)for(var e=0;e<=t.length-1;e++)t[e].IMAGE=this.IMAGE,t[e].content="",t[e].currentIndex=3},changeImage:function(t,e,r){t.currentIndex=e,this.orderItem.goods=o()([],this.orderItem.goods)}}}),l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("mt-header",{staticClass:"header",attrs:{fixed:"",title:"评价宝贝"}},[n("header-item",{attrs:{slot:"left",isBack:!0},on:{onclick:function(e){return t.goBack()}},slot:"left"}),t._v(" "),n("header-item",{attrs:{slot:"right",title:"提交"},on:{onclick:function(e){return t.submit()}},slot:"right"})],1),t._v(" "),n("div",{staticClass:"body"},t._l(t.orderItem.goods,function(e,o){return t.orderItem.goods.length>0?n("div",{staticClass:"order-comment-body"},[n("div",{staticClass:"body-list"},[n("div",{staticClass:"image"},[e.product.photos.length>0?n("img",{attrs:{src:e.product.photos[0].thumb}}):t._e(),t._v(" "),e.product.photos.length<=0?n("img",{attrs:{src:r("aVgn")}}):t._e()]),t._v(" "),n("div",{staticClass:"comment"},[n("span",[t._v(t._s(e.product.name))]),t._v(" "),n("ul",t._l(e.IMAGE,function(r,s){return n("li",{staticClass:"good",on:{click:function(n){return t.changeImage(e,r.id,o)}}},[e.currentIndex!=r.id?n("img",{attrs:{src:r.img}}):t._e(),t._v(" "),e.currentIndex==r.id?n("img",{attrs:{src:r.activeImg}}):t._e(),t._v(" "),n("label",[t._v(t._s(r.name))])])}),0)])]),t._v(" "),n("div",{staticClass:"enter"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"item.content"}],attrs:{placeholder:"请在此输入评价"},domProps:{value:e.content},on:{input:function(r){r.target.composing||t.$set(e,"content",r.target.value)}}})])]):t._e()}),0)],1)},staticRenderFns:[]};var m=r("C7Lr")(u,l,!1,function(t){r("wWBw")},"data-v-5bcc12b0",null);e.default=m.exports},wWBw:function(t,e){}});
//# sourceMappingURL=55.3074baf6cbe61d4b6e97.js.map