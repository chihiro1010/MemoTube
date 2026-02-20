<template>
  <article
    class="my-2 w-full max-w-md overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-[0_14px_40px_rgba(30,41,59,0.08)] backdrop-blur-sm"
  >
    <div class="flex gap-3 p-3">
      <a v-if="data.videoUrl" :href="data.videoUrl" target="_blank" rel="noopener noreferrer" class="shrink-0">
        <img :src="data.thumbnailUrl" class="h-16 w-24 rounded-lg object-cover" />
      </a>
      <div v-else class="shrink-0">
        <img :src="data.thumbnailUrl" class="h-16 w-24 rounded-lg object-cover opacity-80" />
      </div>
      <div class="flex-1">
        <a
          v-if="data.videoUrl"
          :href="data.videoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="line-clamp-2 text-sm font-semibold text-slate-800 hover:text-rose-500"
        >
          {{ data.title }}
        </a>
        <p v-else class="line-clamp-2 text-sm font-semibold text-slate-700">
          {{ data.title }}
        </p>
        <div class="mt-2 flex items-center gap-1">
          <a v-if="data.channelUrl" :href="data.channelUrl" target="_blank" rel="noopener noreferrer">
            <img :src="data.channelIconUrl" class="h-5 w-5 rounded-full" />
          </a>
          <img v-else :src="data.channelIconUrl" class="h-5 w-5 rounded-full opacity-80" />
          <a
            v-if="data.channelUrl"
            :href="data.channelUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-slate-500 hover:text-rose-500"
          >
            {{ data.channelTitle }}
          </a>
          <p v-else class="text-xs text-slate-500">{{ data.channelTitle }}</p>
        </div>
      </div>
      <button class="px-1 text-slate-400" @click="accordionToggle">
        {{ accordionOpen ? "⌃" : "⌄" }}
      </button>
    </div>

    <div v-if="accordionOpen" class="border-t border-slate-100 px-3 pb-3">
      <p class="mt-3 whitespace-pre-wrap text-sm text-slate-700">{{ data.memo }}</p>
      <div class="mt-3 flex justify-end gap-2">
        <button
          class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 duration-100 hover:bg-slate-200"
          @click="$emit('onEdit', data)"
        >
          編集
        </button>
        <button
          class="rounded-lg bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-500 duration-100 hover:bg-rose-100"
          @click="$emit('onDelete', data)"
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
    accordionToggle() {
      this.accordionOpen = !this.accordionOpen;
    },
  },
};
</script>
