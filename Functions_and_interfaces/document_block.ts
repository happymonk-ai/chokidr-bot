import {Document} from './interface'
import { nanoid } from 'nanoid';

// Json object for initial document block
function document(){
    var input1: Document = {
        "id": nanoid(),
        "previousLink": '0',
        "document":{
            "intialData":{},
            "registrationType": "",
            "media":{
                "id": nanoid()
            },
            "chatInformation":{
                "id": nanoid(),
                "conversation":{
                    "id": nanoid(),
                    "fromid": nanoid(),
                    "toid": nanoid()
                  },
                  "conversation_data":
                  {
                      "BOT": [],
                      "CLIENT": []
                  }
              },
            "registrationVerificationBlock":{
                "timestamp": new Date().getTime(),
                "id": nanoid(),
                "content":{
                    "payload": "",
                    "verificiationPayload": ""
                },
                "signature": ""    
            }
        }

    }
    return input1
}

export = document