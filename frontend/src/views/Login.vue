<template>
  <v-container
    class="fill-height d-flex justify-center align-center ma-0"
    style="
      background: url('/background.jpg') center/cover no-repeat;
      max-width: 100%;
    "
  >
    <v-card class="pa-6 text-center login-card" elevation="6" max-width="400">
      <v-avatar size="64" class="mb-4">
        <v-img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        ></v-img>
      </v-avatar>

      <h2 class="text-h5 font-weight-medium">Sign in with GitHub</h2>
      <p class="text-caption text-grey-darken-1">
        Access your repositories and starred projects.
      </p>

      <v-btn block color="black" class="mt-4" @click="loginWithGitHub">
        <v-icon style="padding-right: 10px" left>mdi-github</v-icon>
        Login with GitHub
      </v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import api from "../api";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    onMounted(async () => {
      const isLoggedIn = await checkLoginStatus();
      if (isLoggedIn) {
        router.push("/dashboard"); // Redirect to dashboard if logged in
      }
    });

    const loginWithGitHub = () => {
      const width = 600;
      const height = 700;
      const left = (screen.width - width) / 2;
      const top = (screen.height - height) / 2;

      const loginPopup = window.open(
        "http://localhost:3000/auth/github",
        "GitHub Login",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      const interval = setInterval(async () => {
        const status = await checkLoginStatus();
        if (status) {
          clearInterval(interval);
          loginPopup?.close();
          router.push("/dashboard");
        }
      }, 1000);
    };

    const checkLoginStatus = async () => {
      const response = await api.get("auth/status");
      const status = await response.status;
      if (status === 200) {
        return true;
      }
      return false;
    };

    return { loginWithGitHub };
  },
});
</script>
<style scoped>
.login-card {
  border-radius: 12px;
}
</style>
