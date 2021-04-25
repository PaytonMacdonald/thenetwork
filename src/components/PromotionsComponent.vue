<!-------------------------------------------------------------------->

<template>
  <div class="mt-5 shadow">
    <img :src="promotion.tall" alt="promotional image">
  </div>
</template>

<!-------------------------------------------------------------------->

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

<!-------------------------------------------------------------------->

<style scoped>
 img{
   width: 100%
 }
</style>

<!-------------------------------------------------------------------->
