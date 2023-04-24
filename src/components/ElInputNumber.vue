<template>
  <el-input
    v-bind="$attrs"
    v-model.lazy="displayValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :maxlength="maxlength"
    @input.native="handleInput"
  ></el-input>
</template>

<script>
export default {
  name: "ElInputMoney",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入金额",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: 16,
    },
    debounceTime: {
      type: Number,
      default: 500,
    },
    fractionalDigits: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      displayValue: "",
      inputTimer: null,
    };
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
        } else {
          numberValue = this.formatNumber(numberValue);
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
    formatNumber(rawNum) {
      let num = "" + rawNum;
      if (/\./.test(num)) {
        // 判断是否存在小数点
        num = num.replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1"); // 保留小数点后两位
      } else {
        num = parseInt(num); // 转为整数
      }
      return num;
    },
  },
  mounted() {
    this.formatDisplayValue();
  },
  watch: {
    value() {
      this.formatDisplayValue();
    },
  },
};
</script>
