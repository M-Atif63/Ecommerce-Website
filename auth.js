import {
  initializeApp,
  getAuth,
  firebaseConfig,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "./firebase.js";


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
  if (!spassword.value || !semail.value) {
    message.innerText = "Please fill All Fields"
    return
  }
  createUserWithEmailAndPassword(auth, semail.value, spassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user=>", user.email)
      message.innerText = "Account Created Successfully"
      message.style.color = "green"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      message.innerText = "Please fill correct Email & Password";
      message.style.color = "red"
      console.log("Error=>", errorMessage)
    });
}


onAuthStateChanged(auth,(user) => {
  if (user) {
    if (window.location.pathname.includes("signup.html") || window.location.pathname.includes("login.html")) {
      window.location.href = "login.html";
    }
    else{
      window.location.href = "signup.html"
    }
  }
});


// console.log("window.location.pathname=>",window.location.pathname)

// Continue With Goggle
const provider = new GoogleAuthProvider();


var goggleBtn = document.getElementById("goggleBtn")
goggleBtn.addEventListener("click", continueWithGoggle)

async function continueWithGoggle() {

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}


