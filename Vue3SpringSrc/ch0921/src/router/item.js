import MainHeader from '../components/common/MainHeader.vue'
import Footer from '../components/common/Footer.vue'
import MenuBar from '../components/common/MenuBar.vue'
import ItemListView from '../views/item/ItemListView.vue'
import ItemRegisterView from '../views/item/ItemRegisterView.vue'
import ItemModifyView from '../views/item/ItemModifyView.vue'
import ItemReadView from '../views/item/ItemReadView.vue'

export const ItemRouters = [
  {
    path: '/item',
    name: 'ItemListView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: ItemListView,
      footer: Footer
    }
  },
  {
    path: '/item/register',
    name: 'ItemRegisterView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: ItemRegisterView,
      footer: Footer
    },
  },
  {
    path: '/item/:itemId',
    name: 'ItemReadView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: ItemReadView,
      footer: Footer
    },
    props: {
      default: true
    }
  },
  {
    path: '/item/:itemId/modify',
    name: 'ItemModifyView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: ItemModifyView,
      footer: Footer
    },
    props: {
      default: true
    },
  }
]
