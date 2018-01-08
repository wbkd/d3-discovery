<template>
  <div v-if="isModalVisible" class="modal" @click="this.onClick">
    <div class="modal__overlay">
      <div class="modal__container">
        <div class="modal__header">
         🚀 Extend the exploration!
        </div>
        <div class="modal__body">
          <a class="modal__link" href="https://github.com/wbkd/awesome-d3/issues/new">
            Something missing? Create an issue and pr in our awesome d3-list on github and we will add your project here.
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
    text-align: left
    max-width: 500px
    min-height: 100px
    transform: translate3d(0,0,0);
    padding: 2em 3em
    margin: 20% auto
    border-radius: 2px
    background-color: #fff

  .modal__header
    font-weight: bold
    font-size: 1.6em
    margin-bottom: .5em

  .modal__link
    text-decoration: none
    &:hover
      text-decoration: underline
</style>


