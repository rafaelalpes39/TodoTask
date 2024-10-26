<template>
  <v-card>
    <v-layout>
      <v-app-bar color="#c4f6e9" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>RAFAEL ALPES </v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>
          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        color="#c5f6e9"
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <div v-for="item in items" class="pt-3">
          <NuxtLink :to="item.value">
            <v-list-item
              class="py-3 custom-list-item"
              :prepend-icon="item.icon"
              :title="item.title"
              value="myfiles"
            ></v-list-item>
          </NuxtLink>
          <hr style="border: none; border-top: 0.5px solid #000000" />
        </div>
      </v-navigation-drawer>

      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    items: [
      { title: "To Do Task", value: "/", icon: "mdi-calendar-check" },
      {
        title: "Google Map",
        value: "/GoogleMap",
        icon: "mdi-map-marker-radius-outline",
      },
      { title: "Weather", value: "/weather", icon: "mdi-weather-cloudy" },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>
.custom-list-item {
  transition: background-color 0.3s ease; /* Smooth transition for background color */
}
</style>
