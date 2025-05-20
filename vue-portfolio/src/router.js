import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    path: "/test",
    name: "test",
    component: () => import("./components/tests/Open.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/pages/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./components/pages/register.vue")
  },
  {
    path: "/main",
    alias: "/main",
    name: "main",
    component: () => import("./components/pages/mainPage.vue")
  },
  {
    path: "/:name",
    name: "myPage",
    component: () => import("./components/pages/publicPage.vue")
  },
  {
    path: "/",
    name: "public",
    component: () => import("./components/pages/public.vue")
  },
  {
    path: "/status",
    name: "status",
    component: () => import("./components/pages/Moderator.vue")
  },
  
  {
    path: "/roles",
    name: "roles",
    component: () => import("./components/pages/admin.vue")
  },
  
  


]
const router = createRouter({
  routes,
  history: createWebHistory()
})
export default router;