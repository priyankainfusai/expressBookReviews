const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
let name = req.body.name;
let password = req.body.password;

let accessToken = jwt.sign({
    data: password
}, 'access', { expiresIn: 60 * 60 });
// Store access token and username in session
req.session.authorization = {
    accessToken, name
}
return res.status(200).send("Customer successfully logged in");

});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running on PORT", PORT));
