<template>
  <div class="flex flex-col justify-between w-screen h-screen">
    <!-- Header & Content -->
    <div class="flex flex-col">
      <!-- Picture -->
      <!-- <img src="https://milhane.me/me.png/" class="absolute rounded-full shadow-lg h-1/5"> -->
      <!-- Header -->
      <div class="p-8 green-shadow bg-green-light mb-8"></div>
      <!-- Content -->
      <div class="flex flex-col items-center h-full">
        <div class="flex flex-col w-11/12 max-w-screen-lg">
          <!-- Title -->
          <div class="flex w-full justify-center">
            <h1 class="text-4xl font-bold mb-8">{{ fullName() }}</h1>
          </div>
          <!-- Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-8">
            <div class="flex flex-col">
              <Title content="À propos de moi"></Title>
            </div>
            <div class="flex flex-col">
              <Title content="Formations"></Title>
            </div>
            <div class="flex flex-col">
              <Title content="Me contacter"></Title>
            </div>
            <div class="flex flex-col">
              <Title content="Projets"></Title>
              <div v-if="pinnedRepositories.length > 1">
                <Repository
                  class="mb-4"
                  v-for="(repository, i) in pinnedRepositories"
                  :key="i"
                  :repository="repository"
                ></Repository>
              </div>
              <div v-else>
                <RepositorySkeleton
                  class="mb-4"
                  v-for="i in 4"
                  :key="i"
                  :small="i % 3 == 0"
                ></RepositorySkeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div class="p-4 green-shadow bg-green-light flex flex-row justify-between">
      <div class="flex flex-row justify-between">
        <a
          v-for="(link, i) in links"
          :key="i"
          :href="link.to"
          :title="link.title"
          target="blank"
          class="mr-4 flex items-center"
        >
          <i :class="link.icon + ' fa-lg'"></i>
        </a>
      </div>
      <h1>Développé et designé avec <i class="far fa-heart"></i> par <a href="https://github.com/chmilhane" target="blank">{{ firstName }}</a>.</h1>
    </div>
  </div>
</template>

<style scopd>
  .green-shadow {
    -webkit-box-shadow: 0px 0px 0px 10px var(--color-green-dark); 
    box-shadow: 0px 0px 0px 5px var(--color-green-dark);
  }
</style>

<script setup>
  import Title from './components/Title.vue';
  import Repository from './components/cards/Repository.vue';
  import RepositorySkeleton from './components/cards/skeletons/Repository.vue';
</script>

<script>
  export default {
    data() {
      return {
        lastName: 'CHIHEB',
        firstName: 'Milhane',
        links: [
          {
            icon: 'fab fa-github',
            title: 'GitHub',
            to: 'https://github.com/chmilhane'
          },
          {
            icon: 'fab fa-figma',
            title: 'Projet Figma',
            to: 'https://www.figma.com/file/awUcaBNjrwCoW32aXRuZyk/😎?node-id=0%3A1'
          },
          {
            icon: 'fas fa-file-pdf',
            title: 'Format PDF',
            to: 'https://milhane.me/resume.pdf'
          },
          {
            icon: 'fas fa-envelope-open-text',
            title: 'Lettre de motivation',
            to: 'https://milhane.me/motivationletter.pdf'
          }
        ],
        pinnedRepositories: []
      }
    },
    beforeMount() {
      this.fetchRepositories();
    },
    methods: {
      fetchRepositories() {
        fetch('https://gh-pinned-repos.egoist.sh/?username=chmilhane').then(async r => {
          const data = await r.json();

          // check for error response
          if (!r.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          this.pinnedRepositories = data.map(v => {
            v.repo = this.parseHtmlEntities(v.repo).replace(/-/g, ' ');
            v.description = this.parseHtmlEntities(v.description);

            return v;
          });
        })
        .catch(console.error);
      },
      parseHtmlEntities(str = '') {
        return str.replace(/&#([0-9]{1,3});/gi, function(_match, numStr) {
          const num = parseInt(numStr, 10); // read num as normal number
          return String.fromCharCode(num);
        }).replace(/&amp;/g, '&');
      },
      fullName() {
        return this.firstName + ' ' + this.lastName;
      }
    }
  }
</script>