<template>
  <div :class="classes">
    {{ actor }} {{ verb }} {{ description }}
  </div>
</template>

<script>
export default {
  name: "FlowItem",
  props: {
    actor: String,
    verb: String,
    description: String,
    useCase: Boolean,
  },
  computed: {
    classes() {
      return "ms-2 me-auto" + (this.useCase ? " text-decoration-underline" : "");
    },
  }
}
</script>

<style scoped>

</style>