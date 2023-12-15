


<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";


import CardInput from "@/components/CardInput.vue";
import { ElContainer } from "@/components/primitives";

import { useDeckStore } from "../stores/deckStore";
import { useCardStore } from "../stores/cardStore";
import type { Card, CardCreate, CardUpdate } from "@/models";


const route = useRoute();
const deckStore = useDeckStore();
await deckStore.getDecks();

const editCard = ref<CardUpdate | CardCreate>();
const isEditing = ref(false);
const currentDeck = deckStore.currentDeck;

const id = route.params.id as string;
if (id) {
  const card = await deckStore.getCard(id) as Card;
  if (card) {
    editCard.value = card;
  } else {
    editCard.value = {} as CardCreate;
    isEditing.value = true;
  }
} else {
  editCard.value = {} as CardCreate;
}

const onUpdateCard = (card: CardCreate | CardUpdate) => {
  card.deck_id = currentDeck.id;

  if (isEditing.value) {
    deckStore.updateCard(card as CardUpdate);
  } else {
    deckStore.createCard(card);
  }
};
</script>



<template>
  <ElContainer>
    <div v-if="editCard">
      <CardInput :currentDeck="currentDeck" :card="editCard" :editing="isEditing" @updateCard="onUpdateCard" />
    </div>
  </ElContainer>
</template>