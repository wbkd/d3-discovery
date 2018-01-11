<template>
  <div class="project-list__item project">
    <div class="project__image__wrapper">
      <a v-bind:href="item.url" target="_blank">
        <div class="project__image" v-lazy:background-image="imgObj" />
      </a>
      <div class="project__info">
        <div class="project__stars">
          <svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
          <div>{{item.stars}}</div>
        </div>
        <div class="project__issues">
          <svg aria-hidden="true" class="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
          <div>{{item.issues}}</div>
        </div>
      </div>
    </div>

    <div class="project__container">
      <a class="project__title" v-bind:href="item.url" target="_blank">{{item.name}}</a>
      <div class="project__description">{{item.description}}</div>
      <div class="project__latest">
        <div class="project__latest__label">Latest commit</div>
        <div class="project__latest__value">{{getFormattedDate}}</div>
      </div>
      <div class="project__license">
        <div class="project__license__label">License</div>
        <div class="project__license__value">{{item.license || '-'}}</div>
      </div>
      <a class="project__website" v-if="item.homepage" v-bind:href="item.homepage" target="_blank">Website</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: Object,
    },
    data() {
      return {
        imgObj: {
          src: `http://api.d3-discovery.net/images/${this.item.name}.jpeg`,
          error: require('../assets/placeholder.png'),
          loading: require('../assets/loader.gif'),
        },
      };
    },
    computed: {
      getFormattedDate() {
        const day = new Date(Date.parse(this.item.lastUpdate)).getDay();
        const month = new Date(Date.parse(this.item.lastUpdate)).getMonth();
        const year = new Date(Date.parse(this.item.lastUpdate)).getFullYear();

        const dateString = `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
        return dateString;
      },
    },
  };
</script>

<style scoped lang="stylus">
  .project-list__item
    background: #fff
    text-align: left
    border-radius: 2px
    overflow: hidden
    font-size: 14px

  .project__image__wrapper
    position: relative
    display: flex
    flex-flow: row wrap
    justify-content: flex-end

    a
      width: 100%

  .project__image
    width: 100%
    height: 124.25px
    cursor: pointer
    box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.1)
    background-size: cover
    background-repeat: no-repeat
    background-position: auto

  .project__image[lazy=loading]
    background-position: center center
    background-size: auto

  .project__stars
  .project__issues
    display: flex
    align-items: center
    margin-right: .5em

  .project__info
    position: absolute
    top: 5px
    right: 0
    font-size: 11px
    line-height: 0
    color: #24292e
    background-color: #fff
    box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.1)

    display: flex
    flex-flow: row wrap
    justify-content: space-between
    padding: .2em .4em

    svg
      vertical-align: sub
      width: 11px
      margin-right: .2em

  .project__container
    padding: 10px

  .project__title
    font-size: 16px
    font-weight: bold
    color: #323233
    margin-bottom: 5px
    text-decoration: none
    display: block

    &:hover
      text-decoration: underline

  .project__description
    margin: 0 0 15px 0

  .project__license
  .project__latest
    display: flex
    justify-content: space-between
    font-size: 12px

  .project__license__value
    width: 50%
    text-align: right

  .project__website
    text-decoration: none
    color: #323233
    font-size: 12px

    &:hover
      text-decoration: underline
</style>
