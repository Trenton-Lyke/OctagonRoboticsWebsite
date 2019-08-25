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

var path = require('path');
var fs = require('fs');



var upload_file = require("./file_upload.js");
var upload_image = require("./image_upload.js");
var upload_video = require("./video_upload.js");

var toEmailLindblom = 'LindblomOrderReciever@gmail.com';
var toEmail3DPrinter = '3DPrinterRequestReciever@gmail.com'
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'OctagonRoboticsRequester@gmail.com',
    pass: 'Tfcrdxesz123!'
  }
});


app.use(express.static(__dirname + '/'));
app.use('/bower_components',  express.static(path.join(__dirname, '../bower_components')));
//static directories for html,image, and css files
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/uploads'));
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



const picStorage = Multer.diskStorage({
	destination: "./uploads",
	filename: function(req, file, callback){
		callback(null, file.originalname + "-" + Date.now() + path.extname(file.originalname))
	}
});

const picUpload = Multer({
	storage: picStorage
}).single('profile_picture')



const storage = new Storage({
  projectId: "octagonroboticsdatabase",
  keyFilename: "./ServiceAccountKey.json"
});

var bucket = storage.bucket("octagonroboticsdatabase.appspot.com");




const db = admin.firestore();

const Users = db.collection('Users');
const Lindblom_Orders = db.collection('Lindblom_Orders');
const ThreeDPrinter_Orders = db.collection('ThreeDPrinter_Orders');
const Forum_Categories = db.collection('Forum_Categories');
const Forum_Topics = db.collection('Forum_Topics');
const Forum_Posts = db.collection('Forum_Posts');


//the server is listening on port 3000 for connections
app.listen(3000, function () {
	console.log("Listening at port 3000")
	
	
});


app.get('/', function(req, res){
	getUserInfo(res, req, function(user_data){
		var username = ""
		if(user_data != null){
			username = user_data.username
		}
		var uop = null;
		
		if(req.query && req.query.uop){
			uop = req.query.uop
		}
	res.render("index" , {username: username, uop: uop})
	})
	
});

app.get('/index', function(req, res){
	getUserInfo(res, req, function(user_data){
		var username = ""
		if(user_data != null){
			username = user_data.username
		}
		var uop = null;
		
		if(req.query && req.query.uop){
			uop = req.query.uop
		}
	res.render("index" , {username: username, uop: uop})
	})
	
});



app.post('/addPost', function(req, res){
	var user_id = "Guest";
	if(req.signedCookies && req.signedCookies.user_id){
		user_id = req.signedCookies.user_id
	}
	
	if(req.query && req.query.id){
		var topic_id = req.query.id;
		var content = req.body.content;
		insertForum_Post(user_id, topic_id, content, function(id){
			res.redirect("/ForumTopic?id="+topic_id)
			
		})
	
	}
	
});

app.post('/addTopicForumCategory', function(req, res){
	var user_id = "Guest";
	if(req.signedCookies && req.signedCookies.user_id){
		user_id = req.signedCookies.user_id
	}
	
	if(req.query && req.query.id){
		var name = req.body.name;
		var category_id = req.query.id
		var description = req.body.description;
		insertForum_Topic(user_id, category_id, name, description, function(id){
			res.redirect("/ForumCategory?id="+category_id)
			
		})
	
	}
	
});

app.post('/addTopicForumMenu', function(req, res){
	var user_id = "Guest";
	if(req.signedCookies && req.signedCookies.user_id){
		user_id = req.signedCookies.user_id
	}
	
	
		var name = req.body.name;
		var category_id = req.body.category_id;
		var description = req.body.description;
		insertForum_Topic(user_id, category_id, name, description, function(id){
			res.redirect("/ForumMenu")
			
		})
	
	
});




app.get('/login', function(req, res){
	var uop = null;
		
	if(req.query && req.query.uop){
		uop = req.query.uop
	}
	res.render("login", {uop: uop})
	
});

app.get('/thankyou', function(req, res){
	getUserInfo(res, req, function(user_data){
		var username = ""
		if(user_data != null){
			username = user_data.username
		}
		var uop = null;
		
		if(req.query && req.query.uop){
			uop = req.query.uop
		}
	res.render("thankyou", {username: username, uop: uop})
	})
	
});

