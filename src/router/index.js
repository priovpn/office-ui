// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/auth/sign-in",
    component: () => import("@/layouts/default/Auth.vue"),
    children: [
      {
        path: "",
        name: "Sign-In",
        component: () => import("@/views/Auth/SignIn.vue"),
      },
    ],
  },
  {
    path: "/auth/sign-up",
    component: () => import("@/layouts/default/Auth.vue"),
    children: [
      {
        path: "",
        name: "Sign-Up",
        component: () => import("@/views/Auth/SignUp.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
