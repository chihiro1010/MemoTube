<template>
  <article
    class="my-2 w-full max-w-md overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-[0_14px_40px_rgba(30,41,59,0.08)] backdrop-blur-sm"
  >
    <div class="flex gap-3 p-3">
      <img :src="data.thumbnailUrl" class="h-16 w-24 rounded-lg object-cover" />
      <div class="flex-1">
        <p class="line-clamp-2 text-sm font-semibold text-slate-800">{{ data.title }}</p>
        <div class="mt-2 flex items-center gap-1">
          <img :src="data.channelIconUrl" class="h-5 w-5 rounded-full" />
          <p class="text-xs text-slate-500">{{ data.channelTitle }}</p>
        </div>
      </div>
      <button class="px-1 text-slate-400" @click="accordionToggle">
        {{ accordionOpen ? "⌃" : "⌄" }}
      </button>
    </div>

    <div v-if="accordionOpen" class="border-t border-slate-100 px-3 pb-3">
      <p class="mt-3 whitespace-pre-wrap text-sm text-slate-700">{{ data.memo }}</p>
      <div class="mt-3 flex justify-end">
        <button
          class="rounded-lg bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-500 duration-100 hover:bg-rose-100"
          @click="memoDelete(data.submitDateTime)"
        >
          削除
        </button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      accordionOpen: false,
    };
  },
  methods: {
    memoDelete(primary) {
      this.$emit("onDelete", primary);
    },
    accordionToggle() {
      this.accordionOpen = !this.accordionOpen;
    },
  },
};
</script>
