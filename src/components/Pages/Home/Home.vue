<template>
  <v-card flat max-width="700px" class="mx-auto">
    <v-img src="@/assets/homepage-2yrs.png" max-width="700px" class="ma-auto" />
    <div class="pa-4 home-text">
      <h1 class="pa-4">Facts about LDR Guide</h1>
      <ul class="h3">
        <li>It took me more than <strong>2</strong> years writing it.</li>
        <li>
          More than <strong>7</strong> years of LDR and multicultural
          relationship.
        </li>
        <li>
          <strong>11</strong> chapters full of real experiences, thoughts,
          advices, common questions, ideas and much more!
        </li>
      </ul>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.home-text {
  line-height: 40px;
}

ul {
  list-style-position: inside;
  font-size: 16px;

  @include tablet-to {
    font-size: 13px;
  }
}

h1 {
  @include tablet-to {
    font-size: 25px;
  }
}
</style>


