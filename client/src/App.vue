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
      <v-alert
        v-if="getError"
        :value="getError"
        type="error"
        transition="scale-transition"
        dismissible
      >{{ getError.message }}</v-alert>
      <router-view :bookProp="book" :key="$route.fullPath"/>
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
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["allBooks", "getError", "oneBook", "isDark", "user"]),
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
