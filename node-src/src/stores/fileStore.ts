import { defineStore } from "pinia";
import { fileApiService } from "../helpers/FileApiService";
import { outputApiService } from "../helpers/OutputApiService";
import { supabase } from '@/supabase';

import { useAuthStore } from '@/stores/authStore';
import type { FileCreate, File, CardCreate } from "@/models";

type State = {
    isFileUploaded: boolean;
    file: File | null;
    isDownloaded: boolean;
    outputs: CardCreate[];
};

export const useFileStore = defineStore("fileStore", {
    state: (): State => ({
        isFileUploaded: JSON.parse(localStorage.getItem("isFileUploaded") as string) === "true" ? true : false,
        file: null,
        outputs: [],
        isDownloaded: JSON.parse(localStorage.getItem("isDownloaded") as string) === "true" ? true : false,
    }),
    getters: {
        isUploaded(): boolean {
            return this.isFileUploaded;
        }
    },
    actions: {

        async getOutPuts() {
            try {
                const authStore = useAuthStore();
                const { data: outputs, error, status } = await supabase
                    .from('outputs')
                    .select('*')
                    .eq('user_id', authStore.currentUser?.id)

                if (error) throw error;
                this.outputs = outputs as CardCreate[];
                this.isDownloaded = true;

            } catch (error) {
                console.log(error);
            }
        },

        async uploadFile(file: any): Promise<void> {
            try {

                const authStore = useAuthStore();


                const response = await fileApiService.createFile(file, authStore.currentUser?.id as string);
                this.file = response.data;
                this.isFileUploaded = true;
                localStorage.setItem("isFileUploaded", "true");
            }
            catch (error) {
                this.isFileUploaded = false;
            }
        },
    },
});
