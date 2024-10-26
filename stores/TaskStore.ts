import { defineStore } from "pinia";
import { ref } from "vue"; // Make sure to import ref

export const useMyStore = defineStore("myStore", () => {
  type Task = {
    title: string;
    desc: string;
    date: string;
    status: string;
  };

  type menu = {
    title: string;
  };
  const items = ref([
    { title: "View All" },
    { title: "Completed" },
    { title: "Pending" },
  ]);

  const menuActive = ref<menu>({ title: "View All" });
  const searhQuery = ref("");
  const title = ref("To Do Task"); // Use camelCase for consistency
  const taskList = ref<Task[]>([]); // You may want to type this for better TypeScript support

  // const filteredTasks = computed(() => {
  //   // Filter tasks where the title contains the search query (case-insensitive)
  //   if (!searhQuery.value) {

  //       if (menuActive.value.title === "Completed") {
  //         return taskList.value.filter(task => task.status==='Yes'); // Assuming 'completed' is a property
  //       }
  //       if (menuActive.value.title === "Pending") {
  //         return taskList.value.filter(task => task.status==='No'); // Assuming 'completed' is a property
  //       }
  //       return taskList.value; // Return all tasks for "View All"

  //     // return taskList.value;
  //   }
  //  else {
  //     return taskList.value.filter((task) =>
  //       task.title.toLowerCase().includes(searhQuery.value.toLowerCase())
  //     );
  //   }
  // });

  const filteredTasks = computed(() => {
    // Start with the full task list
    let filtered = taskList.value;

    // If there's a search query, filter tasks by title
    if (searhQuery.value) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searhQuery.value.toLowerCase())
      );
    }

    // Filter by menuActive title
    if (menuActive.value.title === "Completed") {
      filtered = filtered.filter((task) => task.status === "Yes");
    } else if (menuActive.value.title === "Pending") {
      filtered = filtered.filter((task) => task.status === "No");
    }

    return filtered; // Return the final filtered tasks
  });

  const currentDate = ref(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit", // '2-digit' for numeric, 'long' for full month name
      day: "numeric",
    })
  );

  const NewTask = ref({
    title: "",
    desc: "",
    date: currentDate.value,
    status: "No",
  });

  watch(menuActive, (newValue, oldValue) => {
    // console.log("menuActive", menuActive.value.title); // Logs the new value
    // You can also log the old value if needed
    // console.log(oldValue);
  });

  return {
    title, // Return title and taskList if you want to access them in your component
    items,
    menuActive,
    searhQuery,
    taskList,
    filteredTasks,
    currentDate,
    NewTask,
  };
});
