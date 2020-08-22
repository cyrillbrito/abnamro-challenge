Vue.component('tree-node', {
  template: `
    <div>
      <p>{{node.name}}</p>
      <ul>
        <li v-for="child in node.children">
          <tree-node v-bind:node="child"></tree-node>
        </li>
      </ul>
    </div>
  `,
  props: ['node'],
});
