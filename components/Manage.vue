<script setup lang="ts">
import { useMyStore } from "~/stores/TaskStore";
import { ref } from "vue";
// Define the props
type Task = {
  title: string;
  desc: string;
  date: string;
  status: string;
};
const props = defineProps<{
  task: Task;
  index: number;
}>();
const store = useMyStore();
const { taskList, NewTask, currentDate } = storeToRefs(store);
const dialog = ref(false);

const save = () => {
  dialog.value = !dialog.value;
};
const Delete = (index: number) => {
  taskList.value.splice(index, 1);
  dialog.value = !dialog.value;
  NewTask.value = {
    title: "",
    desc: "",
    date: currentDate.value,
    status: "No",
  };
};

const cancel = () => {
  dialog.value = !dialog.value;
};
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="600" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <div>
          <v-btn
            size="36"
            v-bind="activatorProps"
            icon="mdi-pencil"
            variant="outlined"
            class="rounded-full bg-white"
          >
          </v-btn>
        </div>
      </template>
      <div class="border-2 border-black w-auto">
        <v-card class="mx-auto" prepend-icon="mdi-plus" color="#c3f6e9">
          <template v-slot:title>
            <span class="font-weight-black">Manage Task !</span>
          </template>
          <template v-slot:actions>
            <v-card-text class="pt-4">
              <div class="border-2 border-black">
                <form class="p-4" :style="{ backgroundColor: '#f8fafc' }">
                  <v-text-field
                    label="Title"
                    variant="outlined"
                    v-model="props.task.title"
                    density="compact"
                  ></v-text-field>

                  <v-textarea
                    label="Description"
                    variant="outlined"
                    v-model="props.task.desc"
                    density="comfortable"
                  ></v-textarea>

                  <v-select
                    label="Is it Done ?"
                    variant="outlined"
                    v-model="props.task.status"
                    density="compact"
                    :items="['Yes', 'No']"
                  ></v-select>
                </form>
              </div>
              <div class="flex justify-between pt-4">
                <v-btn
                  class=""
                  color="red"
                  variant="elevated"
                  prepend-icon="mdi-trash-can"
                  @click="Delete(index)"
                >
                  Delete
                </v-btn>
                <div>
                  <v-btn
                    class="me-2"
                    color="blue"
                    variant="outlined"
                    @click="cancel"
                    prepend-icon="mdi-cancel"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    prepend-icon="mdi-content-save"
                    class=""
                    color="blue"
                    variant="elevated"
                    @click="save"
                  >
                    Save
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </template>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<style>
/* You can add additional styles here if needed */
</style>
