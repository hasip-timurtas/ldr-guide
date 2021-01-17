<template>
  <div class="text-center">
    <h2 class="mt-10">Price of the full book is only 7.5 $</h2>
    <div class="pa-10">
      <PayPal
        :amount="amount"
        currency="USD"
        :client="credentials"
        env="production"
      >
      </PayPal>
    </div>
    <h3>
      After you do the payment you will receive the book to your paypal email
      address. If you want to receive to another mail address. Please write us
      on Instagram:
      <a href="https://www.instagram.com/ldrguide/">Here</a>
    </h3>
    <v-img src="@/assets/book-chapters.png" max-width="300px" class="ma-auto" />
  </div>
</template>
<script>
import PayPal from "vue-paypal-checkout";
export default {
  components: {
    PayPal,
  },
  data() {
    return {
      credentials: {
        amount: 7.5,
        sandbox:
          "AQsoDvd_zHW-cyXpNyPUa2dEtpeWOkbsPYb7bGZcXWu4bYk4c1mqQSgqH3WFE6gLwcPlz4E-XvHHxmY5",
        production:
          "ASWln5qx2YwovBa8WvBdM1prFz4TrxS14Gihz84riiTCZvoJTsVFOQD-ExwUu_7qVioLfa6TqsH5Q9V0",
      },
    };
  },
  created() {
    const coupon = this.$route.query.coupon;

    if (coupon === "VALENTINES") {
      this.amount = 5;
    }
  },
};
</script>
<style lang="scss">
.zoid-outlet {
  width: 300px !important;
}
</style>
