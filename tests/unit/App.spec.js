import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import TopBar from "@/components/TopBar.vue";
import Calculator from "@/components/Calculator.vue";
import Disclaimer from "@/components/Disclaimer.vue";

describe("App.vue", () => {
  let component;

  beforeEach(() => {
    component = shallowMount(App);
  });

  it("renders TopBar", () => {
    expect(component.findComponent(TopBar).exists()).to.be.true;
  });

  it("renders Calculator", () => {
    expect(component.findComponent(Calculator).exists()).to.be.true;
  });

  it("renders Disclaimer", () => {
    expect(component.findComponent(Disclaimer).exists()).to.be.true;
  });
});
