<template>
  <div class="flex flex-col shadow-sm rounded-lg p-4 bg-white">
    <div class="flex flex-row" v-if="small">
      <div class="px-6 py-3 animation rounded mr-2"></div>
      <div class="px-28 py-3 animation rounded"></div>
    </div>
    <div v-else>
      <div class="flex flex-row mb-2">
        <div class="px-24 py-3 animation rounded mr-4"></div>
      </div>
      <div class="flex flex-row">
        <div class="px-48 py-2 animation rounded mr-4"></div>
      </div>
      <div class="flex mt-4">
        <div class="px-12 py-3 animation rounded mr-2"></div>
        <div class="px-6 py-3 animation rounded mr-2"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    small: Boolean
  });
</script>

<style scoped>
  .animation {
    background-color: #d9d9d9;
    background-image: linear-gradient(to right, #d9d9d9 0%, rgba(0, 0, 0, 0.05) 20%, #d9d9d9 40%, #d9d9d9 100%);
    background-size: 450px 400px;
    background-repeat: no-repeat;
    animation: Shimmer 1s linear infinite;
  }

  @keyframes Shimmer {
    0% {
      background-position: -450px 0;
    }

    100% {
      background-position: 450px 0;
    }
  }
</style>