/*Fonts (from Google Fonts)*/
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700,900");
@import url("https://fonts.googleapis.com/css?family=Cinzel");
@import url("https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900");
@import url("https://fonts.googleapis.com/css?family=Syncopate");
/*Formalities*/
/*Global Styles*/
body {
  background-color: white;
}

.card {
  position: absolute;
  z-index: -1;
  max-width: 300px;
  min-width: 20px;
  opacity: 0;
  border: none;
}

.card-primary .card-header {
  background-color: #164869;
  color: rgba(255, 255, 255, 0.52);
  font-family: "Raleway", sans-serif;
}
.card-primary .card-title {
  font-family: "Raleway", sans-serif;
  padding: 1rem;
  font-weight: 700;
}
.card-primary .card-body {
  background-color: rgba(13, 37, 52, 0.75);
  color: rgba(16, 46, 65, 0.63);
}
.card-primary .card-btn {
  background: none;
  color: rgba(16, 46, 65, 0.63);
  border: 1px solid rgba(16, 46, 65, 0.63);
  width: 100%;
}

.card-secondary .card-header {
  background-color: #6AA5BD;
  color: rgba(255, 255, 255, 0.52);
  font-family: "Raleway", sans-serif;
}
.card-secondary .card-title {
  font-family: "Raleway", sans-serif;
  padding: 1rem;
  font-weight: 700;
}
.card-secondary .card-body {
  background-color: rgba(71, 112, 129, 0.82);
  color: rgba(53, 78, 88, 0.47);
}
.card-secondary .card-btn {
  background: none;
  border: 1px solid rgba(53, 78, 88, 0.49);
  color: rgba(53, 78, 88, 0.41);
  width: 100%;
}

.card-tertiary .card-header {
  background-color: #AE445D;
  color: rgba(255, 255, 255, 0.67);
  font-family: "Raleway", sans-serif;
}
.card-tertiary .card-title {
  font-family: "Raleway", sans-serif;
  padding: 1rem;
  font-weight: 700;
}
.card-tertiary .card-body {
  background-color: rgba(90, 36, 49, 0.77);
  color: rgba(100, 37, 52, 0.49);
}
.card-tertiary .card-btn {
  background: none;
  border: 1px solid rgba(100, 37, 52, 0.49);
  color: rgba(100, 37, 52, 0.49);
  width: 100%;
}

.card-quaternary .card-header {
  background-color: #4b5c11;
  color: rgba(255, 255, 255, 0.67);
  font-family: "Raleway", sans-serif;
}
.card-quaternary .card-title {
  font-family: "Raleway", sans-serif;
  padding: 1rem;
  font-weight: 700;
}
.card-quaternary .card-body {
  background-color: rgba(51, 62, 13, 0.66);
  color: rgba(45, 56, 10, 0.49);
}
.card-quaternary .card-btn {
  background: none;
  border: 1px solid rgba(45, 56, 10, 0.49);
  color: rgba(45, 56, 10, 0.49);
  width: 100%;
}

.card-quinary .card-header {
  background-color: #4b385f;
  color: rgba(255, 255, 255, 0.67);
  font-family: "Raleway", sans-serif;
}
.card-quinary .card-title {
  font-family: "Raleway", sans-serif;
  padding: 1rem;
  font-weight: 700;
}
.card-quinary .card-body {
  background-color: rgba(78, 60, 96, 0.8);
  color: rgba(73, 55, 92, 0.5);
}
.card-quinary .card-btn {
  background: none;
  border: 1px solid rgba(73, 55, 92, 0.5);
  color: rgba(73, 55, 92, 0.5);
  width: 100%;
}

#index div#headbar {
  background-color: #164869;
  border-bottom: 3px solid white;
  position: relative;
  z-index: 100;
}
#index div#header {
  padding-top: 6rem;
  padding-bottom: 6rem;
  flex-grow: 1;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
