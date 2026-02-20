<template>
  <div
    class="min-h-screen bg-[radial-gradient(circle_at_top,_#ffe4ec_0%,_#f8fafc_45%,_#f1f5f9_100%)]"
  >
    <Header @click="navigate"></Header>
    <Tab
      :isActive="isActive"
      @onChange="changeTab"
      @onSubmit="submitToLocalStorage"
    ></Tab>
    <Contents
      :isActive="isActive"
      :data-args="dataArgs"
      @onDelete="deleteMemoData"
    ></Contents>
    <div v-if="modalValid">
      <div class="fixed inset-0 z-20 bg-slate-900/30 backdrop-blur-[1px]"></div>
      <Modal
        class="fixed inset-0 z-30 m-auto flex items-center justify-center"
        @onClose="modalToggle"
        @onSubmit="submitToLocalStorage"
      ></Modal>
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
      inputURL: "",
      dataArgs: [],
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

      const videoInfoString = JSON.stringify(this.dataArgs);

      localStorage.setItem("videoInfo", videoInfoString);

      this.modalValid = false;

      const dataArgs = JSON.parse(localStorage.getItem("videoInfo"));
      this.dataArgs = dataArgs;
    },
    deleteMemoData(primary) {
      const newDataArgs = this.dataArgs.filter(
        (data) => data.submitDateTime !== primary
      );

      this.dataArgs = newDataArgs;

      const videoInfoString = JSON.stringify(this.dataArgs);
      localStorage.setItem("videoInfo", videoInfoString);
    },
    navigate() {
      navigateTo({
        path: "/",
      });
    },
  },
  mounted() {
    const dataArgs = JSON.parse(localStorage.getItem("videoInfo"));
    if (dataArgs !== null) this.dataArgs = dataArgs;
  },
};
</script>
