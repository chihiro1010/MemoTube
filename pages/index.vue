import Header from '~/components/Header.vue';
<template>
  <Header> </Header>
  <h1
    class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
  >
    Youtube用のメモアプリ
  </h1>
  <div class="flex flex-col h-full items-center text-white text-xl font-bold">
    <button
      @click="navigate"
      class="rounded-lg bg-rose-500 h-16 w-48 mt-10 text-xl font-bold text-white shadow-sm hover:bg-rose-400"
    >
      Go To App
    </button>
  </div>
</template>

<script setup lang="ts">
const navigate = () => {
  return navigateTo({
    path: "/memo-app",
  });
};
</script>
