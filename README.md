
# ABN AMRO Challenge

# Requirements

* Have neo4j installed on your machine. You can use [this link](https://neo4j.com/download/) to download it.
* Create a empty database
* Setup the database uri, user and password on the file `src/config.json`


# Quick start

To run all necessary commands to start the project run:

```
$ npm start
```

# Migration

To run just the migration script:

```
$ npm run migration
```

This will remove all existing(if any) Nodes from the Neo4j library and insert new ones based on the file `src/migration/data.json`.


# Backend

To run just the backend:

```
$ npm run backend
```

This will run a node express.js app on the port 3000. The api has 2 endpoints, `/nodes` will return the data on the Neo4j database, and the `/random` will return a random set of nodes generated in js code.


# Frontend

To run just the frontend:

```
$ npm run frontend
```

This will run a vue app on the port 8080. The website renders a tree visualization for the data returned by the api. By default with loads the `/nodes` but it allows you to switch to a random tree calling then the `/random`.

