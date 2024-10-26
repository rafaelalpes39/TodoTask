<template>
  <div class="pa-10">
    <div class="w-full xl:w-1/2">
      <v-text-field
        density="comfortable"
        append-inner-icon="mdi-magnify"
        label="Search..."
        variant="solo"
        v-model="country"
        @keydown.enter="fetchWeather()"
      ></v-text-field>
    </div>
    <div class="border-2 border-black w-full xl:w-1/2">
      <v-card color="#c5f6e9">
        <v-card-item title="Florida">
          <template v-slot:subtitle>
            <v-icon
              class="me-1 pb-1"
              color="error"
              icon="mdi-alert"
              size="18"
            ></v-icon>

            Extreme Weather Alert
          </template>
        </v-card-item>

        <v-card-text>
          <v-row align="center" no-gutters>
            <v-col class="text-h2" cols="6"> 64&deg;F </v-col>

            <v-col class="text-right" cols="6">
              <v-icon
                color="error"
                icon="mdi-weather-hurricane"
                size="88"
              ></v-icon>
            </v-col>
          </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
          <v-list-item density="compact" prepend-icon="mdi-weather-windy">
            <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
          </v-list-item>

          <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
            <v-list-item-subtitle>48%</v-list-item-subtitle>
          </v-list-item>
        </div>

        <v-expand-transition>
          <div v-if="expand">
            <div class="py-2">
              <v-slider
                v-model="time"
                :max="6"
                :step="1"
                :ticks="labels"
                class="mx-4"
                color="primary"
                density="compact"
                show-ticks="always"
                thumb-size="10"
                hide-details
              ></v-slider>
            </div>

            <v-list class="bg-transparent">
              <v-list-item
                v-for="item in forecast"
                :key="item.day"
                :append-icon="item.icon"
                :subtitle="item.temp"
                :title="item.day"
              >
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>

        <v-divider></v-divider>

        <!-- <v-card-actions>
        <v-btn
          :text="!expand ? 'Full Report' : 'Hide Report'"
          @click="expand = !expand"
        ></v-btn>
      </v-card-actions> -->
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const labels = ref({
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WED",
  4: "TH",
  5: "FR",
  6: "SA",
});
const expand = ref(true);
const time = ref(0);
const forecast = ref([
  {
    day: "Tuesday",
    icon: "mdi-white-balance-sunny",
    temp: "24\xB0/12\xB0",
  },
  {
    day: "Wednesday",
    icon: "mdi-white-balance-sunny",
    temp: "22\xB0/14\xB0",
  },
  { day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0" },
]);

const apiKey = "0c126462be47238035fee6315c25bb92";
const country = ref("");

const fetchWeather = async () => {
  if (!country.value) {
    console.log("Please enter a country.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.value}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url); // Awaiting the fetch call
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Awaiting the JSON conversion
    console.log(data); // Log the fetched data
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
</script>
