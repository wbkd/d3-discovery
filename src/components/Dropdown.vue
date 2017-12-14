<template>
  <v-select
    v-model="selected"
    :options="options"
    :searchable="false"
    placeholder="Latest Commits"
  ></v-select>
</template>

<script>
  import vSelect from 'vue-select';

  export default {
    components: {
      vSelect,
    },
    data() {
      return {
        selected: null,
        options: ['foo', 'bar', 'baz'],
      };
    },
  };
</script>

<style lang="stylus" scoped>
  .dropdown
    background: #49426D
    border: 1px solid rgba(255,255,255,0.20)
    border-radius: 2px
</style>
