import MainHeader from '../components/common/MainHeader.vue'
import Footer from '../components/common/Footer.vue'
import MenuBar from '../components/common/MenuBar.vue'
import NoticeListView from '../views/notice/NoticeListView.vue'
import NoticeRegisterView from '../views/notice/NoticeRegisterView.vue'
import NoticeModifyView from '../views/notice/NoticeModifyView.vue'
import NoticeReadView from '../views/notice/NoticeReadView.vue'

export const NoticeRouters = [
  {
    path: '/notice',
    name: 'NoticeListView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: NoticeListView,
      footer: Footer
    }
  },
  {
    path: '/notice/register',
    name: 'NoticeRegisterView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: NoticeRegisterView,
      footer: Footer
    },
  },
  {
    path: '/notice/:noticeNo',
    name: 'NoticeReadView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: NoticeReadView,
      footer: Footer
    },
    props: {
      default: true
    }
  },
  {
    path: '/notice/:noticeNo/modify',
    name: 'NoticeModifyView',
    components: {
      header: MainHeader,
      menu: MenuBar,
      default: NoticeModifyView,
      footer: Footer
    },
    props: {
      default: true
    },
  }
]
