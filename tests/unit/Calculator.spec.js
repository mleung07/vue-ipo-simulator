import { mount, shallowMount } from "@vue/test-utils";
import Calculator from "@/components/Calculator.vue";

describe("Calculator.vue", () => {
  it("matches snapshot", () => {
    const wrapper = mount(Calculator);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("calculate correctly for computed properties - Cash", async () => {
    const wrapper = shallowMount(Calculator);
    await wrapper.setData({
      price: 100,
      applied: 100,
      use_margin: false,
      interest_rate: "",
      percentage: "",
      duration: "",
      handling_fee: 50,
      selling_commission: 50,
      allocated: 100,
      selling_price: 120,
    });
    expect(wrapper.vm.net_cost).toBe(10000);
    expect(wrapper.vm.buying_cost).toBe(10000);
    expect(wrapper.vm.buying_fee).toBe(157);
    expect(wrapper.vm.revenue).toBe(12000);
    expect(wrapper.vm.selling_fee).toBe(203.24);
    expect(wrapper.vm.profit).toBe(1639.76);
    expect(wrapper.vm.profit_percentage).toBe("16.14%");
  });

  it("calculate correctly for computed properties - Margin", async () => {
    const wrapper = shallowMount(Calculator);
    await wrapper.setData({
      price: 100,
      applied: 50000,
      use_margin: true,
      interest_rate: 3,
      percentage: 10,
      duration: 9,
      handling_fee: 50,
      selling_commission: 50,
      allocated: 300,
      selling_price: 140,
    });
    expect(wrapper.vm.net_cost).toBe(5000000);
    expect(wrapper.vm.buying_cost).toBe(30000);
    expect(wrapper.vm.marginable_amount).toBe(5053850);
    expect(wrapper.vm.cash_required).toBe(500000);
    expect(wrapper.vm.buying_fee).toBe(373);
    expect(wrapper.vm.revenue).toBe(42000);
    expect(wrapper.vm.selling_fee).toBe(586.34);
    expect(wrapper.vm.profit).toBe(7676.04205479452);
    expect(wrapper.vm.profit_percentage).toBe("25.27%");
  });

  it("format number correctly", () => {
    const wrapper = shallowMount(Calculator);
    expect(wrapper.vm.formatNumber(0)).toBe("$0.00");
    expect(wrapper.vm.formatNumber(1000)).toBe("$1,000.00");
  });
});
