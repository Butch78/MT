<script setup lang="ts">
import { useLessonStore } from '@/stores/lessonStore';

import { ElButton, ElContainer, ElText } from '@/components/primitives';

import type { Lesson } from '@/models/lesson';

import LessonRow from '@/components/LessonRow.vue';

const lessonStore = useLessonStore();
await lessonStore.getLessons();

const props = defineProps<{
    lessonList: Array<Lesson>;
}>();

const create = () => {
    console.log('Create Lesson Button Clicked');
};

</script>
<template>
    <ElContainer>
        <div class="relative pt-36 ml-auto">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="w-8/2 text-left pl-4">Lesson Name</th>
                        <th class="w-4/2">Actions</th>
                    </tr>
                </thead>
                <tbody class="w-full">
                    <LessonRow v-for="lesson in lessonList" :lesson="lesson" :key="lesson.id" />
                </tbody>

            </table>
            <div class="flex px-2 py-2 justify-end">
                <RouterLink to="/create">
                    <ElButton id="create" label="Create Lesson" theme="primary" @clicked="create" />
                </RouterLink>
            </div>
        </div>

    </ElContainer>
</template>
