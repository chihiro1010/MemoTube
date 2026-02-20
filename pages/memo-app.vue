<template>
  <div
    class="min-h-screen bg-[radial-gradient(circle_at_top,_#ffe4ec_0%,_#f8fafc_45%,_#f1f5f9_100%)]"
  >
    <Header @click="navigate"></Header>
    <Tab :isActive="isActive" @onChange="changeTab"></Tab>
    <Contents
      :isActive="isActive"
      :data-args="dataArgs"
      @onDelete="openDeleteDialog"
      @onEdit="openEditDialog"
    ></Contents>

    <div v-if="modalValid">
      <div class="fixed inset-0 z-20 bg-slate-900/30 backdrop-blur-[1px]"></div>
      <Modal
        class="fixed inset-0 z-30 m-auto flex items-center justify-center"
        @onClose="modalToggle"
        @onSubmit="submitToLocalStorage"
      ></Modal>
    </div>

    <div v-if="deleteTarget" class="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4">
      <div class="w-full max-w-sm rounded-2xl border border-white/40 bg-white p-5 shadow-xl">
        <h3 class="text-lg font-bold text-slate-800">メモを削除しますか？</h3>
        <p class="mt-2 text-sm text-slate-600">この操作は取り消せません。</p>
        <div class="mt-5 flex justify-end gap-2">
          <button class="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700" @click="deleteTarget = null">キャンセル</button>
          <button class="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white" @click="deleteMemoData">削除する</button>
        </div>
      </div>
    </div>

    <div v-if="editTarget" class="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4">
      <div class="w-full max-w-md rounded-2xl border border-white/40 bg-white p-5 shadow-xl">
        <h3 class="text-lg font-bold text-slate-800">メモを編集</h3>
        <textarea v-model="editMemoText" maxlength="300" class="mt-3 h-40 w-full rounded-lg border border-slate-300 p-3 text-sm"></textarea>
        <p class="mt-1 text-right text-xs text-slate-500">{{ editMemoText.length }}/300</p>
        <div class="mt-4 flex justify-end gap-2">
          <button class="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700" @click="closeEditDialog">キャンセル</button>
          <button class="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white" @click="saveEditedMemo">保存</button>
        </div>
      </div>
    </div>

    <FloatingButton @click="modalToggle"></FloatingButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: "all",
      modalValid: false,
      dataArgs: [],
      deleteTarget: null,
      editTarget: null,
      editMemoText: "",
    };
  },
  methods: {
    changeTab(activeTab) {
      this.isActive = activeTab;
    },
    modalToggle() {
      this.modalValid = !this.modalValid;
    },
    submitToLocalStorage(videoInfo) {
      this.dataArgs.push(videoInfo);
      localStorage.setItem("videoInfo", JSON.stringify(this.dataArgs));
      this.modalValid = false;
      this.loadMemoData();
    },
    openDeleteDialog(memo) {
      this.deleteTarget = memo;
    },
    deleteMemoData() {
      if (!this.deleteTarget) {
        return;
      }

      this.dataArgs = this.dataArgs.filter(
        (data) => data.submitDateTime !== this.deleteTarget.submitDateTime
      );
      localStorage.setItem("videoInfo", JSON.stringify(this.dataArgs));
      this.deleteTarget = null;
    },
    openEditDialog(memo) {
      this.editTarget = memo;
      this.editMemoText = memo.memo;
    },
    closeEditDialog() {
      this.editTarget = null;
      this.editMemoText = "";
    },
    saveEditedMemo() {
      if (!this.editTarget) {
        return;
      }

      this.dataArgs = this.dataArgs.map((memo) => {
        if (memo.submitDateTime === this.editTarget.submitDateTime) {
          return {
            ...memo,
            memo: this.editMemoText,
          };
        }
        return memo;
      });

      localStorage.setItem("videoInfo", JSON.stringify(this.dataArgs));
      this.closeEditDialog();
    },
    navigate() {
      navigateTo({
        path: "/",
      });
    },
    loadMemoData() {
      const dataArgs = JSON.parse(localStorage.getItem("videoInfo"));
      if (dataArgs !== null) {
        this.dataArgs = dataArgs.map((item) => ({
          ...item,
          videoUrl: item.videoUrl || "https://www.youtube.com/",
          channelUrl: item.channelUrl || "https://www.youtube.com/",
        }));
      }
    },
  },
  mounted() {
    this.loadMemoData();
  },
};
</script>
