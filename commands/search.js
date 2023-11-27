
// import droplets from fromHome('droplets.json');

const createSearcher = (term, bag ) => {

    if(!term.includes('=')){
        return (key, value, path) => {
            if(
                value.toString().toLowerCase().includes(term)
            ){
                bag[path] = value;
            }
        }
    }

    let params = new URLSearchParams(term);
    params = Object.fromEntries(params.entries());
    return (key, value, path) => {
        for( const p in params ){
            if(key === p && value.toString().toLowerCase().includes(params[p])){
                bag[path] = value;
            }
        }
    }
}

export default async (ctx) => {

    const path = ctx.fromHome('droplets.json');
    const droplets = await ctx.getJson( path );

    const term = '' + ctx.args[1];
    if(!term){
        return ctx.error("Please provide a search term.");
    }

    droplets.forEach(droplet => {
        const bag = {};
        const searcher = createSearcher(term, bag); 
        ctx.iterateOver(droplet, searcher );
        if( !Object.keys(bag).length ){
            return;
        }
        
        const res = {
            name: droplet.name,
            ips: droplet.networks.v4.map( ip => ip.ip_address),
            ...bag
        };

        console.log(res);

    }) 
   
}