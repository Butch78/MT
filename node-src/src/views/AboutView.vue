<script setup lang="ts">

import { ElText, ElButton, ElBase, ElContainer } from "@/components/primitives";
import { NButton, useNotification, useMessage } from "naive-ui";
import Basic from "@/components/Basic.vue";

</script>

<template>
    <n-message-provider>
        <ElContainer>
            <ElBase>

                <ElText id="heading" label="about-heading" tag="h2" text="About" />
                <div class="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
                    <div class="text-left">

                        <ElText id="subheading-what" label="signin-label" tag="h6" text="What is Fruit Cards?"
                            add-css="text-lg font-semibold text-gray-700 dark:text-white" />
                        <ElText id="paragrah-what" label="signin-label" tag="p"
                            text="Fruit Cards is a simple, spaced Learning flashcard app with a focus on simplicity and ease of use."
                            add-css="mt-2 text-gray-500" />

                    </div>
                </div>

            </ElBase>
        </ElContainer>

        <basic />
    </n-message-provider>
</template>