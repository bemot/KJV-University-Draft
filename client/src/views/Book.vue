<template>
  <div>
    <!-- Loading Dialog -->
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card>
        <v-card-text>
          Loading God's Word...
          <v-progress-linear indeterminate color="red" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Chapter View -->
    <v-tabs v-if="!loading" slider-color="red" grow show-arrows>
      <v-tab v-for="n in bookProp.chapter_count" :key="n" ripple>Chapter {{ n }}</v-tab>
      <!-- Chapter Selection Tabs -->
      <v-tab-item v-for="chapter in bookProp.chapters" :key="chapter.id">
        <!-- Chapter Slides -->
        <v-card flat color="isDark ? #303030 : null">
          <v-container align-center text-xs-left>
            <v-layout row wrap>
              <v-flex xs12>
                <!-- Book Title -->
                <v-card-title class="headline pb-0">
                  <div class="mx-auto text-xs-center">{{bookProp.book_title}}</div>
                </v-card-title>

                <hr class="hrline">
                <!-- Chapter Number -->
                <v-card-title class="display-2 blue--text pt-0 font-weight-thin">
                  <div class="mx-auto text-xs-center">Chapter {{chapter.chapter_number}}</div>
                </v-card-title>
              </v-flex>
              <v-flex xs12 v-if="bookProp.hasOwnProperty('bookTitle2')">
                <!-- Chapter Title 2 -->
                <!-- <div
                  class="text-xs-center grey--text text--darken-2 title font-weight-thin mb-3"
                >{{bookProp.book_title_2}}</div>-->
              </v-flex>
              <v-flex xs12 sm8 offset-sm2>
                <Verse
                  :verseText="verse.verse_text"
                  :verseID="verse.id"
                  :verseNum="verse.verse_number"
                  :bookName="bookProp.book_name"
                  :chapterNum="chapter.chapter_number"
                  v-for="verse in chapter.verses"
                  :key="verse.id"
                ></Verse>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Verse from "./../components/Verse";
export default {
  name: "Book",
  components: {
    Verse
  },
  props: ["bookProp"],
  data() {
    return {
      dialog: true,
      menu: false
    };
  },
  computed: {
    ...mapGetters(["loading", "oneBook", "isDark", "allBookmarks"])
  },
  created() {
    this.$store.dispatch("fetchOneBook", this.$route.params.bookName);
    // this.$store.dispatch("fetchBookmarks");
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