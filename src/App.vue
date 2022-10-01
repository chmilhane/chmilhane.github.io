<template>
  <div class="flex flex-col justify-between w-screen h-screen">
    <!-- Header & Content -->
    <div class="flex flex-col">
      <!-- Picture -->
      <!-- <img src="https://milhane.me/me.png/" class="absolute rounded-full shadow-lg h-1/5"> -->
      <!-- Header -->
      <div class="py-4 green-shadow bg-green-light mb-8 sticky top-0"></div>
      <!-- Content -->
      <div class="flex flex-col items-center h-full">
        <div class="flex flex-col w-11/12 max-w-screen-lg">
          <!-- Title -->
          <div class="flex w-full justify-center">
            <h1 class="text-4xl font-bold mb-8">{{ fullName() }}</h1>
          </div>
          <!-- Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 xl:gap-8 mb-2">
            <div class="flex flex-col">
              <Title content="À Propos de Moi"></Title>
              <span class="text-lg">
                Salut 👋, je m'appel <span class="font-semibold">Milhane CHIHEB</span>!
                <br>
                Passionné par le domaine du numérique. Sérieux, rigoureux et autonome, je mets tout en œuvre pour réussir les projets qui me sont confiés.
              </span>
            </div>
            <div class="flex flex-col">
              <Title content="Expériences"></Title>
              <div
                v-for="(item, i) in education"
                :key="i"
                class="flex shadow justify-between bg-white pl-6 pr-4 py-4 space-x-4 rounded-lg items-center"
              >
                <i v-if="item.icon" :class="item.icon + ' fa-md'"></i>
                <div class="flex w-full">
                  <h1 class="font-semibold">{{ item.title }}</h1>
                  <h1 class="ml-4">{{ item.dates.join(' • ') }}</h1>
                </div>
                <a v-if="item.website" class="px-4 py-2 rounded-md bg-green-light transition duration-500 ease-in-out hover:shadow-md" :href="item.website" target="blank">Visiter</a>
              </div>
            </div>
            <div class="flex flex-col">
              <Title content="Me Contacter"></Title>
              <form
                action="https://formspree.io/f/xyylakew"
                method="POST"
                class="flex flex-col"
              >
                <label class="mb-4 w-full block text-gray-700 text-md font-bold">
                  Votre adresse e-mail
                  <input type="email" name="_replyto" class="shadow appearance-none rounded w-full p-3 leading-tight focus:outline-none focus:shadow-outline mt-2" placeholder="Votre adresse e-mail">
                </label>
                <label class="mb-6 w-full block text-gray-700 text-md font-bold">
                  Votre message
                  <textarea rows="7" name="message" class="resize-none shadow appearance-none rounded w-full p-3 leading-tight focus:outline-none focus:shadow-outline mt-2" placeholder="Votre message"></textarea>
                </label>
                <button type="submit" class="bg-green-light shadow hover:shadow-md cursor-pointer transition duration-500 ease-in-out rounded-lg py-2">Send</button>
              </form>
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
    <div class="p-4 green-shadow bg-green-light flex flex-col sm:flex-row justify-between sm:sticky sm:bottom-0">
      <div class="flex flex-row justify-evenly sm:justify-between mb-4 sm:mb-0">
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
      <h1 class="text-center">Développé & designé avec <i class="far fa-heart"></i> par <a href="https://github.com/chmilhane" target="blank">{{ firstName }}</a>.</h1>
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
        education: [
          // {
          //   icon: 'fas fa-school',
          //   title: 'Maxence Van Der Meersch, Mouvaux',
          //   dates: [2018, 2022]
          // }
          {
            icon: 'fas fa-code',
            title: 'INSY2S, Lille',
            dates: [2021],
            website: 'https://www.insy2s.com/'
          }
        ],
        links: [
          {
            icon: 'fab fa-github',
            title: 'GitHub',
            to: 'https://github.com/chmilhane'
          },
          // {
          //   icon: 'fas fa-file-pdf',
          //   title: 'Format PDF',
          //   to: 'https://milhane.me/resume.pdf'
          // },
          // {
          //   icon: 'fas fa-envelope-open-text',
          //   title: 'Lettre de motivation',
          //   to: 'https://milhane.me/motivationletter.pdf'
          // }
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

          this.pinnedRepositories = data
            .map(v => {
              v.repo = this.parseHtmlEntities(v.repo)
                .replace(/-/g, ' ')
                .replace(/\w\S*/g, function(txt) {
                  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
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