<script setup lang="ts">
import { useMyStore } from "~/stores/TaskStore";
import { onMounted } from "vue";
const store = useMyStore();
const { filteredTasks, searhQuery } = storeToRefs(store);

onMounted(() => {
  // Fetch or initialize data here, for example:
  // Assuming you have a fetchTasks method in your store
  searhQuery.value === "";
});
</script>
<template>
  <div class="bg-slate-50 min-h-screen">
    <v-layout>
      <v-main>
        <div class="mx-auto pt-14 px-6 max-w-xl md:px-2">
          <div class="text-center">
            <!-- Center text within this div -->
            <h1 class="text-5xl md:text-7xl font-black tracking-wide">
              Task Board
            </h1>
            <br />
            <h1 class="tracking-wider italic text-lg">Create a List of Task</h1>

            <div class="flex justify-end pt-10 gap-3"><add /> <menus /></div>

            <div class="pt-10">
              <v-text-field
                density="comfortable"
                append-inner-icon="mdi-magnify"
                label="Search..."
                variant="solo"
                v-model="searhQuery"
              ></v-text-field>
            </div>
          </div>
        </div>
        <v-container fluid>
          <v-row class="mx-auto max-w-xl :">
            <v-col cols="12" v-for="(task, i) in filteredTasks" :key="i">
              <div class="border-2 border-black">
                <v-card
                  color="#c2f6e9"
                  class="mx-auto"
                  :subtitle="task.date"
                  :title="task.title"
                >
                  <template v-slot:prepend>
                    <v-avatar
                      color="blue-darken-2"
                      :variant="task.status === 'No' ? 'elevated' : 'outlined'"
                    >
                      <v-icon
                        :icon="
                          task.status === 'No'
                            ? 'mdi-invoice-text-plus'
                            : 'mdi-check-all'
                        "
                      ></v-icon>
                    </v-avatar>
                  </template>
                  <template v-slot:append>
                    <!-- <v-avatar >
                      <v-img
                        alt="John"
                        src="https://cdn.vuetifyjs.com/images/john.png"
                      ></v-img>
                    </v-avatar> -->
                    <Manage :task="task"  :index="i"/>
                  </template>
                  <v-card-text class="truncate">{{ task.desc }}</v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<style>
/* You can add additional styles here if needed */
</style>
