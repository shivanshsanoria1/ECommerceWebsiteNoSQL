const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	User.findById('64c4cfc06d221e044f2ecd62')
	.then((user) => {
		req.user = user;
		next();
	})
	.catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const mongoDBClusterUser = process.env.mongoDBClusterUser;
const mongoDBClusterPassword = process.env.mongoDBClusterPassword;
const mongoDBDatabaseName = process.env.mongoDBDatabaseName;

mongoose
.connect(`mongodb+srv://${mongoDBClusterUser}:${mongoDBClusterPassword}@clustertest1.rlecsbt.mongodb.net/${mongoDBDatabaseName}?retryWrites=true&w=majority`)
.then(() => {
	User.findOne()
	.then((user) => {
		if(!user){
			const user = new User({
				name: 'tony',
				email: 'tony111@gmail.com',
				cart: {
					items: []
				}
			});
			user.save();
		}
	})
	app.listen(3000);
})
.catch((err) => console.log(err));
