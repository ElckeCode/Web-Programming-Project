document.addEventListener("DOMContentLoaded", function () {
    const badgeContainer = document.getElementById("badgeContainer");

    // Achievements Logic
    let achievements = JSON.parse(localStorage.getItem("achievements")) || [];

    function unlockBadge(name, imgSrc) {
        if (!achievements.find(ach => ach.name === name)) {
            achievements.push({ name, imgSrc });
            localStorage.setItem("achievements", JSON.stringify(achievements));
        }
        displayBadges();
    }

    function displayBadges() {
        badgeContainer.innerHTML = "";
        achievements.forEach(badge => {
            let badgeDiv = document.createElement("div");
            badgeDiv.classList.add("badge");
            badgeDiv.innerHTML = `<img src="${badge.imgSrc}" alt="${badge.name}"><p>${badge.name}</p>`;
            badgeContainer.appendChild(badgeDiv);
        });
    }

    // Simulating Achievements Unlocking
    function checkForAchievements() {
        let totalWorkouts = localStorage.getItem("totalWorkouts") || 0;
        let totalCalories = localStorage.getItem("totalCalories") || 0;

        if (totalWorkouts >= 1) unlockBadge("First Workout Logged", "Images/day1.png");
        if (totalCalories >= 1000) unlockBadge("1000 Calories Burned", "Images/calories.jpg");
        if (totalWorkouts >= 10) unlockBadge("10 Workouts Completed", "Images/medal.jpg");
    }

    displayBadges();
    checkForAchievements();
});

// Countdown Timer
function setChallenge() {
    let challengeDate = document.getElementById("challengeDate").value;
    if (!challengeDate) {
        alert("Please select a date!");
        return;
    }

    localStorage.setItem("challengeDate", challengeDate);
    startCountdown();
}

function startCountdown() {
    let challengeDate = localStorage.getItem("challengeDate");
    if (!challengeDate) return;

    let targetDate = new Date(challengeDate).getTime();

    let countdown = setInterval(function () {
        let now = new Date().getTime();
        let timeLeft = targetDate - now;

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;

        if (timeLeft < 0) {
            clearInterval(countdown);
            document.getElementById("timerMessage").textContent = "🏆 Challenge Complete!";
        }
    }, 1000);
}

startCountdown();
