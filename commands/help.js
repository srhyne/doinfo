export default async ctx => {
    const text = await Deno.readTextFile('./commands/manual.txt')
    console.log(text);
}