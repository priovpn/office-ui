// Composables
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/settings",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "settings",
        component: () => import("@/views/Home/Settings.vue"),
      },
    ],
  },
  {
    path: "/vpns",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "myVpns",
        component: () => import("@/views/Home/Vpns.vue"),
      },
    ],
  },
  {
    path: "/devices",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "myDevices",
        component: () => import("@/views/Home/Devices.vue"),
      },
    ],
  },
  {
    path: "/sub",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "sub",
        component: () => import("@/views/Home/Sub.vue"),
      },
    ],
  },
  {
    path: "/sign-out",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "signOut",
        component: () => import("@/views/Auth/SignOut.vue"),
      },
    ],
  },
  {
    path: "/auth/sign-in",
    component: () => import("@/layouts/auth/Default.vue"),
    children: [
      {
        path: "",
        name: "signIn",
        component: () => import("@/views/Auth/SignIn.vue"),
      },
    ],
  },
  {
    path: "/auth/sign-up",
    component: () => import("@/layouts/auth/Default.vue"),
    children: [
      {
        path: "",
        name: "signUp",
        component: () => import("@/views/Auth/SignUp.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
