<template>
  <div class="w-[22rem] rounded-2xl border border-white/20 bg-slate-700 p-4 shadow-2xl" v-if="progressState === 'URLInput'">
    <h2 class="text-xl font-semibold text-white">動画URL入力</h2>
    <p class="mt-2 text-sm text-slate-200">YouTube動画のURLを入力すると、タイトルとチャンネル情報を取得します。</p>

    <input
      type="text"
      placeholder="https://www.youtube.com/watch?v=..."
      class="mt-4 w-full rounded-lg border border-slate-500 bg-slate-50 px-3 py-2 text-sm"
      v-model="inputURL"
    />

    <div class="mt-4 rounded-xl border border-amber-200/70 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
      <p class="font-semibold">保存先: ブラウザのローカルストレージ</p>
      <p class="mt-1">
        ブラウザの履歴・サイトデータ削除、シークレットモード終了、端末変更、ブラウザ初期化でメモが消える可能性があります。
      </p>
      <p class="mt-1">対策: 定期的にメモを別のノートやクラウドへバックアップしてください。</p>
    </div>

    <div class="mt-4 flex justify-end gap-x-2">
      <button
        type="button"
        class="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white duration-75 hover:bg-slate-900"
        @click="modalClose"
      >
        キャンセル
      </button>
      <button
        type="button"
        class="rounded-lg px-3 py-2 text-sm font-semibold text-white duration-75"
        :class="inputURL.length ? 'bg-rose-600 hover:bg-rose-700' : 'bg-slate-500'"
        :disabled="!inputURL.length"
        @click="getVideoInfo"
      >
        次へ
      </button>
    </div>
  </div>

  <div v-else-if="progressState === 'inputIdError' || progressState === 'videoIsNotFound'" class="w-[22rem] rounded-2xl border border-red-200 bg-slate-700 p-4 shadow-2xl">
    <h2 class="text-xl font-semibold text-red-400">{{ progressState === "inputIdError" ? "URL認識エラー" : "動画情報取得エラー" }}</h2>
    <p class="mt-4 text-sm text-white">
      {{ progressState === "inputIdError" ? "YouTubeのURLを確認できませんでした。URL形式を再確認してください。" : "入力したURLの動画情報が見つかりませんでした。URLを再確認してください。" }}
    </p>
    <div class="mt-4 flex justify-end">
      <button
        type="button"
        class="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-900"
        @click="errorClose"
      >
        OK
      </button>
    </div>
  </div>

  <div v-else-if="progressState === 'createMemo'" class="w-[22rem] rounded-2xl border border-white/20 bg-slate-700 p-4 shadow-2xl">
    <h2 class="text-xl font-semibold text-white">メモの登録</h2>

    <div class="mt-3 flex gap-2 rounded-xl bg-slate-800/50 p-2 text-white">
      <img :src="videoInfo.thumbnailUrl" class="h-[60px] w-[100px] rounded-md object-cover" />
      <div class="w-56 text-sm">
        <p class="line-clamp-2">{{ videoInfo.title }}</p>
        <div class="mt-1 flex items-center gap-1">
          <img :src="videoInfo.channelIconUrl" class="h-4 rounded-full" />
          <p class="line-clamp-1 text-xs text-slate-200">{{ videoInfo.channelTitle }}</p>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <textarea
        placeholder="メモを入力(最大300文字)"
        class="h-44 w-full rounded-lg border border-slate-500 px-2 py-1"
        maxlength="300"
        v-model="inputMemo"
      ></textarea>

      <p class="text-sm font-semibold" :class="inputMemo.length < 300 ? 'text-slate-100' : 'text-red-400'">
        {{ inputMemo.length < 300 ? `文字数: ${inputMemo.length}` : "文字数: 300(最大)" }}
      </p>
    </div>

    <div class="mt-4 flex justify-end gap-x-2">
      <button
        type="button"
        class="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white duration-75 hover:bg-slate-900"
        @click="progressState = 'URLInput'"
      >
        戻る
      </button>
      <button
        type="button"
        class="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white duration-75 hover:bg-rose-700"
        @click="submitMemo"
      >
        保存
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputURL: "",
      inputMemo: "",
      videoInfo: {
        title: "",
        channelTitle: "",
        thumbnailUrl: "",
        channelIconUrl: "",
        channelUrl: "",
        videoUrl: "",
        memo: "",
        submitDateTime: "",
      },
      progressState: "URLInput",
    };
  },
  methods: {
    modalClose() {
      this.$emit("onClose");
    },
    errorClose() {
      this.progressState = "URLInput";
    },
    submitMemo() {
      this.videoInfo.memo = this.inputMemo;
      this.videoInfo.submitDateTime = new Date().toString();

      this.$emit("onSubmit", this.videoInfo);
      this.inputURL = "";
      this.inputMemo = "";
      this.progressState = "URLInput";
    },
    async getVideoInfo() {
      const videoId = this.getYouTubeVideoId(this.inputURL);

      if (!videoId) {
        this.progressState = "inputIdError";
        return;
      }

      const apiKey = "AIzaSyAV0OGfw9dg8mEI_EVNP2wNrKlZ4Xfe1rs";
      const videoApiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

      const videoResponse = await fetch(videoApiUrl);
      const videoData = await videoResponse.json();

      if (!videoData.items.length) {
        this.progressState = "videoIsNotFound";
        return;
      }

      const snippet = videoData.items[0].snippet;
      const channelId = snippet.channelId;
      const channelApiUrl = `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${apiKey}&part=snippet`;

      const channelResponse = await fetch(channelApiUrl);
      const channelData = await channelResponse.json();

      if (!channelData.items.length) {
        this.progressState = "videoIsNotFound";
        return;
      }

      const channelSnippet = channelData.items[0].snippet;
      this.videoInfo = {
        title: snippet.title,
        channelTitle: channelSnippet.title,
        thumbnailUrl: snippet.thumbnails.default.url,
        channelIconUrl: channelSnippet.thumbnails.default.url,
        channelUrl: `https://www.youtube.com/channel/${channelId}`,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        memo: "",
        submitDateTime: "",
      };

      this.progressState = "createMemo";
    },
    getYouTubeVideoId(url) {
      let regex = /[?&]v=([^#\&\?]+)/;
      let match = url.match(regex);

      if (!match || !match[1]) {
        regex = /youtu\.be\/([^#\&\?]+)/;
        match = url.match(regex);
      }

      return match && match[1] ? match[1] : null;
    },
  },
};
</script>
