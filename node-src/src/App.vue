<script setup lang="ts">

import { RouterView, useRouter } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';
import NavBar from "./components/NavBar.vue";


import { supabase } from '@/supabase';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

authStore.loadUser();

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN') {
    authStore.loadUser();
    authStore.loadRedirectRoute();
  } else if (event === 'SIGNED_OUT') {
    authStore.clearUser();
  }
});

authStore.$onAction(({ name, store, after }) => {
  if (name === 'loadRedirectRoute') {
    after(async () => {
      const redirectRoute = store.redirectRoute;

      if (redirectRoute) {
        await router.isReady();
        await router.replace(redirectRoute as RouteLocationRaw);
        authStore.clearRedirectRoute();
      }
    });
  }
});

</script>

<template>
  <NavBar />
  <div class="space-y-40 mb-40">

    <Suspense>
      <router-view></router-view>
    </Suspense>

  </div>
</template>

<style>
/*  Display Content at top */

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>
