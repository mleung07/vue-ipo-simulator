import { mount, shallowMount } from "@vue/test-utils";
import NumberInput from "@/components/NumberInput.vue";

describe("NumberInput.vue", () => {
  it("matches snapshot", () => {
    const wrapper = mount(NumberInput);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("display correctly after input 1", () => {
    const wrapper = shallowMount(NumberInput);
    const input = wrapper.find("input");
    input.element.value = 1;
    input.trigger("input");
    expect(wrapper.vm.displayValue).toBe("1");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("display correctly after input 1m", () => {
    const wrapper = shallowMount(NumberInput);
    const input = wrapper.find("input");
    input.element.value = 1000000;
    input.trigger("input");
    expect(wrapper.vm.displayValue).toBe("1,000,000");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("display correctly after input NaN", () => {
    const wrapper = shallowMount(NumberInput);
    const input = wrapper.find("input");
    input.element.value = "a";
    input.trigger("input");
    expect(wrapper.vm.displayValue).toBe("");
    expect(wrapper.emitted().input[0]).toBeTruthy();
  });
});
