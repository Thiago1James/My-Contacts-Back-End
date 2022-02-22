const express = require('express');
require('express-async-errors')

const routes = require('./routes');

const app = express();

const PORT = 3003;


app.use(express.json())

app.use(routes)

app.use((error,request, response,next) => {
  console.error(error)
  response.sendStatus(500)
})

app.listen(PORT, () => {
  console.log(`Server Listening at port ${PORT}`);
});
