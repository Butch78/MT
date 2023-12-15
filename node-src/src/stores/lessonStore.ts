import { defineStore, type Store } from "pinia";

import type { User } from '@supabase/supabase-js';
import { supabase } from '@/supabase';

import { useAuthStore } from '@/stores/authStore';
import { useDeckStore } from "./deckStore";


import type { Lesson } from "@/models/lesson";
import type { File } from "@/models/file";


type State = {
    Downloaded: boolean;
    currentLessonId: string | null;
    lessons: Lesson[];
    files: File[];
    chats: string[];
};

type Getters = {
    isDownloaded(state: State): boolean;
    currentLesson(state: State): Lesson;
};

type Actions = {
    getLessons(): void;
    getLesson(lessonId: string): void;
    createLesson(lesson: Lesson): void;
    putLesson(lesson: Lesson): void;
    deleteLesson(lessonId: string): void;
    setCurrentLesson(lessonId: string): void;
};

export const useLessonStore = defineStore<"LessonStore", State, Getters, Actions>(
    "LessonStore",
    {
        state: (): State => {
            return {
                Downloaded: false,
                currentLessonId: null,
                lessons: [],
                files: [],
                chats: [],
            };
        },
        getters: {
            isDownloaded(state: State) {
                return state.Downloaded;
            },
            currentLesson(state: State): Lesson {
                const lesson = state.lessons.find((lesson) => lesson.id === state.currentLessonId);
                if (lesson === undefined) {
                    console.log("Current Lesson not found", state.lessons);
                    return state.lessons[state.lessons.length - 1]
                } else {
                    return lesson;
                }
            }
        },
        actions: {
            async createLesson(lesson: Lesson) {
                const authStore = useAuthStore();
                const { data: newLesson, error } = await supabase
                    .from("lessons")
                    .insert({
                        ...lesson,
                        user_id: authStore.currentUser?.id,
                    });
                if (error) throw error;
                console.log("LessonStore postLesson", newLesson);
            },

            async getLessons() {
                const authStore = useAuthStore();
                const { data: lessons, error } = await supabase
                    .from("lessons")
                    .select("*, decks(*)")
                    .eq("user_id", authStore.currentUser?.id);

                if (error) throw error;
                console.log("LessonStore loadLessons", lessons);
            },
            async getLesson(lessonId: string) {
                const { data: lesson, error } = await supabase
                    .from("lessons")
                    .select("*")
                    .eq("id", lessonId)
                    .single();
                if (error) throw error;
                console.log("LessonStore loadLesson", lesson);
                this.currentLessonId = lesson.id;
                this.Downloaded = true;
            },

            async putLesson(lesson: Lesson) {
                const { data: updatedLesson, error } = await supabase
                    .from("lessons")
                    .update(lesson)
                    .eq("id", lesson.id);
                if (error) throw error;
                console.log("LessonStore putLesson", updatedLesson);
            },
            async deleteLesson(lessonId: string) {
                const { data: deletedLesson, error } = await supabase
                    .from("lessons")
                    .delete()
                    .eq("id", lessonId);
                if (error) throw error;
                console.log("LessonStore deleteLesson", deletedLesson);
            },
            setCurrentLesson(lessonId: string) {
                const deckStore = useDeckStore();

                console.log("LessonStore setCurrentLesson", lessonId);

                this.currentLessonId = lessonId;
                // Get deck of the lesson 
                const lesson = this.lessons.find((lesson) => lesson.id === lessonId);
                console.log("LessonStore setCurrentLesson", lesson);
                if (lesson === undefined) {
                    console.log("Current Lesson not found", this.lessons);
                    return;
                } else {
                    deckStore.setCurrentDeck(lesson?.decks[0].id);
                }
            }
        },
    }
);


