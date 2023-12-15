import { authGuard } from "@/guards/auth";
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import type { Deck } from '@/models';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/home", redirect: { name: "Deck-Create" } },
    { path: "/about", component: () => import("@/views/AboutView.vue"), meta: { authRequired: false } },
    {
      path: "/create",
      component: () => import("@/views/DeckInputView.vue"),
      meta: { authRequired: true },
      name: "Deck-Create",
    },
    {
      path: "/edit/:id",
      name: "Deck-Edit",
      meta: { authRequired: true },
      component: () => import("@/views/DeckInputView.vue"),
    },
    {
      path: "/",
      name: "Decks",
      meta: { authRequired: true },
      component: () => import("@/views/DeckTableView.vue"),
    },
    // {
    //   path: "/cards",
    //   name: "Cards",
    //   meta: { authRequired: true },
    //   component: () => import("@/views/CardsTableView.vue")
    // },
    {
      path: "/cards/create",
      meta: { authRequired: true },
      component: () => import("@/views/CardInputView.vue")
    },
    {
      path: "/cards/edit/:id",
      meta: { authRequired: true },
      component: () => import("@/views/CardInputView.vue")
    },
    {
      path: "/learn/:id",
      name: "Learn",
      component: () => import("@/views/LearnView.vue"),
      meta: { authRequired: true },
    },
    {
      path: "/upload",
      name: "Upload",
      component: () => import("@/views/LessonCreateView.vue"),
      meta: { authRequired: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { authRequired: false },
    }
  ],
});

router.beforeEach(authGuard);

export default router;
