<template>
  <v-app :dark="isDark">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list two-line subheader>
        <v-subheader class="grey--text">Holy Bible - King James Version</v-subheader>
        <v-list-tile
          :to="'/' + book.bookName"
          v-for="(book, i) in allBooks"
          :key="i"
          exact-active-class="default-class error--text"
        >
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{book.bookName}}</v-list-tile-title>
            <v-list-tile-sub-title class="grey--text">{{book.chapterCount}} Chapters</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-subheader v-if="book.bookNumber <= 39" class="grey--text">OT</v-subheader>
          <v-subheader v-if="book.bookNumber >= 40" class="grey--text">NT</v-subheader>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar tabs app fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
        >{{ this.$route.params.bookName || 'KJV Bible'}}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon @click="invert()">invert_colors</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-alert :value="getError" type="error">{{ getError }}</v-alert>
      <router-view :bookProp="book" :key="$route.fullPath"/>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["allBooks", "getError", "oneBook", "isDark"]),
    book() {
      return { ...this.oneBook.getOneBook };
    }
  },
  methods: {
    ...mapActions(["fetchOneBook"]),
    ...mapMutations(["invert"])
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
