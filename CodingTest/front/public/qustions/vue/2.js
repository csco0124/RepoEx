/** 
 * Vue.js 고급 
 * 성명 : 
 */

new Vue({
    el: "#app",
    data: {  
        sortType : "asc",
        searchText : "",
        products : []
    },
    methods: {
        getProducts: function(){
            // TODO : load data 
            // api 주소 : http://localhost:8080/getMemberList.do
            // method : get
            // axios 사용가능합니다.
            console.log("load data");
        },
        toggleSort: function() {
            // TODO : Sort 구현. ID 기준 오름차순, 내림차순
            console.log("toggle sort");
            this.sortType = this.sortType === "asc" ? "desc" : "asc";

        },
        searchItem: function() {
            // TODO : 이름으로 검색기능 구현.
            console.log("search : " + this.searchText);
        },
        onChangeSearchText: function(event) {
            console.log(event.target.value);
            this.searchText = event.target.value;
        }
    }
})