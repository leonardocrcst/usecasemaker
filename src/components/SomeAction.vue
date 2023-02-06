<template>
  <div class="row g-2">
    <div class="col-6 col-md-2">
      <input
        class="form-control"
        name="actor"
        v-model="actor"
        placeholder="Ator"
        title="Quem realiza a ação"
      />
    </div>
    <div class="col-6 col-md-2">
      <input
        class="form-control"
        name="verb"
        v-model="verb"
        placeholder="Ação"
        title="Verbo na 3ª pessoa do indicativo (ex.: digita, informa, solicita, etc)"
      />
    </div>
    <div class="col-12 col-md-5">
      <input
        class="form-control"
        name="description"
        v-model="description"
        placeholder="Descrição da ação"
      />
    </div>
    <div class="col-3 col-md-3">
      <label
        ><input
          type="checkbox"
          class="form-check-inline mt-2 mx-2"
          v-model="useCase"
          name="usecase"
          title="Se essa ação for uma chamada para outro caso de uso"
        />Caso de uso</label
      >
    </div>
    <p>
      <button class="btn btn-outline-success" type="button" @click="flow">
        Incluir
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: "SomeAction",
  data() {
    return {
      actor: "",
      verb: "",
      description: "",
      useCase: false,
      extensions: []
    };
  },
  methods: {
    flow() {
      if (this.actor && this.verb && this.description) {
        const props = {
          actor: this.actor,
          verb: this.verb,
          description: this.description,
          useCase: this.useCase,
          extensions: this.extensions
        };
        this.$emit("setFlow", props);
        this.actor = this.verb = this.description = "";
        this.useCase = false;
      }
    },
  },
};
</script>

<style scoped></style>
