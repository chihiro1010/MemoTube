<template>
  <div class="h-screen bg-gray-100">
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
      <div class="fixed inset-0 bg-rose-500 opacity-20 z-20"></div>
      <Modal
        class="fixed flex inset-0 m-auto items-center justify-center z-30"
        @onClose="modalToggle"
        @onSubmit="submitToLocalStorage"
      ></Modal>
    </div>
    <FloatingButton @click="modalToggle" class="z-10"></FloatingButton>
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
    // 全削除用
    // let tempData = [];

    // const videoInfoString = JSON.stringify(tempData);
    // localStorage.setItem("videoInfo", videoInfoString);

    const dataArgs = JSON.parse(localStorage.getItem("videoInfo"));
    if (dataArgs !== null) this.dataArgs = dataArgs;
  },
};
</script>
