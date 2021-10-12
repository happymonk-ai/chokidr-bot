const { create } = require('ipfs-http-client')
const client = create('/ip4/127.0.0.1/tcp/5002/http')

import * as blv from '../conversation_flows/blacklisted_vehicle'
import * as blp from '../conversation_flows/blacklisted_person'
import * as ukp from '../conversation_flows/unknown_person'

// Function for updating the initial document with incident block
export function document_incidentUpdation(document, block){
    document ['document'] = block
    return document
}

// Function for creating Namekey for IPFS
export async function createNamekey(key_name: string){
    const keyname = key_name
    try{
        const key_gen = await client.key.gen(keyname, {
            type: 'ed25519',
            size: 2048
        })
        var name_key: string = key_gen['name']
        return name_key
    }catch(error){
        console.log('Keyname Already exists')
        var name_key = keyname
        return name_key
    }
}

// Function for publishing a block under IPFS
export async function publish_block(document: object, name_key){
    const doc = JSON.stringify(document)
    const res = await client.add(doc)
    const path2 = res.cid
    const path1 = '/ipfs/'
    const path = path1.concat(path2)
    console.log('\nPublishing to IPFS')
    const res1 = await client.name.publish(path, name_key)
    console.log('\nIPNS Name ID:', res1)
    return (res) 
}

// Function for adding Document block to Blockchain
export function Blockchain(document, chain){
    chain.push(document)
    console.log('\nBlockchain: \n', chain)
}

// Function for executing and updating the document with conversation block
export async function document_convoUpdation(document_cid, conversation_block_cid){
    const chunks1 = []
    for await (const chunk of client.cat(document_cid.path)) {
        chunks1.push(chunk)
    }
    var data = Buffer.concat(chunks1).toString()
    var document_block = JSON.parse(data)
  
    const chunks2 = []
    for await (const chunk of client.cat(conversation_block_cid.path)) {
      chunks2.push(chunk)
    }
    var data = Buffer.concat(chunks2).toString()
    var conversation_block = JSON.parse(data)
  
    document_block['document']['chatInformation'] = conversation_block
    document_block['previousLink'] = document_cid.path
    return document_block
}

// Function for executing and updating the document with Blacklisted_vehicle conversation flow
export async function Update_Blv_Conversation(conversation_block_cid, new_document_cid, name_key, chain){
    const chunks1 = []
    for await (const chunk of client.cat(conversation_block_cid.path)) {
      chunks1.push(chunk)
    }
    var data = Buffer.concat(chunks1).toString()
    var conversation_block = JSON.parse(data)
  
    await blv.Blv_alert()
    BOT = blv.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid1 = await publish_block(conversation_block, name_key)
    var new_document1 = await document_convoUpdation(new_document_cid, new_conversation_cid1)
    var document_cid_new1 = await publish_block(new_document1, name_key)
    Blockchain(new_document1, chain)
  
    await blv.Blv_location()
    var BOT = blv.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid2 = await publish_block(conversation_block, name_key)
    var new_document2 = await document_convoUpdation(document_cid_new1, new_conversation_cid2)
    var document_cid_new2 = await publish_block(new_document2, name_key)
    Blockchain(new_document2, chain)
  
    await blv.Blv_details()
    var BOT = blv.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid3 = await publish_block(conversation_block, name_key)
    var new_document3 = await document_convoUpdation(document_cid_new2, new_conversation_cid3)
    var document_cid_new3 = await publish_block(new_document3, name_key)
    Blockchain(new_document3, chain)
  
    await blv.Blv_live_status()
    var BOT = blv.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid4 = await publish_block(conversation_block, name_key)
    var new_document4 = await document_convoUpdation(document_cid_new3, new_conversation_cid4)
    var document_cid_new4 = await publish_block(new_document4, name_key)
    Blockchain(new_document4, chain)
  
}

// Function for executing and updating the document with Blacklisted_person conversation flow
export async function Update_Blp_Conversation(conversation_block_cid, new_document_cid, name_key, chain){
    const chunks1 = []
    for await (const chunk of client.cat(conversation_block_cid.path)) {
      chunks1.push(chunk)
    }
    var data = Buffer.concat(chunks1).toString()
    var conversation_block = JSON.parse(data)
  
    await blp.Blp_alert()
    var BOT = []
    BOT = blp.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid1 = await publish_block(conversation_block, name_key)
    var new_document1 = await document_convoUpdation(new_document_cid, new_conversation_cid1)
    var document_cid_new1 = await publish_block(new_document1, name_key)
    Blockchain(new_document1, chain)
  
    await blp.Blp_location()
    var BOT = blp.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid2 = await publish_block(conversation_block, name_key)
    var new_document2 = await document_convoUpdation(document_cid_new1, new_conversation_cid2)
    var document_cid_new2 = await publish_block(new_document2, name_key)
    Blockchain(new_document2, chain)
  
    await blp.Blp_details()
    var BOT = blp.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid3 = await publish_block(conversation_block, name_key)
    var new_document3 = await document_convoUpdation(document_cid_new2, new_conversation_cid3)
    var document_cid_new3 = await publish_block(new_document3, name_key)
    Blockchain(new_document3, chain)
  
    await blp.Blp_live_status()
    var BOT = blp.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid4 = await publish_block(conversation_block, name_key)
    var new_document4 = await document_convoUpdation(document_cid_new3, new_conversation_cid4)
    var document_cid_new4 = await publish_block(new_document4, name_key)
    Blockchain(new_document4, chain)

    await blp.Blp_check()
    var BOT = blp.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid5 = await publish_block(conversation_block, name_key)
    var new_document5 = await document_convoUpdation(document_cid_new4, new_conversation_cid5)
    var document_cid_new5 = await publish_block(new_document5, name_key)
    Blockchain(new_document5, chain)
  
}

// Function for updating the document with Unknown_person conversation flow
export async function Update_ukp_Conversation(conversation_block_cid, new_document_cid, name_key, chain){
    const chunks1 = []
    for await (const chunk of client.cat(conversation_block_cid.path)) {
      chunks1.push(chunk)
    }
    var data = Buffer.concat(chunks1).toString()
    var conversation_block = JSON.parse(data)
  
    await ukp.Ukp_alert()
    var BOT = []
    BOT = ukp.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid1 = await publish_block(conversation_block, name_key)
    var new_document1 = await document_convoUpdation(new_document_cid, new_conversation_cid1)
    var document_cid_new1 = await publish_block(new_document1, name_key)
    Blockchain(new_document1, chain)
  
    await ukp.Ukp_location()
    var BOT = ukp.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid2 = await publish_block(conversation_block, name_key)
    var new_document2 = await document_convoUpdation(document_cid_new1, new_conversation_cid2)
    var document_cid_new2 = await publish_block(new_document2, name_key)
    Blockchain(new_document2, chain)
  
    await ukp.Ukp_live_status()
    var BOT = ukp.Bot
    conversation_block['conversation_data']['BOT'] = BOT
    console.log('CONVERSATION BLOCK: \n',conversation_block)
    var new_conversation_cid3 = await publish_block(conversation_block, name_key)
    var new_document3 = await document_convoUpdation(document_cid_new2, new_conversation_cid3)
    var document_cid_new3 = await publish_block(new_document3, name_key)
    Blockchain(new_document3, chain)
  
}
