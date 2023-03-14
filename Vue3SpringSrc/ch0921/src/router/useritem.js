import MainHeader from '../components/common/MainHeader.vue'
import Footer from '../components/common/Footer.vue'
import MenuBar from '../components/common/MenuBar.vue'
import UserItemListView from '../views/useritem/UserItemListView.vue'
import UserItemReadView from '../views/useritem/UserItemReadView.vue'

export const UserItemRouters = [
  {
    path: '/useritem',
    name: 'UserItemListView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: UserItemListView,
      footer: Footer
    },
  },
  {
    path: '/useritem/:userItemNo',
    name: 'UserItemReadView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: UserItemReadView,
      footer: Footer
    },
    props: {
      default: true
    },
  }
]
