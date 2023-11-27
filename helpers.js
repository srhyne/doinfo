const runProcess = async ( cmd ) => {
    const p = Deno.run({
        cmd,
        stdout: 'inherit',
        stderr: 'inherit',
    });
    await p.status();
    p.close();
};

const success = ( msg ) => {
    console.log(`%c${msg}`, 'color: green');
    return false;
}

const error = (msg) => {
    console.log(`%c${msg}`, 'color: red');
    return false;
}

const fromHome = ( route = '' ) => {
    // Determine the correct environment variable based on the operating system
    const homeEnvVar = Deno.build.os === "windows" ? "USERPROFILE" : "HOME";

    // Retrieve the home directory path
    let path = Deno.env.get(homeEnvVar) +  '/.doinfo';
    if( route ){
        path += '/' + route;
    }
    return path;
}

const iterateOver = (data, callback, path = '') => {
    // Check if the current data is an array or object
    if (Array.isArray(data) || (data && typeof data === 'object') ) {
      Object.keys(data).forEach(key => {
        // Build the path 
        const newPath = path === '' ? key : `${path}.${key}`;
        
        // If the value is an array or object, recurse into it
        if (Array.isArray(data[key]) || typeof data[key] === 'object') {
          iterateOver(data[key], callback, newPath);
        } else {
          callback(key, data[key], newPath);
        }
      });
    }
}

const  getJson = async ( filePath ) => {
    try {
        return JSON.parse(await Deno.readTextFile(filePath));
    } catch(e) {
        return false;
    }
}



export default {
    runProcess,
    success,
    error,
    fromHome,
    iterateOver,
    getJson
};
