import { defineStore } from "pinia";
import type { FlowType } from "@/types/FlowType";
import type { UseCaseStoreType } from "@/types/UseCaseStoreType";

export const useCaseStore = defineStore("useCaseStore", {
  state: () => {
    return {
      title: "",
      actor: "",
      flow: [],
    } as UseCaseStoreType;
  },

  actions: {
    setTitle(title: string) {
      this.title = title;
    },
    setActor(name: string) {
      this.actor = name;
    },
    setFlow(flow: FlowType[]) {
      this.flow = flow;
    },
  },
});
