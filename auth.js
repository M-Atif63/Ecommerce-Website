import { initializeApp, getAuth, firebaseConfig, createUserWithEmailAndPassword, onAuthStateChanged } from "./firebase.js";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log('app=>', app)
console.log('auth=>', auth)

var sbtn = document.getElementById("sbtn")
sbtn.addEventListener("click", signup)

async function signup() {
  var semail = document.getElementById("semail")
  var spassword = document.getElementById("spassword")
  var message = document.getElementById("mess")

  // else if(!)
  if(!spassword.value || !semail.value){
    message.innerText = "Please fill All Fields"
    return
  }
  createUserWithEmailAndPassword(auth, semail.value, spassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user=>", user.email)
      message.innerText = "Account Created Successfully"
      message.style.color="green"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      message.innerText = "Please fill correct Email & Password";
      message.style.color="red"
      console.log("Error=>", errorMessage)
    });
}