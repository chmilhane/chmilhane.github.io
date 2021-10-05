<template>
  <div class="flex flex-col shadow hover:shadow-lg cursor-pointer transition duration-500 ease-in-out rounded-lg p-4 bg-white">
    <a :href="!isGist() ? repository.link : gistLink()" target="blank">
      <div class="flex flex-row items-center">
        <div
          v-if="isGist()"
          class="px-2 py-1 rounded-md bg-green-light mr-2"
        >
          <h2>Gist</h2>
        </div>
        <h1 class="font-semibold">{{ repository.repo }}</h1>
      </div>
      <h2>{{ repository.description }}</h2>
      <div class="flex mt-4" v-if="!isNaN(repository.stars) && repository.stars > 0">
        <div class="flex flex-row mr-4 items-center" v-if="repository.language && repository.languageColor">
          <i class="fas fa-circle mr-2" :style="'color: ' + repository.languageColor"></i>
          <h3>{{ repository.language }}</h3>
        </div>
        <div class="flex flex-row items-center" v-if="!isNaN(repository.stars)">
          <i class="fas fa-star mr-2"></i>
          <h3>{{ repository.stars || 0 }}</h3>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
  defineProps({
    repository: Object
  });
</script>

<script>
  export default {
    methods: {
      isGist() {
        const { description, language, languageColor } = this.repository;
        return !description && (!language || !languageColor);
      },
      gistLink() {
        return 'https://gist.github.com/chmilhane/';
      }
    }
  }
</script>