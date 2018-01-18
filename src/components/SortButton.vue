<template>
  <div
    @click="onClick"
    class="button sort__button"
    v-bind:class="{ 'sort__button--active': this.isActive, asc: this.isActive && this.asc }"
  >
    {{this.label}}
  </div>
</template>

<script>

  export default {
    props: {
      handler: Function,
      label: String,
      sortKey: String,
      isActive: Boolean,
    },
    data() {
      return {
        asc: false,
      };
    },
    methods: {
      onClick() {
        this.handler(this.sortKey);
        this.asc = !this.asc;
      },
    },
  };
</script>
<style scoped lang="stylus">
  .sort__button
    position: relative
    padding: .5em 1.2em .5em 0
    margin-right: .5em
    cursor: pointer
    user-select: none
    font-weight: bold

    &:after
      position: absolute
      display: block
      right: 0
      width: 20px
      height: 20px
      font-size: 10px
      top: 50%

  .sort__button--active
    font-weight: bold
    &:after
      transform: translateY(-70%) rotate(180deg)
      content: "\25BC"
  .asc
    &:after
      transform: translateY(-20%) rotate(0deg)
</style>
