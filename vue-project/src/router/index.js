import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import DataBinding from "../views/DataBinding.vue";
import ParentComponent from "../views/ParentComponent.vue";
import SlotComponent from "../views/SlotComponent.vue";
import ProvideInject from "../views/ProvideInject.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView,
  },
  {
    path: "/databinding",
    name: "DataBinding",
    component: DataBinding,
  },
  {
    path: "/nested",
    name: "ParentComponent",
    component: ParentComponent,
  },
  {
    path: "/slot",
    name: "SlotComponent",
    component: SlotComponent,
  },
  {
    path: "/proinj",
    name: "ProvideInject",
    component: ProvideInject,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
