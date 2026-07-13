async function getAccessToken() {
    const response = await fetch("/token");
    const data = await response.json();
    return data.token;
}

async function getMounts() {
    const token = await getAccessToken();

    const response = await fetch("https://us.api.blizzard.com/data/wow/mount/index?namespace=static-us&locale=en_US", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await response.json();
    console.log(data);
}

getMounts();