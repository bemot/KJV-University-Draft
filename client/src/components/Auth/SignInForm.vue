<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <v-card :hover="true">
          <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Bible Verse</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-container>
            <v-form @submit.prevent="handleSignInUser" v-model="isValid" lazy-validation ref="form">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    prepend-icon="account_circle"
                    label="Username"
                    type="text"
                    color="blue lighten-1"
                    :rules="usernameRules"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    prepend-icon="lock"
                    label="Password"
                    color="blue lighten-1"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    @click:append="show1 = !show1"
                    counter
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    fab
                    type="submit"
                    class="mt-4 mb-5 white--text"
                    color="green"
                    large
                    :disabled="!isValid || loading"
                    ripple
                  >
                    <v-icon v-if="!loading">lock_open</v-icon>
                    <v-progress-circular
                      v-if="loading"
                      value="loading"
                      indeterminate
                      :color="isDark ? 'red' : 'white'"
                    ></v-progress-circular>
                  </v-btn>
                  <h3>
                    Already have an account?
                    <router-link to="/signup" class="error--text">Sign Up</router-link>
                  </h3>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show1: false,
      username: "",
      password: "",
      isValid: false,
      usernameRules: [
        // check if usernamein input
        username => !!username || "Username is required",
        // Make sure username is less than 10 characters
        username =>
          username.length < 10 || "Username must be less than 10 characters"
      ],
      passwordRules: [
        // check if usernamein input
        password => !!password || "Password is required",
        // Make sure username is less than 10 characters
        password =>
          password.length > 3 || "Password must be more than 3 characters",
        // Make sure username is less than 10 characters
        password => password.match(/\d/g) || "Password must contain a number"
      ]
    };
  },
  computed: {
    ...mapGetters(["user", "loading", "isDark"])
  },
  watch: {
    user(value) {
      // if user value changes, redirect to home page
      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    handleSignInUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signInUser", {
          username: this.username,
          password: this.password
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>