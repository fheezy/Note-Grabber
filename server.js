//require as a dependencies
const express = require('express');

//generates express app
const app = express();

//generates a PORT variable
const PORT = process.env.PORT || 3000;

//set up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);
const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

//generates a server listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));