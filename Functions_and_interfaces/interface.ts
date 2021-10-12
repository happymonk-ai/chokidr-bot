// Interface for Incident block
export interface IIncident{
    intialData:{
            location:{
                id?:string
                latitude:string
                longitude:string
                direction:string
                timestamp:number
            }
            media:{
            id:string
            timestamp:number
            devicedid:string
            meta:{

            }
            link:{ 

            }
        }
    isVerified:string
    meta:{
            
    }
    incident:{
        id:string
        type:string
        locationid:string

    }
}
}

// Interface for ChatConversation block
export interface ChatInfo {
    id:string
    conversation:{
            id:string
            fromid:string
            toid:string
        },
        conversation_data:{
            BOT: [],
            CLIENT: []
        }
     
    }

// Interface for Document block
export interface Document {
    id:string
    previousLink:string
    document?:{
        intialData: object
        registrationType:string
        media:{
            id:string
        }
        chatInformation:{
            id: string
            conversation:{
                    id: string,
                    fromid: string,
                    toid: string
                  },
                  conversation_data:
                  {
                      BOT: []
                      CLIENT: []
                  }
            
        }
        registrationVerificationBlock:{
            timestamp:number
            id:string
            content:{
                payload:string
                verificiationPayload:string
            }
            signature:string

        }
    }
}
