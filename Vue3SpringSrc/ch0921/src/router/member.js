import MainHeader from '../components/common/MainHeader.vue'
import Footer from '../components/common/Footer.vue'
import MenuBar from '../components/common/MenuBar.vue'
import AdminSetupView from '../views/member/AdminSetupView.vue'
import MemberListView from '../views/member/MemberListView.vue'
import MemberRegisterView from '../views/member/MemberRegisterView.vue'
import MemberModifyView from '../views/member/MemberModifyView.vue'
import MemberReadView from '../views/member/MemberReadView.vue'

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
  },
  {
    path: '/user',
    name: 'MemberListView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: MemberListView,
      footer: Footer
    },
  },
  {
    path: '/user/register',
    name: 'MemberRegisterView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: MemberRegisterView,
      footer: Footer
    },
  },
  {
    path: '/user/:userNo',
    name: 'MemberReadView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: MemberReadView,
      footer: Footer
    },
    props: {
      default: true
    },
  },
  {
    path: '/user/:userNo/modify',
    name: 'MemberModifyView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: MemberModifyView,
      footer: Footer
    },
    props: {
      default: true
    },
  },
]
