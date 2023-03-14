import MainHeader from '../components/common/MainHeader.vue'
import Footer from '../components/common/Footer.vue'
import MenuBar from '../components/common/MenuBar.vue'
import AdminSetupView from '../views/member/AdminSetupView.vue'

export const MemberRouters = [
  {
    path: '/user/setup',
    name: 'AdminSetupView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: AdminSetupView,
      footer: Footer
    }
  }
]
