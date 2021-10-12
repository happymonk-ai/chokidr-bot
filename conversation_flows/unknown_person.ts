import * as uk_person from './dialogues'

// const tr = require("googletrans").default

export let Bot = []
// let lang = 'en'

// Sleep function
function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// Initial alert function
export async function Ukp_alert(){
    try{
        // const result1 = await tr(uk_person.text25, lang)
        Bot = []
        const res1 = uk_person.text25
        console.log('BOT: ' + res1)
        Bot.push(res1)
        sleep(2000)
    }catch (error) {
        console.log(error)
    } 

}

// Person location
export async function Ukp_location(){
    try{
        // const result2 = await tr(uk_person.text26, lang)
        const res2 = uk_person.text26
        console.log('BOT: ' + res2)
        Bot.push(res2)
        sleep(2000)
    }catch (error) {
        console.log(error)
    } 

}

// Live status of the person
export async function Ukp_live_status(){
    try{
        // const result3 = await tr(uk_person.text28, lang)
        const res3 = uk_person.text28
        console.log('BOT: ' + res3)
        Bot.push(res3)
        sleep(2000)
    }catch (error) {
        console.log(error)
    } 

}

