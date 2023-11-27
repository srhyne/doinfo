import { parse } from "https://deno.land/std@0.202.0/flags/mod.ts";
import { load } from "https://deno.land/std@0.207.0/dotenv/mod.ts";
import helpers from './helpers.js';
//command registration
import commands from './commands/index.js';

const env = await load({
    envPath: helpers.fromHome('.env')
});

const flags = parse(Deno.args, { 
    boolean: [
        'verbose',
    ],
    string: [],
    default: {
        verbose: false
    },
});


const main = async () => {
    const cmd = flags._[0];
    const args = flags._;
    const command = commands[cmd] || commands._default;
    const ctx = {
        ...helpers,
        flags,
        args,
        env
    }
    command(ctx);
}

main();
