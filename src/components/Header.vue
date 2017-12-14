<template>
  <div class="header">
    <div class="header__content">
      <div class="header__logo">
          <img class="logo__image" src="../assets/tele.png" />
          <div class="logo__wrapper">
            <div class="logo__headline">D3 Discovery</div>
            <div class="logo__subheadline">Finding D3 plugins with ease.</div>
          </div>
        </div>
      <div class="header__buttons">
        <button class="button__submit-new">Submit</button>
      </div>
    </div>
     <!-- <div v-show="isVisible" class="button button__menu" v-bind:class="{ 'button__menu--active': this.menuOpen }" @click="this.onMenuButtonClick">
      <div class="button__menu__bar bar1"></div>
      <div class="button__menu__bar bar2"></div>
      <div class="button__menu__bar bar3"></div>
    </div>  -->
  </div>
</template>
<script>
  export default {
    props: {
      onMenuButtonClick: Function,
      menuOpen: Boolean,
    },
    data() {
      return {
        isVisible: window.innerWidth <= 768,
      };
    },
  };
</script>

<style scoped lang='stylus'>
  .header
    width: 100%
    padding: 1em 0
    margin: 0 auto

    background-color: rgba(225, 193, 225, .08)

  .header__content
    max-width: 980px
    margin: 0 auto
    display: flex
    flex-flow: row nowrap

  .header__logo
    width: 50%
    display: flex
    flex-flow: row nowrap
    align-items: flex-end
    text-align: left

  .logo__image
    width: 80px
    align-self: baseline

  .logo__wrapper
    flex: 0 0 60%

  .logo__headline
    font-size: 26px
    color: #fff
    text-shadow: 0 0 4px rgba(255,255,255,0.50)

  .logo__subheadline
    color: #fff

  .header__buttons
    width: 50%
    display: flex
    justify-content: flex-end
    align-items: center

  .button__submit-new
    padding: 0.4em 1em
    background: rgba(225,193,225,0.08)
    font-size: 14px
    color: #B2B7C5
    border: 1px solid rgba(255,255,255,0.20)
    border-radius: 100px
</style>


