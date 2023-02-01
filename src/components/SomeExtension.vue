<template>
  <div class="row g-2">
    <div class="col-12">
      <input class="form-control" name="extension" v-model="value" placeholder="Restrições do fluxo"/>
    </div>
    <p>
      <button class="btn btn-outline-success me-2" type="button" @click="setExtension">Incluir</button>
      <button class="btn btn-outline-secondary" type="button" @click="extensionCancel">Cancelar</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "SomeExtension",
  methods: {
    setExtension() {
      this.$emit('setExtension', this.value)
      this.value = ""
    },
    extensionCancel() {
      this.$emit('extensionCancel')
    }
  },
  data() {
    return {
      value: ""
    }
  }
}
</script>

<style scoped>

</style>