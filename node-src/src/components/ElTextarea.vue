<script setup lang="ts">
import { computed } from "vue";
import { ElText } from './primitives';
import type { Status } from "@/validation";

const props = defineProps<{
    label: string;
    text: string;
    name: string;
    placeholder: string;
    modelValue: string;
    status: Status
}>();

const emit = defineEmits(['update:modelValue'])


const value = computed({
    get() {
        return props.modelValue
    },

    set(value) {
        return emit('update:modelValue', value)
    }
})

</script>

<template>
    <div class="field">
        <ElText :name="name" tag="label" :text="label" />
        <textarea type="textarea"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            :placeholder="props.placeholder" v-model="value" />
        <ElText v-if="!status.valid" :id="name" tag="p" :text="status.message" />
    </div>
</template>
