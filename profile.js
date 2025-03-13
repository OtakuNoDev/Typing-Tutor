document.addEventListener("DOMContentLoaded", function() {
    const saveButton = document.getElementById("save-changes");

    saveButton.addEventListener("click", function() {
        const profileData = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            dailyGoal: document.getElementById("daily-goal").value,
            weeklyGoal: document.getElementById("weekly-goal").value,
            firstDay: document.getElementById("first-day").value,
        };

        localStorage.setItem("profileData", JSON.stringify(profileData));
        alert("Profile Updated Successfully!");
    });

    function loadProfile() {
        const savedData = localStorage.getItem("profileData");
        if (savedData) {
            const profileData = JSON.parse(savedData);
            document.getElementById("username").value = profileData.username;
            document.getElementById("email").value = profileData.email;
            document.getElementById("first-name").value = profileData.firstName;
            document.getElementById("last-name").value = profileData.lastName;
            document.getElementById("time-zone").value = profileData.timeZone;
            document.getElementById("daily-goal").value = profileData.dailyGoal;
            document.getElementById("weekly-goal").value = profileData.weeklyGoal;
            document.getElementById("first-day").value = profileData.firstDay;
        }
    }

    loadProfile();
});
