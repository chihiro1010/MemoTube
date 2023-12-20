<template>
  <div class="h-screen bg-gray-100">
    <Header @click="navigate"></Header>
    <Tab
      :isActive="isActive"
      @onChange="changeTab"
      @onSubmit="submitToLocalStorage"
    ></Tab>
    <Contents :isActive="isActive" :data-args="dataArgs"></Contents>
    <div v-if="modalValid">
      <div class="fixed inset-0 bg-rose-500 opacity-20"></div>
      <Modal
        class="fixed inset-x-0 inset-y-[30%]"
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

      var videoInfoString = JSON.stringify(this.dataArgs);

      localStorage.setItem("videoInfo", videoInfoString);

      this.modalValid = false;
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

    // var videoInfoString = JSON.stringify(tempData);
    // localStorage.setItem("videoInfo", videoInfoString);

    let dataArgs = JSON.parse(localStorage.getItem("videoInfo"));
    if (dataArgs !== null) this.dataArgs = dataArgs;
  },
};
</script>
