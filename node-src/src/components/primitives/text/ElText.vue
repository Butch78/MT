<script setup lang="ts">
import { computed } from "vue";
import { textCssStrategy } from "./TextCssStrategy";


export interface Props {
  tag: string;
  text: string;
  addCss?: string;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tag: "p",
  text: "",
  addCss: "",
  name: "",
});

const cssClass = computed((): string => {
  const classes = [];

  classes.push(textCssStrategy.get(props.tag) as string);

  if ((props.addCss || "").trim().length > 0) {
    classes.push(props.addCss.trim());
  }
  return classes.join(" ");
});

</script>

<template>
  <component :for="name" :is="tag" :class="cssClass">{{ text }}</component>
</template>
