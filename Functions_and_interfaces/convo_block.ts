import { ChatInfo } from './interface';
import { nanoid } from 'nanoid';

// Json object for initial conversation block
function convo_block(){
    var input3: ChatInfo = {
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
      }
      return input3
    }
    

  export = convo_block