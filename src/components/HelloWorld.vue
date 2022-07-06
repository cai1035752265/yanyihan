<script setup lang="ts">
import Flow from "./flow/index.vue";

defineProps<{ msg: string }>();
</script>

<template>
  <Flow :editIsSHow="true" />
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
