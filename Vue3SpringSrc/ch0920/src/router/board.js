import MainHeader from '../components/common/MainHeader.vue'
import Footer from '../components/common/Footer.vue'
import MenuBar from '../components/common/MenuBar.vue'
import BoardListView from '../views/board/BoardListView.vue'
import BoardRegisterView from '../views/board/BoardRegisterView.vue'
import BoardModifyView from '../views/board/BoardModifyView.vue'
import BoardReadView from '../views/board/BoardReadView.vue'

export const BoardRouters = [
  {
    path: '/board',
    name: 'BoardListView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: BoardListView,
      footer: Footer
    }
  },
  {
    path: '/board/register',
    name: 'BoardRegisterView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: BoardRegisterView,
      footer: Footer
    },
  },
  {
    path: '/board/:boardNo',
    name: 'BoardReadView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: BoardReadView,
      footer: Footer
    },
    props: {
      default: true
    }
  },
  {
    path: '/board/:boardNo/modify',
    name: 'BoardModifyView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: BoardModifyView,
      footer: Footer
    },
    props: {
      default: true
    },
  }
]