app.get('/LindblomOrderForm', function(req, res){
	getUserInfo(res, req, function(user_data){
		var username = ""
		if(user_data != null){
			username = user_data.username
		}
		
		var uop = null;
		
		if(req.query && req.query.uop){
			uop = req.query.uop
		}
		
	res.render("LindblomOrderForm", {username: username, uop: uop})
	})
	
});

app.get('/3DPrinterOrderForm', function(req, res){
	getUserInfo(res, req, function(user_data){
		var username = ""
		if(user_data != null){
			username = user_data.username
		}
		var uop = null;
		
		if(req.query && req.query.uop){
			uop = req.query.uop
		}
	res.render("3DPrinterOrderForm", {username: username, uop: uop})
	})
	
});

app.get('/ForumMenu', function(req, res){
	getUserInfo(res, req, function(user_data){
		var username = ""
		if(user_data != null){
			username = user_data.username
		}
	getCategoryDocDataList(function(categoryDocDataList){
		getAllTopicDocDataList(function(topicDocDataList){
			var uop = null;
		
			if(req.query && req.query.uop){
				uop = req.query.uop
			}
			res.render("ForumMenu",{categories: categoryDocDataList, topics: topicDocDataList, username: username, uop: uop})
		})
		
	})
	})
	
	
});

app.get('/ForumCategory', function(req, res){
	getUserInfo(res, req, function(user_data){
		var username = ""
		if(user_data != null){
			username = user_data.username
		}
	if(req.query && req.query.id){
	Forum_Categories.doc(req.query.id).get().then(function(category){
		getTopicByCategoryIdDocDataList(req.query.id, function(topicDocDataList){
			var uop = null;
		
			if(req.query && req.query.uop){
				uop = req.query.uop
			}
			res.render("ForumCategory",{topics: topicDocDataList, username: username,id: req.query.id, category: category.data(), uop: uop})
		})
	})
	}
	else{
		res.rediect("/")
	}
	})
	
	
});

app.get('/ForumTopic', function(req, res){
	
	getUserInfo(res, req, function(user_data){
		var username = ""
		if(user_data != null){
			username = user_data.username
		}
	if(req.query && req.query.id){
		getPostByTopicIdDocDataList(req.query.id, function(postDocDataList){
			
			Forum_Topics.doc(req.query.id).get().then(function(topic){
				var uop = null;
		
				if(req.query && req.query.uop){
					uop = req.query.uop
				}
				var topic_data = topic.data()
				
				
				topic_data.id = topic.id
				
				var new_view_count = topic_data.view_count + 1
			var category_id = topic_data.category_id
			Forum_Topics.doc(topic_data.id).update({
				view_count: new_view_count
			}).then(function(result){
				res.render("ForumTopic",{posts: postDocDataList, id: req.query.id, topic: topic_data, username: username, uop: uop})
			})
			
				
			})
		})
	}
	else{
		res.redirect('/')
	}
	})
	
});

app.get('/logout', function(req, res){
	res.clearCookie('user_id')
	res.redirect('/')
})


// File POST handler.
app.post("/file_upload", function (req, res) {
  upload_file(req, function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    res.send(data);
  });
});

// Image POST handler.
app.post("/image_upload", function (req, res) {
  upload_image(req, function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    res.send(data);
  });
});

// Video POST handler.
app.post("/video_upload", function (req, res) {
  upload_video(req, function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    res.send(data);
  });
});


// Create folder for uploading files.
var filesDir = path.join(path.dirname(require.main.filename), "uploads");
if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
}

