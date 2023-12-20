<template>
  <div>
    <div v-show="isActive === 'all'" class="flex flex-col items-center">
      <MemoCard
        v-for="(data, key) in dataArgs"
        :data="data"
        @onDelete="memoDelete"
      />
    </div>
    <div v-show="isActive === 'channels'" class="flex flex-col items-center">
      <!-- <ChannelCard v-for="(data, key) in dataArgs" :data="data" /> -->
      {{ "工事中" }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["isActive", "dataArgs"],

  methods: {
    onClickTab(clickedTab) {
      this.$emit("onClick", clickedTab);
    },
    memoDelete(primary) {
      this.$emit("onDelete", primary);
    },
  },
};
</script>
