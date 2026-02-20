<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,_#ffe4ec_0%,_#f8fafc_45%,_#f1f5f9_100%)]">
    <Header />

    <main class="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col items-center justify-center px-6 pb-16">
      <div class="w-full rounded-3xl border border-white/60 bg-white/80 p-7 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <p class="text-sm font-semibold tracking-[0.16em] text-rose-400">YOUTUBE MEMO</p>
        <h1 class="mt-3 text-3xl font-extrabold text-slate-800">あとで見返せる動画メモ</h1>
        <p class="mt-4 text-sm leading-6 text-slate-600">
          動画URLからタイトル・チャンネルを取得して、気づきメモを残せます。チャンネル別の整理にも対応しています。
        </p>

        <button
          @click="navigate"
          class="mt-8 w-full rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 py-4 text-lg font-bold text-white shadow-[0_14px_30px_rgba(244,63,94,0.35)] duration-150 hover:brightness-105"
        >
          アプリをはじめる
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const navigate = () => {
  return navigateTo({
    path: "/memo-app",
  });
};
</script>
