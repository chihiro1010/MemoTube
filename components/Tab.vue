<template>
  <div class="sticky top-16 left-0 z-10 px-4 py-3">
    <div
      class="mx-auto flex w-full max-w-md rounded-2xl bg-white/70 p-1 shadow-[0_8px_30px_rgba(244,63,94,0.15)] backdrop-blur"
    >
      <button :class="tabStyle('all')" @click="onClickTab('all')">All</button>
      <button :class="tabStyle('channels')" @click="onClickTab('channels')">
        Channels
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isActive"],
  methods: {
    onClickTab(clickedTab) {
      this.$emit("onChange", clickedTab);
    },
  },
  computed: {
    tabStyle() {
      return (value) => {
        if (this.isActive === value) {
          return "flex-1 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 py-2 text-sm font-bold text-white shadow";
        }

        return "flex-1 rounded-xl py-2 text-sm font-semibold text-slate-500 duration-100 hover:text-slate-700";
      };
    },
  },
};
</script>
