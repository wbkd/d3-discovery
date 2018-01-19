<template>
  <div class="dropdown">
    <div class="dropdown__title">{{dropdownTitle}}</div>
    <div class="dropdown__select">
      <select @change="this.onChange" v-model="selected">
        <option value="">{{this.placeholder}}</option>
        <option v-for="option in this.options" :key="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dropdownTitle: String,
      value: String,
      placeholder: String,
      options: Array,
      onChange: Function,
    },
    data() {
      return {
        selected: this.value,
      };
    },
  };
</script>

<style lang="stylus" scoped>
  .dropdown
    text-align: left

  .dropdown__title
    margin-bottom: .5em
    color: #CED6DC
    font-size: 13px

  .dropdown__select
    position: relative
    display: inline-block
    width: 100%
    background: #49426D
    border: 1px solid rgba(255,255,255,0.20)
    border-radius: 2px

    select
      padding: 10px 8px
      font-size: 11px
      color: #CED6DC
      width: 100%
      border: none
      box-shadow: none
      background: transparent
      background-image: none
      appearance: none
      &:focus
        outline: none

    option
      color: #737373

    select:-moz-focusring
      color: transparent
      text-shadow: 0 0 0 #CED6DC

 .dropdown__select:after
    content: "▼"
    position: absolute
    top: 50%
    transform: translateY(-50%)
    right: 5px
    bottom: 0
    font-size: 10px
    padding: 5px
    color: #CED6DC
    pointer-events: none

  @media screen and (min-width: 768px)
    .dropdown__title
      font-size: 16px

    .dropdown__select
      select
        font-size: 14px

    .dropdown__select:after
      font-size: 12px
</style>
