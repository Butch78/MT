
<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import type { Lesson } from '@/models';
import { ElButton } from '@/components/primitives';
import { useLessonStore } from '@/stores/lessonStore';

const { Menu, MenuButton, MenuItem, MenuItems } = await import(
    "@headlessui/vue"
);

const lessonStore = useLessonStore();

const props = defineProps<{
    lesson: Lesson;
}>();


function setCurrentLessonId() {
    lessonStore.setCurrentLesson(props.lesson.id);
}

function editLesson() {
    console.log("Edit Lesson");
    setCurrentLessonId();
}

function startLearning() {
    console.log("Start Learning");
    setCurrentLessonId();
}

</script>

<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="w-10/12 pl-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ lesson.name }}
        </th>

        <td class="w-1/12 py-2 mr-2">
            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton
                        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Edit
                        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </MenuButton>
                </div>

                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                            <MenuItem v-slot="{ active }">
                            <router-link to="/create" :class="[
                                active ? 'bg-gray-100 text-gray-500' : 'text-blue-700',
                                'block px-4 py-2 text-sm',
                            ]">Add Content</router-link>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                            <div @click="editLesson">
                                <router-link @click="editLesson" :to="{ path: `/edit/${lesson.id}` }" :class="[
                                    active ? 'bg-gray-100 text-gray-500' : 'text-blue-700',
                                    'block px-4 py-2 text-sm',
                                ]">Edit Lesson</router-link>
                            </div>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
        </td>
        <td class="w-1/12 px-2 py-2">
            <router-link :to="{ path: `/learn/${lesson.id}` }">
                <ElButton id="start" label="Start" theme="primary" @clicked="startLearning" />
            </router-link>
        </td>
    </tr>
</template>



