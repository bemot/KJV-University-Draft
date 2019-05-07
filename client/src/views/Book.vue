<template>
  <div>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card>
        <v-card-text>
          Loading God's Word...
          <v-progress-linear indeterminate color="red" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-tabs v-if="!loading" slider-color="red" grow show-arrows>
      <v-tab v-for="n in bookProp.chapterCount" :key="n" ripple>Chapter {{ n }}</v-tab>
      <v-tab-item v-for="chapter in bookProp.chapters" :key="chapter._id">
        <v-card flat color="isDark ? #303030 : null">
          <v-container align-center text-xs-left>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-title class="headline pb-0">
                  <span class="mx-auto">{{bookProp.bookTitle}}</span>
                </v-card-title>
                <v-card-title class="display-2 blue--text pt-0 font-weight-thin">
                  <span class="mx-auto">Chapter {{chapter.chapterNumber}}</span>
                </v-card-title>
              </v-flex>
              <v-flex v-for="verse in chapter.verses" :key="verse._id" xs12 lg4 offset-lg4>
                <v-card-text class="subheading">
                  <span class="grey--text font-weight-light">{{verse.verseNumber}}</span>
                  {{ verse.verseText }}
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
</style>