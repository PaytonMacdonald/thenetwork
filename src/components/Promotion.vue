<!------------------------------------------------------------------------------------------------>

<template>
  <div class="pb-5">
    <div class="">
      <span>connected</span>
      <div>
        <img :src="promotion.tall" alt="Project Cover Image">
      </div>
    </div>
  </div>
</template>

<!------------------------------------------------------------------------------------------------>

<script>
export default {
  name: 'Promotion',
  props: {
    promotion: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<!------------------------------------------------------------------------------------------------>

<style lang="scss" scoped>
 img{
   width: 100%
 }

 .small-img{
   width: 1em;
   left: 0;
   top: 5px
 }
</style>

<!------------------------------------------------------------------------------------------------>
