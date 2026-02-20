<template>
  <div class="px-4 pb-24">
    <div v-show="isActive === 'all'" class="mx-auto flex max-w-md flex-col items-center">
      <MemoCard
        v-for="data in sortedDataArgs"
        :key="data.submitDateTime"
        :data="data"
        @onDelete="memoDelete"
      />
    </div>

    <div
      v-show="isActive === 'channels'"
      class="mx-auto flex max-w-md flex-col items-center"
    >
      <ChannelCard
        v-for="channel in groupedChannels"
        :key="channel.channelTitle"
        :channel="channel"
        @onDelete="memoDelete"
      />
      <p v-if="!groupedChannels.length" class="mt-6 text-sm text-slate-500">
        メモを追加するとチャンネル単位で表示されます
      </p>
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
            memos: [memo],
          });
        }

        return acc;
      }, []);

      return grouped.sort((a, b) => b.memos.length - a.memos.length);
    },
  },
  methods: {
    memoDelete(primary) {
      this.$emit("onDelete", primary);
    },
  },
};
</script>