app.post('/submitLindblomOrder', multer.array("files"), function(req, res){
	var user_id = 'Guest';
	if(req.signedCookies.user_id){
		user_id = req.signedCookies.user_id
	}
	var email = req.body.email;
	var phone_number = req.body.phone_number;
	var team_number = req.body.team_number;
	var material = req.body.material;
	var finish = req.body.finish;
	var message = req.body.message;
	var order_date = new Date();
	var order_status = "requested";
	var delivery_type = req.body.delivery_type;
	
	
	var design_file = req.files[0];
	var additional_file = req.files[1];
	
	uploadFile(design_file).then(function (design_file_url){
		uploadFile(additional_file).then(function (additional_file_url){
			if(delivery_type != "pickup"){
				var address = ""+req.body.street_address+", "+req.body.city+", "+req.body.state+", "+req.body.zip_code;
				insertOrderWithAddress(Lindblom_Orders, user_id, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, order_status, delivery_type, address, function (id){
					
					emailOrderWithAddress(toEmailLindblom, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, delivery_type, address, id, function(responseInfo){
						res.redirect("/thankyou")
					})
				})
			}
			else{
				insertOrderWithoutAddress(Lindblom_Orders, user_id, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, order_status, delivery_type, function(id){
					
					emailOrderWithoutAddress(toEmailLindblom, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, delivery_type, id, function(responseInfo){
						res.redirect("/thankyou")
					})
				})
				
			}
		})	
	})
	
	
});

app.post('/validateSignup', function(req, res){
	username = req.body.username
	aPassword = req.body.password
	email = req.body.email
	
	validateSignup(username, aPassword, email, function(validity){
		
		
		res.send(validity)
		
	})
	
	
})

app.post('/validateLogin', function(req, res){
	username = req.body.username
	aPassword = req.body.password
	
	validateLogin(username, aPassword, function(validity){
		
		
		res.send(validity)
		
	})
	
	
})




app.post('/submit3DPrinterOrder', multer.array("files"), function(req, res){
	var user_id = 'Guest';
	if(req.signedCookies.user_id){
		user_id = req.signedCookies.user_id
	}
	var email = req.body.email;
	var phone_number = req.body.phone_number;
	var team_number = req.body.team_number;
	var material = req.body.material;
	var finish = req.body.finish;
	var message = req.body.message;
	var order_date = new Date();
	var order_status = "requested";
	var delivery_type = req.body.delivery_type;
	
	
	var design_file = req.files[0];
	var additional_file = req.files[1];
	
	uploadFile(design_file).then(function (design_file_url){
		uploadFile(additional_file).then(function (additional_file_url){
			if(delivery_type != "pickup"){
				var address = ""+req.body.street_address+", "+req.body.city+", "+req.body.state+", "+req.body.zip_code;
				insertOrderWithAddress(ThreeDPrinter_Orders, user_id, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, order_status, delivery_type, address, function (id){
					
					emailOrderWithAddress(toEmail3DPrinter, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, delivery_type, address, id, function(responseInfo){
						res.redirect("/thankyou")
					})
				})
			}
			else{
				insertOrderWithoutAddress(ThreeDPrinter_Orders, user_id, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, order_status, delivery_type, function(id){
					
					emailOrderWithoutAddress(toEmail3DPrinter, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, delivery_type, id, function(responseInfo){
						res.redirect("/thankyou")
					})
				})
				
			}
		})	
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
				
				res.cookie('user_id', doc.id, {
					httpOnly: true,
					signed: true
					//add maxAge attribute in milliseconds if wanted
				})
				getUserInfo(res, req, function(user_data){
				
			})
			})
			//Redirect to your Dashboard Later
			res.redirect('/')
		}
		else{
			console.log("hi")
			if(req.query && req.query.page){
				
				res.redirect('/'+req.query.page+"?uop=n")
			}
			else{
				res.redirect("/")
			}
		}
	})
});

app.post('/loginForum', function(req, res){
	var username = test_input(req.body.username);
	var aPassword = test_input(req.body.password);
	var query = Users.where("username", "==", username).where("password", "==", trencryption.constantEncrypt(aPassword));
	query.get().then(function(resultsOfQuery){
		if(resultsOfQuery.size > 0){
			resultsOfQuery.forEach(function(doc){
				
				res.cookie('user_id', doc.id, {
					httpOnly: true,
					signed: true
					//add maxAge attribute in milliseconds if wanted
				})
				getUserInfo(res, req, function(user_data){
				
			})
			})
			//Redirect to your Dashboard Later
			res.redirect('/')
		}
		else{
			
			if(req.query && req.query.page && req.query.id){
				
				res.redirect('/'+req.query.page+"?id=" + req.query.id+"&uop=n")
			}
			else{
				res.redirect("/")
			}
		}
	})
});

