
module.exports.id = '24.715242fa.0f30cc';

const _ = require('lodash'),
  config = require('../config');

/**
 * @description flow 715242fa.0f30cc update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.update({"path":"715242fa.0f30cc","type":"flows"}, {
    $set: {"path":"715242fa.0f30cc","body":[{"id":"dae53938.6a5788","type":"http in","z":"715242fa.0f30cc","name":"get issues","url":"/events/mint/issues","method":"get","upload":false,"swaggerDoc":"","x":140,"y":800,"wires":[["7599a7c7.ef02d8"]]},{"id":"fba92297.c0015","type":"function","z":"715242fa.0f30cc","name":"transform params","func":"const _ = global.get('_');\n\n\nconst issueCriteria = _.chain(msg.payload.criteria)\n.toPairs()\n.filter(pair=>pair[0].includes('issue.'))\n.map(pair=>[[pair[0].replace('issue.', '')], pair[1]])\n.fromPairs()\n.value();\n\n\nconst revokeCriteria = _.chain(msg.payload.criteria)\n.toPairs()\n.filter(pair=>pair[0].includes('revoke.'))\n.map(pair=>[[pair[0].replace('revoke.', '')], pair[1]])\n.fromPairs()\n.value();\n\nmsg.payload = [\n    {\n        model: 'Issue',\n        request: issueCriteria\n    }, \n    {\n        model: 'Revoke',\n        request: revokeCriteria\n    }\n    ];\n\nreturn msg;","outputs":1,"noerr":0,"x":530,"y":800,"wires":[["e52ccb7.5812c38"]]},{"id":"f9b66a2b.4dd4b8","type":"http response","z":"715242fa.0f30cc","name":"","statusCode":"","headers":{},"x":1670,"y":800,"wires":[]},{"id":"b6aeac66.5b3b","type":"mongo","z":"715242fa.0f30cc","model":"","request":"","options":"","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":1010,"y":800,"wires":[["26cedbc6.064bf4"]]},{"id":"f468e86d.4cf568","type":"catch","z":"715242fa.0f30cc","name":"","scope":null,"x":510,"y":993.5,"wires":[["b53100b1.0c42c"]]},{"id":"3ba287.add9cd7a","type":"http response","z":"715242fa.0f30cc","name":"","statusCode":"","x":967,"y":994.5,"wires":[]},{"id":"b53100b1.0c42c","type":"function","z":"715242fa.0f30cc","name":"transform","func":"\nlet factories = global.get(\"factories\"); \n\nmsg.payload = factories.messages.generic.fail;\n    \nreturn msg;","outputs":1,"noerr":0,"x":751,"y":993.5,"wires":[["3ba287.add9cd7a"]]},{"id":"e52ccb7.5812c38","type":"split","z":"715242fa.0f30cc","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":730,"y":800,"wires":[["55bc911d.4e76b"]]},{"id":"5ca901f2.544a1","type":"join","z":"715242fa.0f30cc","name":"","mode":"auto","build":"string","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":"false","timeout":"","count":"","x":1330,"y":800,"wires":[["ed265c86.9e247"]]},{"id":"26cedbc6.064bf4","type":"function","z":"715242fa.0f30cc","name":"","func":"\n\nmsg.payload = {\n  type: msg.type,\n  items: msg.payload\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":1164,"y":800,"wires":[["5ca901f2.544a1"]]},{"id":"55bc911d.4e76b","type":"function","z":"715242fa.0f30cc","name":"","func":"\nmsg.type = msg.payload.model;\n\n\nreturn msg;","outputs":1,"noerr":0,"x":870,"y":800,"wires":[["b6aeac66.5b3b"]]},{"id":"ed265c86.9e247","type":"function","z":"715242fa.0f30cc","name":"","func":"const _ = global.get('_');\n\n\nmsg.payload = _.chain(msg.payload)\n.map(set=> \n    set.items.map(item=>\n    _.merge(item, {type: set.type})\n    )\n)\n.flattenDeep()\n.orderBy('created', 'desc');\n\nreturn msg;","outputs":1,"noerr":0,"x":1490,"y":800,"wires":[["f9b66a2b.4dd4b8"]]},{"id":"7599a7c7.ef02d8","type":"query-to-mongo","z":"715242fa.0f30cc","request_type":"0","name":"query-to-mongo","x":320,"y":800,"wires":[["fba92297.c0015"]]},{"id":"e528ad58.b7364","type":"http in","z":"715242fa.0f30cc","name":"get assets","url":"/events/mint/assets","method":"get","upload":false,"swaggerDoc":"","x":140,"y":480,"wires":[["bd7f0f07.0d43d"]]},{"id":"bd7f0f07.0d43d","type":"query-to-mongo","z":"715242fa.0f30cc","request_type":"0","name":"query-to-mongo","x":320,"y":480,"wires":[["dc74de04.1149d"]]},{"id":"dc74de04.1149d","type":"function","z":"715242fa.0f30cc","name":"transform params","func":"const _ = global.get('_');\n\nmsg.account= msg.payload.criteria.account;\nmsg.payload = \n    {\n        model: 'OwnershipChange',\n        request: {\n            $or:[\n                {to: msg.payload.criteria.account},\n                 {from: msg.payload.criteria.account},\n                ]\n        },\n    };\n\nreturn msg;","outputs":1,"noerr":0,"x":530,"y":480,"wires":[["68e09eac.dbda6"]]},{"id":"68e09eac.dbda6","type":"mongo","z":"715242fa.0f30cc","model":"","request":"","options":"","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":760,"y":480,"wires":[["b0d1fd83.9051c"]]},{"id":"552fd592.3470ac","type":"http response","z":"715242fa.0f30cc","name":"","statusCode":"","headers":{},"x":1350,"y":560,"wires":[]},{"id":"b0d1fd83.9051c","type":"function","z":"715242fa.0f30cc","name":"sort","func":"const _ = global.get('_');\n\nlet items = {};\nconst zero = \"0x0000000000000000000000000000000000000000\";\n\nmsg.payload = msg.payload.sort((a, b) => {\n    if (a.created === b.created) {\n      return a.from !== zero\n    }\n    return a.created > b.created\n  })\n  .map((item) => {\n    items[item.symbol] = item\n  });\n\nObject.keys(items)\n  .map((key) => {\n    const item = items[key]\n    if (item.to !== msg.account) {\n        delete items[key]\n    }\n  });\n\nmsg.symbols = [...Object.keys(items)];\nreturn msg;","outputs":1,"noerr":0,"x":950,"y":480,"wires":[["be2bb8b6.bc2268"]]},{"id":"be2bb8b6.bc2268","type":"function","z":"715242fa.0f30cc","name":"transform params","func":"msg.payload = [{\n    model: 'AssetCreated',\n    request: {\n      symbol: {\n        $in: msg.symbols,\n      }\n    },\n  },\n  {\n    model: 'Issue',\n    request: {\n      symbol: {\n        $in: msg.symbols,\n      }\n    }\n  },\n  {\n    model: 'Revoke',\n    request: {\n      symbol: {\n        $in: msg.symbols,\n      }\n    }\n  },\n];\n\nreturn msg","outputs":1,"noerr":0,"x":170,"y":560,"wires":[["9c6ecd1b.dd176"]]},{"id":"cbf2fd79.e4a1f","type":"mongo","z":"715242fa.0f30cc","model":"","request":"","options":"","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":640,"y":560,"wires":[["2da20a5a.65e426"]]},{"id":"9c6ecd1b.dd176","type":"split","z":"715242fa.0f30cc","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":350,"y":560,"wires":[["fc473d9f.c5ba6"]]},{"id":"fc473d9f.c5ba6","type":"function","z":"715242fa.0f30cc","name":"add type","func":"\nmsg.type = msg.payload.model;\n\n\nreturn msg;","outputs":1,"noerr":0,"x":500,"y":560,"wires":[["cbf2fd79.e4a1f"]]},{"id":"2da20a5a.65e426","type":"function","z":"715242fa.0f30cc","name":"concat with type","func":"\n\nmsg.payload = {\n  type: msg.type,\n  items: msg.payload\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":830,"y":560,"wires":[["5c90e1dc.6a62c"]]},{"id":"5c90e1dc.6a62c","type":"join","z":"715242fa.0f30cc","name":"","mode":"auto","build":"string","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":"false","timeout":"","count":"","x":1030,"y":560,"wires":[["6c8d7487.1f9f5c"]]},{"id":"6c8d7487.1f9f5c","type":"function","z":"715242fa.0f30cc","name":"result","func":"const _ = global.get('_');\n\nlet issues = {}\nconst res = _.chain([msg.payload[1], msg.payload[2]])\n  .map(set =>\n    set.items.map(item =>\n      _.merge(item, {\n        type: set.type\n      })\n    )\n  )\n  .flattenDeep()\n  .orderBy('created', 'asc')\n  .value()\n  .map((item) => {\n    if (!issues[item.symbol]) {\n      issues[item.symbol] = 0;\n    }\n    if (item.type === 'Issue') {\n      issues[item.symbol] += item.value;\n    } else {\n      issues[item.symbol] -= item.value;\n    }\n  });\n\nmsg.payload = msg.payload[0].items // assets\n  .map((item) => {\n    item.totalSupply = issues[item.symbol] || 0;\n    return item;\n  });\n\nreturn msg;","outputs":1,"noerr":0,"x":1190,"y":560,"wires":[["552fd592.3470ac"]]},{"id":"1d9811f6.184dde","type":"http in","z":"715242fa.0f30cc","name":"get blacklist","url":"/events/mint/blacklist","method":"get","upload":false,"swaggerDoc":"","x":150,"y":280,"wires":[["b3b3ce8.a2c5a3"]]},{"id":"f7955ff6.a728d","type":"function","z":"715242fa.0f30cc","name":"transform params","func":"msg.payload = [{\n    model: 'Restricted',\n    request: {\n      symbol: msg.payload.criteria.symbol,\n    }\n  },\n  {\n    model: 'Unrestricted',\n    request: {\n      symbol: msg.payload.criteria.symbol,\n    }\n  }\n];\n\nreturn msg;","outputs":1,"noerr":0,"x":550,"y":280,"wires":[["49e1e3df.388e1c"]]},{"id":"e0594619.f46c78","type":"http response","z":"715242fa.0f30cc","name":"","statusCode":"","x":1710,"y":280,"wires":[]},{"id":"f9f6e468.4c7b48","type":"mongo","z":"715242fa.0f30cc","model":"","request":"","options":"","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":1040,"y":280,"wires":[["daa0048b.d86888"]]},{"id":"49e1e3df.388e1c","type":"split","z":"715242fa.0f30cc","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":730,"y":280,"wires":[["65083535.bbefcc"]]},{"id":"d93d610b.ad386","type":"join","z":"715242fa.0f30cc","name":"","mode":"auto","build":"string","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":"false","timeout":"","count":"","x":1430,"y":280,"wires":[["e4aacb47.2e6228"]]},{"id":"daa0048b.d86888","type":"function","z":"715242fa.0f30cc","name":"concat type and items","func":"\n\nmsg.payload = {\n  type: msg.type,\n  items: msg.payload\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":1240,"y":280,"wires":[["d93d610b.ad386"]]},{"id":"65083535.bbefcc","type":"function","z":"715242fa.0f30cc","name":"add type","func":"\nmsg.type = msg.payload.model;\n\n\nreturn msg;","outputs":1,"noerr":0,"x":880,"y":280,"wires":[["f9f6e468.4c7b48"]]},{"id":"e4aacb47.2e6228","type":"function","z":"715242fa.0f30cc","name":"result","func":"const _ = global.get('_');\n\nlet blacklist = {};\nconst res = _.chain(msg.payload)\n  .map(set =>\n    set.items.map(item => {\n      const isRestricted = set.type === 'Restricted';\n      return {\n        isRestricted,\n        created: item.created,\n        address: isRestricted ? item.restricted : item.unrestricted,\n      };\n    })\n  )\n  .flattenDeep()\n  .orderBy('created', 'desc')\n  .value()\n  .map((item) => {\n    if (!blacklist[item.address]) {\n      blacklist[item.address] = {\n        isRestricted: item.isRestricted,\n        address: item.address,\n      };\n    }\n  });\n\nmsg.payload = [];\nObject.values(blacklist).map((item) => {\n  if (item.isRestricted) {\n    msg.payload.push(item.address);\n  }\n});\n\nreturn msg;","outputs":1,"noerr":0,"x":1570,"y":280,"wires":[["e0594619.f46c78"]]},{"id":"b3b3ce8.a2c5a3","type":"query-to-mongo","z":"715242fa.0f30cc","request_type":"0","name":"query-to-mongo","x":340,"y":280,"wires":[["f7955ff6.a728d"]]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.remove({"path":"715242fa.0f30cc","type":"flows"}, done);
};
