import { shallowMount, mount } from "@vue/test-utils";
import TopBar from "@/components/TopBar.vue";

describe("TopBar.vue", () => {
  it("renders title", () => {
    const wrapper = shallowMount(TopBar);
    expect(wrapper.text()).toMatch("IPO Simulator");
  });

  it("matches snapshot", () => {
    const wrapper = mount(TopBar);
    expect(wrapper.element).toMatchSnapshot();
  });
});
