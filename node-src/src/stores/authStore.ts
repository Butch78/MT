import { defineStore } from 'pinia';
import type { RouteLocation } from 'vue-router';

import type { User, UserResponse } from '@supabase/supabase-js';
import { supabase } from '@/supabase';

type State = {
    currentUser?: User | null;
    redirectRoute: Partial<RouteLocation> | null;
};

type Getters = {
    isAuthenticated(): boolean;
};

type Actions = {
    loadUser(): void;
    clearUser(): void;
    saveRedirectRoute(route: Partial<RouteLocation>): void;
    loadRedirectRoute(): void;
    clearRedirectRoute(): void;
};

export const useAuthStore = defineStore<'auth', State, Getters, Actions>(
    'auth',
    {
        state() {
            return {
                currentUser: null,
                redirectRoute: null
            };
        },
        getters: {
            isAuthenticated() {
                return !!this.currentUser;
            }
        },
        actions: {
            async loadUser() {
                try {
                    const { data: user, error } = await supabase.auth.getUser();
                    if (error) throw error;
                    this.currentUser = user.user;
                } catch (error) {
                    console.error('Error loading user', error);
                }

            },
            clearUser() {
                this.currentUser = null;
            },
            saveRedirectRoute(route: Partial<RouteLocation>) {
                const { name, params, query, hash } = route;

                localStorage.setItem(
                    'redirectRoute',
                    JSON.stringify({
                        name,
                        params,
                        query,
                        hash
                    })
                );
            },
            loadRedirectRoute() {
                const route = JSON.parse(
                    localStorage.getItem('redirectRoute') || 'null'
                ) as Partial<RouteLocation> | null;

                this.redirectRoute = route;
            },
            clearRedirectRoute() {
                localStorage.removeItem('redirectRoute');
                this.redirectRoute = null;
            }
        }
    }
);