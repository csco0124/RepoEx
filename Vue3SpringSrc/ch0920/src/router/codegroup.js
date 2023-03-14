import MainHeader from '../components/common/MainHeader.vue'
import Footer from '../components/common/Footer.vue'
import MenuBar from '../components/common/MenuBar.vue'
import CodeGroupListView from '../views/codegroup/CodeGroupListView.vue'
import CodeGroupRegisterView from '../views/codegroup/CodeGroupRegisterView.vue'
import CodeGroupModifyView from '../views/codegroup/CodeGroupModifyView.vue'
import CodeGroupReadView from '../views/codegroup/CodeGroupReadView.vue'

export const CodeGroupRouters = [
  {
    path: '/codegroup',
    name: 'CodeGroupListView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CodeGroupListView,
      footer: Footer
    },
  },
  {
    path: '/codegroup/register',
    name: 'CodeGroupRegisterView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CodeGroupRegisterView,
      footer: Footer
    },
  },
  {
    path: '/codegroup/:groupCode',
    name: 'CodeGroupReadView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CodeGroupReadView,
      footer: Footer
    },
    props: {
      default: true
    },
  },
  {
    path: '/codegroup/:groupCode/modify',
    name: 'CodeGroupModifyView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: CodeGroupModifyView,
      footer: Footer
    },
    props: {
      default: true
    },
  }
]
