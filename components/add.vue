<script setup lang="ts">
import { useMyStore } from "~/stores/TaskStore";
import { onMounted } from "vue";
import { ref } from "vue";
const store = useMyStore();
const { taskList, NewTask, currentDate } = storeToRefs(store);
const dialog = ref(false);

const save = () => {
  if (NewTask.value.title && NewTask.value.desc) {
    taskList.value.unshift({ ...NewTask.value });

    NewTask.value = {
      title: "",
      desc: "",
      date: currentDate.value,
      status: "No",
    };

    dialog.value = !dialog.value;
  } else {
    // Optionally, alert the user or show some feedback if the form is incomplete
    alert("Please fill in all fields before saving the task.");
  }
};

const cancel = () => {
  dialog.value = !dialog.value;
  NewTask.value = {
    title: "",
    desc: "",
    date: currentDate.value,
    status: "",
  };
};

onMounted(() => {
  // Fetch or initialize data here, for example:
  // Assuming you have a fetchTasks method in your store
  console.log("Adding new task");
  NewTask.value = {
    title: "",
    desc: "",
    date: currentDate.value,
    status: "No",
  };
});
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="600" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <div class="border-2 border-black">
          <v-btn
            color="#c3f6e9"
            v-bind="activatorProps"
            prepend-icon="mdi-plus"
            width="100"
            density="comfortable"
          >
            Add
          </v-btn>
        </div>
      </template>
      <div class="border-2 border-black w-auto">
        <v-card class="mx-auto" prepend-icon="mdi-plus" color="#c3f6e9">
          <template v-slot:title>
            <span class="font-weight-black">New Task !</span>
          </template>
          <template v-slot:actions>
            <v-card-text class="pt-4">
              <div class="border-2 border-black">
                <form class="p-4" :style="{ backgroundColor: '#f8fafc' }">
                  <v-text-field
                    label="Title"
                    variant="outlined"
                    v-model="NewTask.title"
                    density="compact"
                  ></v-text-field>

                  <v-textarea
                    label="Description"
                    variant="outlined"
                    density="compact"
                    v-model="NewTask.desc"
                  ></v-textarea>

                  <!-- <v-select label="status" variant="outlined"></v-select> -->

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
                  prepend-icon="mdi-cancel"
                  density="comfortable"
                  class="me-4"
                  color="blue"
                  variant="outlined"
                  @click="cancel"
                >
                  Cancel
                </v-btn>
                <v-btn
                  prepend-icon="mdi-content-save"
                  density="comfortable"
                  class=""
                  color="blue"
                  variant="elevated"
                  @click="save"
                >
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
