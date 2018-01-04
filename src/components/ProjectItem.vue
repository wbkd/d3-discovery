<template>
  <div class="project-list__item project">
    <div class="project__image__wrapper" v-if="path">
      <a v-bind:href="item.url" target="_blank"><img class="project__image" v-bind:src="path" /></a>
      <div class="project__stars button__info">
        <svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
        {{item.stars}}
      </div>
      <div class="project__issues button__info">
        <svg aria-hidden="true" class="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
        {{item.issues}}
      </div>
    </div>

    <div class="project__container">
      <div class="project__title">{{item.name}}</div>
      <div class="project__description">{{item.description}}</div>
      <div class="project__latest">
        <div class="project__latest__label">Latest commit</div>
        <div class="project__latest__value">{{getFormattedDate}}</div>
      </div>
      <div class="project__license">
        <div class="project__license__label">License</div>
        <div class="project__license__value">{{item.license}}</div>
      </div>
      <a class="project__website button__info  button__info--clickable" v-if="item.homepage" v-bind:href="item.homepage" target="_blank">Website</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: Object,
    },
    computed: {
      path() {
        try {
          return require(`../../images/${this.item.name}.jpeg`);
        } catch (err) {
          return false;
        }
      },
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
    max-width: 250px

  .project__image__wrapper
    position: relative

  .project__image
    max-width: 100%
    cursor: pointer
    box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.1)

  .project__stars
  .project__issues
    position: absolute
    right: 15px

  .project__stars
    bottom: 50px

  .project__issues
    bottom: 15px

  .project__container
    padding: 5px 10px 10px 10px

  .project__title
    font-size: 16px
    font-weight: bold
    color: #323233
    margin-top: 15px

  .project__description
    margin: 0 0 15px 0

  .project__license
  .project__latest
    display: flex
    justify-content: space-between
    font-size: 12px

  .project__license
    margin-bottom: 10px

  .project__website
    text-decoration: none

  .button__info
    padding: 4px
    font-size: 12px
    color: #24292e
    border-radius: 2px
    background-image: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%)
    background-color: #eff3f6
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1)

    svg
      vertical-align: text-top

  .button__info--clickable
    cursor: pointer
    &:hover
      background-color: #e6ebf1
      background-image: linear-gradient(-180deg, #f0f3f6 0%, #e6ebf1 90%)
      background-position: 0 -0.5em
      border-color: rgba(27,31,35,0.35)
</style>
