/**
 * Vue.js 초급 
 * 성명 : 
 */

new Vue({
    el: "#app",
    data: {  
        products : []
    },
    methods: {
        getProducts: function(){
            // TODO : load data
            // api 주소 : http://localhost:8080/getMemberList.do
            // method : get 
            // axios 사용가능합니다.
            console.log("load data");
        }
    }
})