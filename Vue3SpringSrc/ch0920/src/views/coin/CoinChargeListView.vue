<template>
  <div align="center">
    <h2>충전 내역</h2>
    <coin-charge-list :chargeCoins="chargeCoins"/>
  </div>
</template>

<script>
import CoinChargeList from '../../components/coin/CoinChargeList.vue'
import { inject, onMounted } from 'vue'

export default {
  name: 'CoinChargeListView',
  components: { CoinChargeList },
  setup() {
    const chargeCoins = inject("chargeCoins")
    const fetchChargeCoinList = inject("fetchChargeCoinList")

    onMounted (() => {
      fetchChargeCoinList()
    })

    return {
      chargeCoins,
    }
  },
}
</script>
