<template>
  <div>
    <table border="1">
      <tr>
        <th align="center" width="80">번호</th>
        <th align="center" width="320">충전금액</th>
        <th align="center" width="180">등록일시</th>
      </tr>

      <tr v-if="!chargeCoins || (Array.isArray(chargeCoins) && chargeCoins.length === 0)">
        <td colspan="3">
          List is empty.
        </td>
      </tr>

      <tr v-else v-for="chargeCoin in chargeCoins" :key="chargeCoin.historyNo">
        <td align="center">{{ chargeCoin.historyNo }}</td>
        <td align="left">{{ chargeCoin.amount }}</td>
        <td align="center">{{ chargeCoin.regDate }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CoinChargeList',
  props: {
    chargeCoins: {
      type: Array
    }
  }
}
</script>