app.get('/signup', function(req, res){
	
	var validity = {username: true, password: true, email: true}
	res.render("signup", validity)
	
});

app.post('/signup', picUpload, function(req, res){
	var username = test_input(req.body.username);
	var aPassword = test_input(req.body.password);
	var first_name = test_input(req.body.first_name);
	var last_name = test_input(req.body.last_name);
	var email = test_input(req.body.email);
	var team_number = test_input(req.body.team_number);
	var team_name = test_input(req.body.team_name);
	
	picUpload(req, res, (err) =>{
					if(err){
						console.log(err)
					}
					else{
						registerUser(username, aPassword, first_name, last_name, email, team_number, team_name, req.file.path,  function(validity, user_id){
							if(validity.username && validity.password && validity.email){
								
								res.cookie('user_id', user_id, {
									httpOnly: true,
									signed: true
									//add maxAge attribute in milliseconds if wanted
								})
								getUserInfo(res, req, function(user_data){
									
									res.redirect('/')
									
									
								})
								
							}
							
							
						})
					}
					
	})
	
	
})

function insertUser(username, aPassword, first_name, last_name, email, team_number, team_name, profile_picture, callback){
	Users.add({
		username: username,
		password: trencryption.constantEncrypt(aPassword),
		first_name: first_name,
		last_name: last_name,
		email: email,
		team_number: team_number,
		team_name: team_name,
		profile_picture: profile_picture
	}).then(ref => {
  callback(ref.id);
});
}

function insertForum_Topic(user_id, category_id, name, description,  callback){
	Forum_Topics.add({
		user_id: user_id,
		category_id: category_id,
		name: name,
		description: description,
		post_count: 0,
		view_count: 0,
		last_post_date: new Date(),
		creation_date: new Date() 
	}).then(ref => {
		Forum_Categories.doc(category_id).get().then(function(category){
			
				var new_topic_count = category.data().topic_count + 1
				 
				Forum_Categories.doc(category_id).update({
				topic_count: new_topic_count
			}).then(function(doc){
				callback(ref.id);
			})
			})
  
});
}

function insertForum_Post(user_id, topic_id, content,  callback){
	Forum_Posts.add({
		user_id: user_id,
		topic_id: topic_id,
		content: content,
		post_date: new Date(),
	}).then(ref => {
		Forum_Topics.doc(topic_id).get().then(function(topic){
			var new_post_count = topic.data().post_count + 1
			var category_id = topic.data().category_id
			Forum_Topics.doc(topic_id).update({
				last_post_date: new Date(),
				post_count: new_post_count
			})
			Forum_Categories.doc(category_id).get().then(function(category){
				var past_category_post_count = category.data().post_count
				Forum_Categories.doc(category_id).update({
				post_count: past_category_post_count + 1
			}).then(function(doc){
				callback(ref.id);
			})
			})
		})
  
});
}

function insertOrderWithAddress(collection, user_id, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, order_status, delivery_type, address, callback){
	
	collection.add({
		user_id: user_id,
		email: email,
		phone_number: phone_number,
		team_number: team_number,
		design_file_url: design_file_url, 
		additional_file_url: additional_file_url,
		message: message,
		material: material,
		finish: finish,
		order_date: order_date,
		order_status: order_status,
		delivery_type: delivery_type,
		address: address
	}).then(ref => {
  callback(ref.id);
});
}

function insertOrderWithoutAddress(collection, user_id, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, order_status, delivery_type, callback){
	collection.add({
		user_id: user_id,
		email: email,
		phone_number: phone_number,
		team_number: team_number,
		design_file_url: design_file_url, 
		additional_file_url: additional_file_url,
		message: message,
		material: material,
		finish: finish,
		order_date: order_date,
		order_status: order_status,
		delivery_type: delivery_type
	}).then(ref => {
  callback(ref.id);
});
}

