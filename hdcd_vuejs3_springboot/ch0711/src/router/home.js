import Home from '/@pages/Home.vue'
import MainHeader from '/@components/common/MainHeader.vue'
import Footer from '/@components/common/Footer.vue'
import MenuBar from '/@components/common/MenuBar.vue'

export const HomeRouters = [
  {
    path: '/',
    name: 'Home',

    components: {
      header: MainHeader,
      menu: MenuBar,
      default: Home,
      footer: Footer
    }
  }
]
