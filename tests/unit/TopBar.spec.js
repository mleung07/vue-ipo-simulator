import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import TopBar from "@/components/TopBar.vue";

describe("TopBar.vue", () => {
  let component;

  beforeEach(() => {
    component = shallowMount(TopBar);
  });

  it("renders with correct title", () => {
    expect(component.text()).to.include("IPO Simulator");
  });
});
