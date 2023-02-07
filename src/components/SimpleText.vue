<template>
  <p>
    <label class="d-block">
      {{ title }}<br />
      <input
        class="form-control"
        type="text"
        v-model="value"
        @keyup="$emit('setContent', this.value)"
      />
    </label>
  </p>
</template>

<script>
export default {
  name: "SimpleText",
  data() {
    return {
      value: "",
    };
  },
  props: {
    title: String,
  },
};
</script>

<style scoped></style>
