import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: () => import("@/pages/HomeView.vue"),
    },
    {
      path: "/results/:ticket",
      name: "ResultView",
      component: () => import("@/pages/ResultView.vue"),
    },
  ],
});

export default router;
