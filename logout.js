import { initializeApp, firebaseConfig, } from "./firebase.js";
import { getAuth, signOut, onAuthStateChanged } from "./firebase.js";
import { getDatabase, ref, set } from "./firebase.js"

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
    if (window.location.pathname.includes("dashboard.html")) {
        window.location.href = "signup.html"
    }
}

loginBtn.addEventListener("click", openLoginPage)

async function openLoginPage() {
    if (window.location.pathname.includes("dashboard.html")) {
        window.location.href = "login.html"
    }
}


// Realtime Data Base Started

const database = getDatabase(app)
console.log("getDatabase=>", getDatabase)


var proSubmitBtn = document.getElementById("proSubmitBtn")
proSubmitBtn.addEventListener("click", addProduct)
var proTitle = document.getElementById("proTitle")
var proDesc = document.getElementById("proDesc")
var proImg = document.getElementById("proImg")
var message = document.getElementById("message")

async function addProduct() {
    var Id = new Date();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            try {
                set(ref(database, 'product/' + Id), {
                    Title: proTitle.value,
                    Desc: proDesc.value,
                    ImgUrl: proImg.value,
                });
                if (user && proTitle.value == "" || proDesc.value == "" || proImg.value == "") {
                    message.innerText = "Please fill all fields"
                    message.style.color = "red"
                }
                else if (user && !proTitle.value == "" || !proDesc.value == "" || !proImg.value == "") {
                    message.innerText = "Add Product Successfully"
                    message.style.color = "green"
                }
                proTitle.value = "";
                proDesc.value = "";
                proImg.value = "";
            } catch (error) {
            }
        }
        else if (window.location.pathname.includes("dashboard.html") && !user) {
            window.location.href = "signup.html"
        }
    });
}

