<template>
  <div>
    <v-img src="@/assets/chapter-1.png" max-width="300px" class="ma-auto" />
    <div class="hidden-sm-and-down">
      <iframe
        src="https://ldrguidebook.com/ldr-guide-first-chapter.pdf"
        width="100%"
        height="1000px"
      />
      <v-alert dense text type="info">
        You can download the first chapter to your computer from this
        <a
          href="https://ldrguidebook.com/ldr-guide-first-chapter.pdf"
          target="_blank"
          >Link</a
        ></v-alert
      >
    </div>

    <v-alert class="hidden-md-and-up" dense text type="info">
      You can read the first chapter from this link:
      <a
        href="https://ldrguidebook.com/ldr-guide-first-chapter.pdf"
        target="_blank"
        >Link</a
      ></v-alert
    >
  </div>
</template>
