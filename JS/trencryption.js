//requires crypto module
var crypto = require('crypto');

//array of random keys
const keys = ['646ec57fdcf7a6ac4ee30f8320740c1af490a7d0c3d9b176346311ca717a454f97e71fbbeb817a929307fdcf76680ef28ef1e2fd27efb307ff02a2fa2155b2b0trfKQlWDIZEaayHASlsctwPjBJ26','33f9da8077d14b02ae21ff39ff56cdc6ad074e7407447ec1cc859bbfda5b671327457c7c97ed6caf8ea44314957a59dd1b0f900856d32df2923ddf1fe709dec9VAzFxRoxYZQuCOCKdhjHBFHwuAngQFy31','5b6076ca69c1c99f2fdf0090cd39d7a4c997380827546f216a6b1199a06002afe7efbf5216d85ddad23ea20aabcecc7faef8407f4c4d5d9c477e22e0d4d0ca12pjdVOaTXsFEAOrxDcTSyguxyjxLFENOuGZH35','283ba5725ca5c61d52ea8e0a6d222cf137930694048281e2a3f8503ed5bd3c30432de147802f8e1525dfcb53312913b0beaf79ad1932115025da7a73c4a613cflzuDDqUfXesyBKXNHqeZDRAU24','2a55f90cf0dba78350fbd955fd58efa95a8b3ad161140562c75c45922c3a290561da0fdb69379dab00925b054f03ff0a567178337aa2e684bf507f007a81c02cTiWLfSbUSMkJfjBHpgkxgKQJ24','71c92cb20993e370066ab00905039c08b4d657ecfa7d3b4caa496e3b552ee178b9e7ea53fc42eb75e99f0222b2c0c3a9fe6f0668b32bbddc7dfc02a5ae404329GWkKcRuXPpgFfPScoCPyfDNQy25','e3611b5a3627ef2feb90a62e7ec4dd4510dc61ed062f65d0794c2e97d6d2b40bdb69108dee67348acb1b79be375507b84c2385ee6388bbf115ec705f3c13f978GyIUdTrmfpYKcWMvWtOrefOAhRnEYkKOLjhNfqpO40','6fa59b1e39840abd2c8584f126703458507a3465f6df1c85e9841d9e176c34b7cfd4b4ffce1770396b5427d0d9d5f200a0c1f1c206f081e6b15cb13c43c1eedfkjPNZykpCmjQecfguiFMUOpgkWMt28','4f1eece67ddcc1be3194c3e33b4b757401f6b42f9259e68c32a6a0a0c0d3bd3030dd72b71ab500d74d97dde5103c5cfca26f29469ee501a0d979948a2c430257FXBzQrcvGHrhWkUXFOSpJYgzd25','1720fd8cc860b96f4b7e0627f482e64e69aa3eaa2846b5d1841436f6d90fe0a9e72553059a4503908ae1ea4c48ccf41652ac3a53d50ab35937c1a994d2713680dchrymtzKxMOEFvhOFiAAyugwnEqnYaqVGZsisf39']

//array of random salts
const salts = ['b17eed37994168b03407f3599edf29d61042344920118a1f1691525bacd50b85484f7942940f4ce5d782e09e0900073aa14806969084ce4c52b74fc99b6ddca5PBJyYmZRedurGxDfHpQGTzhTHEzByjRQSojjzr38','da785e7f91f57a67b8c41d784a2e714106860e515ef57efd34260d1a7aa681fc1f219eb50b059cc5bcd370fc9e9a523fa233b879897904e8ec912ed2ce6d3252osGPwCrYKjLdHEFBYNtdwZdbt25','5e3c87495facc8b7f0abacb2b2c1d91fd7daf8bc739130df8bd300e27805d4a83514b44865ac61f1e379f9c1416716734ece4045268c3adf27885307fff0c90exSfSNxulIgEBbpIXlIbKPWRRX25','0c669e2e7eea66185405644645c51bf2fb3ca77a3f1c7aa4011fa97fab816ae55e4c1e6f657e54f709b8768c9e58f08ab6fce38fd868aeedfca12ec5dd091ac3quxMsEqkjSvEAGZxYYldbeSewOwfpi30','d74a05352f96cfd72979eb15999f0fce8a94c581643d9c4c341b7100fa4dc4beb7f54945257ff8f1334cb10ff5586b398487f24691c072f9aa36dfe4f97d2cccvzKEbxVqNseYBlcfJBavfUeifsKcexzOdS34','dce753e0c8832f29fa0722c863c3e6710d39f312e28574e0b7380e2e5fb4c18eec98f4416799612e0768c7e758954f6929e24a1b45dd4446f8656a9469e06387ZVaZQInrOpmEZVpYrZaEyvhLPRldzIflTueSXJI39','5d7b292371f61fc9b6af3989bcd3a968bf9a2fe28af3d841518810dabb1f6d59331e7ddec543ec776bdfe78ee2cef58c21efa24c9cf719ef6f0030f81424010fGPSOsQtwlUOwhgOeKCKvAYaXRNN27','e57a0e6a73f9653717d1e45353d2e165a34ae0c76cbacb5596ea23d3c382b2afec8f04c9f824ba0fb206a0db164d82bfe4e8f9e01fc829a946aa77f97d8e6d29jvtJyfJLWjmTYscdIjfgsjEgQvcdfaoEWU34','993ba16bbd43a41575406d3d89cb0724038d81d6e1ccb3fe13647ef6f46b0a2194217498fb015f34f735aac5af6d4cfef95ff3f1754d15e02f47723738a7c0addSIyceUGMKegwBoKSGUXswPrtlnDJJusHi34','7ceaaac6d7bb6e9973211fd8187d63d8f87b628e0a33275e57f02035419d0e954548951fdde616941ba8782a2bf42bf5f30ecc4c7744aeaf1be11bad24034d0cWqYIqIDiEHZCaNmjQSDAxBEamH26']

