<template >
  <v-menu bottom origin="center center" offset-y transition="scale-transition" max-width="200">
    <template v-slot:activator="{ on }">
      <v-card
        flat
        :dark="isDark"
        class="subheading"
        :style="checkHighlight(verse.id)"
        v-for="verse in verses"
        :key="verse.id"
        v-on="on"
        @click="bookmark(verse)"
      >
        <v-card-title>
          <div>
            <span
              :class="[{'grey--text': isDark}, 'font-weight-light']"
            >{{ verse.verse_number }}</span>
            {{ verse.verse_text }}
          </div>
        </v-card-title>
      </v-card>
    </template>
    <v-toolbar color="red" dark>
      <v-toolbar-title>{{ activeVerse.book_name }} {{ activeVerse.chapter_number }}:{{ activeVerse.verse_number }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon small @click="menu = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list dense>
      <v-list-tile v-for="(item, index) in items" :key="index" @click="item.action" ripple>
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
import { mapGetters } from "vuex";
export default {
  name: "Verse",
  props: ["verses"],
  data() {
    return {
      items: [
        { title: "Highlight", icon: "border_color", action: () => console.log('highlight') },
        { title: "View Note", icon: "note", action: () => console.log('view note')},
        { title: "Add Note", icon: "create", action: () => console.log('add note')},
        { title: "Copy", icon: "file_copy", action: () => console.log('copy')},
        { title: "Share", icon: "share", action: () => console.log('share')},
      ],
      newBookmark: {
        verseId: 0,
        comment: '',
        color: '',
        dark: false,
        favorite: false
      },
      menu: false,
      dark: false,
      activeVerse: ""
    };
  },
  methods: {
    bookmark(verse) {
      this.activeVerse = verse;
    },
    checkHighlight(verseId) {
      const isBookmarked = this.getBookmarks.find(
        bookmark => bookmark.verse.id == verseId
      );
      if (isBookmarked) {
        return (isBookmarked.dark == true) 
        ? { "background-color": isBookmarked.color, color: '#fff' } 
        : { "background-color": isBookmarked.color, color: '#000' }
      } else {
        return { "background-color": "transparent" };
      }
      console.log(isBookmarked);
    },
    createBookmark(bookmark) {
      this.$store.dispatch("createdBookmark", bookmark);
    }
  },
  computed: {
    ...mapGetters(["isDark", "getBookmarks", "createdBookmarkAlert"])
  }
};
</script>

<style lang="scss" scoped>
</style>