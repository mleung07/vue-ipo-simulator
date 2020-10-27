import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Disclaimer from "@/components/Disclaimer.vue";

describe("Disclaimer.vue", () => {
  let component;

  beforeEach(() => {
    component = shallowMount(Disclaimer);
  });

  it("renders with correct title", () => {
    expect(component.text()).to.include(
      "Disclaimer: The calculation is for reference only."
    );
  });
});
