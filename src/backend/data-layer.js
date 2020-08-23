const neo4j = require('neo4j-driver');
const config = require('../config.json');

const loadNodes = async () => {
  const driver = neo4j.driver(
    config.neo4j_uri,
    neo4j.auth.basic(config.neo4j_username, config.neo4j_password),
  );
  const session = driver.session();

  try {
    const results = await session.run(`
      MATCH (p:Node)-[:CHILD]->(c:Node)
      RETURN p, c
    `);

    const nodes = {};
    for (const result of results.records) {
      const p = result.get('p').properties;
      const c = result.get('c').properties;

      if (!nodes[p.name]) {
        nodes[p.name] = {
          name: p.name,
          description: p.description,
          children: [],
        };
      }

      if (!nodes[c.name]) {
        nodes[c.name] = {
          name: c.name,
          description: c.description,
          children: [],
          isChild: true,
        };
      } else {
        nodes[c.name].isChild = true;
      }

      nodes[p.name].children.push(nodes[c.name]);
    }

    return Object.values(nodes).filter((x) => !x.isChild);
  } catch (e) {
    console.log('Exception!', e);
  } finally {
    await session.close();
    await driver.close();
  }
};

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
