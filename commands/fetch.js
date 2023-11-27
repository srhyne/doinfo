// Function to fetch droplet data
async function fetchDroplets(token) {
    const url = "https://api.digitalocean.com/v2/droplets?per_page=1000";
    

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return [ 
            false, "Failed to fetch droplet data:" + response.statusText 
        ];
    }

    const data = await response.json();
    return [ true, data.droplets ];
}

export default async (ctx) => {
    const token = ctx.env.DIGITALOCEAN_APIKEY;
    const [ success, response ] = await fetchDroplets(token);
    if(!success){
        return ctx.error(response);
    }
    const droplets = response;
    const jsonString = JSON.stringify(droplets, null, 2);
    const filePath = ctx.fromHome('droplets.json');

    // Write the JSON string to a file
    try {
        await Deno.writeTextFile(filePath, jsonString);
        return ctx.success(
            `${droplets.length} droplets fetched and stored.`
        );
    } catch (error) {
        return ctx.error("Error writing file:", error);
    }

}

