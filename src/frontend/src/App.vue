<template>
  <div id="app">
    <div class="tooltip-wrapper">
      <div class="tooltip-card" v-if="active != null">
        {{active.description}}
        <div class="tooltip-close" v-on:click="active = null">X</div>
      </div>
    </div>
    <div class="tree-wrapper">
      <tree-node
        v-for="node in results"
        v-bind:key="node.name"
        v-bind:node="node"
        v-bind:active="active"
        v-on:active-change="active = active == $event ? null : $event"
      ></tree-node>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "tree-node": () => import("./TreeNode.vue"),
  },
  data: () => ({
    results: [
      {
        name: "A",
        description: "This is a description of A",
        children: [],
      },
      {
        name: "B",
        description: "This is a description of B",
        children: [
          {
            name: "B-1",
            description: "This is a description of B-1",
          },
          {
            name: "B-2",
            description: "This is a description of B-2",
          },
          {
            name: "B-3",
            description: "This is a description of B-3",
          },
        ],
      },
      {
        name: "C",
        description: "This is a description of C",
        children: [],
      },
      {
        name: "D",
        description: "This is a description of D",
        children: [],
      },
    ],
    active: null,
  }),
};
</script>

<style>
#app {
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
}
</style>
