<template>
  <div id="app">
    <div class="tooltip-wrapper">
      <div class="tooltip-card" v-if="active != null">
        {{active.description}}
        <div class="tooltip-close" v-on:click="active = null">X</div>
      </div>
    </div>
    <div class="tree-wrapper" v-if="nodes">
      <tree-node
        v-for="node in nodes"
        v-bind:key="node.name"
        v-bind:node="node"
        v-bind:active="active"
        v-on:active-change="active = active == $event ? null : $event"
      ></tree-node>
    </div>
    <div class="tree-wrapper" v-else>LOADING</div>
    <div class="button-wrapper">
      <button v-on:click="loadOriginalNodes">Load original set of nodes</button>
      <button v-on:click="loadRandomNodes">Load random set of nodes</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "tree-node": () => import("./TreeNode.vue"),
  },
  data: () => ({
    nodes: null,
    active: null,
  }),
  created() {
    this.loadOriginalNodes();
  },
  methods: {
    loadOriginalNodes() {
      this.callNodesApi("nodes");
    },
    loadRandomNodes() {
      this.callNodesApi("random");
    },
    callNodesApi(endpoint) {
      this.active = null;
      fetch("http://localhost:3000/" + endpoint)
        .then((response) => response.json())
        .then((nodes) => {
          this.nodes = nodes;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #330f0a;
  display: flex;
  flex-direction: column;
}
.tooltip-wrapper {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tooltip-card {
  padding: 20px;
  border: 1px solid #394f49;
  border-radius: 3px;
  width: fit-content;
  box-shadow: 0 5px 10px -5px #394f49;
  position: relative;
}
.tooltip-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 3px;
  border-left: 1px solid #394f49;
  border-bottom: 1px solid #394f49;
  cursor: pointer;
}
.tree-wrapper {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  overflow: auto;
}
.button-wrapper {
  display: flex;
  justify-content: center;
  height: 50px;
}
.button-wrapper button {
  height: 30px;
  cursor: pointer;
  margin: 0 20px;
}
</style>
