var express = require('express')

var cookieParser = require('cookie-parser')
const cookieEncrypter = require('cookie-encrypter');

const secretKey = 'kjfs9032fsb389d0s0brwe0ren32iqn3';

var app = express()

app.use(cookieParser(secretKey));
app.use(cookieEncrypter(secretKey));



//requires nodemailer module
var nodemailer = require('nodemailer');

//requires body parser module
var bodyParser = require("body-parser");

//puts post data into javascript objects
app.use(bodyParser.urlencoded({ extended: true }));



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'LindblomOrders@gmail.com',
    pass: 'Qazwsxedc123!'
  }
});

//static directories for html,image, and css files
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/images'));
app.use(express.static(__dirname+'/JS'));

//requires ejs to be used in the rendering of ejs files
app.set('view engine', 'ejs');

const trencryption = require('./JS/trencryption.js');
const firebase = require('firebase');
const admin = require('firebase-admin');
const {Storage} = require('@google-cloud/storage');
const request = require('request');
const Multer = require('multer');
const serviceAccount = require('./ServiceAccountKey.json');
require("firebase/app")
require("firebase/auth")
require("firebase/database")
require("firebase/firestore")
require("firebase/storage")
require("firebase/messaging")
require("firebase/functions")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://my-awsome-project-cedd0.firebaseio.com",
	storageBucket: "gs://octagonroboticsdatabase.appspot.com"
})

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 1000 * 1024 * 1024 // no larger than 5mb
  }
});


const storage = new Storage({
  projectId: "octagonroboticsdatabase",
  keyFilename: "./ServiceAccountKey.json"
});

var bucket = storage.bucket("octagonroboticsdatabase.appspot.com");




const db = admin.firestore();

const Users = db.collection('Users');
const Orders = db.collection('Orders');



//the server is listening on port 3000 for connections
app.listen(3000, function () {
	console.log("Listening at port 3000")
	j=test_input("Crazy 8's")
	console.log(j)
	console.log(revert_input(j))
});


app.get('/', function(req, res){
	
	res.render("index")
	
});

app.get('/login', function(req, res){
	
	res.render("login")
	
});

app.get('/LindblomOrderForm', function(req, res){
	
	res.render("LindblomOrderForm")
	
});


app.post('/submitOrder', multer.single("file"), function(req, res){
	var user_id = 'Guest';
	if(req.signedCookies.user_id){
		user_id = req.signedCookies.user_id
	}
	var email = req.body.email;
	var phone_number = req.body.phone_number;
	var team_number = req.body.team_number;
	var message = req.body.message;
	var order_date = new Date();
	console.log(order_date)
	var order_status = "requested";
	var delivery_type = req.body.delivery_type;
	
	
	var file = req.file;
	uploadFile(file).then(function (file_url){
		if(delivery_type != "pickup"){
			var address = ""+req.body.street_address+", "+req.body.city+", "+req.body.state+", "+req.body.zip_code;
			insertOrderWithAddress(user_id, email, phone_number, team_number, file_url, message, order_date, order_status, delivery_type, address, function (id){
		console.log(id)
		emailOrderWithAddress(email, phone_number, team_number, file_url, message, order_date, delivery_type, address, id, function(responseInfo){
			res.render('LindblomOrderForm')
		})
		
	})
		}
		else{
			insertOrderWithoutAddress(user_id, email, phone_number, team_number, file_url, message, order_date, order_status, delivery_type, function(id){
				console.log(id)
				emailOrderWithoutAddress(email, phone_number, team_number, file_url, message, order_date, delivery_type, id, function(responseInfo){
			res.render('LindblomOrderForm')
		})
			})
			
		}
	})
	
	
});

function uploadFile(file){
	return new Promise((resolve, reject) => {
		if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let blob = bucket.file(newFileName);
	
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  });
  blobStream.on("error", err => {
	  reject(err)
	  
  });
  blobStream.on("finish", () => {
	  
	  blob.getSignedUrl({
  action: 'read',
  expires: '03-09-2491'
}).then(signedUrls => {
	resolve(signedUrls[0]);
});
      
  });
  blobStream.end(file.buffer);
	});
}

