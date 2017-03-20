const express = require('express');
const db = require('./db');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/vendor', express.static(__dirname + '/node_modules'));
app.use('/dist', express.static(__dirname + '/dist'));

app.get('/', (req,res,next)=>{
  res.sendFile(__dirname + '/index.html');
})

app.use('/api', routes);

app.use((err,req,res,next)=>{
  console.log(err)
  res.status(500).send(err.message);
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`listening on port ${port}`);
})


db.seed()
.then(()=>console.log('synched and seeded'))
.catch( e => console.log(e));
