<template>
  <div v-if="progressState === 'URLInput'">
    <div class="bg-gray-600 rounded-xl shadow-sm shrink-0 w-[22rem]">
      <div class="p-4">
        <h2 class="text-xl font-semibold text-gray-200">動画URL入力</h2>

        <div class="mt-7 mx-1">
          <input
            type="text"
            placeholder=" メモを追加したい動画のURLを貼り付けてください。"
            class="rounded-sm w-full"
            v-model="inputURL"
          />
        </div>
      </div>

      <div class="flex justify-end gap-x-2 p-4">
        <button
          type="button"
          class="py-2 px-3 text-sm text-white font-semibold rounded-lg bg-gray-800 duration-75 hover:bg-gray-700"
          @click="modalClose"
        >
          Cancel
        </button>
        <a
          v-if="inputURL.length"
          class="py-2 px-3 text-sm text-white font-semibold rounded-lg bg-rose-600 duration-75 hover:bg-rose-700"
          @click="getVideoInfo"
        >
          OK
        </a>
        <a
          v-else="!inputURL.length"
          class="py-2 px-3 text-sm text-white font-semibold rounded-lg bg-gray-500 duration-75"
        >
          OK
        </a>
      </div>
    </div>
  </div>
  <div v-else-if="progressState === 'inputIdError'">
    <div class="bg-gray-600 border rounded-xl shadow-sm shrink-0 w-[22rem]">
      <div class="p-4">
        <h2 class="block text-xl sm:text-2xl font-semibold text-red-500">
          URL認識エラー
        </h2>

        <div class="mt-7 mx-1">
          <p class="text-white">
            YoutubeのURLを確認できませんでした。URLを再度確認してください。
          </p>
        </div>
      </div>

      <div class="flex justify-end gap-x-2 p-4">
        <button
          type="button"
          class="py-2 px-3 text-sm text-white font-semibold rounded-lg bg-gray-800 duration-75 hover:bg-gray-700"
          @click="errorClose"
        >
          OK
        </button>
      </div>
    </div>
  </div>
  <div v-else-if="progressState === 'videoIsNotFound'">
    <div class="bg-gray-600 border rounded-xl shadow-sm shrink-0 w-[22rem]">
      <div class="p-4">
        <h2 class="block text-xl sm:text-2xl font-semibold text-red-500">
          動画情報取得エラー
        </h2>

        <div class="mt-7 mx-1">
          <p class="text-white">
            入力したURLに一致する動画が見つかりませんでした。動画URLを再度確認してください。
          </p>
        </div>
      </div>

      <div class="flex justify-end gap-x-2 p-4">
        <button
          type="button"
          class="py-2 px-3 text-sm text-white font-semibold rounded-lg bg-gray-800 duration-75 hover:bg-gray-700"
          @click="errorClose"
        >
          OK
        </button>
      </div>
    </div>
  </div>
  <div v-else-if="progressState === 'createMemo'">
    <div class="bg-gray-600 border rounded-xl shadow-sm shrink-0 w-[22rem]">
      <div class="px-4 pt-4">
        <h2 class="block text-xl sm:text-2xl font-semibold text-white">
          メモの登録
        </h2>

        <div class="w-[22rem] h-24 mt-2 text-white">
          <img
            :src="videoInfo.thumbnailUrl"
            class="h-[60px] w-[100px] inline-block mt-3 mr-2 rounded-md"
          />
          <div class="inline-block w-60 align-middle text-sm">
            <p class="inline-block mt-2">
              {{ videoInfo.title.slice(0, 17) }}
            </p>
            <p class="inline-block">
              {{
                videoInfo.title.length < 34
                  ? videoInfo.title.slice(17, 34)
                  : videoInfo.title.slice(17, 35) + "..."
              }}
            </p>
            <div>
              <img
                :src="videoInfo.channelIconUrl"
                class="inline-block h-4 mt-1 mr-1 rounded-md"
              />
              <p class="inline-block align-middle">
                {{
                  videoInfo.channelTitle.length < 15
                    ? videoInfo.channelTitle.slice(0, 15)
                    : videoInfo.channelTitle.slice(0, 14) + "..."
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mx-4">
        <textarea
          placeholder=" メモを入力。"
          class="rounded-sm w-full h-56"
          maxlength="300"
          v-model="inputMemo"
        ></textarea>

        <p
          v-if="inputMemo.length < 300"
          class="text-white font-semibold text-sm"
        >
          {{ "文字数: " + inputMemo.length }}
        </p>
        <p
          v-else="inputMemo.length === 300"
          class="text-red-500 font-semibold text-sm"
        >
          {{ "文字数: 300(最大)" }}
        </p>
      </div>

      <div class="flex justify-end gap-x-2 p-4">
        <button
          type="button"
          class="py-2 px-3 text-sm text-white font-semibold rounded-lg bg-gray-800 duration-75 hover:bg-gray-700"
          @click="() => (this.progressState = 'URLInput')"
        >
          Cancel
        </button>
        <button
          type="button"
          class="py-2 px-3 text-sm text-white font-semibold rounded-lg bg-rose-600 duration-75 hover:bg-rose-700"
          @click="submitMemo"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: "all",
      inputURL: "",
      inputMemo: "",
      videoInfo: {
        title: "",
        channelTitle: "",
        thumbnailUrl: "",
        channelIconUrl: "",
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
    },
    async getVideoInfo() {
      let videoUrl = this.inputURL;
      let videoId = this.getYouTubeVideoId(videoUrl);

      if (videoId) {
        let apiKey = "AIzaSyAV0OGfw9dg8mEI_EVNP2wNrKlZ4Xfe1rs"; // ご自身のYouTube APIキーを使用してください

        // ビデオ情報を取得
        let videoApiUrl =
          "https://www.googleapis.com/youtube/v3/videos?id=" +
          videoId +
          "&key=" +
          apiKey +
          "&part=snippet";

        let videoResponse = await fetch(videoApiUrl);
        let videoData = await videoResponse.json();

        if (videoData.items.length > 0) {
          let snippet = videoData.items[0].snippet;
          let channelId = snippet.channelId;

          // チャンネルの詳細な情報を取得
          let channelApiUrl =
            "https://www.googleapis.com/youtube/v3/channels?id=" +
            channelId +
            "&key=" +
            apiKey +
            "&part=snippet";

          let channelResponse = await fetch(channelApiUrl);
          let channelData = await channelResponse.json();

          if (channelData.items.length > 0) {
            let channelSnippet = channelData.items[0].snippet;
            let channelTitle = channelSnippet.title;
            let channelIconUrl = channelSnippet.thumbnails.default.url;

            // ビデオ情報を保存するオブジェクトを作成
            this.videoInfo = {
              title: snippet.title,
              channelTitle: channelTitle,
              thumbnailUrl: snippet.thumbnails.default.url,
              channelIconUrl: channelIconUrl,
              memo: "",
            };
          }
          this.progressState = "createMemo";
        } else {
          this.progressState = "videoIsNotFound";
        }
      } else {
        this.progressState = "inputIdError";
      }
    },
    getYouTubeVideoId(url) {
      let regex;

      // www.youtube.com/watch?v=... 形式のURLを検索
      regex = /[?&]v=([^#\&\?]+)/;
      let match = url.match(regex);

      // youtu.be/... 形式のURLを検索
      if (!match || !match[1]) {
        regex = /youtu\.be\/([^#\&\?]+)/;
        match = url.match(regex);
      }

      return match && match[1] ? match[1] : null;
    },
  },
};
</script>
