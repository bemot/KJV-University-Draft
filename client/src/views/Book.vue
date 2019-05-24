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
                <div
                  class="text-xs-center grey--text text--darken-2 title font-weight-thin mb-3"
                >{{bookProp.bookTitle2}}</div>
              </v-flex>
              <v-flex
                v-for="verse in chapter.verses"
                :key="verse.id"
                xs12
                sm8
                offset-sm2
                lg4
                offset-lg4
              >
                <v-card-text class="subheading">
                  <span class="grey--text font-weight-light">{{verse.verse_number}}</span>
                  {{ verse.verse_text }}
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { GET_BOOKS } from "./../queries.js";
import { mapGetters } from "vuex";
export default {
  props: ["bookProp"],
  data() {
    return {
      dialog: true
    };
  },
  computed: {
    ...mapGetters(["loading", "oneBook", "isDark"])
  },
  created() {
    this.$store.dispatch("fetchOneBook", this.$route.params.bookName);
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