<script lang="ts">
import SimpleText from "@/components/SimpleText.vue";
import SomeAction from "@/components/SomeAction.vue";
import {defineComponent} from "vue";
import FlowItem from "@/components/FlowItem.vue";
import {mapActions, mapState, mapStores} from "pinia";
import {useCaseStore} from "@/stores/useCaseStore";
import type {FlowType} from "@/types/FlowType";
import SomeExtension from "@/components/SomeExtension.vue";
import Conclude from "@/helpers/Conclude";

export default defineComponent({
  components: {SomeExtension, FlowItem, SomeAction, SimpleText},
  data() {
    return {
      extension: -1,
      finished: ""
    };
  },
  computed: {
    ...mapStores(useCaseStore),
    ...mapState(useCaseStore, ["title", "actor", "flow"]),
  },
  methods: {
    Conclude,
    ...mapActions(useCaseStore, ["setTitle", "setActor", "setFlow", "reset"]),
    addFlow(data: FlowType) {
      this.setFlow([...this.flow, data]);
    },
    remFlow(id: number) {
      this.flow.splice(id, 1);
      this.setFlow([...this.flow]);
    },
    addExtension(id: number) {
      this.extension = id;
    },
    setExtension(content: string) {
      if (this.extension >= 0) {
        const flow = [...this.flow]
        flow[this.extension].extensions.push(content);
        this.setFlow(flow);
      }
      this.finishExtension();
    },
    finishExtension() {
      this.extension = -1;
    },
    remExtension(fluxId: number, extensionId: number) {
      this.flow[fluxId]
          .extensions = this.flow[fluxId].extensions.filter((item, id) => id !== extensionId)
      this.setFlow([...this.flow])
    },
    finalize() {
      this.finished = ""
      this.finished = Conclude()
      this.flow = []
    }
  },
});
</script>

<template>
  <header class="container">
    <h1 class="mt-4">UseCase Maker</h1>
    <p>Auxilia na elaboração de casos de uso.</p>
  </header>
  <main class="container">
    <div class="row g-2">
      <div class="col-12 col-md-8">
        <simple-text title="Título" @set-content="this.setTitle"/>
      </div>
      <div class="col-12 col-md-4">
        <simple-text title="Ator principal" @set-content="this.setActor"/>
      </div>
      <div class="col-12">
        <hr/>
      </div>
      <form>
        <div v-if="this.extension < 0">
          <h2>Fluxo normal</h2>
          <some-action @set-flow="this.addFlow"/>
        </div>
        <div v-else>
          <h2>Extensão (fluxo #{{ this.extension + 1 }})</h2>
          <some-extension
              @set-extension="setExtension"
              @extension-cancel="this.finishExtension"
          />
        </div>
      </form>
    </div>
    <hr/>
    <div class="row g-2">
    <div class="col-12 col-md-9 col-lg-10">
      <ol v-if="this.flow.length" class="list-group list-group-numbered">
        <li
            :key="fluxId"
            v-for="(item, fluxId) in this.flow"
            class="list-group-item d-flex justify-content-between align-items-start"
        >
          <flow-item
              :actor="item.actor"
              :verb="item.verb"
              :description="item.description"
              :useCase="item.useCase"
          >
            <ol v-if="item.extensions" type="a">
              <li v-for="(item, id) in item.extensions" :key="id" @click="remExtension(fluxId, id)">
                <span>{{ item }}</span>
              </li>
            </ol>
          </flow-item>
          <span
              class="badge bg-info rounded-pill me-1 btn"
              @click="addExtension(fluxId)"
          >E</span
          >
          <span class="badge bg-danger rounded-pill btn" @click="remFlow(fluxId)"
          >R</span
          >
        </li>
      </ol>
      <p v-else>Nenhum fluxo criado</p>
    </div>
      <div class="col-12 col-md-3 col-lg-2 d-flex justify-content-center align-items-center">
        <button class="btn btn-primary" @click="finalize()">Finalizar</button>
      </div>
    </div>
    <div v-if="finished.length">
      <hr/>
      <textarea class="form-control" readonly rows="12">{{finished}}</textarea>
    </div>
  </main>
</template>

<style scoped></style>
