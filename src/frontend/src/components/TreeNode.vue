<template>
  <div>
    <p>{{node.name}}</p>
    <ul>
      <li v-for="child in node.children" v-bind:key="child.name">
        <tree-node v-bind:node="child"></tree-node>
      </li>
    </ul>
  </div>
</template>  

<script>
// import TreeNode from './TreeNode.vue'

export default {
  components: {
    "tree-node":  () => import('./TreeNode.vue')
  },
  props: ["node"],
};
</script>
