<template>
  <article
    class="my-2 w-full max-w-md rounded-2xl border border-white/70 bg-white/90 p-3 shadow-[0_14px_40px_rgba(30,41,59,0.08)]"
  >
    <button class="flex w-full items-center gap-3" @click="accordionOpen = !accordionOpen">
      <a
        v-if="channel.channelUrl"
        :href="channel.channelUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="h-12 w-12"
        @click.stop
      >
        <img :src="channel.channelIconUrl" class="h-12 w-12 rounded-full" />
      </a>
      <img v-else :src="channel.channelIconUrl" class="h-12 w-12 rounded-full opacity-80" />
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
          <a v-if="memo.videoUrl" :href="memo.videoUrl" target="_blank" rel="noopener noreferrer" class="shrink-0">
            <img :src="memo.thumbnailUrl" class="h-12 w-20 rounded-md object-cover" />
          </a>
          <img v-else :src="memo.thumbnailUrl" class="h-12 w-20 rounded-md object-cover opacity-80" />
          <div class="flex-1">
            <a
              v-if="memo.videoUrl"
              :href="memo.videoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="line-clamp-1 text-xs font-semibold text-slate-700 hover:text-rose-500"
            >
              {{ memo.title }}
            </a>
            <p v-else class="line-clamp-1 text-xs font-semibold text-slate-700">{{ memo.title }}</p>
            <p class="mt-1 line-clamp-2 text-xs text-slate-500">{{ memo.memo }}</p>
          </div>
        </div>
        <div class="mt-2 flex justify-end gap-2">
          <button
            class="rounded-lg bg-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-600"
            @click="$emit('onEdit', memo)"
          >
            編集
          </button>
          <button
            class="rounded-lg bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-500"
            @click="$emit('onDelete', memo)"
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
