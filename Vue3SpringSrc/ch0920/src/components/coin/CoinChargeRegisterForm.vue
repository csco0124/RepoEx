<template>
  <form @submit.prevent="fireChargeCoin">
    <table>
			<tr>
				<td>충전금액</td>
				<td><input type="text" v-model="amount"></td>
			</tr>
		</table>

    <div>
      <button type="submit">충전하기</button>
      <router-link :to="{ name: 'CoinChargeListView' }">충전내역</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CoinChargeRegisterForm',
  emits: ['charge-coin'],
  setup(props, context) {
    const amount = ref('')

    const fireChargeCoin = () => {
      context.emit('charge-coin', { amount: amount.value })
    }

    return {
      amount,
      fireChargeCoin,
    }
  },
}
</script>
