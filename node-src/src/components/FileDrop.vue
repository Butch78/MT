<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import { ElText, ElButton, ElBaseInput, ElContainer } from './primitives';

import { useFileStore } from '@/stores/fileStore';


const events = ["dragenter", "dragleave", "dragover", "drop"]


const fileStore = useFileStore();


onMounted(() => {
    events.forEach(event => document.body.addEventListener(event, (e) => e.preventDefault()))
})

onUnmounted(() => {
    events.forEach(event => document.body.removeEventListener(event, (e) => e.preventDefault()))
})

const emit = defineEmits<{ (e: "upload", file: any): void }>()
const entering = ref(false)

function handleDrop(e: DragEvent): void {
    const files = e.dataTransfer?.files as FileList
    emit("upload", [...files])
}

function handleInput(): void {
    var fileInput = document.getElementById('fileInput');
    fileStore.uploadFile(fileInput);

}

</script>
<template>
    <div class="py-20">
        <ElContainer>
            <input
                class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file" id="fileInput" name="file"><br>
            <ElButton @click="handleInput" id="submit" label="Create Lesson" />
        </ElContainer>
    </div>
</template>