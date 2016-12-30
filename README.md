##Install

Install nodejs 6.x

https://nodejs.org/en/

cd into the folder and run

```
$ npm install
```

##Run

Run the server

```
$ npm start
```

The socket.io server will start on localhost port 8080

##Event list

- ```getDrones```: returns a json object with an array of drone objects in the ```drones``` key

Example:

```
{
    'drones': [
        { 'id': '1'},
        { 'id': '2'},
        ...
    ]
}
