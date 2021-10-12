import { Kafka } from "kafkajs";
const level = require('level-rocksdb')

const { create } = require('ipfs-http-client')
const client = create('/ip4/127.0.0.1/tcp/5002/http')

const db = level('./incident_db')

const kafka = new Kafka({
  clientId: "test-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });


const run = () => {
  return new Promise<string>((resolve, reject) => {
    // Connecting with incident_manager topic
    consumer.connect();
    consumer.subscribe({ topic: "incident_manager", fromBeginning: true });
    // Consuming messages from the topic
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try{
          const msg = message.value.toString() // CID
          console.log('\nMessage consumed from the topic: ', msg) 
          // Fetching the actual content from consumed CID
          const chunks = []
          for await (const chunk of client.cat(msg)) {
            chunks.push(chunk)
          }
          const data_str = Buffer.concat(chunks).toString()
          console.log('\nThe content of the message is: \n', data_str)
          // Converting string to object
          const data_dict = JSON.parse(data_str)
          // Getting incident id from the block
          const incident_id = data_dict['intialData']['incident']['id']     
          // Opening the db
          db.open(function (err){
            if (err) return console.log('Ooops!', err)
            console.log('\nDb is opened')
          })    
            // Pushing the id and block as key-value pairs
            db.put(incident_id, data_str, function (err){
              if (err) return console.log('Ooops!', err)
              else console.log('\nItems are added to the db')
            })
              // Closing the db
              db.close(function (err){
                if (err) return console.log('Ooops!', err)
                else console.log('Db is closed')
              }) 
        }catch(error){
          console.log('Error uploading file: ', error)
        }
      }
    });
  })
}

run()


