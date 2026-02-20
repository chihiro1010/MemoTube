<template>
  <div class="px-4 pb-24">
    <div v-if="!sortedDataArgs.length" class="mx-auto mt-12 max-w-md rounded-2xl border border-dashed border-rose-200 bg-white/80 p-6 text-center">
      <p class="text-lg font-bold text-slate-700">まだメモがありません</p>
      <p class="mt-2 text-sm leading-6 text-slate-500">
        右下の「＋」ボタンからYouTube動画を登録して、メモを残してみましょう。
      </p>
    </div>

    <div v-show="isActive === 'all' && sortedDataArgs.length" class="mx-auto flex max-w-md flex-col items-center">
      <MemoCard
        v-for="data in sortedDataArgs"
        :key="data.submitDateTime"
        :data="data"
        @onDelete="memoDelete"
        @onEdit="memoEdit"
      />
    </div>

    <div
      v-show="isActive === 'channels' && groupedChannels.length"
      class="mx-auto flex max-w-md flex-col items-center"
    >
      <ChannelCard
        v-for="channel in groupedChannels"
        :key="channel.channelTitle"
        :channel="channel"
        @onDelete="memoDelete"
        @onEdit="memoEdit"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["isActive", "dataArgs"],
  computed: {
    sortedDataArgs() {
      return [...this.dataArgs].sort(
        (a, b) => new Date(b.submitDateTime) - new Date(a.submitDateTime)
      );
    },
    groupedChannels() {
      const grouped = this.sortedDataArgs.reduce((acc, memo) => {
        const existing = acc.find((item) => item.channelTitle === memo.channelTitle);

        if (existing) {
          existing.memos.push(memo);
        } else {
          acc.push({
            channelTitle: memo.channelTitle,
            channelIconUrl: memo.channelIconUrl,
            channelUrl: memo.channelUrl,
            memos: [memo],
          });
        }

        return acc;
      }, []);

      return grouped.sort((a, b) => b.memos.length - a.memos.length);
    },
  },
  methods: {
    memoDelete(memo) {
      this.$emit("onDelete", memo);
    },
    memoEdit(payload) {
      this.$emit("onEdit", payload);
    },
  },
};
</script>
