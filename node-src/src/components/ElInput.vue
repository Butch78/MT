<script setup lang="ts">

import { computed } from 'vue';
import { ElText } from './primitives';
import type { Status } from '../validation';

const props = defineProps<{
  label: string;
  name: string;
  modelValue: string
  status: Status;
  placeholder: string;
  type: string;
}>();


const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

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
    <input type="text"
      class="text-black w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
      :placeholder="props.placeholder" v-model="value" />
    <ElText v-if="!status.valid" :id="name" tag="p" :text="status.message" />
  </div>
</template>
