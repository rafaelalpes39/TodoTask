<script setup lang="ts">
import { useMyStore } from "~/stores/TaskStore";

const store = useMyStore();
const { items, menuActive } = storeToRefs(store);
// const filter=(payload)=>{
// console.log(payload)
// }
</script>
<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <div class="border-2 border-black">
          <v-btn
            color="#c3f6e9"
            prepend-icon="mdi-filter"
            v-bind="props"
            density="comfortable"
          >
            Filtered by
          </v-btn>
        </div>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="menuActive = item"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style></style>