#index div.statement {
  background-color: #164869;
  color: white;
  padding: 3%;
}
#index div.button {
  transition-duration: 0.15s;
  -webkit-transition-duration: 0.15s;
  height: 100%;
}
#index div.button:hover a {
  color: white;
  width: 100%;
  transition-duration: 0.15s;
  -webkit-transition-duration: 0.15s;
  background-color: #164869;
}
#index div #login a {
  border: 1px solid #6c757d;
}
#index div #login:hover a {
  background-color: #6c757d;
  color: white;
}
#index div#class-img {
  overflow: auto;
  height: 100%;
}
#index div#cardBackground {
  overflow: hidden;
}
#index div#envelope {
  position: relative;
}
#index div#mission {
  padding-top: 20rem;
  padding-bottom: 20rem;
}
#index img.logo {
  margin-top: 8%;
  margin-bottom: 8%;
}
#index h1 {
  color: white;
  font-size: 7rem;
  font-family: "Cinzel Decorative", serif;
  font-weight: 700;
  /*background: linear-gradient(to right bottom, #164869, #2b5e7e, #3f7593, #548da8, #6aa5bd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
#index h2 {
  font-size: 6rem;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
}
#index span.gradient {
  background: linear-gradient(to right bottom, #164869, #2b5e7e, #5b93b2, #7ab4d0, #b2e9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#index p {
  font-family: "Raleway", sans-serif;
  color: #164869;
  font-size: 20px;
  margin-bottom: 1rem;
}
#index div.button a {
  text-decoration: none;
  font-size: 1.5rem;
  color: #164869;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  padding: 0.8rem 2rem;
  border: 1px solid #164869;
  width: 100%;
}
#index #login a {
  color: #6c757d;
}

#account div.greeting {
  text-align: left;
  animation-name: list;
  animation-duration: 3s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  -webkit-animation-name: list;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1s;
  -webkit-animation-fill-mode: backwards;
}
#account h1 {
  font-family: "Cinzel Decorative", serif;
  font-size: 150px;
  letter-spacing: 5px;
}
#account h2 {
  font-size: 80px;
  font-family: "Cinzel Decorative", serif;
  color: white;
}
#account h3 {
  font-family: "Raleway", sans-serif;
  font-size: 50px;
  padding-left: 3%;
  color: white;
}
#account h4 {
  font-family: "Cinzel", serif;
  font-size: 35px;
}
#account h5 {
  font-family: "Syncopate", sans-serif;
  font-size: 15px;
}
#account p {
  font-family: "Raleway", sans-serif;
  font-size: 20px;
  color: black;
}
#account div.body {
  height: 70%;
  width: 100%;
  animation-name: list;
  animation-duration: 3s;
  animation-delay: 1s;
  animation-fill-mode: backwards;
  -webkit-animation-name: list;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1s;
  -webkit-animation-fill-mode: backwards;
}
#account #logout {
  height: 100px;
  width: 20%;
  background-color: white;
  color: red;
  border: none;
  font-family: "Raleway", sans-serif;
  font-size: 1.3vw;
  margin: 2%;
}
#account #logout:hover {
  color: white;
  background-color: red;
  border: none;
  -webkit-transition-duration: 0.4s;
  /* Safari */
  transition-duration: 0.4s;
}
#account .logout {
  width: 100%;
  background-color: white;
  border-top: 1px solid red;
}
#account div.heading {
  margin-top: 6%;
}
#account div.tab {
  width: 100%;
  animation-name: list;
  animation-duration: 3s;
  animation-delay: 1.7s;
  animation-fill-mode: backwards;
  margin-top: 3%;
  -webkit-animation-name: list;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1.7s;
  -webkit-animation-fill-mode: backwards;
}
#account div.tab button {
  color: white;
  font-family: "Pontano Sans", sans-serif;
  border: none;
  outline: none;
  text-align: center;
  background-color: inherit;
  cursor: pointer;
  font-size: 30px;
  padding: 0% 3% 0% 3%;
}
#account div.tab button:hover, #account div.tab button:active {
  border-bottom: 1px solid black;
}

#classes {
  height: 78%;
  animation-name: list;
  animation-duration: 3s;
  animation-delay: 1.7s;
  animation-fill-mode: backwards;
  -webkit-animation-name: list;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1.7s;
  -webkit-animation-fill-mode: backwards;
}

#account #teachers, #account #questions {
  height: 78%;
  animation-name: list;
  animation-duration: 3s;
  animation-delay: 1.7s;
  animation-fill-mode: backwards;
  -webkit-animation-name: list;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1.7s;
  -webkit-animation-fill-mode: backwards;
}
#account div.classLabel {
  float: left;
  border-right: 1px solid white;
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#account div.quote {
  background-color: white;
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
}
#account #box {
  height: 250px;
  width: 500px;
  background-color: white;
  justify-content: center;
}
#account div.name {
  width: 100%;
  height: 80%;
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#account div.launch {
  width: 100%;
  height: 20%;
  color: white;
  background-color: #164869;
  display: flex;
  align-items: center;
  justify-content: center;
}
#account div.envelope {
  padding: 0% 20% 0% 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
