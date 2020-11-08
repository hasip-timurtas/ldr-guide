<template>
  <div>Hahaha123123123</div>
</template>

<script>
export default {
  data() {
    return {
      hosters: [],
      filters: {
        vehicle: "true",
        host: "true",
        transfer: "true",
        activities: "true",
        adventures: "true",
        tour: "true"
      },
      checkedFilters: []
    };
  },
  computed: {
    filterHoster() {
      if (!this.checkedFilters.length) return this.hosters;

      // return this.hosters.filter(f => this.checkedFilters.includes(f.filter));

      return this.hosters.filter(f => {
        f.filters.filter(j => {
          this.checkedFilters.includes(j);
        });
      });
    }
  },
  created() {
    console.log(this);
    console.log(this.$options.computed);
  }
};
</script>
