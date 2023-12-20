<template>
  <div class="w-96 h-24 my-2">
    <div class="m-2">
      <img
        :src="data.channelIconUrl"
        class="m-1 h-16 w-16 rounded-full inline-block"
      />
      <div class="inline-block w-64 ml-3 align-middle">
        <div>
          <p class="inline-block text-lg mt-2 align-middle">
            {{ data.channelTitle.slice(0, 15) }}
          </p>
        </div>
      </div>
    </div>
    <div class="relative bottom-8 right-4 text-right">
      <img
        src="../public/chevron-down-icon.png"
        class="inline-block relative bottom-[1.2rem] right-[0.5rem]"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  mounted() {},
};
</script>
