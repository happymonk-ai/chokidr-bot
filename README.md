# chokidr-bot

Packages to be installed: <br />
1. Kafkajs - https://www.npmjs.com/package/kafkajs<br />
2. Rocksdb - https://www.npmjs.com/package/level-rocksdb<br />
3. jsipfs - https://github.com/ipfs/js-ipfs<br />
4. js-ipfs-http-client - https://www.npmjs.com/package/ipfs-http-client<br />
5. inquirer - https://www.npmjs.com/package/@types/inquirer

## To run:<br />
```
git clone https://github.com/happymonk-ai/chokidr-bot
cd chokidr-bot
cd kafka
ts-node producer.ts
```
Open another terminal
```
ts-node consumer.ts
```
Open another terminal
```
ts-node process.ts
```
