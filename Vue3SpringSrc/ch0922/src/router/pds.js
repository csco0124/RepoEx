import MainHeader from '../components/common/MainHeader.vue'
import Footer from '../components/common/Footer.vue'
import MenuBar from '../components/common/MenuBar.vue'
import PdsListView from '../views/pds/PdsListView.vue'
import PdsRegisterView from '../views/pds/PdsRegisterView.vue'
import PdsModifyView from '../views/pds/PdsModifyView.vue'
import PdsReadView from '../views/pds/PdsReadView.vue'

export const PdsRouters = [
  {
    path: '/pds',
    name: 'PdsListView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: PdsListView,
      footer: Footer
    }
  },
  {
    path: '/pds/register',
    name: 'PdsRegisterView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: PdsRegisterView,
      footer: Footer
    },
  },
  {
    path: '/pds/:itemId',
    name: 'PdsReadView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: PdsReadView,
      footer: Footer
    },
    props: {
      default: true
    }
  },
  {
    path: '/pds/:itemId/modify',
    name: 'PdsModifyView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: PdsModifyView,
      footer: Footer
    },
    props: {
      default: true
    },
  }
]
