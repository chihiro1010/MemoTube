<template>
  <div
    class="sticky top-16 left-0 flex items-center bg-rose-500 h-16 mb-2 text-center text-white text-xl font-bold shadow-md"
  >
    <div :class="tabStyle('all')" @click="onClickTab('all')">All</div>
    <div :class="tabStyle('channels')" @click="onClickTab('channels')">
      Channels
    </div>
  </div>
</template>

<script>
export default {
  props: ["isActive"],
  data() {
    return {
      active: this.isActive,
    };
  },
  methods: {
    onClickTab(clickedTab) {
      this.$emit("onChange", clickedTab);
    },
  },
  computed: {
    tabStyle: function () {
      return function (value) {
        if (this.isActive === value) {
          return "flex-1 h-full bg-rose-400 flex items-center justify-center duration-100 border-b-4 mb-1 border-b-white";
        } else if (this.isActive !== value) {
          return "flex-1 h-full flex items-center justify-center duration-100";
        }
      };
    },
  },
};
</script>
