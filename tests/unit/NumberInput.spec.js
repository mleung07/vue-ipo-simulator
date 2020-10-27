import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import NumberInput from "@/components/NumberInput.vue";

describe("NumberInput.vue", () => {
  let component;

  beforeEach(() => {
    component = shallowMount(NumberInput);
  });

  it("renders with Input element", () => {
    expect(component.find("Input").exists()).to.be.true;
  });
});
