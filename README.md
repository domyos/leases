# Leases

A webinterface that displays  `isc-dhcp-servers` lease file in a searchable list.  

## Installation
To prepare the server run:

```
npm install
bower install
grunt copy
```

When working on the code use the following to automatically reload your
browser on changes
```
grunt watch
```

To revert your repo to the initial state after cloning use
```
grunt clean
```

Run the software with
```
node app.js [path to lease file]
```

To show all leases (not just the active ones) use -i or --inactive
