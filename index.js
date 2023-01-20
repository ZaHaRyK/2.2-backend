"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodefetch = require('node-fetch');
function getIp(link, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield nodefetch(link);
        const response = yield request.json();
        callback(returnIp(response));
        return response;
    });
}
function returnIp(data) {
    return data.ip;
}
getIp('https://api.ipify.org/?format=json', (ip => {
    console.log(`${ip}`);
}));
function getRandomName(link) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield nodefetch(link);
        const response = yield request.json();
        return response;
    });
}
let AllUser = [];
AllUser[0] = getRandomName('https://random-data-api.com/api/name/random_name');
AllUser[1] = getRandomName('https://random-data-api.com/api/name/random_name');
AllUser[2] = getRandomName('https://random-data-api.com/api/name/random_name');
Promise.all(AllUser).then(res => {
    res.forEach(item => {
        console.log(`With Promise.all and AsyncAwait - ${item.name}`);
    });
});
function AsAw() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < AllUser.length; i++) {
            let user = yield AllUser[i];
            console.log(`Without Promise.all but with AsyncAwait - ${user.name}`);
        }
    });
}
AsAw();
for (let i = 0; i < AllUser.length; i++) {
    AllUser[i].then((res) => {
        console.log(`Only promises - ${res.name}`);
    });
}
function checkGEnder(human) {
    return human.gender == 'Female';
}
function getGenderAsyncAwait(link) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield nodefetch(link);
        const response = yield request.json();
        let human = checkGEnder(response);
        if (human) {
            console.log(`✅AsyncAwait => first name - ${response.first_name}, last name - ${response.last_name}, gender - ${response.gender}`);
        }
        else {
            console.log('❌');
            getGenderAsyncAwait(link);
        }
    });
}
function getGenderPromise(link) {
    nodefetch(link).then((request) => request.json()).then((response) => {
        let human = checkGEnder(response);
        if (human) {
            console.log(`✅Promise => first name - ${response.first_name}, last name - ${response.last_name}, gender - ${response.gender}`);
        }
        else {
            console.log('❌');
            getGenderPromise(link);
        }
    });
}
getGenderAsyncAwait('https://random-data-api.com/api/users/random_user');
getGenderPromise('https://random-data-api.com/api/users/random_user');
//
//
//
function Callback(ip, callback) {
    callback(`${ip}`);
}
function Getip(link) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield nodefetch(link);
        const response = yield request.json();
        Callback(response.ip, (ip) => { console.log(ip); });
    });
}
Getip('https://api.ipify.org/?format=json');
//
//
//
function retip(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        return ip;
    });
}
function F2(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield nodefetch('https://api.ipify.org/?format=json');
        const response = yield request.json();
        yield callback(response.ip);
        console.log(response.ip);
    });
}
F2((ip) => {
    return retip(ip);
});
