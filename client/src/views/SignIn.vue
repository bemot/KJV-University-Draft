<template>
  <div>
    <!-- Loading Dialog -->
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card>
        <v-card-text>
          Logging In...
          <v-progress-linear indeterminate color="blue" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <SignInForm></SignInForm>
  </div>
</template>

<script>
import SignInForm from "./../components/Auth/SignInForm";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  components: {
    SignInForm
  },
  computed: {
    ...mapGetters(["loading", "isDark"])
  }
};
</script>

<style lang="scss" scoped>
</style>