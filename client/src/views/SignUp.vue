<template>
  <div>
    <!-- Loading Dialog -->
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card>
        <v-card-text>
          Creating Account...
          <v-progress-linear indeterminate color="blue" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <SignUpForm></SignUpForm>
  </div>
</template>

<script>
import SignUpForm from "./../components/Auth/SignUpForm";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  components: {
    SignUpForm
  },
  computed: {
    ...mapGetters(["loading", "isDark"])
  }
};
</script>

<style lang="scss" scoped>
</style>