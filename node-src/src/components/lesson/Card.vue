<script setup lang="ts">

import { ref, computed } from "vue";
import { ElText, ElButton, ElContainer } from "@/components/primitives";

import { useCardStore } from "@/stores/cardStore";
import { cardCssStrategy } from "./LessonCssStrategy";

import type { Card } from "@/models/card";


export interface Props {
    addCss?: string;
    card: Card;
    isCurrent: boolean;
}

const cardStore = useCardStore();
const showAnswer = ref(false);

const emit = defineEmits<{
    (e: "card-completed", value: Card): Card;
}>();


const props = defineProps<Props>()

// emit when the user clicks on a button
const handleFreshClick = () => {
    console.log("handleFreshClick");
    showAnswer.value = false;
    emit("card-completed", cardStore.updateCard(props.card, 5));
}

const handleStaleClick = () => {
    console.log("handleStaleClick");
    showAnswer.value = false;
    emit("card-completed", cardStore.updateCard(props.card, 3));
}

const handleRottenClick = () => {
    console.log("handleRottenClick");
    showAnswer.value = false;
    emit("card-completed", cardStore.updateCard(props.card, 1));
}


// a computed property to return a different css class based on the selected value
const cssClass = computed((): string => {
    const result = [
        "shadow sm:overflow-hidden sm:rounded-md",
    ];

    // these are the button CSS classes when enabled
    result.push(cardCssStrategy.get(props.card.fruit) as string);


    // addCss will have additional CSS classes
    // we want to apply from where we consume this component
    const addCss = (props.addCss || "").trim();
    if (addCss.length > 0) {
        result.push(addCss);
    }
    return result.join(" ").trim();
});
</script>

<template>
    <div v-show="isCurrent">
        <transition name="flip">
            <div v-if="!showAnswer">

                <ElContainer>
                    <div :class="cssClass">
                        <div class="justify-items-center">
                            
                            <div class="justify-items-center">
                                <ElText id="answer" label="Answer" tag="h2" :text="props.card.question" />
                            </div>

                            <ElButton id="show-answer" label="Show Answer" theme="primary" @clicked="showAnswer = true" />
                        </div>
                    </div>

                </ElContainer>
            </div>

            <div v-else>

                <ElContainer>
                    <div :class="cssClass">
                        <div class="justify-items-center">
                            <ElText id="answer" label="Answer" tag="h2" :text="props.card.answer" />

                            <div class="flex flex-wrap justify-center gap-12">
                                <ElButton id="fresh" label="Fresh" theme="fresh" @clicked="handleFreshClick" />

                                <ElButton id="stale" label="Stale" theme="stale" @clicked="handleStaleClick" />

                                <ElButton id="rotten" label="Rotten" theme="rotten" @clicked="handleRottenClick" />
                            </div>

                        </div>

                    </div>

                </ElContainer>
            </div>
        </transition>
    </div>
</template>

<style>
.flip-enter-active {
    transition: all 0.6s ease;
}

.flip-leave-active {
    display: none;
}

.flip-enter-from,
.flip-leave-to {
    transform: rotateY(180deg);
    opacity: 0;
}
</style>