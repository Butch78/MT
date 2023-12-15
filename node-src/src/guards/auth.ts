import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

export async function authGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> {
    const authStore = useAuthStore();
    await authStore.loadUser();

    if (!to.meta.authRequired || authStore.isAuthenticated) {
        to.name !== 'Login'
        return next();
    } else {
        authStore.saveRedirectRoute(to);
        return next({ name: 'Login' });
    }
}