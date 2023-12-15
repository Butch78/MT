<script setup lang="ts">
import { useDeckStore } from "../stores/deckStore";

import { ElButton, ElContainer, ElText } from "@/components/primitives";


import type { Deck } from "../models/deck";

import DeckRow from "@/components/DeckRow.vue";

const deckStore = useDeckStore();

await deckStore.getDecks();

const props = defineProps<{
  deckList: Array<Deck>;
}>();

const create = () => {
  console.log("Create Deck Button Clicked");
};
</script>

<template>
  <ElContainer>
    <div class="relative pt-36 ml-auto">
      <ElText id="question" label="Question" tag="h2" text="Decks" addCss="py-2" />
      <table class="w-full">
        <thead>
          <tr>
            <th class="w-8/2 text-left pl-4">Deck Name</th>
            <th class="w-4/2">Actions</th>
          </tr>
        </thead>
        <tbody class="w-full">
          <DeckRow v-for="deck in deckList" :deck="deck" :key="deck.id" />
        </tbody>

      </table>
      <div class="flex px-2 py-2 justify-end">
        <RouterLink to="/create">
          <ElButton id="create" label="Create Deck" theme="primary" @clicked="create" />
        </RouterLink>
      </div>
    </div>

  </ElContainer>
</template>
