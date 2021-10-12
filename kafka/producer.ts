import { Kafka } from "kafkajs";
import block1 = require('../Functions_and_interfaces/activity_block');

const { create } = require('ipfs-http-client')
const client = create('/ip4/127.0.0.1/tcp/5002/http')

const kafka = new Kafka({
  clientId: "test-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer({
  maxInFlightRequests: 1,
  idempotent: true,
  transactionalId: "uniqueProducerId",
});

// Fetching the Json object for 3 activity types
const input1 = block1("blacklisted_person")
const input2 = block1("blacklisted_vehicle")
const input3 = block1("unknown_person")

async function sendPayload(input: string) {
  try {
    // Sending the CIDs to incident_manager topic
    await producer.send({
      topic: "incident_manager",
      messages: [{ key: "incident_manager", value: input }],
    });
    console.log('Message sent to Incident Manager topic')
  } catch (e) {
    console.error("Caught Error while sending:", e);
  }
}

async function main() {
  await producer.connect(); // Connecting with producer
  try {
    const json_str1 = JSON.stringify(input1) // Converting json object to string
    const json_str2 = JSON.stringify(input2)
    const json_str3 = JSON.stringify(input3)
    const res1 = await client.add(json_str1) // Publishing the string to IPFS
    const res2 = await client.add(json_str2)
    const res3 = await client.add(json_str3)
    console.log('Uploaded to IPFS: \n', res1)
    console.log('Uploaded to IPFS: \n', res2)
    console.log('Uploaded to IPFS: \n', res3)
    const cid1 = res1.path // Getting the CID
    const cid2 = res2.path
    const cid3 = res3.path
    await sendPayload(cid1) 
    await sendPayload(cid2)
    await sendPayload(cid3)
  } catch(error){
    console.log('Error uploading file: ', error)
  }
}

setInterval(main, 70000)

// main()
