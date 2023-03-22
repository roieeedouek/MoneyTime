const prompt = require('electron-prompt');
const { ipcRenderer, remote } = require('electron');

let currentTime = 0
let multiplier = 1
let multiplierMap = new Map()
let pph = 0;
let cashSymbol = "";

const setPaySettings = (preferencesObj) => {

    pph = preferencesObj.pay["pph"];
    cashSymbol = preferencesObj.pay["cashSymbol"];

    let pay125 = preferencesObj.pay["125"]
    if (pay125) {
        console.log(pay125)
        multiplierMap.set(pay125 * 60 * 60, 1.25);
    }
    let pay150 = preferencesObj.pay["150"]
    if (pay150) {
        console.log(pay150)
        multiplierMap.set(pay150 * 60 * 60, 1.50);
    }
    let pay200 = preferencesObj.pay["200"]
    if (pay200) {
        console.log(pay200)
        multiplierMap.set(pay200 * 60 * 60, 2.00);
    }
    let pay250 = preferencesObj.pay["250"]
    if (pay250) {
        console.log(pay250)
        multiplierMap.set(pay250 * 60 * 60, 2.50);
    }
    let pay300 = preferencesObj.pay["300"]
    if (pay300) {
        console.log(pay300)
        multiplierMap.set(pay300 * 60 * 60, 3.00);
    }
}

//Fetch the preferences object
let preferencesObj = ipcRenderer.sendSync('getPreferences');

setPaySettings(preferencesObj);

const setColors = (preferencesObj) => {
    let r = document.querySelector(':root');
    // Get the styles (properties and values) for the root
    var rs = getComputedStyle(r);
    // Set the value of variable --blue to another value (in this case "lightblue")
    r.style.setProperty('--text_color', preferencesObj.themeSettings["text_color"] || rs.getPropertyValue('--text_color'));
    r.style.setProperty('--background_color', preferencesObj.themeSettings["background_color"] || rs.getPropertyValue('--background_color'));
    r.style.setProperty('--shadow1_color', preferencesObj.themeSettings["shadow1_color"] || rs.getPropertyValue('--shadow1_color'));
    r.style.setProperty('--shadow2_color', preferencesObj.themeSettings["shadow2_color"] || rs.getPropertyValue('--shadow2_color'));

}

setColors(preferencesObj);

let timerDiv = document.getElementById("timerDiv")
let moneyDiv = document.getElementById("moneyDiv")
let pphDiv = document.getElementById("pphDiv")

moneyDiv.addEventListener("dblclick", () => {
    prompt({
        title: 'Set Start Time',
        label: 'Start Time:',
        value: '08:00:00',
        height: 190,
        alwaysOnTop: true,
        inputAttrs: {
            type: 'time'
        },
        type: 'input'
    })
        .then((r) => {
            if (r === null) {
                console.log('user cancelled');
            } else {
                startTime = moment.duration(`${r}:00`).asSeconds()
                timeToNow = moment.duration(moment().format("HH:mm:ss")).asSeconds()
                currentTime = timeToNow - startTime
            }
        })
        .catch(console.error);
});

moneyDiv.addEventListener("click", () => {
    // Display the preferences window
    ipcRenderer.send('showPreferences');
});


const moment = require('moment');

const secondsToTime = (s) => {
    let momentTime = moment.duration(s, 'seconds');
    let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
    let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();
    let hour = momentTime.hours() < 10 ? ('0' + momentTime.hours()) : momentTime.hours();

    return `${hour}:${min}:${sec}`;
};

const secondsToMoney = (s) => {
    let pps = pph / (60 * 60);
    let money = (s * pps * multiplier).toFixed(2);
    return `${money}${cashSymbol}`;
};

const secondsToPPH = (s) => {
    let currentPPH = (pph * multiplier).toFixed(2);
    return `${currentPPH}${cashSymbol}`;
};

const updateMultiplier = (s) => {
    if (multiplierMap.has(s)) {
        multiplier = multiplierMap.get(s)
    }
}

function getTime() {

    // add one second
    currentTime = currentTime + 1;

    timerDiv.innerHTML = secondsToTime(currentTime)

    moneyDiv.innerHTML = secondsToMoney(currentTime)

    pphDiv.innerHTML = secondsToPPH(currentTime)

    updateMultiplier(currentTime);
}
setInterval(getTime, 1000);

ipcRenderer.on('preferencesUpdated', (e, preferences) => {
    setColors(preferences);
    setPaySettings(preferences);
});