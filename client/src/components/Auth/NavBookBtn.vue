<template>
  <v-list-tile :to="'/' + bookName" exact-active-class="default-class error--text">
    <v-list-tile-action>
      <v-icon>list</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{bookName}}</v-list-tile-title>
      <v-list-tile-sub-title
        class="grey--text"
      >{{chapterCount}} {{chapterCount > 1 ? "chapters" : "chapter"}}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-subheader v-if="bookNumber <= 39" class="grey--text">OT</v-subheader>
    <v-subheader v-if="bookNumber >= 40" class="grey--text">NT</v-subheader>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    bookName: {
      type: String,
      required: true
    },
    bookNumber: {
      type: Number,
      required: true
    },
    chapterCount: {
      type: Number,
      required: true
    }
  }
};
</script>