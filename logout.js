import { initializeApp, firebaseConfig, } from "./firebase.js";
import { getAuth, signOut,onAuthStateChanged } from "./firebase.js";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log("app=>", app)
console.log("auth=>", auth)


// authentication state change

onAuthStateChanged(auth, (user) => {
  if (user) {

    console.log("ye user login hai=>",user.email)
  } else {
    console.log("user logout ho gaya hai")
}
});




// Logout page

var logoutBtn = document.getElementById("logoutBtn")

if (logoutBtn) {
    logoutBtn.addEventListener("click", logout)
}
async function logout() {
    try {
        await signOut(auth);
        user = "";
    } catch (error) {
        console.error("logout error=>",error)
    }
    if(window.location.pathname.includes("dashboard.html")){
        window.location.href = "login.html"
    }
}