app.post('/login', function(req, res){
	var username = test_input(req.body.username);
	var aPassword = test_input(req.body.password);
	var query = Users.where("username", "==", username).where("password", "==", trencryption.constantEncrypt(aPassword));
	query.get().then(function(resultsOfQuery){
		if(resultsOfQuery.size > 0){
			resultsOfQuery.forEach(function(doc){
				console.log(doc.data())
				res.cookie('user_id', doc.id, {
					httpOnly: true,
					signed: true
					//add maxAge attribute in milliseconds if wanted
				})
				getUserInfo(res, req, function(user_data){
				console.log(user_data)
			})
			})
			//Redirect to your Dashboard Later
			res.redirect('/')
		}
		else{
			res.redirect('/login')
		}
	})
});

app.get('/signup', function(req, res){
	var validity = {username: true, password: true, email: true}
	res.render("signup", validity)
	
});

app.post('/signup', function(req, res){
	var username = test_input(req.body.username);
	var aPassword = test_input(req.body.password);
	var first_name = test_input(req.body.first_name);
	var last_name = test_input(req.body.last_name);
	var email = test_input(req.body.email);
	var team_number = test_input(req.body.team_number);
	var team_name = test_input(req.body.team_name);
	
	
	
	registerUser(username, aPassword, first_name, last_name, email, team_number, team_name,  function(validity, user_id){
		if(validity.username && validity.password && validity.email){
			console.log(validity)
			res.cookie('user_id', user_id, {
				httpOnly: true,
				signed: true
				//add maxAge attribute in milliseconds if wanted
			})
			getUserInfo(res, req, function(user_data){
				console.log(user_data)
			})
			res.redirect('/')
		}
		else{
			res.render('signup', validity)
		}
		
	})
})

function insertUser(username, aPassword, first_name, last_name, email, team_number, team_name, callback){
	Users.add({
		username: username,
		password: trencryption.constantEncrypt(aPassword),
		first_name: first_name,
		last_name: last_name,
		email: email,
		team_number: team_number,
		team_name: team_name
	}).then(ref => {
  callback(ref.id);
});
}

function insertOrderWithAddress(user_id, email, phone_number, team_number, file_url, message, order_date, order_status, delivery_type, address, callback){
	Orders.add({
		user_id: user_id,
		email: email,
		phone_number: phone_number,
		team_number: team_number,
		file_url: file_url, 
		message: message,
		order_date: order_date,
		order_status: order_status,
		delivery_type: delivery_type,
		address: address
	}).then(ref => {
  callback(ref.id);
});
}

function insertOrderWithoutAddress(user_id, email, phone_number, team_number, file_url, message, order_date, order_status, delivery_type, callback){
	Orders.add({
		user_id: user_id,
		email: email,
		phone_number: phone_number,
		team_number: team_number,
		file_url: file_url, 
		message: message,
		order_date: order_date,
		order_status: order_status,
		delivery_type: delivery_type
	}).then(ref => {
  callback(ref.id);
});
}

function registerUser(username, aPassword, first_name, last_name,  email, team_number, team_name, callback){
	var validity = {username: false, password: false, email: false}
	
		var query = Users.where("username", "==", username);
		checkIfExists(query,function(usernameExists){
			validity.username = !usernameExists;
			var query = Users.where("password", "==", trencryption.constantEncrypt(aPassword));
			checkIfExists(query,function(passwordExists){
				validity.password = !passwordExists;
				var query = Users.where("email", "==", email);
				checkIfExists(query,function(emailExists){
					validity.email = !emailExists;
					
					if(validity.username && validity.password && validity.email){
						
						insertUser(username, aPassword, addslashes(first_name), addslashes(last_name), email, team_number, team_name, function(id){
							callback(validity, id)
						})
						
					}
					else{
						callback(validity, '')
					}
				})
			})
			
		})
	
}
function checkIfExists(query, callback){
	query.get().then(function(resultsOfQuery){
		if(resultsOfQuery.size > 0){
			callback(true);
		}
		else{
			callback(false);
		}
	})
}
function test_input(data) {
	data = data.trim();
	data = htmlspecialchars(data);
	data = addslashes(data);
	return data;
}