#account div.display {
  border: 1px solid white;
  float: right;
  animation-name: list;
  animation-duration: 3s;
  animation-delay: 1.5s;
  animation-fill-mode: backwards;
  -webkit-animation-name: list;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1.5s;
  -webkit-animation-fill-mode: backwards;
}
#account div.profile {
  height: 80%;
  width: 100%;
  background-color: white;
  color: black;
  animation-name: list;
  animation-duration: 3s;
  animation-delay: 1s;
  animation-fill-mode: backwards;
  -webkit-animation-name: list;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1s;
  -webkit-animation-fill-mode: backwards;
  padding-top: 2%;
}
#account div.envelope2 {
  padding: 0% 3% 0% 3%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#account div.image {
  width: 100%;
}
#account img {
  width: 25%;
  height: 7%;
  animation-name: image;
  animation-duration: 2s;
  animation-delay: 1s;
  animation-fill-mode: backwards;
  animation-timing-function: ease;
  -webkit-animation-name: image;
  -webkit-animation-duration: 2s;
  -webkit-animation-delay: 1s;
  -webkit-animation-fill-mode: backwards;
}
#account img.openQuote {
  width: 8%;
  height: 22%;
  float: left;
  margin-left: 5%;
}
#account img.closeQuote {
  float: right;
  width: 8%;
  height: 22%;
  margin-right: 5%;
}
#account div.quote1 {
  width: 70%;
}
#account div.quote1 p {
  font-size: 30px;
  font-family: "Raleway", sans-serif;
  font-style: italic;
}
#account div.quote1 p.description {
  font-size: 20px;
  float: right;
}
#account li {
  border-bottom: 1px solid black;
  padding-left: 5%;
}
#account table {
  width: 40%;
  height: 100%;
}
#account td {
  font-size: 40px;
  padding: 80%;
}
#account #myCarousel {
  height: 100%;
  width: 50%;
  float: right;
  padding-top: 3%;
}
#account div.statement {
  margin-top: 2%;
}
#account a {
  text-decoration: none;
  color: white;
}
#account a:hover {
  color: #bfbfbf;
  border: none;
}
#account.carousel-indicators {
  bottom: 0px;
}

