<template>
  <div align="center">
    <h2>구매 내역</h2>
    <coin-pay-list :payCoins="payCoins"/>
  </div>
</template>

<script>
import CoinPayList from '../../components/coin/CoinPayList.vue'
import { inject, onMounted } from 'vue'

export default {
  name: 'CoinPayListView',
  components: { CoinPayList },
  setup() {
    const payCoins = inject("payCoins")
    const fetchPayCoinList = inject("fetchPayCoinList")

    onMounted (() => {
      fetchPayCoinList()
    })

    return {
      payCoins,
    }
  },
}
</script>
