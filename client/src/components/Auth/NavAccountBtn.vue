<template>
  <v-list-tile :to="link" exact-active-class="default-class success--text" ripple>
    <v-list-tile-action>
      <v-icon medium>{{ icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>