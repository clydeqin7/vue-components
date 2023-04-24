<template>
  <input type="text" v-model="displayValue" @input="handleInput" />
</template>

<script>
export default {
  name: "InputNumber",
  props: {
    value: {
      type: Number,
      required: true,
    },
    debounceTime: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      displayValue: "",
      timeoutId: null,
    };
  },
  mounted() {
    this.formatDisplayValue();
  },
  watch: {
    value() {
      this.formatDisplayValue();
    },
  },
  methods: {
    handleInput(event) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        const inputValue = event.target.value.replace(/,/g, "");
        let numberValue = parseFloat(inputValue);
        if (isNaN(numberValue)) {
          numberValue = "";
          this.displayValue = "";
        }
        this.$emit("input", numberValue);
        this.formatDisplayValue();
      }, this.debounceTime);
    },
    formatDisplayValue() {
      const parts = this.value.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.displayValue = parts.join(".");
    },
  },
};
</script>
