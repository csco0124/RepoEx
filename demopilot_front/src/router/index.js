import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Test1View from '../views/Test1View.vue'
import Test2View from '@/views/Test2View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
		{
      path: '/test1',
      name: 'test1',
      component: Test1View
    },
		{
      path: '/test2',
      name: 'test2',
      component: Test2View
    }
  ]
})

export default router
