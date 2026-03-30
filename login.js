import {
    initializeApp,
    getAuth,
    firebaseConfig,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    // signOut
} from "./firebase.js";


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log('app=>', app)
console.log('auth=>', auth)

// Login Page
var loginBtn = document.getElementById("loginBtn")
loginBtn.addEventListener("click", login)



async function login() {
    var lemail = document.getElementById("lemail").value
    var lpassword = document.getElementById("lpassword").value
    var message = document.getElementById("mess")

    if (!lemail || !lpassword) {
        message.innerText = "Please fill all fields"
        message.style.color = "red"
        return
    }

    await signInWithEmailAndPassword(auth, lemail, lpassword)
        .then((userCredential) => {
            message.innerText = "Login Successfully"
            message.style.color = "green"
        })
        .catch((error) => {
            message.innerText = "Please fill correct Email & Password";
            message.style.color = "red"
        });
}


// Authentication State Change
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (window.location.pathname.includes("signup.html") || window.location.pathname.includes("login.html")) {
            window.location.href = "dashboard.html";
        }
        else {
            window.location.href = "login.html"
        }
    }
});



// Continue With Goggle

const provider = new GoogleAuthProvider();


var goggleBtn = document.getElementById("goggleBtn")
goggleBtn.addEventListener("click", continueWithGoggle)

async function continueWithGoggle() {
    await signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
        }).catch((error) => {
        });
}


// // logout page

// var logoutBtn = document.getElementById("logoutBtn")

// if (logoutBtn) {
//     logoutBtn.addEventListener("click", logout)
// }
// async function logout() {
//     try {
//         await signOut(auth);
//         user = "";
//         console.log("Sign-out successful");
//     } catch (error) {
//         console.error("Sign-out failed:", error);
//     }
// }