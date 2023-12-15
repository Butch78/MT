<script setup lang="ts">
import { ref } from "vue";

import { useCardStore } from "@/stores/cardStore";
import type { Card as CardModel } from "@/models/card";
import Card from "@/components/lesson/Card.vue";
import { ElContainer, ElText } from "@/components/primitives";


export interface Props {
    deck: CardModel[];
}

const props = defineProps<Props>()

const cardStore = useCardStore();

cardStore.loadDeck(props.deck);

const getDeck = () => {
    return cardStore.getDeck;
}

let deck = ref(getDeck())

const onCompletedCard = (updatedCard: CardModel) => {
    cardStore.shiftCard();
}

</script>

<template>
    <ElContainer>
        <TransitionGroup name="list">
            <Card v-for="(card, index) in deck" :key="card.question" :card="card" :is-current="index === 0"
                @cardCompleted="onCompletedCard" />
        </TransitionGroup>

        <div v-if="!deck?.length">

            <ElText id="question" label="Question" tag="h2" text="Finished Deck 🍌🍇" />
        </div>
    </ElContainer>
</template>


<style scoped>
/* .deck {
    position: relative;
    display: flex;
    margin: 50px;
    width: 300px;
} */

.list-enter-active,
.list-leave-active {
    transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>