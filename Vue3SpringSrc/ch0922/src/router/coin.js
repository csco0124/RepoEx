import MainHeader from '../components/common/MainHeader.vue'
import Footer from '../components/common/Footer.vue'
import MenuBar from '../components/common/MenuBar.vue'
import CoinChargeListView from '../views/coin/CoinChargeListView.vue'
import CoinChargeRegisterView from '../views/coin/CoinChargeRegisterView.vue'
import CoinPayListView from '../views/coin/CoinPayListView.vue'

export const CoinRouters = [
  {
    path: '/coin',
    name: 'CoinChargeListView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CoinChargeListView,
      footer: Footer
    },
  },
  {
    path: '/coin/register',
    name: 'CoinChargeRegisterView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CoinChargeRegisterView,
      footer: Footer
    },
  },
  {
    path: '/coin/pay',
    name: 'CoinPayListView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CoinPayListView,
      footer: Footer
    },
  },
]
