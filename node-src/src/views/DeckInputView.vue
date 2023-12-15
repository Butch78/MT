<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import DeckInput from "@/components/DeckInput.vue";

import { ElContainer } from "@/components/primitives";

import { useDeckStore } from "../stores/deckStore";
import type { DeckUpdate, DeckCreate } from "@/models/deck";

const deckStore = useDeckStore();

const editDeck = ref<DeckUpdate | DeckCreate>();
const isEditing = ref(false);

const route = useRoute();

const id = route.params.id as string;

if (id) {
  const deck = deckStore.getDeck(id);

  if (deck) {
    editDeck.value = deck;
  } else {
    editDeck.value = {} as DeckCreate;
    isEditing.value = true;
  }
}

const onUpdateDeck = (deck: DeckCreate | DeckUpdate) => {
  if (isEditing.value) {
    deckStore.updateDeck(deck as DeckUpdate);
  } else {
    deckStore.createDeck(deck);
  }
};


</script>

<template>
  <ElContainer>
    <DeckInput :deck="editDeck" :editing="isEditing" @updateDeck="onUpdateDeck" />
  </ElContainer>
</template>

