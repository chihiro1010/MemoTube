<template>
  <article
    class="my-2 w-full max-w-md rounded-2xl border border-white/70 bg-white/90 p-3 shadow-[0_14px_40px_rgba(30,41,59,0.08)]"
  >
    <button class="flex w-full items-center gap-3" @click="accordionOpen = !accordionOpen">
      <img :src="channel.channelIconUrl" class="h-12 w-12 rounded-full" />
      <div class="flex-1 text-left">
        <p class="text-sm font-semibold text-slate-800">{{ channel.channelTitle }}</p>
        <p class="text-xs text-slate-500">{{ channel.memos.length }}件のメモ</p>
      </div>
      <span class="text-slate-400">{{ accordionOpen ? "⌃" : "⌄" }}</span>
    </button>

    <div v-if="accordionOpen" class="mt-3 space-y-2 border-t border-slate-100 pt-3">
      <div
        v-for="memo in channel.memos"
        :key="memo.submitDateTime"
        class="rounded-xl bg-slate-50 p-2"
      >
        <div class="flex gap-2">
          <img :src="memo.thumbnailUrl" class="h-12 w-20 rounded-md object-cover" />
          <div class="flex-1">
            <p class="line-clamp-1 text-xs font-semibold text-slate-700">{{ memo.title }}</p>
            <p class="mt-1 line-clamp-2 text-xs text-slate-500">{{ memo.memo }}</p>
          </div>
        </div>
        <div class="mt-2 flex justify-end">
          <button
            class="rounded-lg bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-500"
            @click="$emit('onDelete', memo.submitDateTime)"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ["channel"],
  data() {
    return {
      accordionOpen: false,
    };
  },
};
</script>
