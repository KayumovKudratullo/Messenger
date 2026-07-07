// ==============================
// ELEMENTS
// ==============================

const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

const emojiBtn = document.querySelector(".emoji-btn");
const attachBtn = document.querySelector(".attach-btn");
const statusText = document.querySelector(".chat-user span");
const darkModeBtn = document.querySelector(".settings button:last-child");

// ==============================
// SCROLL TO BOTTOM
// ==============================

function scrollBottom() {
    if (messages) {
        messages.scrollTop = messages.scrollHeight;
    }
}

// ==============================
// EMOJIS
// ==============================

const emojis = [
    "😀","😁","😂","🤣","😊",
    "😍","😎","🤔","😭","😡",
    "👍","👎","👏","🙏","🔥",
    "❤️","💙","💚","💛","🎉"
];

if (emojiBtn) {

    emojiBtn.type = "button";

    emojiBtn.addEventListener("click", () => {

        const emoji = emojis[
            Math.floor(Math.random() * emojis.length)
        ];

        messageInput.value += emoji;
        messageInput.focus();

    });

}

// ==============================
// ATTACHMENT
// ==============================

if (attachBtn) {

    attachBtn.type = "button";

    attachBtn.addEventListener("click", () => {

        alert("Attachment feature coming soon.");

    });

}

// ==============================
// DARK MODE
// ==============================

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", () => {

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

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// ==============================
// ONLINE STATUS
// ==============================

function updateStatus() {

    if (!statusText) return;

    statusText.textContent = navigator.onLine
        ? "Online"
        : "Offline";

}

window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);

updateStatus();

// ==============================
// START
// ==============================

window.addEventListener("load", () => {

    messageInput.focus();
    scrollBottom();

});

console.log("Telegram Clone Loaded Successfully 🚀");