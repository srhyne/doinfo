deno compile --allow-all --target x86_64-unknown-linux-gnu -o ./builds/x86_64-unknown-linux-gnu/doinfo ./doinfo.js
deno compile --allow-all --target x86_64-pc-windows-msvc -o ./builds/x86_64-pc-windows-msvc/doinfo ./doinfo.js 
deno compile --allow-all --target x86_64-apple-darwin -o ./builds/x86_64-apple-darwin/doinfo ./doinfo.js
deno compile --allow-all --target aarch64-apple-darwin -o ./builds/aarch64-apple-darwin/doinfo ./doinfo.js