const neo4j = require('neo4j-driver');
const nodes = require('./data.json').data;

(async () => {
  const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'password'));
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
    console.log('exception' + e);
  } finally {
    await session.close();
    await driver.close();
  }
})();
