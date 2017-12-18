<template>
  <div class="dropdown">
    <div class="dropdown__title">{{dropdownTitle}}</div>
    <v-select
      :value.sync="this.value"
      :options="this.options"
      :searchable="false"
      :placeholder="this.placeholder"
      :on-change="this.onChange"
      class="dropdown__select"
    />
  </div>
</template>

<script>
  import vSelect from 'vue-select';

  export default {
    components: {
      vSelect,
    },
    props: {
      dropdownTitle: String,
      value: String,
      placeholder: String,
      options: Array,
      onChange: Function,
    },
  };
</script>

<style lang="stylus" scoped>
  .dropdown
    text-align: left

  .dropdown__title
    margin-bottom: .5em

  .dropdown__select
    background: #49426D
    border: 1px solid rgba(255,255,255,0.20)
    border-radius: 2px

  .dropdown__title
    color: #CED6DC

  // from vue docu ->
  // If you want a selector in scoped styles to be "deep", i.e. affecting child components, you can use the >>> combinator:
  .dropdown >>> .selected-tag
    color: #CED6DC
</style>