//gets a random integer given an upper an lower bound inclusive
function randint(lowerbound, upperbound){
	return Math.floor(lowerbound + Math.random()*(upperbound-lowerbound+1))
}

//previously used functions to generate random salts and keys
/*function makeRandomString(length) {
   var randomString = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return randomString;
} 
function makeRandomLetterString(length) {
   var randomString = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return randomString;
} 
function saltString(string){
	var lengthOfString = string.length;
	var randomString = makeRandomString(lengthOfString)
	var saltedString = ''
	for(var i = 0; i < lengthOfString; i++){
		saltedString += string[i] + randomString[i];
	}
	return saltedString;
}*/

//encrypts string with given salt and key indexes
function encryptString(string, saltNumber, keyNumber){
	var salt = salts[saltNumber]
	var saltedString = ''
	for(var i = 0; i < string.length; i++){
		saltedString += string[i] + salt[i];
	}
	var encryptedString = crypto.createHmac("sha256", keys[keyNumber]).update(saltedString).digest('hex') + saltNumber + keyNumber; 
	return encryptedString;
}

//encrypts string with given salt and key indexes
exports.encryptString = function(string, saltNumber, keyNumber){
	return encryptString(string, saltNumber, keyNumber)
}

//encrypts string with given salt and key indexes
exports.constantEncrypt = function(string){
	return encryptString(string, 0, 0)
}

//randomly encrypts password
exports.randEncryptString = function(string){
	var encryptedString = encryptString(string, randint(0, 9), randint(0, 9))
	return encryptedString;
}

//checks if an encrypted password matches a password after it is encrypted
exports.checkEncryptedPassword = function(aPassword, encryptedPassword){
	var saltNumber = encryptedPassword.substring(encryptedPassword.length-2,encryptedPassword.length-1)
	var keyNumber = encryptedPassword.substring(encryptedPassword.length-1)
	return encryptString(aPassword, saltNumber, keyNumber) == encryptedPassword;
}

/*function desaltString(saltedString){
	var lengthOfString = saltedString.length;
	var desaltedString = ''
	for(var i = 0; i < lengthOfString; i+=2){
		desaltedString += saltedString[i];
	}
	return desaltedString;
}
exports.saltedEncryt = function(string){
	var length = randint(20,40);
	var key = makeRandomLetterString(length);
	const cryptr = crypto.createCipher('aes-128-cbc-hmac-sha1', key); 
	
	string = saltString(string);
	var string = cryptr.update(string, 'utf8', 'hex')
	string += cryptr.final('hex');
	string +=  key + length;
	return string;
}
function getEndNumber(string){
	var endNumber = 0; 
	var digit;
	for(var i = string.length -1; i >= 0; i--){
		if(isNaN(string[i])){
			break;
		}
		else{
			endNumber += parseInt(string[i]) * Math.pow(10,(string.length -1)-i);
		}
	}
	return endNumber;
}
exports.saltedDecrypt = function saltedDecrypt(string){
	var endNumber = getEndNumber(string);
	var saltedEncrytion = string.substring(0,string.length - (endNumber + (""+endNumber).length));
	var key = string.replace(saltedEncrytion,"");
	key = key.replace(endNumber,"");
	const cryptr = crypto.createDecipher('aes-128-cbc-hmac-sha1', key); 
	var string = cryptr.update(string, 'hex', 'utf8')
	string += cryptr.final('utf8');
	string = desaltString(string);
	return string;
}*/
