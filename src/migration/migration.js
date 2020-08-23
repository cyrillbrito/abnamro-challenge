const neo4j = require('neo4j-driver');
const nodes = require('./data.json').data;
const config = require('../config.json');

(async () => {
  const driver = neo4j.driver(
    config.neo4j_uri,
    neo4j.auth.basic(config.neo4j_username, config.neo4j_password),
  );
  const session = driver.session();

  try {
    await session.run(`
      MATCH (n:Node)
      DETACH DELETE n
    `);

    for (const node of nodes) {
      await session.run(`
        CREATE (n:Node { name: '${node.name}', description: '${node.description}' })
      `);

      if (node.parent) {
        await session.run(`
          MATCH (a:Node),(b:Node)
          WHERE a.name = '${node.parent}' AND b.name = '${node.name}'
          CREATE (a)-[r:CHILD]->(b)
        `);
      }
    }
  } catch (e) {
    console.log('Exception!', e);
  } finally {
    await session.close();
    await driver.close();
  }
})();
