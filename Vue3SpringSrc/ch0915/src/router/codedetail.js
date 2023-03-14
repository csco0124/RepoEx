import MainHeader from '../components/common/MainHeader.vue'
import Footer from '../components/common/Footer.vue'
import MenuBar from '../components/common/MenuBar.vue'
import CodeDetailListView from '../views/codedetail/CodeDetailListView.vue'
import CodeDetailRegisterView from '../views/codedetail/CodeDetailRegisterView.vue'
import CodeDetailModifyView from '../views/codedetail/CodeDetailModifyView.vue'
import CodeDetailReadView from '../views/codedetail/CodeDetailReadView.vue'

export const CodeDetailRouters = [
  {
    path: '/codedetail',
    name: 'CodeDetailListView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CodeDetailListView,
      footer: Footer
    },
  },
  {
    path: '/codedetail/register',
    name: 'CodeDetailRegisterView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CodeDetailRegisterView,
      footer: Footer
    },
  },
  {
    path: '/codedetail/:groupCode/:codeValue',
    name: 'CodeDetailReadView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CodeDetailReadView,
      footer: Footer
    },
    props: {
      default: true
    },
  },
  {
    path: '/codedetail/:groupCode/:codeValue/modify',
    name: 'CodeDetailModifyView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CodeDetailModifyView,
      footer: Footer
    },
    props: {
      default: true
    },
  }
]
