import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("matches snapshot", () => {
    const wrapper = mount(App);
    expect(wrapper.element).toMatchSnapshot();
  });
});
