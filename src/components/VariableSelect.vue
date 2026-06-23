<template>
  <div class="variable-select">
    <label>Show on map</label>
    <multiselect
      :value="selectedOption"
      :options="options"
      track-by="value"
      label="label"
      @input="changeVariable"
      :multiple="false"
      :searchable="false"
      :showLabels="false"
      :allow-empty="false"
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mapState } from "vuex";

// Friendly labels for each mapped measure. Mirrors the spark-chart titles so
// this select is a keyboard-accessible alternative to clicking a spark chart.
const VARIABLE_LABELS = {
  provider_rate: "Rate per 10,000 Population",
  total: "Total",
  percent_female: "Percent Female",
  percent_age: "Percent 65 or Older",
  percent_underrepresented: "Percent Underrepresented Minority",
  percent_race_na: "Percent Missing Race"
};

export default {
  name: "VariableSelect",
  components: { Multiselect },
  computed: {
    ...mapState(["variables", "variable"]),
    options() {
      return this.variables.map(v => ({
        value: v,
        label: VARIABLE_LABELS[v] || v
      }));
    },
    selectedOption() {
      return {
        value: this.variable,
        label: VARIABLE_LABELS[this.variable] || this.variable
      };
    }
  },
  methods: {
    changeVariable(option) {
      this.$store.commit("changeVariable", option.value);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.variable-select {
  width: 240px;
}
.variable-select label {
  display: block;
  white-space: nowrap;
}
/* Truncate the (sometimes long) selected measure instead of widening the box. */
.variable-select >>> .multiselect__single {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
