<template>
  <div>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <v-layout align-center column justify-center>
        <v-avatar size="144" color="grey lighten-4">
          <img :src="user.avatar" alt="avatar">
        </v-avatar>
        <h1 class="display-2 font-weight-thin mt-3 mb-4">{{ user.username }}</h1>
        <h4 class="subheading">Build your application today!</h4>
      </v-layout>
    </v-parallax>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style lang="scss" scoped>
</style>