function registerUser(username, aPassword, first_name, last_name,  email, team_number, team_name, profile_picture, callback){
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
						
						insertUser(username, aPassword, addslashes(first_name), addslashes(last_name), email, team_number, team_name, profile_picture, function(id){
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

function emailOrderWithAddress(toEmail, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, delivery_type, address, id, callback){
	var mailOptions = {
  from: 'OctagonRoboticsRequester@gmail.com',
  to: toEmail,
  subject: 'New Order '+id,
  html: "<h1>Order Information</h1><h3>Client Email:</h3><h5>"+email+"</h5><h3>Client Phone Number:</h3><h5>"+phone_number+"</h5><h3>Client Team Number:</h3><h5>"+team_number+"</h5><h3>Design File Submitted by Client:</h3><h5><a href="+design_file_url+">Click here to download</a></h5><h3>Additional File Submitted by Client:</h3><h5><a href="+additional_file_url+">Click here to download</a></h5><h3>Message from Client:</h3><h5>"+message+"</h5><h3>Material:</h3><h5>"+material+"</h5><h3>Finish:</h3><h5>"+finish+"</h5><h3>Order Date:</h3><h5>"+order_date+"</h5><h3>Method of Delivery:</h3><h5>"+delivery_type+"</h5><h3>Delivery Address:</h3><h5>"+address+"</h5>"
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    callback(error)
  } else {
    callback(info);
  }
});
}

function emailOrderWithoutAddress(toEmail, email, phone_number, team_number, design_file_url, additional_file_url, message, material, finish, order_date, delivery_type, id, callback){
	var mailOptions = {
  from: 'OctagonRoboticsRequester@gmail.com',
  to: toEmail,
  subject: 'New Order '+id,
  html: "<h1>Order Information</h1><h3>Client Email:</h3><h5>"+email+"</h5><h3>Client Phone Number:</h3><h5>"+phone_number+"</h5><h3>Client Team Number:</h3><h5>"+team_number+"</h5><h3>Design File Submitted by Client:</h3><h5><a href="+design_file_url+">Click here to download</a></h5><h3>Additional File Submitted by Client:</h3><h5><a href="+additional_file_url+">Click here to download</a></h5><h3>Message from Client:</h3><h5>"+message+"</h5><h3>Material:</h3><h5>"+material+"</h5><h3>Finish:</h3><h5>"+finish+"</h5><h3>Order Date:</h3><h5>"+order_date+"</h5><h3>Method of Delivery:</h3><h5>"+delivery_type+"</h5>"
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    callback(error)
  } else {
    callback(info);
  }
});
}
function getDocumentsByFeature(collection, feature_title, features, documents, callback){
	if(features.length > 0){
		
		collection.where(feature_title,'==',features[0]).get().then(function(resultsOfQuery){
			if(resultsOfQuery.size > 0){
			resultsOfQuery.forEach(function(doc){
				
				
					var docData = doc.data()
					
					documents.push(docData)
				
			})
			}
			features.shift()
			return getDocumentsByFeature(collection, feature_title, features, documents, callback)
		})
	}
	else{
		callback(documents);
	}
}
function getDocumentsByID(collection, ids, documents, callback){
	if(ids.length > 0){
		collection.doc(ids[0]).get().then(doc => {
			var docData = doc.data()
			if(docData){
			
			
			docData.id = ids[0];
			documents.push(docData)
		}
			ids.shift()
			return getDocumentsByID(collection, ids, documents, callback)
		})
	}
	else{
		callback(documents);
	}
}

