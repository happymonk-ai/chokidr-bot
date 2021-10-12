import document = require('../Functions_and_interfaces/document_block');
import convo_block = require('../Functions_and_interfaces/convo_block');
import * as functions from '../Functions_and_interfaces/functions'


const level = require('level-rocksdb')
const { create } = require('ipfs-http-client')
const client = create('/ip4/127.0.0.1/tcp/5002/http')

const db = level('./incident_db')

async function db_process(){
    try{
        console.log("\nThe processing of items in the db started")
        const collision_list = []
        // Opening the db
        db.open(function (err){
            if (err) return console.log('Ooops!', err)
            console.log('\nDb is opened')
        })
        // Fetching all the items from the db
        db.createReadStream()
            .on('data', function (data) {
                collision_list.push(data)
                // console.log(data)
            })
            .on('end', function () {
                console.log('\nStream ended')
                console.log('\nThe items in the db are:\n', collision_list)
            
            try{   
                        // Fetching the last item from db
                        var item = collision_list.pop()
                        var key_name = item.key // Fetching the key from the item (key => incident_id)
                        var incident_block = item['value'] // Fetching the value from the item (value => incident block)
                        console.log('\nThe Name Key for this incident is', key_name)
                        console.log('\nThe Incident Block:\n', incident_block)
                        // Opening the db
                        db.open(function (err){
                            if (err) return console.log('Ooops!', err)
                            console.log('\nDb is opened')
                            // Deleting the popped out key from db
                            db.del(key_name, function (err) {
                                if (err) return console.log('Ooops!', err)
                                console.log('\nThe key-value pair of ' + key_name + ' is deleted from the db')
                            });
                                // Closing the db
                                db.close(function (err){
                                    if (err) return console.log('Ooops!', err)
                                    else console.log('\nDb is closed')
                                    function_process(key_name, incident_block)
                                })
                            })

                }catch(error){
                    db.close(function (err){
                        if (err) return console.log('Ooops!', err)
                        else console.log('Db is empty \nDb is closed')
                        function_process(key_name, incident_block)
                    })
                    console.log(error)
                }
        })
    }catch(error){
        console.log(error)
      } 
}

export async function function_process(key, block){
    try{
        const key_name = key // Storing the keyname (incident_id)
        const incident_block = JSON.parse(block) // Storing the incident block
        const incident_type = incident_block['intialData']['incident']['type'] // Storing the incident_type
        const chain = [] // Initializing the Blockchain
        var initial_doc = document() // Fetching the JSON object for initial document
        console.log("\nINITIAL DOCUMENT:\n", initial_doc)
        const document_incidentblock = functions.document_incidentUpdation(initial_doc, incident_block) // Updation of initial document with incident block
        console.log("DOCUMENT AFTER UPDATING WITH INCIDENT BLOCK:\n", document_incidentblock)
        var name_key = await functions.createNamekey(key_name) // Creation of Namekey
        console.log("NAME KEY:\n", name_key) 
        const document_cid = await functions.publish_block(document_incidentblock, name_key) // Publishing the block under the Namekey in IPFS
        console.log('\nDocument CID:', document_cid)
        functions.Blockchain(document_incidentblock, chain) // Adding the updated document to Blockchain with previous link as 0
        const conversation_block = convo_block() // Fetching the JSON object for initial conversation block
        console.log('\nConversation block:\n', conversation_block)
        const conversation_block_cid = await functions.publish_block(conversation_block, name_key) // Publishing the block under the Namekey in IPFS
        console.log('Conversation Block CID:\n', conversation_block_cid)
        const document_convoblock = await functions.document_convoUpdation(document_cid, conversation_block_cid) // Updation of document with conversation block
        console.log('\nDOCUMENT AFTER UPDATING WITH CONVERSATION BLOCK:\n', document_convoblock)
        const new_document_cid = await functions.publish_block(document_convoblock, name_key) // Publishing the updated document block in IPFS
        console.log('\nNEW DOCUMENT CID: ', new_document_cid)
        functions.Blockchain(document_convoblock, chain) // Adding the updated document to Blockchain, with previous link as it's previous document CID
        // Based on the incident type the respective conversation flow takes place
        if (incident_type == "blacklisted_vehicle"){
            await functions.Update_Blv_Conversation(conversation_block_cid, new_document_cid, name_key, chain)
        }
        if (incident_type == "blacklisted_person"){
            await functions.Update_Blp_Conversation(conversation_block_cid, new_document_cid, name_key, chain)
        }
        if (incident_type == "unknown_person"){
            await functions.Update_ukp_Conversation(conversation_block_cid, new_document_cid, name_key, chain)
        }

    }catch(error){
        console.log(error)
    }
}

setInterval(db_process, 15000)