#classPage h1 {
  font-family: "Cinzel Decorative", serif;
  font-size: 7vw;
  color: white;
  font-weight: 300;
}
#classPage h2 {
  font-family: "Raleway", sans-serif;
  font-size: 40px;
  color: #bfbfbf;
}
#classPage h3 {
  font-family: "Cinzel", serif;
  font-weight: 200;
  height: 20px;
}
#classPage h4 {
  font-family: "Raleway", sans-serif;
  font-weight: 100;
}
#classPage h6 {
  font-size: 1.4vw;
  color: #595959;
  font-family: "Raleway", sans-serif;
  font-weight: 100;
  margin-top: 0px;
  margin-bottom: 0px;
}
#classPage p.statement {
  font-family: "Raleway", sans-serif;
  font-weight: 100;
  color: white;
  font-size: 3vw;
  letter-spacing: 0.5vw;
}
#classPage p.null {
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  color: darkslategray;
  font-size: 1.4vw;
}
#classPage input[value=VOTE] {
  font-family: "Raleway", sans-serif;
  font-size: 0.5vw;
  color: white;
}
#classPage div.img {
  width: 100%;
  height: 11%;
  background-color: white;
}
#classPage div.classname {
  width: 100%;
  color: black;
  padding-top: 5%;
  padding-bottom: 5%;
}
#classPage img {
  width: 25%;
  height: 100%;
}
#classPage div.statement {
  margin-top: 2%;
}
#classPage div.statement p {
  color: white;
}
#classPage div.outerContainer {
  width: 100%;
  margin: auto;
  background-color: whitesmoke;
}
#classPage div.innerContainter {
  height: 100%;
  width: 60%;
  margin: auto;
  background-color: white;
  padding-bottom: 4%;
  padding-top: 5px;
}
#classPage div.ask {
  margin-left: 30%;
  margin-top: 6%;
  margin-right: 30%;
  padding-bottom: 1.7%;
  padding-top: 1%;
  color: white;
  background-color: #164869;
}
#classPage a {
  color: white;
  text-decoration: none;
}
#classPage a.backLink, #classPage a:hover {
  color: gray;
}
#classPage div.strip {
  background: radial-gradient(black 50%, white 50%);
  height: 5px;
  width: 100%;
  margin-bottom: 30px;
}
#classPage div#question {
  background-color: white;
  height: 10%;
  width: 100%;
  margin: auto;
  overflow: hidden;
  display: inline-block;
  position: relative;
}
#classPage div#answer {
  margin: auto;
  display: inline-block;
  position: relative;
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 1%;
  margin-bottom: 1%;
  width: 94%;
  background-color: whitesmoke;
  color: black;
}
#classPage div#text, #classPage div#atext {
  height: 100%;
  width: 70%;
  margin-left: 10%;
  float: left;
  padding: 20px;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
}
#classPage div.vote {
  float: left;
  background-color: #164869;
  color: white;
  height: 100%;
  width: 15%;
  position: absolute;
  right: 0;
  top: 0;
  font-family: "Raleway", sans-serif;
  font-size: 0.7vw;
  border: none;
  line-height: 100%;
}
#classPage .answerButton {
  display: block;
  position: absolute;
  height: 100%;
  width: 15%;
  float: left;
  color: white;
  background: none;
  background-color: lightgrey;
  font-family: "Raleway", sans-serif;
  border-style: none;
  transition: width 0.4s ease-in-out;
  -webkit-transition: width 0.4s ease-in-out;
  transition: margin-left 0.4s ease-in-out;
  -webkit-transition: margin-left 0.4s ease-in-out;
  font-size: 1.3vw;
}
#classPage .answerForm {
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  width: 40%;
  margin-left: 30%;
  padding: 1%;
  display: none;
}
#classPage .answerForm textarea {
  border: none;
  border-bottom: 1px solid lightgray;
  width: 100%;
  text-align: center;
  color: black;
  font-size: 1vw;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
}
#classPage .answerForm input {
  border: none;
  width: 80%;
  text-align: center;
  color: black;
  padding: 3%;
  font-size: 1.2vw;
  background-color: #164869;
  font-family: "Raleway", sans-serif;
  color: white;
}
#classPage .answerForm button {
  background: none;
  border: 1px solid #164869;
  color: #164869;
  padding: 1%;
}
#classPage .formContainer button {
  border: none;
  border-bottom: 1px solid lightgray;
  margin-bottom: 6%;
  font-family: "Raleway", sans-serif;
}
#classPage p#answerBack {
  font-size: 1vw;
  color: #595959;
}
#classPage input.vote {
  color: white;
  background: none;
  border: none;
}
#classPage #voteform {
  position: relative;
  line-height: normal;
}
#classPage div.votecontainer {
  height: 100%;
  width: 100%;
  position: static;
  display: flex;
  align-items: center;
  justify-content: center;
}
#classPage span.num {
  font-size: 2.5vw;
  line-height: normal;
}
#classPage div.formContainer {
  text-align: center;
  align-items: center;
  display: none;
}
#classPage div.top {
  height: 60%;
  width: 100%;
  position: absolute;
}
#classPage div.bottom {
  height: 25%;
  width: 100%;
  position: absolute;
  margin-top: 5%;
}

#questionPage h1 {
  font-family: "Cinzel Decorative", serif;
  font-size: 50px;
  color: black;
}
#questionPage h2 {
  font-family: "Raleway", sans-serif;
  font-size: 40px;
  color: #bfbfbf;
}
#questionPage h3 {
  font-family: "Cinzel", serif;
  margin-top: 5%;
}
#questionPage p {
  font-family: "Raleway", sans-serif;
  font-size: 20px;
  color: white;
}
#questionPage div.body {
  height: 89%;
  width: 100%;
  background-color: white;
}
#questionPage div.img {
  width: 100%;
  height: 11%;
}
#questionPage div.classname {
  height: 30%;
  width: 100%;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
