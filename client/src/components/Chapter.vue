<template>
  <!-- Chapter View -->
  <v-tabs v-if="!loading" slider-color="red" grow show-arrows v-model="model">
    <v-tab
      v-for="n in currentBook.chapter_count"
      :key="n"
      ripple
      @click="activeChapter(n)"
    >Chapter {{ n }}</v-tab>
    <!-- Chapter Selection Tabs -->
    <v-tabs-items v-model="model" touchless>
      <v-tab-item v-for="(chapter, index) in currentChapter" :key="index" lazy>
        <v-alert
        v-if="createdBookmarkAlert"
        :value="createdBookmarkAlert"
        type="success"
        transition="scale-transition"
        dismissible
      >Bookmark Created!</v-alert>
        <!-- Chapter Slides -->
        <v-card flat color="isDark ? #303030 : null">
          <v-container align-center text-xs-left>
            <v-layout row wrap>
              <v-flex xs12>
                <!-- Book Title -->
                <v-card-title class="headline pb-0">
                  <div class="mx-auto text-xs-center">{{ currentBook.book_title }}</div>
                </v-card-title>

                <hr class="hrline">
                <!-- Chapter Number -->
                <v-card-title class="display-2 blue--text pt-0 font-weight-thin">
                  <div class="mx-auto text-xs-center">Chapter {{ currentChapter }}</div>
                </v-card-title>
              </v-flex>
              <!-- Verses -->
              <v-flex xs12 sm8 offset-sm2>
                <Verse :verses="verses[0].getVerses"></Verse>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import { mapGetters } from "vuex";
import Verse from "./../components/Verse";
export default {
  name: "Book",
  components: {
    Verse
  },
  data() {
    return {
      dialog: true,
      menu: false,
      model: 0,
      currentChapter: 1
    };
  },
  computed: {
    ...mapGetters(["loading", "allBooks", "chapters", "isDark", "verses", "createdBookmarkAlert"]),
    currentBook() {
      // Get book data from list of books using chapter book name
      return this.allBooks.find(
        book => book["book_name"] === this.$route.params.bookName
      );
    }
  },
  methods: {
    activeChapter(chapterNum) {
      const name = this.$route.params.bookName;
      // Set data property to current chapter
      this.currentChapter = chapterNum;

      this.$store.dispatch("clearVerses");
      this.$store.dispatch("fetchVerses", {
        name,
        chapter: this.currentChapter
      });
      this.$store.dispatch("fetchBookmarks", {
        name,
        chapter: this.currentChapter
      });
    }
  },
  created() {
    // this.$store.dispatch("fetchChapter", this.$route.params.bookName);
    const chapter = {
      name: this.$route.params.bookName,
      chapter: this.currentChapter
    };
    this.$store.dispatch("fetchVerses", chapter);
    this.$store.dispatch("fetchBookmarks", chapter);
  }
};
</script>

<style lang="scss" scoped>
.hrline {
  border: 0.3px solid #5e5e5e;
  margin: 1rem auto;
  width: 30%;
}
</style>