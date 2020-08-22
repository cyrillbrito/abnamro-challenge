<template>
  <div class="hello">
     <tree-node v-for="node in results" v-bind:key="node.name" v-bind:node="node"></tree-node>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  components: {
    "tree-node":  () => import('./TreeNode.vue')
  },
  data: () => ({
    results: [
      {
        name: 'A',
        description: 'This is a description of A',
        children: [],
      },
      {
        name: 'B',
        description: 'This is a description of B',
        children: [
          {
            name: 'B-1',
            description: 'This is a description of B-1',
          },
          {
            name: 'B-2',
            description: 'This is a description of B-2',
          },
          {
            name: 'B-3',
            description: 'This is a description of B-3',
          },
        ],
      },
      {
        name: 'C',
        description: 'This is a description of C',
        children: [],
      },
      {
        name: 'D',
        description: 'This is a description of D',
        children: [],
      },
    ],
  }),
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
