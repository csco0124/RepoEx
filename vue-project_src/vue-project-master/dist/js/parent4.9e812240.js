(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["parent4"],{"9e92":function(e,n,t){"use strict";t.r(n);var s=t("7a23");function o(e,n,t,o,c,d){var r=Object(s["x"])("child-component");return Object(s["p"])(),Object(s["d"])(r,{onSendMessage:d.sendMessage},null,8,["onSendMessage"])}function c(e,n,t,o,c,d){return Object(s["p"])(),Object(s["d"])("div")}var d={data:function(){return{msg:"자식 컴포넌트로부터 보내는 메시지"}},mounted:function(){this.$emit("send-message",this.msg)}};d.render=c;var r=d,a={components:{ChildComponent:r},methods:{sendMessage:function(e){console.log(e)}}};a.render=o;n["default"]=a}}]);
//# sourceMappingURL=parent4.9e812240.js.map