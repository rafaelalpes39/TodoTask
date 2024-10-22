<script setup lang="ts">
import { useMyStore } from "~/stores/TaskStore";
import { ref} from "vue";
// Define the props
type Task = {
  title: string;
  desc: string;
  date: string;
  status: string;
};
const props = defineProps<{
  task: Task;
}>();
const store = useMyStore();
const { taskList, NewTask, currentDate } = storeToRefs(store);
const dialog = ref(false);

const save = () => {
  // if (NewTask.value.title && NewTask.value.desc) {
  //   taskList.value.unshift({ ...NewTask.value });

  //   NewTask.value = {
  //     title: "",
  //     desc: "",
  //     date: currentDate.value,
  //     status: false,
  //   };

  dialog.value = !dialog.value;
  // } else {
  //   // Optionally, alert the user or show some feedback if the form is incomplete
  //   alert("Please fill in all fields before saving the task.");
  // }
};

const cancel = () => {
  dialog.value = !dialog.value;
  // NewTask.value = {
  //   title: "",
  //   desc: "",
  //   date: currentDate.value,
  //   status: false,
  // };
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

                  <!-- <v-checkbox
                  v-model="state.checkbox"
                  :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
                  label="Do you agree?"
                  required
                  @blur="v$.checkbox.$touch"
                  @change="v$.checkbox.$touch"
                ></v-checkbox> -->
                </form>
              </div>
              <div class="flex justify-end pt-4">
                <v-btn
                  class="me-4"
                  color="blue"
                  variant="outlined"
                  @click="cancel"
                >
                  Cancel
                </v-btn>
                <v-btn class="" color="blue" variant="elevated" @click="save">
                  Save
                </v-btn>
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
