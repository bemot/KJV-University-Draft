<template>
  <v-menu bottom origin="center center" offset-y transition="scale-transition" full-width :close-on-content-click="false" v-model="menu" :close-on-click="false">
    <template v-slot:activator="{ on }">
      <v-card
        flat
        :dark="isDark"
        class="subheading"
        :style="checkHighlight(verse.id)"
        v-for="verse in verses"
        :key="verse.id"
        v-on="on"
        @click="bookmark(verse, verse.id)"
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
    <v-toolbar color="blue" dark>
      <v-btn
        :class="newBookmark.favorite ? 'red--text' : ''"
        icon
        @click="newBookmark.favorite = !newBookmark.favorite"
      >
        <v-icon>favorite</v-icon>
      </v-btn> 
      <v-toolbar-title>{{ activeVerse.book_name }} {{ activeVerse.chapter_number }}:{{ activeVerse.verse_number }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon small @click="menu = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card>
    <v-list>
      <v-text-field
          label="Note"
          v-model="newBookmark.comment"
          ref="input"
          full-width
      ></v-text-field>

      <v-list-tile>
        <v-list-tile-action>
            <v-btn-toggle>
              <v-btn :input-value="color == newBookmark.color ? true : false" ripple v-for="(color, i) in colors" :key="i" @click="updateColor(color)">
                <v-icon medium v-if="color == ''" class="red--text">remove_circle_outline</v-icon>
                <v-icon medium v-if="!color == ''" :class='color + "--text"'>lens</v-icon>
              </v-btn>
            </v-btn-toggle>
        </v-list-tile-action>
      </v-list-tile>

       <v-list-tile>
        <v-list-tile-action>
          <v-switch v-model="newBookmark.dark" color="blue"></v-switch>
        </v-list-tile-action>
        
        <v-list-tile-title>White Text</v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <v-switch  color="warning"></v-switch>
        </v-list-tile-action>
  
        <v-list-tile-title>Auto Text Color</v-list-tile-title>
      </v-list-tile>
    

      <v-list-tile @click="copyText()" ripple>
        <v-list-tile-action>
          <v-icon>file_copy</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Copy</v-list-tile-content>
      </v-list-tile>
    </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="createBookmark()">Save</v-btn>
        </v-card-actions>
      </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Verse",
  props: ["verses"],
  data() {
    return {
      newBookmark: {
        verseId: 0,
        comment: '',
        color: '',
        dark: false,
        favorite: false
      },
      menu: false,
      dark: false,
      activeVerse: '',
      copied: true,
      colors: ['black', 'grey', 'purple', 'red', 'blue', 'green', 'yellow', '']
    };
  },
  methods: {
    bookmark(verse, verseId) {
      this.activeVerse = verse;
       const isBookmarked = this.getBookmarks.find(
        bookmark => bookmark.verse.id == verseId
      );
      if (isBookmarked) {
        this.newBookmark.comment = isBookmarked.comment
        this.newBookmark.dark = isBookmarked.dark
        this.newBookmark.color = isBookmarked.color
        this.newBookmark.favorite = isBookmarked.favorite
      }
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
        return { "background-color": "transparent"};
      }
      console.log(isBookmarked);
    },
    updateColor(value) {
      this.newBookmark.color = value
    },
    createComment(value) {
      this.newBookmark.comment = value
    },
    copyText() {
      this.$copyText(this.activeVerse.verse_text).then(e => {
          this.$store.commit('setCompleted', 'Verse Copied!')
      })
      .catch(e => {
          alert('Can not copy')
          console.log(e)
      })
    },
    createBookmark() {
      this.newBookmark.verseId = parseInt(this.activeVerse.id)

      const existingBookmark = this.getBookmarks.find(
        bookmark => bookmark.verse.id == this.newBookmark.verseId
      );

      if(existingBookmark) {
        const {comment, color, dark, favorite} = this.newBookmark
        const newBookmarkReq = {comment, color, dark, favorite}
        this.$store.dispatch("updateBookmark", {id: parseInt(existingBookmark.id), update: JSON.stringify(newBookmarkReq)});
        this.menu = false
        this.$router.go(0);
        // this.$store.commit("refreshID");
      } else {
        this.$store.dispatch("createBookmark", this.newBookmark);
        this.menu = false
        this.$router.go(0);
      }
    }
  },
  computed: {
    ...mapGetters(["isDark", "getBookmarks", "createdBookmarkAlert"])
    
  }
};
</script>

<style lang="scss" scoped>
</style>