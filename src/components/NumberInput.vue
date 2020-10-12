<template>
  <!-- TODO: make the input field invisible & display formatted value at bottom -->
  <input type="text" :value="displayValue" @input="inputHandler" required />
</template>

<script>
export default {
  name: "NumberInput",
  props: ["value"],
  data: function() {
    return {
      displayValue: "",
    };
  },
  // computed: {
  //   displayValue: {
  //     get: function() {
  //       if (!this.value) {
  //         return "";
  //       }

  //       return new Intl.NumberFormat("en-HK").format(this.value);
  //     },
  //     set: function(modifiedValue) {
  //       const newValue = parseFloat(modifiedValue.replace(/[^\d.]/g, ""));

  //       if (isNaN(newValue)) {
  //         return;
  //       }

  //       this.$emit("input", newValue);
  //     },
  //   },
  // },
  // watch: {
  //   displayValue: function(newValue, oldValue) {
  //     console.log(oldValue, newValue);
  //     const rule = /[^0-9.,]/;
  //     if (rule.test(newValue)) {
  //       console.log("setting to prev value");
  //       this.displayValue = oldValue;
  //       this.$emit("input", oldValue);
  //     }
  //   },
  // },
  methods: {
    inputHandler(ev) {
      const value = ev.target.value;
      const number = parseFloat(value.replace(/[^\d.]/g, ""));
      this.$emit("input", number);
      if (!isNaN(number)) {
        this.displayValue = new Intl.NumberFormat("en-HK").format(number);
      }
      // this.$forceUpdate();
    },
    convertToCurrency(number) {
      return number;
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  font-size: 16px;
  padding: 8px 0px;
  width: 100%;
  border: none;
  border-bottom: 1px solid #aaa;
}
input:focus {
  outline: none;
}
</style>
