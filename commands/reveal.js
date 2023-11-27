import { readAll } from "https://deno.land/std@0.137.0/streams/mod.ts";

const dropletMatchesIP = (droplet, ipString ) => {
    return droplet.networks.v4.some( ip => ip.ip_address == ipString );
}

export default async (ctx) => {
    const path = ctx.fromHome('droplets.json');
    const droplets = await ctx.getJson( path );

    const buffer = await readAll(Deno.stdin);
    const text = new TextDecoder().decode(buffer);

    for (let line of text.split("\n")) {
        const regex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
        const ips = line.match(regex);

        if (ips) {
            for (const ip of ips) {
                const droplet = droplets.find( (droplet) => dropletMatchesIP(droplet, ip) )
                if( droplet ){
                    line = line.replace(ip, `${ip} (${droplet.name})`);
                }
            }
        }

        console.log(line);
    }
}