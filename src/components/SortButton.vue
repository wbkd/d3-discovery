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
    padding: .5em .8em .5em 0
    margin-right: .3em
    cursor: pointer
    user-select: none
    font-weight: bold

    &:after
      position: absolute
      display: block
      right: 0
      font-size: 9px
      top: 50%

  .sort__button--active
    &:after
      transform: translateY(-50%) rotate(180deg)
      content: "\25BC"
  .asc
    &:after
      transform: translateY(-35%) rotate(0deg)

  @media screen and (min-width: 786px)
    .sort__button
      margin-right: .5em

      &:after
        font-size: 10px
</style>
