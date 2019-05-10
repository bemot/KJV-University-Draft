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
                  <span class="headline">Get Started Here</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-container>
            <v-form @submit.prevent="handleSignUpUser" v-model="isValid" lazy-validation ref="form">
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
                    v-model="email"
                    prepend-icon="mail_outline"
                    label="Email"
                    type="text"
                    color="blue lighten-1"
                    :rules="emailRules"
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
                  <v-text-field
                    v-model="passwordConfirmation"
                    prepend-icon="done_all"
                    label="Confirm Password"
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
                    color="blue"
                    large
                    :disabled="!isValid || loading"
                    ripple
                  >
                    <v-icon v-if="!loading">person_add</v-icon>
                    <v-progress-circular
                      v-if="loading"
                      value="loading"
                      indeterminate
                      :color="isDark ? 'red' : 'white'"
                    ></v-progress-circular>
                  </v-btn>
                  <h3>
                    Already have an account?
                    <router-link to="/login" class="error--text">Sign In</router-link>
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
      email: "",
      password: "",
      passwordConfirmation: "",
      isValid: false,
      usernameRules: [
        // check if username input exist
        username => !!username || "Username is required",
        // Make sure username is less than 10 characters
        username =>
          username.length < 20 || "Username must be less than 20 characters",
        username =>
          username.length > 1 || "Username must be atleast 2 characters long"
      ],
      emailRules: [
        email => !!email || "Email is required",
        email => {
          const emailRegex = /^\w+([.-]?\w+)+@\w+([.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
          return emailRegex.test(email) || "Please enter a valid email";
        }
      ],
      passwordRules: [
        // check if password input exist
        password => !!password || "Password is required",
        // Make sure password is more than 3 characters
        password =>
          password.length > 3 || "Password must be more than 3 characters",
        // Make sure password contain numbers
        password => /\d/.test(password) || "Password must contain a number",
        // Make sure confirmation password matches first password
        confirmation => confirmation === this.password || "Passwords must match"
      ]
    };
  },
  computed: {
    ...mapGetters(["user", "loading", "isDark"])
  },
  methods: {
    handleSignUpUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signUpUser", {
          username: this.username,
          password: this.password,
          email: this.email
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>