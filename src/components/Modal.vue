<template>
  <div v-if="isModalVisible" class="modal" @click="this.onClick">
    <div class="modal__overlay">
      <div class="modal__container">
        <div class="button close__button"></div>

        <div class="modal__header">
         🚀 Extend the exploration!
        </div>
        <div class="modal__body">
          Something missing?
          <a class="modal__link" href="https://github.com/wbkd/awesome-d3/issues/new">
            Make a pull request
          </a>
          in our Awesome D3 list on github and we will add your project here.
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
    text-align: left
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
      font-weight: bold

    &:hover
      color: darken(#737373, 50%)

  .modal__header
    font-weight: bold
    font-size: 22px
    margin-bottom: .3em

  .modal__body
    color: #555
    font-size: 18px
    font-family: 'Lato', sans-serif

  .modal__link
    text-decoration: none
    &:hover
      text-decoration: underline
</style>


