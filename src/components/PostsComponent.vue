<!-------------------------------------------------------------------->

<template>
  <div class="card p-3 mx-5 my-4 shadow">
    <div class="row border-bottom mb-3 pb-3">
      <div class="col">
        <div class="row">
          <div class="col-3">
            <img class="rounded-circle mr-3" :src="post.creator.picture" alt="" width="75" height="75">
          </div>
          <div class="col">
            <h6> {{ post.creator.name }}</h6>
            <p>{{ post.creator.createdAt }}</p>
          </div>
        </div>
      </div>
      <div class="col text-right">
        <span><img class="post-image" :src="post.imgUrl" alt=""></span>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <span>{{ post.body }}</span>
      </div>
    </div>
  </div>
</template>

<!-------------------------------------------------------------------->

<script>
export default {
  name: 'Posts',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // onMounted(() => {

    // })
    return {}
  }
}
</script>

<!-------------------------------------------------------------------->

<style scoped>
.post-image{
  max-width: 10rem;
}
.card-size{
  max-width: 50rem;
}
.bottom-border{
  border-bottom-color: gray;
  border-bottom-width: 1rem;
}
</style>

<!-------------------------------------------------------------------->
