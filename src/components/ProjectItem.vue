<template>
  <div class="project-list__item project">
    <div class="project__image__wrapper">
      <a class="project__image__link" v-bind:href="item.url" target="_blank">
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

    <div class="project__content">
      <div class="project__meta1">
        <a class="project__title project__link" v-bind:href="item.url" target="_blank">{{item.name}}</a>
        <div class="project__description">{{item.description}}</div>
      </div>

      <div class="project__meta2">
        <div class="project__latest">
          <div class="project__latest__label">Latest update</div>
          <div class="project__latest__value">{{getFormattedDate}}</div>
        </div>
        <div class="project__license">
          <div class="project__license__label">License</div>
          <a v-if="item.license" class="project__license__value project__link" v-bind:href="this.getLicenseUrl">{{getLicenseLabel}}</a>
          <div v-else class="project__license__value">-</div>
        </div>
        <a class="project__website project__link" v-if="item.homepage" v-bind:href="item.homepage" target="_blank">official website</a>
    </div>
   </div>
  </div>
</template>

<script>
  import licenseTranslations from '../utils/licenseTranslations';

  export default {
    props: {
      item: Object,
    },
    data() {
      return {
        imgObj: {
          src: `https://api.d3-discovery.net/images/${this.item.name}.jpeg`,
          error: require('../assets/placeholder.png'),
          loading: require('../assets/loader.gif'),
        },
      };
    },
    computed: {
      getFormattedDate() {
        const day = new Date(this.item.lastUpdate).getDate();
        const month = new Date(this.item.lastUpdate).getMonth() + 1;
        const year = new Date(this.item.lastUpdate).getFullYear();

        const dateString = `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
        return dateString;
      },
      getLicenseLabel() {
        return licenseTranslations[this.item.license].label;
      },
      getLicenseUrl() {
        return licenseTranslations[this.item.license].url ?
          licenseTranslations[this.item.license].url : this.item.url;
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
    transition: box-shadow .3s ease-in-out
    box-shadow: 0 1px 3px 0 rgba(255,255,255,0.16)

    &:hover
      box-shadow: 0 2px 5px 4px rgba(255,255,255,0.16)

      .project__link
        color: lighten(#49426d, 25%)

  .project__image__wrapper
    position: relative
    display: flex
    flex-flow: row wrap
    justify-content: flex-end
    border-radius: 2px 2px 0 0
    overflow: hidden
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.10)

    .project__image__link
      width: 100%

    &:hover
      .project__image
        transform: scale(1.1)

  .project__image
    width: 101%
    height: 125px
    cursor: pointer
    background-size: cover
    background-repeat: no-repeat
    background-position: auto
    transition: transform .3s

  .project__image[lazy=loading]
    background-position: center center
    background-size: auto

  .project__link
    color: #49426d
    text-decoration: none
    transition: all .3s ease-in-out

    &:hover
      text-decoration: underline

  .project__info
    position: absolute
    top: 15px
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

  .project__content
    padding: 0

  .project__meta1
  .project__meta2
    padding: 10px 15px

  .project__meta1
    min-height: 80px

  .project__meta2
    border-top: 1px solid #eee

  .project__stars
  .project__issues
    display: flex
    align-items: center
    margin-right: .5em

  .project__title
    font-size: 16px
    font-weight: bold
    margin-bottom: 5px
    display: inline-block

  .project__description
    color: #555
    font-size: 13px

  .project__license
  .project__latest
    display: flex
    justify-content: space-between
    font-size: 13px
    line-height: 18px
    color: #555

  .project__license__value
    width: 50%
    text-align: right

  .project__website
    font-size: 13px
    line-height: 18px
</style>
