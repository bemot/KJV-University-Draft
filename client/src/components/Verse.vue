<template>
  <v-menu bottom origin="center center" offset-y transition="scale-transition" max-width="200">
    <template v-slot:activator="{ on }">
      <v-card flat :dark="isDark" class="subheading" :style="highlightColor" v-on="on">
        <v-card-title>
          <div>
            <span :class="[{'grey--text': !isDark}, 'font-weight-light']">{{ verseNum }}</span>
            {{ verseText }}
          </div>
        </v-card-title>
      </v-card>
    </template>
    <v-toolbar color="red" dark>
      <v-toolbar-title>{{ bookName }} {{ chapterNum }}:{{ verseNum }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon small @click="menu = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list dense>
      <v-list-tile v-for="(item, index) in items" :key="index" ripple>
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-spacer></v-spacer>
        <v-list-tile-content>{{ item.title }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "Verse",
  props: [
    "verseID",
    "verseText",
    "verseNum",
    "chapterNum",
    "bookmarks",
    "bookName"
  ],
  methods: {
    bookmark(verseId) {
      console.log(this.bookmarks);
      console.log(verseId);
    }
  },
  data() {
    return {
      items: [
        { title: "Highlight", icon: "border_color", action: () => {} },
        { title: "Add Note", icon: "create" },
        { title: "Copy", icon: "file_copy" },
        { title: "Share", icon: "share" }
      ]
    };
  },
  computed: {
    // ...mapGetters(["loading", "oneBook", "isDark", "allBookmarks"]),
    highlightColor() {
      return this.bookmarks
        ? { "background-color": this.bookmarks.color }
        : null;
    },
    isDark() {
      return this.bookmarks ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>