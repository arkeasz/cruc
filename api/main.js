import mongoose from "mongoose";
import express from 'express';
import * as config from './config/index.js';

mongoose.connect('mongodb://mongo:VUfYjhAelgNUriCijNJbQzFlXgkSZqNv@roundhouse.proxy.rlwy.net:25482');

const Cat = mongoose.model('Cat', { name: String });
p
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));


// import express from 'express';
// import * as config from './config/index.js';

// const app = express();

// fetch("http://roundhouse.proxy.rlwy.net:25482/")
//   .then(response => response.text()) // O .json() si devuelve JSON
//   .then(data => console.log(data))
//   .catch(error => console.error("Error:", error));


// app.get('/', (req, res) =>  {
//     res.send('Hello, world!');
// })

// app.listen(config.PORT, () =>   {
//     console.log(`Example app listening on port ${config.PORT}`);
// })

// app.post('/', (req, res) => {
//     res.send('Got a POST request')
//     console.log(req)
// })

// app.put('/user', (req, res) => {
//     res.send('Got a PUT request at /user');
// })

// app.delete('/user', (req, res) => {
//     res.send('Got a DELETE request at /user')
// })
