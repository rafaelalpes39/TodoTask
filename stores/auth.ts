import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyAuthStore = defineStore("myAuthStore", () => {
  // `user` can be either a string or null
  const user = ref<string | null>("RV");

  // `token` can be a string or null
  const token = ref<string | null>("123456");

  return { user, token };
});
