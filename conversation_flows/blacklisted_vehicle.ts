import * as bl_vehicle from './dialogues'

// const tr = require("googletrans").default

export let Bot = []
// export let lang = 'en'

// Sleep function
function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// Initial alert function
export async function Blv_alert(){
    try{
        // const result1 = await tr(bl_vehicle.text29, lang)
        Bot = []
        const res1 = bl_vehicle.text29
        console.log('BOT: ' + res1)
        Bot.push(res1)
        sleep(2000)
    }catch (error) {
        console.log(error)
    } 

}

// Location details
export async function Blv_location(){
    try{
        // const result2 = await tr(bl_vehicle.text30, lang)
        const res2 = bl_vehicle.text30
        console.log('BOT: ' + res2)
        Bot.push(res2)
        sleep(2000)
    }catch (error) {
        console.log(error)
    } 

}

// Vehicle details
export async function Blv_details(){
    try{
        // const result3 = await tr(bl_vehicle.text3, lang)
        const res3 = bl_vehicle.text3
        console.log('BOT: ' + res3)
        Bot.push(res3)
        sleep(2000)
    }catch (error) {
        console.log(error)
    } 
}

// live status
export async function Blv_live_status(){
    try{
        // const result4 = await tr(bl_vehicle.text34, lang)
        const res4 = bl_vehicle.text34
        console.log('BOT: ' + res4)
        Bot.push(res4)
        sleep(2000)
    }catch (error) {
        console.log(error)
    } 

}

// Make a check
export async function Blv_check(){
    try{
        // const result5 = await tr(bl_vehicle.text27, lang)
        const res5 = bl_vehicle.text27
        console.log('BOT: ' + res5)
        Bot.push(res5)
        sleep(2000)
    }catch (error) {
        console.log(error)
    } 

}