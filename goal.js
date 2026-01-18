document.addEventListener("DOMContentLoaded", function () {
    const goalForm = document.getElementById("goalForm");
    const goalName = document.getElementById("goalName");
    const goalTarget = document.getElementById("goalTarget");
    const goalUnit = document.getElementById("goalUnit");

    const goalDisplayName = document.getElementById("goalDisplayName");
    const goalDisplayTarget = document.getElementById("goalDisplayTarget");
    const goalProgressBar = document.getElementById("progress");
    const goalProgressText = document.getElementById("goalProgressText");
    const message = document.getElementById("message");

    const progressInput = document.getElementById("progressInput");

    let currentGoal = JSON.parse(localStorage.getItem("currentGoal")) || null;
    let currentProgress = localStorage.getItem("currentProgress") ? parseFloat(localStorage.getItem("currentProgress")) : 0;

    function updateGoalDisplay() {
        if (currentGoal) {
            goalDisplayName.textContent = `Goal: ${currentGoal.name}`;
            goalDisplayTarget.textContent = `Target: ${currentGoal.target} ${currentGoal.unit}`;
            let progressPercent = (currentProgress / currentGoal.target) * 100;
            progressPercent = Math.min(progressPercent, 100); 

            goalProgressBar.style.width = progressPercent + "%";
            goalProgressText.textContent = `Progress: ${progressPercent.toFixed(2)}%`;

            if (progressPercent >= 100) {
                message.textContent = "Congratulations! You have reached your goal!";
            } else if (progressPercent >= 50) {
                message.textContent = "You're doing good, Halfway there!";
            } else if (progressPercent > 0) {
                message.textContent = "Keep going, you're doing great!";
            } else {
                message.textContent = "Set a goal and start tracking your progress!";
            }
        } else {
            goalDisplayName.textContent = "No goal set yet";
            goalDisplayTarget.textContent = "Target: 0";
            goalProgressBar.style.width = "0%";
            goalProgressText.textContent = "Progress: 0%";
            message.textContent = "Set a goal and start tracking your progress!";
        }
    }

    goalForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        currentGoal = {
            name: goalName.value,
            target: parseFloat(goalTarget.value),
            unit: goalUnit.value
        };

        currentProgress = 0; 
        localStorage.setItem("currentGoal", JSON.stringify(currentGoal));
        localStorage.setItem("currentProgress", currentProgress);

        updateGoalDisplay();
        goalForm.reset();
    });

    function updateProgress() {
        let addedProgress = parseFloat(progressInput.value);
        if (!isNaN(addedProgress) && addedProgress > 0 && currentGoal) {
            currentProgress += addedProgress;
            localStorage.setItem("currentProgress", currentProgress);
            updateGoalDisplay();
            progressInput.value = ""; 
        } else {
            alert("Please enter a valid progress value.");
        }
    }

    updateGoalDisplay();

  
    window.updateProgress = updateProgress;
});
