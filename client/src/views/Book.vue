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

    <Chapter :key="getRefresh"></Chapter>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chapter from "../components/Chapter";
export default {
  name: "Book",
  components: {
    Chapter
  },
  computed: {
    ...mapGetters(["loading", "getRefresh"])
  }
};
</script>

<style lang="scss" scoped>
</style>