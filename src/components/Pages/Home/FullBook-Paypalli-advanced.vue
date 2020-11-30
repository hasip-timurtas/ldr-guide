<template>
  <div ref="paypal"></div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        description: "Buy thing",
        amount: {
          currency_code: "USD",
          value: 1000
        }
      }
    };
  },
  created() {
    const script = document.createElement("script");
    const ClientID = "ASWln5qx2YwovBa8WvBdM1prFz4TrxS14Gihz84riiTCZvoJTsVFOQD-ExwUu_7qVioLfa6TqsH5Q9V0";
    script.src = `https://www.paypal.com/sdk/js?client-id=${ClientID}`;
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function() {
      /*
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [this.order],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            // ajax request
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
        */
      window.paypal
        .Buttons({
          env: "sandbox", // sandbox | production
          client: {
            sandbox: "AQsoDvd_zHW-cyXpNyPUa2dEtpeWOkbsPYb7bGZcXWu4bYk4c1mqQSgqH3WFE6gLwcPlz4E-XvHHxmY5"
            // production:
            //    "ASWln5qx2YwovBa8WvBdM1prFz4TrxS14Gihz84riiTCZvoJTsVFOQD-ExwUu_7qVioLfa6TqsH5Q9V0",
          },

          // Show the buyer a 'Pay Now' button in the checkout flow
          commit: true,

          // payment() is called when the button is clicked
          payment: function(data, actions) {
            // Make a call to the REST API to set up the payment
            return actions.payment.create({
              payment: {
                transactions: [
                  {
                    amount: { total: "0.01", currency: "USD" }
                  }
                ],
                redirect_urls: {
                  return_url: "https://ldrguidebook.com/callback/",
                  cancel_url: "https://ldrguidebook.com/callback/"
                }
              }
            });
          },

          // onAuthorize() is called when the buyer approves the payment
          onAuthorize: function(data, actions) {
            // Make a call to the REST API to execute the payment
            return actions.payment.execute().then(function() {
              actions.redirect();
            });
          },

          onCancel: function(data, actions) {
            actions.redirect();
          }
        })
        .render(this.$refs.paypal);
    }
  }
};
</script>
