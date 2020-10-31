import { shallowMount, mount } from "@vue/test-utils";
import Disclaimer from "@/components/Disclaimer.vue";

describe("Disclaimer.vue", () => {
  it("renders footer", () => {
    const wrapper = shallowMount(Disclaimer);
    expect(wrapper.text()).toMatch(
      "Disclaimer: The calculation is for reference only."
    );
  });

  it("matches snapshot", () => {
    const wrapper = mount(Disclaimer);
    expect(wrapper.element).toMatchSnapshot();
  });
});
