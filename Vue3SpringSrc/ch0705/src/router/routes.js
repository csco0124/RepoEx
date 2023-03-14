import BoardListView from '../views/BoardListView.vue'
import BoardRegisterView from '../views/BoardRegisterView.vue'
import BoardReadView from '../views/BoardReadView.vue'
import BoardModifyView from '../views/BoardModifyView.vue'

import { defineComponent } from 'vue'

const NotFound = defineComponent({
  template: '<div>Not Found</div>',
})

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
  { path: '/:catchAll(.*)+', component: NotFound },
]

export default routes
