<template>
  <div
    v-if="progressState === 'URLInput'"
    class="w-[min(92vw,28rem)] rounded-3xl border border-white/70 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.25)]"
  >
    <h2 class="text-2xl font-bold text-slate-800">動画URL入力</h2>
    <p class="mt-2 text-sm leading-6 text-slate-600">
      YouTube動画のURLを入力すると、タイトルとチャンネル情報を取得します。
    </p>

    <input
      v-model.trim="inputURL"
      type="text"
      placeholder="https://www.youtube.com/watch?v=..."
      class="mt-4 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none ring-rose-300 focus:ring"
    />

    <div class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
      <p class="font-semibold">保存先: ブラウザのローカルストレージ</p>
      <p class="mt-1">
        履歴・サイトデータ削除、シークレットモード終了、端末変更、ブラウザ初期化でメモが消える可能性があります。
      </p>
      <p class="mt-1">対策: 定期的にメモを別のノートやクラウドへバックアップしてください。</p>
    </div>

    <div class="mt-6 flex justify-end gap-2">
      <button
        type="button"
        class="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 duration-75 hover:bg-slate-300"
        @click="modalClose"
      >
        キャンセル
      </button>
      <button
        type="button"
        class="rounded-xl px-4 py-2 text-sm font-semibold text-white duration-75"
        :class="inputURL.length ? 'bg-rose-500 hover:bg-rose-600' : 'bg-slate-400'"
        :disabled="!inputURL.length"
        @click="getVideoInfo"
      >
        次へ
      </button>
    </div>
  </div>

  <div
    v-else-if="progressState === 'inputIdError' || progressState === 'videoIsNotFound'"
    class="w-[min(92vw,24rem)] rounded-3xl border border-red-200 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.25)]"
  >
    <h2 class="text-xl font-bold text-rose-500">
      {{ progressState === "inputIdError" ? "URL認識エラー" : "動画情報取得エラー" }}
    </h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">
      {{ progressState === "inputIdError" ? "YouTubeのURLを確認できませんでした。URL形式を再確認してください。" : "入力したURLの動画情報が見つかりませんでした。URLを再確認してください。" }}
    </p>
    <div class="mt-5 flex justify-end">
      <button
        type="button"
        class="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300"
        @click="errorClose"
      >
        OK
      </button>
    </div>
  </div>

  <div
    v-else-if="progressState === 'createMemo'"
    class="max-h-[90vh] w-[min(92vw,28rem)] overflow-y-auto rounded-3xl border border-white/70 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.25)]"
  >
    <h2 class="text-2xl font-bold text-slate-800">メモの登録</h2>

    <div class="mt-4 flex gap-3 rounded-2xl bg-slate-100 p-3">
      <img :src="videoInfo.thumbnailUrl" class="h-[68px] w-[112px] rounded-lg object-cover" />
      <div class="min-w-0 text-sm text-slate-700">
        <p class="line-clamp-2 font-semibold">{{ videoInfo.title }}</p>
        <div class="mt-2 flex items-center gap-2">
          <img :src="videoInfo.channelIconUrl" class="h-5 w-5 rounded-full" />
          <p class="line-clamp-1 text-xs text-slate-500">{{ videoInfo.channelTitle }}</p>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <textarea
        v-model="inputMemo"
        placeholder="メモを入力(最大300文字)"
        class="h-44 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none ring-rose-300 focus:ring"
        maxlength="300"
      ></textarea>

      <p class="mt-1 text-right text-xs font-semibold" :class="inputMemo.length < 300 ? 'text-slate-500' : 'text-rose-500'">
        {{ inputMemo.length < 300 ? `${inputMemo.length}/300` : "300/300(最大)" }}
      </p>
    </div>

    <div class="mt-6 flex justify-end gap-2">
      <button
        type="button"
        class="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 duration-75 hover:bg-slate-300"
        @click="progressState = 'URLInput'"
      >
        戻る
      </button>
      <button
        type="button"
        class="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white duration-75 hover:bg-rose-600"
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
        channelId: "",
        videoUrl: "",
        videoId: "",
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
        channelId,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        videoId,
        memo: "",
        submitDateTime: "",
      };

      this.progressState = "createMemo";
    },
    getYouTubeVideoId(url) {
      try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname.replace("www.", "");

        if (hostname === "youtube.com") {
          const pathName = parsedUrl.pathname;

          if (pathName === "/watch") {
            return parsedUrl.searchParams.get("v");
          }

          if (pathName.startsWith("/shorts/") || pathName.startsWith("/live/") || pathName.startsWith("/embed/")) {
            return pathName.split("/")[2] || null;
          }
        }

        if (hostname === "youtu.be") {
          return parsedUrl.pathname.replace("/", "") || null;
        }
      } catch (_error) {
        return null;
      }

      return null;
    },
  },
};
</script>
