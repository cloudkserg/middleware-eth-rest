
module.exports.id = 'e415e43d.f10178';

const _ = require('lodash'),
  config = require('../config');

/**
 * @description flow e415e43d.f10178 update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.update({"path":"e415e43d.f10178","type":"flows"}, {
    $set: {"path":"e415e43d.f10178","body":[{"id":"6b2f3912.a09f08","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":1830,"y":480,"wires":[]},{"id":"12413869.ddc528","type":"http in","z":"e415e43d.f10178","name":"tx","url":"/tx/:hash","method":"get","upload":false,"swaggerDoc":"","x":270,"y":465,"wires":[["b7cddb28.6e1828"]]},{"id":"b7cddb28.6e1828","type":"function","z":"e415e43d.f10178","name":"transform params","func":"const prefix = global.get('settings.mongo.collectionPrefix');\n\nmsg.payload ={ \n    model: `${prefix}TX`, \n    request: {\n      _id: msg.req.params.hash\n  }\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":460.000007629395,"y":465.00000381469704,"wires":[["755ca9a1.cdbfc8"]]},{"id":"b68ffffb.8e49e","type":"catch","z":"e415e43d.f10178","name":"","scope":null,"x":307,"y":585,"wires":[["49075d44.432d44","468f737c.263d3c"]]},{"id":"5c2fd91f.e496a8","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":764,"y":586,"wires":[]},{"id":"49075d44.432d44","type":"function","z":"e415e43d.f10178","name":"transform","func":"\nlet factories = global.get(\"factories\"); \n\nmsg.payload = factories.messages.generic.fail;\n    \nreturn msg;","outputs":1,"noerr":0,"x":548,"y":585,"wires":[["5c2fd91f.e496a8"]]},{"id":"cb93a20a.bb5d3","type":"http in","z":"e415e43d.f10178","name":"history","url":"/tx/:addr/history","method":"get","upload":false,"swaggerDoc":"","x":210,"y":240,"wires":[["b0b220f2.3979a"]]},{"id":"e558bff.7e2784","type":"function","z":"e415e43d.f10178","name":"prepare request","func":"const prefix = global.get('settings.mongo.collectionPrefix');\nconst _ = global.get('_');\n\nmsg.address = msg.req.params.addr.toLowerCase();\n\nconst skip = parseInt(msg.req.query.skip) || 0;\nconst limit = parseInt(msg.req.query.limit) || 100;\nconst maxConfirmations = _.isNumber(parseInt(msg.req.query.maxconfirmations)) ? parseInt(msg.req.query.maxconfirmations) : -1;\n\nmsg.currentBlock = _.get(msg.payload, '0.number', 0);\n\nconst query = [\n    {$match: {\n        $or: [\n            {from: msg.address},\n            {to: msg.address}\n        \n            ]\n        }},\n        {$project: {\n             blockNumber: 1, \n            from: 1,  \n            gas: 1, \n            gasPrice: 1, \n            index: 1, \n            nonce: 1, \n            to: 1, \n            value: 1,\n            confirmations: { \n            $cond: { \n                if: {$eq: [\"$blockNumber\", -1]}, \n                then: 0, \n                else: {$subtract: [msg.currentBlock + 1, \"$blockNumber\"]}\n                    }\n                    }\n            }},\n];\n\n\nif(maxConfirmations > -1)\n    query.push({$match: {confirmations: {$lte: maxConfirmations}}})\n\nquery.push(...[\n    {$sort: {confirmations: 1}},\n    {$skip: skip},\n    {$limit: limit > 100 ? 100 : limit}\n]);\n\n\n\nmsg.payload ={ \n    model: `${prefix}TX`, \n    request: query\n};\n\n\nreturn msg;","outputs":1,"noerr":0,"x":740,"y":240,"wires":[["45ab2beb.917bc4"]]},{"id":"45ab2beb.917bc4","type":"mongo","z":"e415e43d.f10178","model":"","request":"{}","options":"{}","name":"mongo","mode":"1","requestType":"4","dbAlias":"primary.data","x":950,"y":240,"wires":[["4442f4c7.f8858c"]]},{"id":"ab0df8ed.00d388","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":2150,"y":260,"wires":[]},{"id":"755ca9a1.cdbfc8","type":"mongo","z":"e415e43d.f10178","model":"","request":"{}","options":"{}","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":656.25,"y":464.5,"wires":[["4aca6e2c.b2c23"]]},{"id":"a3dba2cb.a99a5","type":"function","z":"e415e43d.f10178","name":"transform output","func":"const _ = global.get('_');\nconst BigNumber = global.get('libs.BigNumber');\nconst prefix = global.get('settings.mongo.collectionPrefix');\n\n\nconst getTopics = log=>{\n    \n    const topics = [log.signature];\n    \n    const args = log.args.map(arg => {\n        let bn = BigNumber();\n        bn.s = 1;\n        bn.c = arg.c;\n        bn.e = arg.e;\n        topic = bn.toString(16);\n        while (topic.length < 64)\n            topic = '0' + topic;\n        return '0x' + topic;\n  });\n  \n  topics.push(...args);\n  return topics;\n    \n};\n\nconst logs = msg.payload.map(log=>{\n        log.topics = getTopics(log);\n        return _.omit(log, ['_id', 'txIndex', 'args']);\n});\n\n\nmsg.tx = _.merge({}, msg.tx, {logs: logs});\n\nmsg.payload = { \n    model: `${prefix}Block`, \n    request: {\n        number: msg.tx.blockNumber\n    },\n    options: {\n      limit: 1\n  }\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":1400,"y":480,"wires":[["dda43659.db7bc8"]]},{"id":"4442f4c7.f8858c","type":"function","z":"e415e43d.f10178","name":"transform output","func":"const prefix = global.get('settings.mongo.collectionPrefix');\nconst _ = global.get('_');\n\n\nmsg.txs = _.chain(msg.unconfirmedTxs)\n    .union(msg.payload)\n    .map(tx=>{\n        tx.hash = tx._id;\n        delete tx._id;\n        return tx;\n    })\n    .value();\n\nif(!msg.txs.length){\n    msg.payload = [];\n    return msg;\n}\n\n\n\nmsg.payload ={ \n    model: `${prefix}TxLog`, \n    request: {\n      $or:  msg.txs.map(tx=>({\n           blockNumber: tx.blockNumber,\n           txIndex: tx.index\n        }))\n  }\n};\n\n\nreturn msg;","outputs":1,"noerr":0,"x":1121,"y":240,"wires":[["bb8c6003.aca4a"]]},{"id":"eedad1c2.5e51b","type":"mongo","z":"e415e43d.f10178","model":"","request":"{}","options":"{}","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":1430,"y":260,"wires":[["342715a2.f4757a"]]},{"id":"342715a2.f4757a","type":"function","z":"e415e43d.f10178","name":"transform output","func":"const _ = global.get('_');\nconst prefix = global.get('settings.mongo.collectionPrefix');\nconst BigNumber = global.get('libs.BigNumber');\n\nconst getTopics = log=>{\n    \n    const topics = [log.signature];\n    \n    const args = log.args.map(arg => {\n        let bn = BigNumber();\n        bn.s = 1;\n        bn.c = arg.c;\n        bn.e = arg.e;\n        topic = bn.toString(16);\n        while (topic.length < 64)\n            topic = '0' + topic;\n        return '0x' + topic;\n  });\n  \n  topics.push(...args);\n  return topics;\n    \n};\n\nmsg.txs = msg.txs.map(tx=>{\n    tx.logs = _.chain(msg.payload)\n        .filter(log=> log.blockNumber === tx.blockNumber && log.txIndex === tx.index)\n        .orderBy('index')\n        .map(log=> {\n            log.topics = getTopics(log);\n            return _.omit(log, ['_id', 'txIndex', 'args'])\n        })\n        .value();\n    \n    return tx;\n});\n\n\nmsg.payload ={ \n    model: `${prefix}Block`, \n    request: {\n      number: {$in: msg.txs.map(tx=>tx.blockNumber)}\n  }\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":1587,"y":260,"wires":[["fb86a07a.65cc7"]]},{"id":"4aca6e2c.b2c23","type":"function","z":"e415e43d.f10178","name":"transform output","func":"const prefix = global.get('settings.mongo.collectionPrefix');\n\nmsg.tx = msg.payload[0];\n\nif(!msg.tx){\n    msg.payload = null;\n    return msg;\n}\n\n\nmsg.tx.hash = msg.tx._id;\ndelete msg.tx._id;\n\n\nmsg.payload ={ \n    model: `${prefix}TxLog`, \n    request: {\n        blockNumber: msg.tx.blockNumber,\n        txIndex: msg.tx.index\n  }\n};\n\n\nreturn msg;","outputs":1,"noerr":0,"x":841.25,"y":464.5,"wires":[["40aa5329.e261dc","9fc7219e.1fd74"]]},{"id":"9b10a99d.6dcee8","type":"mongo","z":"e415e43d.f10178","model":"","request":"{}","options":"{}","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":1191.25,"y":484.5,"wires":[["a3dba2cb.a99a5"]]},{"id":"40aa5329.e261dc","type":"switch","z":"e415e43d.f10178","name":"switch","property":"payload","propertyType":"msg","rules":[{"t":"null"},{"t":"nnull"}],"checkall":"true","outputs":2,"x":1011.25,"y":464.5,"wires":[["653bdef2.14537"],["9b10a99d.6dcee8"]]},{"id":"653bdef2.14537","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":1190,"y":420,"wires":[]},{"id":"bb8c6003.aca4a","type":"switch","z":"e415e43d.f10178","name":"switch","property":"payload.request","propertyType":"msg","rules":[{"t":"null"},{"t":"nnull"}],"checkall":"true","repair":false,"outputs":2,"x":1270,"y":240,"wires":[["b374ecf3.24087"],["eedad1c2.5e51b"]]},{"id":"b374ecf3.24087","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":1430,"y":180,"wires":[]},{"id":"c487e209.92ce1","type":"function","z":"e415e43d.f10178","name":"","func":"const _ = global.get('_');\n\nconst blocks = msg.payload;\n\nmsg.payload = msg.txs.map(tx=>{\n   tx.timestamp =  _.chain(blocks)\n    .find({number: tx.blockNumber})\n    .thru(block=> _.has(block, 'timestamp') ? block.timestamp * 1000 : Date.now())\n    .value();\n    \n    return tx;\n});\n\nreturn msg;","outputs":1,"noerr":0,"x":1950,"y":260,"wires":[["ab0df8ed.00d388"]]},{"id":"fb86a07a.65cc7","type":"mongo","z":"e415e43d.f10178","model":"","request":"{}","options":"{}","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":1770,"y":260,"wires":[["c487e209.92ce1"]]},{"id":"b0b220f2.3979a","type":"function","z":"e415e43d.f10178","name":"","func":"const prefix = global.get('settings.mongo.collectionPrefix');\n\n\nmsg.payload = { \n    model: `${prefix}Block`, \n    request: {},\n    options: {\n      sort: {number: -1},\n      limit: 1\n  }\n};\n\n\n\nreturn msg;","outputs":1,"noerr":0,"x":370,"y":240,"wires":[["8f1c1610.dae598"]]},{"id":"8f1c1610.dae598","type":"mongo","z":"e415e43d.f10178","model":"","request":"{}","options":"{}","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":530,"y":240,"wires":[["e558bff.7e2784"]]},{"id":"468f737c.263d3c","type":"debug","z":"e415e43d.f10178","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"error","x":520,"y":700,"wires":[]},{"id":"dda43659.db7bc8","type":"mongo","z":"e415e43d.f10178","model":"","request":"{}","options":"{}","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":1570,"y":480,"wires":[["2c57e7fe.271ee8"]]},{"id":"2c57e7fe.271ee8","type":"function","z":"e415e43d.f10178","name":"","func":"const _ = global.get('_');\n\nmsg.tx.timestamp = _.get(msg.payload, '0.timestamp', Date.now());\n\nmsg.payload = msg.tx;\n\nreturn msg;","outputs":1,"noerr":0,"x":1700,"y":480,"wires":[["6b2f3912.a09f08"]]},{"id":"9fc7219e.1fd74","type":"debug","z":"e415e43d.f10178","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":1090,"y":600,"wires":[]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.remove({"path":"e415e43d.f10178","type":"flows"}, done);
};
