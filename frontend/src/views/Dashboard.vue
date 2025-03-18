<template>
  <v-app>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Application Bar</v-app-bar-title>
    </v-app-bar>
    <v-content style="overflow: auto">
      <v-container>
        <h1>Welcome, {{ user?.username }}</h1>
        <button @click="fetchUser">Get User Info</button>
        <button @click="logout">Logout</button>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import api from "../api";

export default defineComponent({
  data() {
    return {
      user: null as any,
    };
  },
  setup() {
    onMounted(async () => {
      await fetchRepositories();
    });

    const fetchRepositories = async () => {
      const data = await api.get("repositories");
      console.log(data);
    };
  },
  methods: {
    async fetchUser() {
      try {
        const response = await api.get("/user");
        this.user = response.data;
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    },
    async logout() {
      await api.post("/auth/logout");
      this.user = null;
    },
  },
});
</script>