#questionPage img {
  width: 25%;
  height: 90%;
}
#questionPage div.heading {
  width: 50%;
  padding-bottom: 10%;
}
#questionPage a {
  color: white;
}
#questionPage a.backLink, #questionPage a:hover {
  color: gray;
}
#questionPage div.ask {
  height: 40%;
}
#questionPage textarea {
  width: 40%;
  height: 250px;
  font-size: 30px;
  text-align: center;
  border: none;
  margin-top: 2%;
  border-left: 1px solid #164869;
  border-right: 1px solid #164869;
  overflow: auto;
  font-family: "Raleway", sans-serif;
  padding-left: 5%;
  padding-right: 5%;
}
#questionPage input {
  width: 10%;
  height: 50px;
  background-color: #164869;
  color: white;
  border: none;
  font-size: 20px;
  font-family: "Cinzel", serif;
}

#teacherPage img {
  width: 20%;
  height: 17%;
  padding-top: 1%;
  width: 25%;
  height: 7%;
  margin-top: 1%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-name: image;
  animation-duration: 2s;
  animation-delay: 1s;
  animation-fill-mode: backwards;
  animation-timing-function: ease;
}
#teacherPage div.img {
  position: absolute;
  z-index: 10;
  width: 100%;
  background-color: white;
  margin-left: -0.4%;
  margin-right: -0.4%;
  margin-top: -0.5%;
}
#teacherPage div.strip {
  width: 100%;
  height: 10px;
  background-image: url(color.png);
  background-size: cover;
  animation-name: list;
  animation-duration: 3s;
  animation-delay: 1.2s;
  animation-fill-mode: backwards;
  -webkit-animation-name: list;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1.2s;
  -webkit-animation-fill-mode: backwards;
}
#teacherPage div.container {
  overflow: hidden;
  overflow: auto;
  position: absolute;
  margin-left: -0.4%;
  margin-right: -0.4%;
  margin-top: 5%;
  height: 100%;
  width: 101%;
}
#teacherPage div.header {
  width: 100%;
  height: 60%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(color.png);
  background-size: cover;
  margin-left: -0.4%;
  margin-right: -0.4%;
  animation-name: list;
  animation-duration: 3s;
  animation-delay: 1s;
  animation-fill-mode: backwards;
  -webkit-animation-name: list;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1s;
  -webkit-animation-fill-mode: backwards;
}
#teacherPage div.description {
  width: 100%;
  height: 20%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4%;
  margin-bottom: 10%;
  animation-name: list;
  animation-duration: 3s;
  animation-delay: 2.3s;
  animation-fill-mode: backwards;
  -webkit-animation-name: list;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 2.3s;
  -webkit-animation-fill-mode: backwards;
}
#teacherPage div.class {
  width: 100%;
  height: 50%;
  margin-top: 10%;
}
#teacherPage div.name {
  width: 50%;
  height: 100%;
  border-right: 1px solid #164869;
  margin-bottom: 10%;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
#teacherPage div.sections {
  float: right;
  width: 49%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin-right: -15px;
}
#teacherPage div.sub {
  width: 100%;
  height: 60%;
}
#teacherPage div.left_container {
  width: 90%;
  float: left;
  padding-left: 8%;
  z-index: 5;
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
}
#teacherPage div.right_container {
  float: right;
  height: 78%;
  width: 0%;
  border-bottom: 10px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #164869;
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
}
#teacherPage div.teacher {
  border-bottom: 1px solid #164869;
  height: 100%;
}
#teacherPage div.time {
  padding-top: -3%;
}
#teacherPage h1 {
  font-family: "Cinzel Decorative", serif;
  font-size: 6.4vw;
  color: #164869;
}
#teacherPage h2 {
  color: #164869;
  font-size: 5vw;
  font-family: "Cinzel", serif;
}
#teacherPage h3 {
  font-size: 2vw;
  font-family: "Cinzel", serif;
}
#teacherPage h4 {
  font-family: "Raleway", sans-serif;
  color: white;
  font-size: 5vw;
}
#teacherPage p {
  font-size: 2vw;
  font-family: "Raleway", sans-serif;
}
#teacherPage input.section {
  font-size: 4.5vw;
  font-family: "Raleway", sans-serif;
  color: #164869;
  background-color: white;
  border: none;
}
#teacherPage a {
  text-decoration: none;
}

/* Make it so that when the  user clicks on the section they want to see, the go button appears. */
.nav {
  background-color: #164869;
}

#grand-parent {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: -5;
}

/*# sourceMappingURL=styles.cs.map */
