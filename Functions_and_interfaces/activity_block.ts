import {IIncident} from './interface';

import { nanoid } from 'nanoid';

// Json object for activity block
function block1(type: string){
  var input: IIncident = {
      "intialData":{
        "location":{
          "id": nanoid(),
          "latitude": "12.9516° N",
          "longitude": "80.1462° E",
          "direction": "",
          "timestamp": new Date().getTime()
        },
        "media":{
          "id": nanoid(),
          "timestamp": new Date().getTime(),
          "devicedid": "Wi0Dr6A82-62CxHMyAJzlcVs",
          "meta":{

          },
          "link":{ 

          }
        },
        "isVerified": "Yes",
      "meta":{

      },
      "incident":{
        "id": nanoid(),
        "type": type,
        "locationid": nanoid()
      }
  }
}
  return input
}

export = block1