function getCategoryDocDataList(callback){
	Forum_Categories.get().then(
	function(categoryDocs){
		
		var moderator_id_list = []
		var categoryDocDataList = []
		categoryDocs.forEach(function(categoryDoc){
			moderator_id_list.push(categoryDoc.data().moderator_id)
			var docData = categoryDoc.data();
			docData.id = categoryDoc.id;
			categoryDocDataList.push(docData)
		})
		var emptyDocumentsList = []
		
		getDocumentsByID(Users, moderator_id_list, emptyDocumentsList, function(documents){
			categoryDocDataList.forEach(function(categoryDocData){
				documents.forEach(function(doc){
					
					if(categoryDocData.moderator_id == doc.id){
						categoryDocData.moderator_name = doc.first_name + " " + doc.last_name 
					}
				})
			})
			
			
			callback(categoryDocDataList)
		})
	}
	)
}
function getAllTopicDocDataList(callback){
	Forum_Topics.get().then(
	function(topicDocs){
		
		var user_id_list = []
		var topicDocDataList = []
		topicDocs.forEach(function(topicDoc){
			user_id_list.push(topicDoc.data().user_id)
			var docData = topicDoc.data();
			docData.id = topicDoc.id;
			topicDocDataList.push(docData)
		})
		var emptyDocumentsList = []
		
		getDocumentsByID(Users, user_id_list, emptyDocumentsList, function(documents){
			topicDocDataList.forEach(function(topicDocData){
				if(topicDocData.user_id == "Guest"){
					topicDocData.username = "Guest"
				}
				
				topicDocData.creation_date = "" + Math.round(((new Date()).getTime()-topicDocData.creation_date._seconds*1000)/(1000*60*60*24)) + "d"
				topicDocData.last_post_date = "" + Math.round(((new Date()).getTime()-topicDocData.last_post_date._seconds*1000)/(1000*60*60*24)) + "d"
				documents.forEach(function(doc){
					
					if(topicDocData.user_id == doc.id){
						topicDocData.username = doc.username
					}
				})
			})
			
			
			callback(topicDocDataList)
		})
	}
	)
}

function getTopicByCategoryIdDocDataList(category_id, callback){
	Forum_Topics.where("category_id", "==", category_id).orderBy('creation_date').get().then(
	function(topicDocs){
		
		var user_id_list = []
		var topicDocDataList = []
		topicDocs.forEach(function(topicDoc){
			user_id_list.push(topicDoc.data().user_id)
			var docData = topicDoc.data();
			docData.id = topicDoc.id;
			topicDocDataList.push(docData)
		})
		var emptyDocumentsList = []
		
		getDocumentsByID(Users, user_id_list, emptyDocumentsList, function(documents){
			topicDocDataList.forEach(function(topicDocData){
				if(topicDocData.user_id == "Guest"){
					topicDocData.username = "Guest"
				}
				
				topicDocData.creation_date = "" + Math.round(((new Date()).getTime()-topicDocData.creation_date._seconds*1000)/(1000*60*60*24)) + "d"
				topicDocData.last_post_date = "" + Math.round(((new Date()).getTime()-topicDocData.last_post_date._seconds*1000)/(1000*60*60*24)) + "d"
				documents.forEach(function(doc){
					
					if(topicDocData.user_id == doc.id){
						topicDocData.username = doc.username
					}
				})
			})
			
			
			callback(topicDocDataList)
		})
	}
	)
}

function validateSignup(username, aPassword, email, callback){
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
					
					callback(validity)
				})
			})
			
		})
}
function validateLogin(username, aPassword, callback){
	var validity = false
	
		var query = Users.where("username", "==", username).where("password", "==", trencryption.constantEncrypt(aPassword));
		checkIfExists(query,function(userExists){
			validity = userExists;
			callback(validity)
		})
}
function getPostByTopicIdDocDataList(topic_id, callback){
	Forum_Posts.where("topic_id", "==", topic_id).orderBy('post_date').get().then(
	function(postDocs){
		
		var user_id_list = []
		var postDocDataList = []
		postDocs.forEach(function(postDoc){
			user_id_list.push(postDoc.data().user_id)
			var docData = postDoc.data();
			docData.id = postDoc.id;
			postDocDataList.push(docData)
		})
		var emptyDocumentsList = []
		
		getDocumentsByID(Users, user_id_list, emptyDocumentsList, function(documents){
			
			postDocDataList.forEach(function(postDocData){
				
				
				if(postDocData.user_id == "Guest"){
					postDocData.username = "Guest"
					postDocData.profile_picture = "/uploads/Guest.jpg"
				}
				postDocData.post_date = (new Date(postDocData.post_date._seconds*1000)).toString()
				
				documents.forEach(function(doc){
					
					if(postDocData.user_id == doc.id){
						postDocData.username = doc.username
						postDocData.profile_picture = doc.profile_picture
					}
				})
			})
			
			
			callback(postDocDataList)
		})
	}
	)
}
