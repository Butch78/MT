<script lang="ts" setup>
import { computed, ref } from 'vue';

import { ElText, ElButton, ElBaseInput } from './primitives';
import ElInput from '@/components/ElInput.vue';
import ElTextarea from '@/components/ElTextarea.vue';

import type { Deck, DeckCreate, DeckUpdate } from "../models/deck";
import { validate, length, required } from '../validation'


export interface Props {
  deck?: DeckCreate | DeckUpdate;
  editing: boolean;
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'updateDeck', value: DeckCreate | DeckUpdate): void
}>();

const name = ref<string>(props.deck?.name ?? '');
const nameStatus = computed(() => {
  return validate(name.value, [required, length({ min: 3, max: 50 })])
})

const description = ref<string>(props.deck?.description ?? '');
const descriptionStatus = computed(() => {
  return validate(description.value, [length({ min: 0, max: 100 })])
})


const isInvalid = computed(() => {
  return (!nameStatus.value.valid || !descriptionStatus.value.valid)
})


async function updateDeck() {

  if (isInvalid.value) {
    return
  }

  if (props.editing) {
    try {
      emit('updateDeck', {
        ...props.deck,
        name: name.value,
        description: description.value
      } as DeckUpdate)
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      emit('updateDeck', {
        name: name.value,
        description: description.value
      } as DeckCreate)
    } catch (error) {
      console.log(error)
    }
  }
}


</script>
<template>
  <ElBaseInput>
    <template #el-base-input>
      <ElInput :status="nameStatus" text="Deck Name" type="text" id="name" name="deck-name" label="Deck Name"
        placeholder="" v-model="name" />
      <ElTextarea :status="descriptionStatus" text="Deck Description" id="description" name="deck-description"
        label="Deck Description" placeholder="" v-model="description" />
    </template>
    <template #el-action>
      <div v-if="editing">
        <router-link to="/">
          <ElButton id="create" label="Save" :disabled="isInvalid" theme="primary" @clicked="updateDeck" />
        </router-link>
      </div>
      <div v-else>
        <router-link to="/cards/create">
          <ElButton id="cancel" label="Create" :disabled="isInvalid" theme="primary" @clicked="updateDeck" />
        </router-link>
      </div>
    </template>
  </ElBaseInput>
</template>
