<template>
  <div></div>
</template>

<script>
import ApiMixin from "../api.js";
export default {
  mixins: [ApiMixin], //사용할 믹스인 파일을 배열로 등록
  data() {
    return {
      productList: [],
    };
  },
  async mounted() {
    this.productList = await this.$callAPI("https://162d8322-11cd-4cec-8ac2-317d36d0bf03.mock.pstmn.io/list", "get");
    console.log(this.productList);
  },
};
</script>