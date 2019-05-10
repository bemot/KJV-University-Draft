<template>
  <v-app :dark="isDark">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list>
        <v-subheader class="grey--text">Account</v-subheader>
        <template v-if="user">
          <NavAccountBtn link="/profile" icon="person_outline" title="Profile"></NavAccountBtn>
          <NavAccountBtn link="/favorites" icon="stars" title="Favorites"></NavAccountBtn>
          <v-list-tile
            @click="handleSignOut()"
            exact-active-class="default-class success--text"
            ripple
          >
            <v-list-tile-action>
              <v-icon medium>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sign Out</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template v-else>
          <NavAccountBtn link="/login" icon="person" title="Sign In"></NavAccountBtn>
          <NavAccountBtn link="/signup" icon="person_add" title="Sign Up"></NavAccountBtn>
        </template>
      </v-list>
      <v-list two-line subheader dense>
        <v-subheader class="grey--text">Holy Bible - King James Version</v-subheader>
        <NavBookBtn
          v-for="(book, i) in allBooks"
          :key="i"
          :bookName="book.bookName"
          :bookNumber="book.bookNumber"
          :chapterCount="book.chapterCount"
        ></NavBookBtn>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar tabs app fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">{{ toolbarTitle }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon @click="invert()">invert_colors</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <!-- Error Alert -->
      <v-alert
        v-if="getError"
        :value="getError"
        type="error"
        transition="scale-transition"
        dismissible
      >{{ getError.message }}</v-alert>
      <!-- Completed Alert -->
      <v-alert
        v-if="isCompleted"
        :value="isCompleted"
        type="success"
        transition="scale-transition"
        dismissible
      >{{ isCompleted }}</v-alert>
      <!-- Router Views -->
      <router-view :bookProp="book" :key="$route.fullPath"/>

      <!-- Auth Error Snackbar -->
      <v-snackbar
        v-if="getAuthError"
        v-model="authErrorSnackbar"
        color="warning"
        :timeout="10000"
        bottom
        left
        multi-line
      >
        <v-icon class="mr-3">cancel</v-icon>
        <h3 class="text-xs-center">{{ getAuthError.message }}</h3>
        <v-btn dark flat to="/login">Sign In</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import NavAccountBtn from "./components/Auth/NavAccountBtn";
import NavBookBtn from "./components/Auth/NavBookBtn";

export default {
  name: "App",
  components: {
    NavBookBtn,
    NavAccountBtn
  },
  data() {
    return {
      drawer: false,
      authErrorSnackbar: true
    };
  },
  computed: {
    ...mapGetters([
      "allBooks",
      "getError",
      "getAuthError",
      "oneBook",
      "isDark",
      "isCompleted",
      "user"
    ]),
    book() {
      return { ...this.oneBook.getOneBook };
    },
    toolbarTitle() {
      let title = this.$route.params.bookName;
      if (typeof title !== "undefined") {
        title = title.charAt(0).toUpperCase() + title.slice(1);
      }
      return title || "KJV University";
    }
  },
  watch: {
    authError(value) {
      // if authError has a error & not null show authErrorSnackbar
      if (value) {
        this.authErrorSnackbar = true;
      }
    }
  },
  methods: {
    ...mapActions(["fetchOneBook"]),
    ...mapMutations(["invert"]),
    handleSignOut() {
      this.$store.dispatch("signOutUser");
    }
  },
  created() {
    this.$store.dispatch("fetchBooks");
  }
};
</script>

<style scoped>
.link {
  color: black;
}
</style>
