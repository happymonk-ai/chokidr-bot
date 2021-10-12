const inquirer = require('inquirer');
import tr from "googletrans"
const trans = require("googletrans").default

let Bot = []
let User = []

// Sleep function
function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// Initial alert function
function Collision(){
    let text1 = 'ALERT! A collision has been detected to a vehicle.'
    console.log('Bot:', text1)
    Bot.push(text1)
    // sleep(2000)
}

// Location details
function collision_Location(){
    let text2 = 'The location of the incident is'
    console.log('Bot:', text2)
    // sleep(2000)
    Bot.push(text2)
}

// Collision details
function collision_Details(){
    let text3 = 'The following are the details fetched about the vehicle:'
    console.log('Bot:', text3)
    Bot.push(text3)
    // sleep(2000)
}

// live status
function collision_Livestatus(){
    let text4 = 'Please view the live status of the incident from your camera.'
    console.log('Bot:', text4)
    Bot.push(text4)
    // sleep(2000)
}

// Displaying Emergency Numbers
function collision_EmergencyNum(){
    let text5 = 'List of emergency numbers are:'
    console.log('Bot:', text5)
    Bot.push(text5)
    let message = ('For Ambulance dial 108\nFor Police Station dial 100')
    console.log(message)
    Bot.push(message)
    // sleep(2000)
}

// Checking whether the call is made
function collision_Call(){
    return new Promise((resolve, reject) => {
        let text6 = 'Do make a call immediately!'
        console.log('Bot:', text6)
        Bot.push(text6)
        let text7 = 'Have you informed the respective authorities regarding the incident?'
        // sleep(2000)   
        Bot.push(text7)
        inquirer
        .prompt([
            {
                type: "list",
                name: "channels",
                message: text7,
                choices: [{ name: "YES", value: 0 }, { name: "NO", value: 1 }]
            }
        ])
        .then((responses) => {
            if (responses.channels === 0) {
                let text17 = 'Donot worry the authorities will take care of the problem'
                console.log('Bot:',text17)
                Bot.push(text17)
                let text19 = 'YES'
                User.push(text19)
                resolve(collision_ProblemConfirmation())
            }
            else if (responses.channels === 1) {
                let text20 = 'NO'
                User.push(text20)
                resolve(collision_Call())
            }
        })
    })
    
}

// COnfirmation whether the problem is solved
function collision_ProblemConfirmation(){
    return new Promise((resolve, reject) => {
        let text9 = 'Can you please confirm that the problem has been taken care of?'
        // sleep(2000)
        Bot.push(text9)
        inquirer
        .prompt([
            {
                type: "list",
                name: "channels",
                message: text9,
                choices: [{ name: "YES, THE PROBLEM HAS BEEN RESOLVED", value: 0 }, { name: "NO, THE PROBLEM HAS NOT RESOLVED YET", value: 1 }]
            }
        ])
        .then((responses) => {
            if (responses.channels === 0) {
                let text8 = 'Great! I am glad that the problem has been taken careof!'
                resolve('Bot:'+ text8)
                Bot.push(text8)
                let text21 = 'YES, THE PROBLEM HAS BEEN RESOLVED'
                User.push(text21)
            }
            else if (responses.channels === 1) {
                let text18 = 'Okay, donot worry'
                console.log('Bot:', text18)
                Bot.push(text18)
                let text22 = 'NO, THE PROBLEM HAS NOT RESOLVED YET'
                User.push(text22)
                resolve(collision_ProblemConfirmation())
            }
        });
    })
}

// The End
function collision_End(){
    let text10 = 'Can we close our chat?'
    console.log('Bot:',text10)
    Bot.push(text10)
    let text11 = 'Great! Thank you and be safe! Have a good day!'
    // sleep(2000) 
    console.log('Bot:',text11)
    Bot.push(text11)
}


// async function Global(){
//     Collision()
//     collision_Location()
//     collision_Details()
//     collision_Livestatus()
//     collision_EmergencyNum()
//     await collision_Call()
//     collision_End()
//     console.log('The End')
//     console.log(Bot)
//     console.log(User)
// }



// Global()   

