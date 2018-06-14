# middleware-eth-rest [![Build Status](https://travis-ci.org/ChronoBank/middleware-eth-rest.svg?branch=master)](https://travis-ci.org/ChronoBank/middleware-eth-rest)

Middleware service which expose rest api

### Installation

This module is a part of middleware services. You can install it in 2 ways:

1) through core middleware installer  [middleware installer](https://www.npmjs.com/package/chronobank-middleware)
2) by hands: just clone the repo, do 'npm install', set your .env - and you are ready to go

#### About
This module is used for interaction with middleware. This happens through the layer, which is built on chronobank [sdk](https://github.com/ChronoBank/middleware-service-sdk).
So, you don't need to write any code - you can create your own flow with UI tool supplied by node-red itself. Access by this route:

```
/admin
````


#### Predefined Routes with node-red flows

| description | route | method | params | output | 
| --------- | ---- | - | ---- | --- | 
| get transactions for the registered address (by default skip = 0, limit=100) | /tx/:addr/history   | GET | ``` {addr: <string>, limit: <Number>, skip: <Number> ```  |```[<Object of tx>]```  [view example](examples/history.md)  
| get balance of the registered address| /addr/:addr/balance  | GET | ``` {addr: <string>} ``` | ``` {balance: <Number>, assets: {assetId: <Number>}} ```  [view example](examples/balance.md) 
| get tx by its hash | /tx/{hash}   | GET | ``` {hash: <string>} ``` | ```<Object of tx>```  [view example](examples/tx.md) 
| register new address on middleware. erc20tokens - is an array of tokens, which balance changes this address will listen to (optional). | /addr   | POST | ``` {address: <string>, erc20tokens: [<string>]} ``` | ``` {code: <Number>, message: <string>} ```  <italic>Example:</italic> ```{code: 1, message: 'ok'} ``` 
| mark an address as inactive and stop perform any actions for this address. | /addr | DELETE | ``` {address: <string>} ``` | ``` {code: <Number>, message: <string>} ```  <italic>Example:</italic> ```{code: 1, message: 'ok'} ```
| add token to address for listen | /addr/{address}/token | POST | ``` {erc20tokens: [<string>]} ``` | ``` {code: <Number>, message: <string>} ```  <italic>Example:</italic> ```{code: 1, message: 'ok'} ```
| remove token address for listen | /addr/{address}/token | DELETE | ``` {erc20tokens: [<string>]} ``` | ``` {code: <Number>, message: <string>} ```  <italic>Example:</italic> ```{code: 1, message: 'ok'} ```
| get list of all available events | /events | GET | | ``` [<String>] ```  [view example](examples/events.md)
| get events collection | /events/{event_name} | GET | ```{event_name: <String>}``` see REST query language section | ``` [{txObj: <Object>}] ``` [view example](examples/event.md)



The available routes are listed below:

| route | methods | params | description |
| ------ | ------ | ------ | ------ |


| /events   | GET | |returns list of all available events
| /events/{event_name}   | GET | |returns an event's collection


#### REST guery language

Every collection could be fetched with an additional query. The api use [query-to-mongo](https://www.npmjs.com/package/query-to-mongo) plugin as a backbone layer between GET request queries and mongo's. For instance, if we want to fetch all recods from collection 'issue', where issueNumber < 20, then we will make a call like that:
```
curl http://localhost:8080/events/issue?issueNumber<20
```


##### сonfigure your .env

To apply your configuration, create a .env file in root folder of repo (in case it's not present already).
Below is the expamle configuration:

```
MONGO_ACCOUNTS_URI=mongodb://localhost:27017/data
MONGO_ACCOUNTS_COLLECTION_PREFIX=eth

MONGO_DATA_URI=mongodb://localhost:27017/data
MONGO_DATA_COLLECTION_PREFIX=eth

NODERED_MONGO_URI=mongodb://localhost:27018/data
NODE_RED_MONGO_COLLECTION_PREFIX=rest

REST_PORT=8081
NETWORK=development
WEB3_URI=/tmp/development/geth.ipc
SMART_CONTRACTS_PATH=../node_modules/chronobank-smart-contracts/build/contracts
NODERED_AUTO_SYNC_MIGRATIONS=true
```

The options are presented below:

| name | description|
| ------ | ------ |
| MONGO_URI   | the URI string for mongo connection
| MONGO_COLLECTION_PREFIX   | the default prefix for all mongo collections. The default value is 'eth'
| MONGO_ACCOUNTS_URI   | the URI string for mongo connection, which holds users accounts (if not specified, then default MONGO_URI connection will be used)
| MONGO_ACCOUNTS_COLLECTION_PREFIX   | the collection prefix for accounts collection in mongo (If not specified, then the default MONGO_COLLECTION_PREFIX will be used)
| MONGO_DATA_URI   | the URI string for mongo connection, which holds data collections (for instance, processed block's height). In case, it's not specified, then default MONGO_URI connection will be used)
| MONGO_DATA_COLLECTION_PREFIX   | the collection prefix for data collections in mongo (If not specified, then the default MONGO_COLLECTION_PREFIX will be used)
| NODERED_MONGO_URI   | the URI string for mongo connection, which holds data collections (for instance, processed block's height). In case, it's not specified, then default MONGO_URI connection will be used)
| NODE_RED_MONGO_COLLECTION_PREFIX   | the collection prefix for node-red collections in mongo (If not specified, then the collections will be created without prefix)
| REST_PORT   | rest plugin port
| NETWORK   | network name (alias)- is used for connecting via ipc (see block processor section)
| NODERED_MONGO_URI   | the URI string for mongo collection for keeping node-red users and flows (optional, if omitted - then default MONGO_URI will be used)
| SMART_CONTRACTS_PATH   | the path to compiled smart contracts (optional, if omitted - then the default dir from node_modules will be used)
| NODERED_AUTO_SYNC_MIGRATIONS   | autosync migrations on start (default = yes)

License
----
 [GNU AGPLv3](LICENSE)

Copyright
----
LaborX PTY
