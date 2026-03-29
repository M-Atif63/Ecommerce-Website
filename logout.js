import { initializeApp, firebaseConfig, } from "./firebase.js";
import { getAuth, signOut, onAuthStateChanged } from "./firebase.js";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log("app=>", app)
console.log("auth=>", auth)


// authentication state change

var signupBtn = document.getElementById("signupBtn");
var loginBtn = document.getElementById("loginBtn");
var logoutBtn = document.getElementById("logoutBtn");


onAuthStateChanged(auth, (user) => {
    if (user) {
        signupBtn.style.display = "none";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block"
        // console.log("ye user login hai=>", user.email);
    } else {
        logoutBtn.style.display = "none"
        signupBtn.style.display = "block";
        loginBtn.style.display = "block";
        console.log("user logout ho gaya hai")
    }
});




// Logout page


if (logoutBtn) {
    logoutBtn.addEventListener("click", logout)
}
async function logout() {
    try {
        await signOut(auth);
        user = "";
    } catch (error) {
        console.error("logout error=>", error)
    }
}



signupBtn.addEventListener("click", openSignupPage)
async function openSignupPage() {
    if (window.location.pathname.includes("dashboard.html")){
        window.location.href = "signup.html"
    }
}

loginBtn.addEventListener("click",openLoginPage)

async function openLoginPage() {
    if(window.location.pathname.includes("dashboard.html")){
        window.location.href = "login.html"
    }
}