// ==========================================
// Telegram Clone
// script.js
// Part 1
// ==========================================

// ==============================
// ELEMENTS
// ==============================

const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const emojiBtn = document.querySelector(".emoji-btn");
const attachBtn = document.querySelector(".attach-btn");

const statusText = document.querySelector(".chat-user span");
const darkModeBtn = document.querySelector(".settings button:last-child");

// ==============================
// BOT REPLIES
// ==============================

const replies = [
    "Hello 😊",
    "How are you?",
    "Nice!",
    "Okay 👍",
    "See you later.",
    "I agree.",
    "😂",
    "Sounds good.",
    "Great!",
    "Let's do it!"
];

// ==============================
// CURRENT TIME
// ==============================

function getCurrentTime(){

    const date = new Date();

    let hour = date.getHours();
    let minute = date.getMinutes();

    if(minute < 10){
        minute = "0" + minute;
    }

    return `${hour}:${minute}`;

}

// ==============================
// SCROLL
// ==============================

function scrollBottom(){

    messages.scrollTop = messages.scrollHeight;

}

// ==============================
// CREATE MESSAGE
// ==============================

function createMessage(text,type="sent"){

    const message = document.createElement("div");

    message.className = `message ${type}`;

    message.innerHTML = `
        <p>${text}</p>
        <span>${getCurrentTime()}</span>
    `;

    messages.appendChild(message);

    scrollBottom();

}

// ==============================
// TYPING
// ==============================

function showTyping(){

    const typing = document.createElement("div");

    typing.className = "message received";

    typing.id = "typing";

    typing.innerHTML = `
        <p>Typing...</p>
    `;

    messages.appendChild(typing);

    scrollBottom();

}

function removeTyping(){

    const typing = document.getElementById("typing");

    if(typing){
        typing.remove();
    }

}

// ==============================
// RANDOM REPLY
// ==============================

function randomReply(){

    return replies[
        Math.floor(Math.random()*replies.length)
    ];

}






// ==============================
// SAVE CHAT
// ==============================

function saveChat(){

    localStorage.setItem("telegram_chat", messages.innerHTML);

}

function loadChat(){

    const chat = localStorage.getItem("telegram_chat");

    if(chat){

        messages.innerHTML = chat;

        scrollBottom();

    }

}

// ==============================
// AUTO REPLY
// ==============================

function autoReply(){

    showTyping();

    setTimeout(()=>{

        removeTyping();

        createMessage(randomReply(),"received");

        saveChat();

    },1500);

}

// ==============================
// SEND MESSAGE
// ==============================

function sendMessage(){

    const text = messageInput.value.trim();

    if(text === "") return;

    createMessage(text);

    messageInput.value = "";

    messageInput.focus();

    saveChat();

    autoReply();

}

// ==============================
// EVENTS
// ==============================

sendBtn.addEventListener("click",sendMessage);

messageInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        sendMessage();

    }

});

// ==============================
// LOAD CHAT
// ==============================

loadChat();

scrollBottom();


// ==============================
// EMOJI BUTTON
// ==============================

const emojis = [
    "😀","😁","😂","🤣","😊",
    "😍","😎","🤔","😭","😡",
    "👍","👎","👏","🙏","🔥",
    "❤️","💙","💚","💛","🎉"
];

if(emojiBtn){

    emojiBtn.addEventListener("click",()=>{

        const emoji = emojis[
            Math.floor(Math.random()*emojis.length)
        ];

        messageInput.value += emoji;

        messageInput.focus();

    });

}

// ==============================
// ATTACH BUTTON
// ==============================

if(attachBtn){

    attachBtn.addEventListener("click",()=>{

        alert("Attachment feature will be added soon.");

    });

}

// ==============================
// DARK MODE
// ==============================

if(darkModeBtn){

    darkModeBtn.addEventListener("click",()=>{

        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "telegram_theme",
            document.body.classList.contains("dark-mode")
                ? "dark"
                : "light"
        );

    });

}

const savedTheme = localStorage.getItem("telegram_theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark-mode");

}

// ==============================
// ONLINE STATUS
// ==============================

function updateStatus(){

    if(!statusText) return;

    statusText.textContent = navigator.onLine
        ? "Online"
        : "Offline";

}

window.addEventListener("online",updateStatus);
window.addEventListener("offline",updateStatus);

updateStatus();

// ==============================
// AUTO FOCUS
// ==============================

window.addEventListener("load",()=>{

    messageInput.focus();

    scrollBottom();

});

// ==============================
// START
// ==============================

console.log("Telegram Clone Loaded Successfully 🚀");