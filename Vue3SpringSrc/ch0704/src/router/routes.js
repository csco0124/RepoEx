import BoardListView from '../views/BoardListView.vue'
import BoardRegisterView from '../views/BoardRegisterView.vue'
import BoardReadView from '../views/BoardReadView.vue'
import BoardModifyView from '../views/BoardModifyView.vue'

const routes = [
  {
    path: '/',
    name: 'BoardListView',
    components: {
      default: BoardListView
    }
  },
  {
    path: '/board/create',
    name: 'BoardRegisterView',
    components: {
      default: BoardRegisterView
    }
  },
  {
    path: '/board/:boardNo',
    name: 'BoardReadView',
    components: {
      default: BoardReadView
    },
    props: {
      default: true
    }
  },
  {
    path: '/board/:boardNo/edit',
    name: 'BoardModifyView',
    components: {
      default: BoardModifyView
    },
    props: {
      default: true
    }
  },
]

export default routes
