require("dotenv").config();
var https = require('https');

// Seed script, call this manually to get a list of mounts. 
// Store the data to avoid calling blizzard api every time website is opened.
// HOW TO RUN: write node seed.js into terminal, that will save the new mounts.json file

async function getMountDataFromBlizzard(){
    const bearer = await getBearerToken();
    const mountListResponse = await fetch("https://us.api.blizzard.com/data/wow/mount/index?namespace=static-us&locale=en_US", {
        'method': "GET",
        'headers': {"Authorization": 'Bearer ' + bearer}
    })
    const mountListResponseJson = await mountListResponse.json();
    const mountList = mountListResponseJson['mounts'];

    const mountDetails = []
    for (let i = 0; i < mountList.length; i++) {
        if (mountList[i].name.includes("[PH]")) continue;
        if (mountList[i].name.includes("[DND]")) continue;
        
        const mountResponse = await fetch(`https://us.api.blizzard.com/data/wow/mount/${mountList[i].id}?namespace=static-us&locale=en_US`, {
            'method': "GET",
            'headers': {"Authorization": 'Bearer ' + bearer}
        });
        const mountResponseJson = await mountResponse.json();

        if (!mountResponseJson.description) continue;
        if (!mountResponseJson.source) continue;
        
        mountDetails.push(mountResponseJson);
        console.log(mountResponseJson);
    };

    const fs = require("fs");
    fs.writeFileSync("mounts.json", JSON.stringify(mountDetails, null, 2));
    console.log("Saved", mountDetails.length, "mounts to mounts.json");
}

async function getBearerToken(){
    const credentials = Buffer.from(process.env.BLIZZARD_CLIENT_ID + ":" + process.env.BLIZZARD_CLIENT_SECRET).toString("base64");
    const tokenResponse = await fetch("https://oauth.battle.net/token", {
        method: "POST",
        headers: {
            "Authorization": "Basic " + credentials,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    });

    const data = await tokenResponse.json();
    return data.access_token;
}

getMountDataFromBlizzard();
