<template>
  <div id="calculator">
    <div class="input-box">
      <NumberInput v-model="applied" />
      <label>Shares Appiled</label>
    </div>
    <div class="input-box">
      <NumberInput v-model="price" />
      <label>Offering Price</label>
    </div>
    <div class="input-box">
      <NumberInput v-model="allocated" />
      <label>Shares Allocated</label>
    </div>
    <div class="input-box">
      <NumberInput v-model="selling_price" />
      <label>Selling Price</label>
    </div>
    <div class="input-box">
      <NumberInput v-model="handling_fee" />
      <label>Handling Fee</label>
    </div>
    <div class="input-box">
      <NumberInput v-model="selling_commission" />
      <label>Selling Commission</label>
    </div>
    <div class="input-box margin">
      <div class="selector">
        <div class="label">Margin</div>
        <div class="switch">
          <input type="checkbox" class="switch-input" v-model="use_margin" />
          <label class="switch-label"></label>
        </div>
      </div>
    </div>
    <div class="show-margin" :class="{ active: use_margin }">
      <div class="input-box">
        <NumberInput v-model="interest_rate" />
        <label>Interest Rate (%)</label>
      </div>
      <div class="input-box">
        <NumberInput v-model="percentage" />
        <label>Initial Deposit (%)</label>
      </div>
      <div class="input-box">
        <NumberInput v-model="duration" />
        <label>Duration (Day)</label>
      </div>
      <div class="input-box result">
        <span class="tag">Cash Required:</span>
        <span>{{ formatNumber(cash_required) }}</span>
      </div>
    </div>
    <div class="divider" />
    <div class="input-box result">
      <span class="tag">Cost:</span>
      <span>{{ formatNumber(buying_cost) }}</span>
    </div>
    <div class="input-box result">
      <span class="tag">&bull; Fee & Commission:</span>
      <span>{{ formatNumber(buying_fee) }}</span>
    </div>

    <div class="input-box result" v-show="use_margin">
      <span class="tag">&bull; Margin Interest:</span>
      <span>{{ formatNumber(margin_interest) }}</span>
    </div>
    <div class="input-box result">
      <span class="tag">Revenue:</span>
      <span>{{ formatNumber(revenue) }}</span>
    </div>
    <div class="input-box result">
      <span class="tag">&bull; Fee & Commission:</span>
      <span>{{ formatNumber(selling_fee) }}</span>
    </div>
    <div class="input-box result">
      <span class="tag">Profit:</span>
      <span>{{ formatNumber(profit) }}</span>
    </div>
    <div class="input-box result">
      <span class="tag">Percentage:</span>
      <span>{{ profit_percentage }}</span>
    </div>
  </div>
</template>

<script>
import NumberInput from "@/components/NumberInput";

const BROKERAGE = 0.01;
const TRANSACTION_LEVY = 0.00027;
const TRADING_FEE = 0.0005;
const STAMP_DUTY = 0.01;
const SETTLEMENT_FEE = 0.002;

export default {
  name: "Calculator",
  components: {
    NumberInput
  },
  computed: {
    net_cost: function() {
      return this.price * this.applied;
    },
    buying_cost: function() {
      return this.price * this.allocated;
    },
    marginable_amount: function() {
      return this.net_cost * (1 + BROKERAGE + TRANSACTION_LEVY + TRADING_FEE);
    },
    margin_interest: function() {
      return this.use_margin
        ? this.marginable_amount *
            (1 - this.percentage / 100) *
            (this.interest_rate / 100 / 365) *
            this.duration || 0
        : 0;
    },
    cash_required: function() {
      return (this.net_cost * this.percentage) / 100;
    },
    buying_fee: function() {
      return this.parseIntFallback(
        this.buying_cost * (BROKERAGE + TRANSACTION_LEVY + TRADING_FEE) +
          this.parseIntFallback(this.handling_fee)
      );
    },
    revenue: function() {
      return this.parseIntFallback(this.allocated * this.selling_price);
    },
    selling_fee: function() {
      return (
        this.revenue *
          (TRANSACTION_LEVY + TRADING_FEE + STAMP_DUTY + SETTLEMENT_FEE) +
          this.parseIntFallback(this.selling_commission) || 0
      );
    },
    profit: function() {
      return (
        this.revenue -
        this.buying_cost -
        this.buying_fee -
        this.selling_fee -
        this.margin_interest
      );
    },
    profit_percentage: function() {
      return (
        (
          (this.profit / (this.buying_cost + this.buying_fee)) * 100 || 0
        ).toFixed(2) + "%"
      );
    }
  },
  data: function() {
    return {
      price: "",
      applied: "",
      use_margin: false,
      interest_rate: "",
      percentage: "",
      duration: "",
      handling_fee: "",
      selling_commission: "",
      allocated: "",
      selling_price: ""
    };
  },
  methods: {
    formatNumber(amount) {
      return (
        new Intl.NumberFormat("en", {
          style: "currency",
          currency: "USD"
        }).format(amount) || 0
      );
    },
    parseIntFallback(number) {
      return isNaN(number) ? 0 : parseInt(number);
    }
  }
};
</script>

<style lang="scss" scoped>
#calculator {
  font-size: 16px;
}
.input-box {
  position: relative;
  padding: 16px 16px 8px;

  > label {
    position: absolute;
    top: 24px;
    left: 18px;
    pointer-events: none;
    color: #777;
    transition: 0.2s ease all;
  }

  > input:focus + label,
  > input:valid + label {
    top: 5px;
    font-size: 12px;
    color: #000;
  }

  &.margin {
    padding-top: 8px;
  }

  &.result {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

.show-margin {
  max-height: 0;
  transition: max-height 0.3s ease-out;
  overflow: hidden;

  &.active {
    height: auto;
    max-height: 400px;
    transition: max-height 0.3s ease-in;
  }
}

$bg-disabled-color: rgba(0, 0, 0, 0.26);
$bg-enabled-color: rgba(50, 50, 50, 0.5);
$lever-disabled-color: #fff;
$lever-enabled-color: #000;

.selector {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0px;
}
.switch {
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 0 0 10px;

  > input {
    position: absolute;
    top: 0;
    left: 0;
    width: 36px;
    height: 20px;
    opacity: 0;
    z-index: 3;
  }

  > label {
    display: block;
    padding: 0 0 0 44px;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      top: 5px;
      left: 0;
      width: 36px;
      height: 14px;
      background-color: $bg-disabled-color;
      border-radius: 14px;
      z-index: 1;
      transition: background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:after {
      content: "";
      position: absolute;
      top: 2px;
      left: 0;
      width: 20px;
      height: 20px;
      background-color: $lever-disabled-color;
      border-radius: 14px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      z-index: 2;
      transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: left, background-color;
    }
  }

  > input:checked + label {
    &:before {
      background-color: $bg-enabled-color;
    }

    &:after {
      left: 16px;
      background-color: $lever-enabled-color;
    }
  }
}
.divider {
  border-bottom: 1px solid #888;
  margin-top: 8px;
}
</style>