function revert_input(data) {
	data = stripslashes(data);
	data = reversehtmlspecialchars(data);
	data = data.trim();
	return data;
}


function addslashes(str) {
    str = str.replace(/\\/g, "\\\'");
    str = str.replace(/\'/g, '\\\'');
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
}
 
function stripslashes(str) {
    str = str.replace(/\\'/g, '\'');
    str = str.replace(/\\"/g, '"');
    str = str.replace(/\\0/g, '\0');
    str = str.replace(/\\\\/g, '\\');
    return str;
}

function htmlspecialchars(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function reversehtmlspecialchars(text) {
    var map = {
        '&amp;': '&',
        '&#038;': "&",
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&#8217;': "’",
        '&#8216;': "‘",
        '&#8211;': "–",
        '&#8212;': "—",
        '&#8230;': "…",
        '&#8221;': '”'
    };

    return text.replace(/\&[\w\d\#]{2,5}\;/g, function(m) { return map[m]; });
};

function getUserInfo(res, req, callback){
	if(req.signedCookies.user_id){
		var user_id = req.signedCookies.user_id;
		Users.doc(user_id).get().then(doc => {
			if (doc.exists) {
				var user_data = doc.data();
				user_data.first_name = revert_input(user_data.first_name)
				user_data.last_name = revert_input(user_data.last_name)
				user_data.username = revert_input(user_data.username)
				user_data.password = ""
				user_data.email = revert_input(user_data.email)
				user_data.team_number = revert_input(user_data.team_number)
				user_data.team_name = revert_input(user_data.team_name)
				console.log(user_data.team_name)
				user_data.id = user_id
				callback(user_data)		
			} else {
				callback(null)
			}
		})
	}
	else {		
		callback(null)		
	}
}

function emailOrderWithAddress(email, phone_number, team_number, file_url, message, order_date, delivery_type, address, id, callback){
	var mailOptions = {
  from: 'LindblomOrders@gmail.com',
  to: 'LindblomOrderReciever@gmail.com',
  subject: 'New Order '+id,
  html: "<h1>Order Information</h1><h3>Client Email:</h3><h5>"+email+"</h5><h3>Client Phone Number:</h3><h5>"+phone_number+"</h5><h3>Client Team Number:</h3><h5>"+team_number+"</h5><h3>File Submitted by Client:</h3><h5><a href="+file_url+">Click here to download</a></h5><h3>Message from Client:</h3><h5>"+message+"</h5><h3>Order Date:</h3><h5>"+order_date+"</h5><h3>Method of Delivery:</h3><h5>"+delivery_type+"</h5><h3>Delivery Address:</h3><h5>"+address+"</h5>"
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    callback(error)
  } else {
    callback(info);
  }
});
}

function emailOrderWithoutAddress(email, phone_number, team_number, file_url, message, order_date, delivery_type, id, callback){
	var mailOptions = {
  from: 'LindblomOrders@gmail.com',
  to: 'LindblomOrderReciever@gmail.com',
  subject: 'New Order '+id,
  html: "<h1>Order Information</h1><h3>Client Email:</h3><h5>"+email+"</h5><h3>Client Phone Number:</h3><h5>"+phone_number+"</h5><h3>Client Team Number:</h3><h5>"+team_number+"</h5><h3>File Submitted by Client:</h3><h5><a href="+file_url+">Click here to download</a></h5><h3>Message from Client:</h3><h5>"+message+"</h5><h3>Order Date:</h3><h5>"+order_date+"</h5><h3>Method of Delivery:</h3><h5>"+delivery_type+"</h5>"
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    callback(error)
  } else {
    callback(info);
  }
});
}
