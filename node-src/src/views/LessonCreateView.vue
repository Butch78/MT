
<script setup lang="ts">

import { computed } from 'vue';

import { useFileStore } from '@/stores/fileStore';
import FileDrop from '@/components/FileDrop.vue'
import Output from '@/components/Output.vue'

const fileStore = useFileStore();


await fileStore.getOutPuts();

const outputList = computed(() => fileStore.outputs);


const onUpload = (file: File) => {
    console.log('Uploading file');
    fileStore.uploadFile(file);
};

</script>

<template>
    <FileDrop @upload="onUpload"></FileDrop>

    <Output :outputList="outputList" />
</template>

<style></style>
