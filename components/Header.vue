<template>
  <header class="sticky top-0 left-0 flex bg-rose-500 h-16 w-full">
    <img src="../public/MemoTube.png" class="h-7 m-5" />
  </header>
</template>

<script>
export default {
  data() {
    return {
      data: "data",
    };
  },
  methods: {
    changeTab(tabId) {
      this.$emit("tabChanged", tabId);
    },
  },
};
</script>
