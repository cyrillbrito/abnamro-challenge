const loadNodes = () => [
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
];

const loadChildren = (parent, level) => {
  const stop = Math.random() * 4 - level < 0;
  if (stop) {
    return;
  }

  parent.children = [];
  const nNodes = Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < nNodes; i += 1) {
    const child = {};
    child.name = parent.name ? `${parent.name}-${i + 1}` : i + 1;
    child.description = `This is a description of ${child.name}`;
    child.description = `This is a description of ${child.name}`;
    loadChildren(child, level + 1);
    parent.children.push(child);
  }
};

const loadRandom = () => {
  const root = {};
  loadChildren(root, 0);
  return root.children;
};

module.exports = {
  loadNodes,
  loadRandom,
};
