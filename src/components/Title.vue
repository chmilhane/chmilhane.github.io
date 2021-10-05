<template>
    <h1 class="text-2xl font-semibold text-black border-gray border-b-3 border-t-3 mb-8 py-2 text-center uppercase tracking-widest">
      {{ content }}
    </h1>
</template>

<script setup>
  defineProps({
    content: String
  });
</script>