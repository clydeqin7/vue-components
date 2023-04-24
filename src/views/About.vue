<template>
  <div>
    <h2>InputNumber组件：</h2>
    组件中的值 -> <InputNumber v-model="count"></InputNumber>
    <div>组件外的绑定值(v-model): {{ count }}</div>
    <section>
      <h2>ElInputMoney组件：</h2>
      组件中的值 ->
      <div style="display: inline-block">
        <ElInputMoney size="mini" v-model="elCount"></ElInputMoney>
      </div>
      <div>组件外的绑定值(v-model): {{ elCount }}</div>
    </section>
  </div>
</template>

<script>
import InputNumber from "@/components/InputNumber.vue";
import ElInputMoney from "@/components/ElInputMoney.vue";
export default {
  name: "InputNumberWrapper",
  components: { InputNumber, ElInputMoney },
  props: {},
  data() {
    return {
      count: 0,
      elCount: "12314.12321",
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
