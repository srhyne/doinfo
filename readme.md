## What is doinfo

Make working with Digital Ocean Droplets a lot easier!

### Why doinfo? 

- Tired of opening up the Digital Ocean console and it's painfully slow droplet search? Use `fetch` and `search`!
- Tired of cross checking IP firewalls and configs with droplet names? Use `reveal`!
- Tired of keeping your /etc/hosts file in sync? Use `hosts` to generate one!
- Tired of checking if ports are open/closed? Use `scan`!

### Running script without compilation

deno run --allow-all doinfo.js *

###  Prepping File for use in Tailtub

```
bash build.sh
```

## Commands

**help** - review doinfo commands

```
doinfo help
```

**apikey** - sets apikey into ~/.doinfo/.env

``` 
doinfo apikey [key]
```

**fetch** - retrieves droplets from Digital Ocean API

```
doinfo fetch
```

**search** - search droplets by a term of key value search. 

```
doinfo search [term or key=value]
```
    
**reveal** - annotate piped text to easily identify droplets

```
ufw status | doinfo reveal
cat /etc/hosts | doinfo reveal
```

**hosts** - generate an /etc/hosts compatible file for all of your doplets.

```
doinfo hosts --types=private
doinfo hosts --types=public
doinfo hosts --types=public,private >> /etc/hosts
```

**scan** - Scan ports on Digital Ocean droplet(s)

```
# doinfo scan :dropletNamePrefix :port
doinfo scan workers 22
doinfo scan web 443
# 😬
doinfo scan mongo 27017 
```