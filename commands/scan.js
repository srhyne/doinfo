const portOpen = async (hostname, port) => {
    const timeoutLength = 1000;

    let open = false;
    let timeout = null;
    let connection = null;

    const timeoutPromise = new Promise((res, rej) => {
        timeout = setTimeout(() => rej("timeout"), timeoutLength)
    });

    const connectionPromise = Deno.connect({
        hostname,
        port
    })

    try {
        connection = await Promise.race([timeoutPromise, connectionPromise]);
        open = true;
    } catch(error) {}
    
    if( timeout ){
        clearTimeout(timeout);
    }

    if( connection ){
        connection.close();
    }

    return open;
}

export default async (ctx) => {
    const path = ctx.fromHome('droplets.json');
    const droplets = await ctx.getJson(path);

    const dropletNamePattern = '' + ctx.args[1];
    const port = +(ctx.args[2] || 22)


    for (const droplet of droplets) {
        if (!droplet.name.includes(dropletNamePattern)) {
            continue;
        }

        for (const ip of droplet.networks.v4) {
            let open = await portOpen(ip.ip_address, port)
            console.log({
                name: droplet.name,
                ip: ip.ip_address,
                port,
                open
            });
        }
    }
    
    Deno.exit()
}