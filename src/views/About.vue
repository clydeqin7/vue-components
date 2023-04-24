<template>
  <div>
    <h2>InputNumber组件</h2>
    组件中的值 -> <InputNumber v-model="count"></InputNumber>
    <div>组件外的绑定值(v-model): {{ count }}</div>
  </div>
</template>

<script>
import InputNumber from "@/components/InputNumber.vue";
export default {
  name: "InputNumberWrapper",
  components: { InputNumber },
  props: {},
  data() {
    return {
      count: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
