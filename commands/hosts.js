export default async ctx => {
    const path = ctx.fromHome('droplets.json');
    const droplets = await ctx.getJson( path );
    const types = (ctx.flags.types || 'private,public').split(',');
    droplets.forEach(droplet => {
        droplet.networks.v4.forEach( ip => {
            if( ip.type && types.includes(ip.type) ){
                console.log(`${ip.ip_address} ${droplet.name}`)
            }
        })
    });
}