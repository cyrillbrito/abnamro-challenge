<template>
  <li>
    <div
      class="node-card"
      v-on:click="$emit('active-change', node)"
      v-bind:class="{ 'active': node == active }"
    >{{ node.name }}</div>
    <ul v-if="node.children && node.children.length">
      <tree-node
        v-for="child in node.children"
        v-bind:key="child.name"
        v-bind:node="child"
        v-bind:active="active"
        v-on:active-change="$emit('active-change', $event)"
      ></tree-node>
    </ul>
  </li>
</template>  

<script>
// import TreeNode from './TreeNode.vue'

export default {
  components: {
    "tree-node": () => import("./TreeNode.vue"),
  },
  props: ["node", "active"],
};
</script>


<style scoped>
ul {
  padding-top: 20px;
  position: relative;
  padding-left: 0px;
  /* display: flex; */
  margin: 0;
}

ul::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 2px solid #394f49;
  /* width: 0; */
  height: 20px;
}

li {
  float: left;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 5px 0 5px;
}

li::before,
li::after {
  content: "";
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 2px solid #394f49;
  width: 50%;
  height: 18px;
}

li::after {
  right: auto;
  left: 50%;
  border-left: 2px solid #394f49;
}

li:only-child::after,
li:only-child::before {
  display: none;
}

li:only-child {
  padding-top: 0;
}

li:first-child::before,
li:last-child::after {
  border: 0 none;
}

li:last-child::before {
  border-right: 2px solid #394f49;
  border-radius: 0 4px 0 0;
}

li:first-child::after {
  border-radius: 4px 0 0 0;
}

.node-card {
  padding: 20px;
  border: 1px solid #394f49;
  border-radius: 3px;
  margin: auto;
  width: fit-content;
  box-shadow: 0 5px 10px -5px #394f49;
  cursor: pointer;
}

.node-card.active {
  background-color: #e1dee3;
  border-width: 2px;
  padding: 19px;
}
</style>
