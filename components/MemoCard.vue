<template>
  <div
    v-if="!accordionOpen"
    class="w-96 h-24 my-2 bg-white rounded-xl shadow-md"
  >
    <img
      :src="data.thumbnailUrl"
      class="m-1 mt-3 h-[63px] w-[112px] inline-block"
    />
    <div class="inline-block w-64 align-middle">
      <p class="inline-block mt-2 ml-1">
        {{ data.title.slice(0, 20) }}
      </p>
      <p class="inline-block ml-1">
        {{ data.title.slice(21, 41) }}
      </p>
      <div>
        <img
          :src="data.channelIconUrl"
          class="inline-block h-5 mt-2 mr-1 rounded-md"
        />
        <p class="inline-block mt-2 align-middle">
          {{ data.channelTitle.slice(0, 18) }}
        </p>
      </div>
    </div>
    <div class="text-right">
      <img
        src="../public/chevron-down-icon.png"
        class="inline-block relative bottom-[1.2rem] right-[0.5rem]"
        @click="accordionToggle"
      />
    </div>
  </div>
  <div
    v-else="accordionOpen"
    class="w-96 h-auto my-2 bg-white rounded-xl shadow-md"
  >
    <img
      :src="data.thumbnailUrl"
      class="m-1 mt-3 h-[63px] w-[112px] inline-block"
    />
    <div class="inline-block w-64 align-middle">
      <p class="inline-block mt-2 ml-1">
        {{ data.title.slice(0, 20) }}
      </p>
      <p class="inline-block ml-1">
        {{ data.title.slice(21, 41) }}
      </p>
      <div>
        <img
          :src="data.channelIconUrl"
          class="inline-block h-5 mt-2 mr-1 rounded-md"
        />
        <p class="inline-block mt-2 align-middle">
          {{ data.channelTitle.slice(0, 18) }}
        </p>
      </div>
    </div>

    <p class="ml-4 mt-3">{{ data.memo }}</p>
    <div class="relative h-10">
      <!-- <img
        src="../public/delete-icon.png"
        class="absolute left-2 bottom-[0.3rem] right-[0.5rem] text-left"
        @click="accordionToggle"
      />
      <img
        src="../public/edit-icon.png"
        class="absolute left-[50%] bottom-[0.3rem] text-left translate-x-[-50%]"
        @click="accordionToggle"
      /> -->
      <img
        src="../public/chevron-up-icon.png"
        class="absolute bottom-[0.3rem] right-[0.5rem]"
        @click="accordionToggle"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      accordionOpen: false,
    };
  },
  methods: {
    accordionToggle() {
      this.accordionOpen = !this.accordionOpen;
      console.log(this.accordionOpen);
    },
  },
  mounted() {},
};
</script>
