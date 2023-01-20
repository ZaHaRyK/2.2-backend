import { getModeForUsageLocation } from "typescript"

const nodefetch = require('node-fetch')

interface intip {
    ip: string
}
async function getIp(link: string, callback: (ip: string) => void): Promise<intip> {
    const request: Response = await nodefetch(link)
    const response: intip = await request.json()
    callback(returnIp(response))
    return response
}

function returnIp(data: intip) {
    return data.ip
}

getIp('https://api.ipify.org/?format=json', (ip => {
    console.log(`${ip}`)
}))
//
//
//
interface intRandom {
    id: number
    female_first_name: string
    first_name: string
    four_word_name: string
    initials: string
    last_name: string
    male_first_name: string
    middle_name: string
    name: string
    name_with_initials: string
    name_with_middle: string
    prefix: string
    two_word_name: string
    uid: string
}

async function getRandomName(link: string): Promise<intRandom> {
    const request: Response = await nodefetch(link)
    const response: intRandom = await request.json()
    return response
}

let AllUser: any[] = []

AllUser[0] = getRandomName('https://random-data-api.com/api/name/random_name')
AllUser[1] = getRandomName('https://random-data-api.com/api/name/random_name')
AllUser[2] = getRandomName('https://random-data-api.com/api/name/random_name')



Promise.all(AllUser).then(res => {
    res.forEach(item => {
        console.log(`With Promise.all and AsyncAwait - ${item.name}`)
    })
})



async function AsAw() {
    for (let i = 0; i < AllUser.length; i++) {
        let user: intRandom = await AllUser[i]
        console.log(`Without Promise.all but with AsyncAwait - ${user.name}`)
    }
}
AsAw()


for(let i = 0; i < AllUser.length; i++) {
    AllUser[i].then((res: intRandom) => {
        console.log(`Only promises - ${res.name}`)
    })
}
//
//
//
interface genders{
    first_name:string
    last_name:string
    gender:string
}

function checkGEnder(human:genders): boolean{
    return human.gender == 'Female'
}

async function getGenderAsyncAwait(link:string){
    const request:Response = await nodefetch(link)
    const response: genders = await request.json()
    let human = checkGEnder(response)
    if (human){
        console.log(`✅AsyncAwait => first name - ${response.first_name}, last name - ${response.last_name}, gender - ${response.gender}`)
    }
    else{
        console.log('❌')
        getGenderAsyncAwait(link)
    }
}


function getGenderPromise(link:string){
    nodefetch(link).then((request: Response)=>request.json()).then((response: genders)=>{
        let human = checkGEnder(response)
        if(human){
            console.log(`✅Promise => first name - ${response.first_name}, last name - ${response.last_name}, gender - ${response.gender}`)
        }
        else{
            console.log('❌')
            getGenderPromise(link)
        }
    })
}
getGenderAsyncAwait('https://random-data-api.com/api/users/random_user')
getGenderPromise('https://random-data-api.com/api/users/random_user')
//
//
//
function Callback(ip: string, callback: (ip: string) => void) {
    callback(`${ip}`)
}
async function Getip(link : string) {
    const request : Response = await nodefetch(link)
    const response : intip = await request.json()
    Callback(response.ip, (ip) => {console.log(ip)})
}
Getip('https://api.ipify.org/?format=json')
//
//
//
async function retip(ip : string) : Promise<string> {
    return ip
}
async function F2(callback: (link: string) => Promise<string>) {
    const request: Response = await nodefetch('https://api.ipify.org/?format=json')
    const response: intip = await request.json()
    await callback(response.ip)
    console.log(response.ip)
}

F2((ip): Promise<string> => {
    return retip(ip)
})