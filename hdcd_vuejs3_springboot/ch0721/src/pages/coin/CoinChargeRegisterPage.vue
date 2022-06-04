<template>
  <div align="center">
    <h2>코인 충전</h2>
    <coin-charge-register-form @charge-coin="chargeCoin"/>
  </div>
</template>

<script>
import client from '/@modules/client.js'
import CoinChargeRegisterForm from '/@components/coin/CoinChargeRegisterForm.vue'
import { router } from '/@router/router.js'

export default {
  name: 'CoinChargeRegisterPage',
  components: { CoinChargeRegisterForm },
  setup() {
    const chargeCoin = (payload) => {
      const { amount } = payload
      client.post(`/coins/charge/${amount}`, { amount })
        .then(res => {
          alert(res.data)
          router.push({
            name: 'CoinChargeListPage'
          })
        })
        .catch(err => {
          if (err.response.status === 401) {
            alert('로그인이 필요합니다.')
            router.push({ name: 'Signin' })
          } else if (err.response.status === 403) {
            alert('접근 권한이 없습니다.')
            router.back()
          } else {
            alert(err.response.data.message)
          }
        })
    }

    return {
      chargeCoin,
    }
  },
}
</script>
