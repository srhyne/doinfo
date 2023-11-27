export default async (ctx) => {
    const path = ctx.fromHome('.env');
    const apikey = ctx.args[1];
    //write to .env file here
    const text = `DIGITALOCEAN_APIKEY=${apikey}`
    await Deno.writeTextFile(path, text);
    return ctx.success(`API Key saved to ${path}`);
}