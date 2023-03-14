import ItemListView from '../views/ItemListView.vue'
import ItemRegisterView from '../views/ItemRegisterView.vue'
import ItemModifyView from '../views/ItemModifyView.vue'
import ItemReadView from '../views/ItemReadView.vue'

const routes = [
  {
    path: '/',
    name: 'ItemListView',
    components: {
      default: ItemListView
    }
  },
  {
    path: '/item/register',
    name: 'ItemRegisterView',
    components: {
      default: ItemRegisterView
    }
  },
  {
    path: '/item/:itemId',
    name: 'ItemReadView',
    components: {
      default: ItemReadView
    },
    props: {
      default: true
    }
  },
  {
    path: '/item/:itemId/modify',
    name: 'ItemModifyView',
    components: {
      default: ItemModifyView
    },
    props: {
      default: true
    }
  }
]

export default routes
