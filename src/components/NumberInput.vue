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
      displayValue: ""
    };
  },
  methods: {
    inputHandler(ev) {
      const value = ev.target.value;
      const number = parseFloat(value.replace(/[^\d.]/g, ""));
      this.$emit("input", number);
      if (!isNaN(number)) {
        this.displayValue = new Intl.NumberFormat("en-HK").format(number);
      }
      // this.$forceUpdate();
    }
  }
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
