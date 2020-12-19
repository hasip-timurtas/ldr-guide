<template>
  <div class="text-center">
    <h2 class="mt-10">Lanunching on December, stay tuned on Instagram!</h2>
    <VueCountdown :time="countDown">
      <template slot-scope="props">
        <h1 class="pa-5">
          Time Remaining： {{ props.days }} days : {{ props.hours }} hours : {{ props.minutes }} minutes : {{ props.seconds }} seconds.
        </h1>
      </template>
    </VueCountdown>
    <v-img src="@/assets/book-chapters.png" max-width="300px" class="ma-auto" />
  </div>
</template>

<script>
import VueCountdown from "@chenfengyuan/vue-countdown";

export default {
  components: { VueCountdown },
  data() {
    return {
      countDown: 0
    };
  },
  created() {
    const launchDateMilisecond = new Date("2020-12-21T23:59:57.000Z").getTime();
    const currentDateMilisecond = new Date().getTime();
    this.countDown = launchDateMilisecond - currentDateMilisecond;
  }
};
</script>

<style lang="scss">
.zoid-outlet {
  width: 300px !important;
}
</style>
