<template>
  <div v-if="isModalVisible" class="modal" >
    <div class="modal__overlay">
      <div class="modal__container">
        <div class="button close__button" @click="this.onClick"></div>

        <div class="modal__header">
         🚀 Extend the exploration!
        </div>
        <div class="modal__body">
          Something missing?
          Make a pull request in our awesome-D3 list on GitHub and we will add your project here.

          <a class="modal__link" href="https://github.com/wbkd/awesome-d3/issues/new">
            <button class="modal__button">Open a pull request</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isModalVisible: Boolean,
      onClick: Function,
    },
  };
</script>

<style scoped lang='stylus'>
  .modal__overlay
    position: fixed
    z-index: 9998
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: rgba(0, 0, 0, .35)
    transition: opacity .3s ease

  .modal__container
    width: 100%
    max-width: 500px
    min-height: 100px
    transform: translate3d(0,0,0);
    padding: 2em 1.5em
    margin: 20% auto
    border-radius: 2px
    background-color: #fff

  .close__button
    position: absolute
    right: 0
    top: 0
    width: 30px
    height: 30px
    border-radius: 50%
    background-color: #fff
    transform: translate(50%, -50%)
    cursor: pointer
    box-shadow: 2px 2px 4px 2px rgba(0,0,0,.1)

    &:after
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-45%, -55%)
      content: 'x'
      font-size: 20px
      font-weight: 700

    &:hover
      color: darken(#737373, 50%)

  .modal__header
    font-weight: 700
    font-size: 26px
    margin-bottom: .3em

  .modal__body
    color: #555
    font-size: 18px
    font-family: 'Lato', sans-serif
    line-height: 1.5

  .modal__link
    text-decoration: none

    &:hover
      text-decoration: none

  .modal__button
    padding: .8em 1em
    background: rgb(47, 44, 70)
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,.2)
    font-size: 15px
    line-height: 1
    font-weight: 700
    color: #B2B7C5
    border: none
    border-radius: 50px
    transition: all .3s ease
    cursor: pointer
    font-family: 'Source Code Pro', Helvetica, Arial, sans-serif
    user-select: none
    margin: 1.5em auto 0 auto
    width: 220px
    display: block
    transition: background .4s, boxShadow .4s
    text-decoration: none
    outline: none

    &:hover
      background: #5e5984
      box-shadow: 0px 0px 2px 1px rgba(0,0,0,.12)

</style>
