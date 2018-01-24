<template>
  <div class="main_header">
    <div class="main_header__content container">
      <div class="main_header__logo">
          <img class="logo__image" src="../assets/tele.png" />
          <div class="logo__wrapper">
            <div class="logo__headline">D3 Discovery</div>
            <div class="logo__subheadline">Finding D3 plugins with ease.</div>
          </div>
        </div>
      <div class="main_header__buttons">
        <button class="button__submit-new" @click="this.onSubmit">+ Submit</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      onSubmit: Function,
    },
    data() {
      return {
        isVisible: window.innerWidth <= 768,
      };
    },
  };
</script>

<style scoped lang='stylus'>
  .main_header
    width: 100%
    padding: 0.4em 0 1em 0
    margin: 0 auto

    background-color: rgba(225, 193, 225, .08)

  .main_header__content
    display: flex
    flex-flow: row wrap
    justify-content: space-between

  .main_header__logo
    display: flex
    flex-flow: row nowrap
    align-items: flex-end
    text-align: left

  .logo__image
    width: 50px
    align-self: baseline
    margin-right: 5px

  .logo__headline
    font-size: 18px
    font-weight: 700
    color: #fff
    text-shadow: 0 0 4px rgba(255,255,255,0.50)

  .logo__subheadline
    color: #e6e6e6
    font-size: 12px

  .main_header__buttons
    display: none
    justify-content: flex-end
    align-items: center
    margin-top: 13px

  .button__submit-new
    padding: 0.4em 1em
    background: rgba(225,193,225,0.16)
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,.2)
    font-size: 15px
    line-height: 1
    font-weight: 500
    color: #B2B7C5
    border: none
    border-radius: 50px
    transition: all .3s ease
    cursor: pointer
    font-family: 'Source Code Pro', Helvetica, Arial, sans-serif
    user-select: none

    &:hover
      box-shadow: 0px 0px 4px 1px rgba(255,255,255,0.2)

    &:focus
      outline: none

    &:active
      background: #38345D

  @media screen and (min-width: 768px)
    .logo__headline
      font-size: 26px

    .logo__subheadline
      font-size: 15px

    .logo__image
      width: 70px

    .main_header__buttons
      display: flex
</style>


