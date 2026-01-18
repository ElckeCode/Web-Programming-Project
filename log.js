document.addEventListener("DOMContentLoaded", function () {
    const workoutList = document.getElementById("workoutList");
    const workoutForm = document.getElementById("workoutForm");

 
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    function updateSummary() {
        let totalWorkouts = workouts.length;
        let totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0);
        let avgDuration = totalWorkouts > 0 ? 
                          (workouts.reduce((sum, workout) => sum + workout.duration, 0) / totalWorkouts).toFixed(2) 
                          : 0;

       
        workoutList.innerHTML = `
            <h3>Logged Workouts</h3>
            <p><strong>Total Workouts Logged:</strong> ${totalWorkouts}</p>
            <p><strong>Total Calories Burned:</strong> ${totalCalories} kcal</p>
            <p><strong>Average Workout Duration:</strong> ${avgDuration} minutes</p>
            <ul>
                ${workouts.map(workout => `<li>${workout.type} - ${workout.duration} min - ${workout.calories} kcal</li>`).join("")}
            </ul>
        `;
    }

    workoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let workoutType = document.getElementById("workoutType").value;
        let duration = parseInt(document.getElementById("duration").value);
        let calories = parseInt(document.getElementById("calories").value);
        let date = document.getElementById("date").value;

        let newWorkout = { type: workoutType, duration, calories, date };

        workouts.push(newWorkout);
        localStorage.setItem("workouts", JSON.stringify(workouts));

        updateSummary();
        workoutForm.reset();
    });

    updateSummary();
});
