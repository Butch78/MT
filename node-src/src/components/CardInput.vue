<script lang="ts" setup>
import { ref, computed } from 'vue';

import { ElContainer, ElText, ElButton, ElBaseInput } from './primitives';
import ElInput from '@/components/ElInput.vue';
import ElTextarea from '@/components/ElTextarea.vue';

import type { Deck, CardCreate, CardUpdate } from '@/models';
import { validate, length, required } from '../validation'


export interface Props {
    currentDeck: Deck;
    card: CardCreate | CardUpdate;
    editing: boolean;
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (event: 'updateCard', value: CardCreate | CardUpdate): void
}>();


const question = ref<string>(props.card?.question ?? '');
const questionStatus = computed(() => {
    return validate(question.value, [required, length({ min: 3, max: 50 })])
})

const answer = ref<string>(props.card?.answer ?? '');
const answerStatus = computed(() => {
    return validate(answer.value, [required, length({ min: 3, max: 120 })])
})

const isInvalid = computed(() => {
    return (!questionStatus.value.valid || !answerStatus.value.valid)
})

async function updateCard() {
    console.log('updateCard')
    if (isInvalid.value) {
        return
    }
    if (props.editing) {
        console.log('editing')
        try {
            emit('updateCard', {
                ...props.card,
                question: question.value,
                answer: answer.value
            } as CardUpdate)
            question.value = ''
            answer.value = ''
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            console.log("Creating card")
            emit('updateCard', {
                question: question.value,
                answer: answer.value
            } as CardCreate)
            question.value = ''
            answer.value = ''
        } catch (error) {
            console.log(error)
        }
    }
}

</script>
<template>
    <ElBaseInput>
        <template #el-base-input>
            <div v-if="currentDeck">
                <ElText id="question" label="Question" tag="label" text="Deck Name" />
                <ElText id="question" label="Question" tag="p" :text="currentDeck.name" />
            </div>
            <div v-else>
                <h1>Deck is undefined</h1>
                <!-- TODO create drop down of other decks to add card too -->
            </div>

            <ElInput :status="questionStatus" name="card-question" placeholder="" type="text" id="question" label="Question"
                v-model="question" />

            <ElTextarea :status="answerStatus" name="card-answer" text="" placeholder="" type="text" id="answer"
                label="Answer" v-model="answer" />

        </template>
        <template #el-action>
            <router-link to="/">
                <ElButton id="cancel" label="Completed" theme="secondary" />
            </router-link>
            <ElButton id="create" :disabled="isInvalid" label="Save and Add More" theme="primary" @clicked="updateCard" />
        </template>
    </ElBaseInput>

    <!-- TODO Display table of created cards? -->
</template>