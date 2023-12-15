<script setup lang="ts">

import { computed } from "vue";
import { useDeckStore } from "@/stores/deckStore";
import Deck from "@/components/lesson/Deck.vue";
import { ElContainer } from "@/components/primitives";


const deckStore = useDeckStore();

await deckStore.getDecks();

const isDownloaded = computed(() => deckStore.isDownloaded);
const cards = computed(() => deckStore.currentDeck.cards);


</script>

<template>
    <ElContainer>
        <div v-if="isDownloaded" class="justify-around py-20 align-middle">
            <Deck :deck="cards" />

        </div>

    </ElContainer>
</template>
        
<style scoped >
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
