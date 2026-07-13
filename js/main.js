const input = document.getElementById("guess-input")
const suggestions = document.getElementById("suggestions")
const btn = document.getElementById("guess-btn")

let mounts = [];
let correctMount = null;
let selectedMount = null;

fetch("/api/daily-mount")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        correctMount = data.name;
        console.log("Today's mount:", correctMount);
    });

fetch("/mounts.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        mounts = data.map(function(mount) {
            return mount.name;
        });
        console.log("Loaded", mounts.length, "mounts");
    });

// EVENT LISTENERS

// Preview 5 mounts that are similar to what the user has inputted
input.addEventListener("input", function() {
    const typed = input.value.toLowerCase();
    suggestions.innerHTML = "";
    selectedMount = null;

    if (typed === "") return;

    const matches = mounts.filter(function(mount) {
        return mount.toLowerCase().includes(typed);
    });

    for (let i = 0; i < 5; i++){
        const div = document.createElement("div");
        const mountName = matches[i];
        div.textContent = mountName;
        div.addEventListener("click", function() {
            input.value = mountName;
            selectedMount = mountName;
            suggestions.innerHTML = "";
        });
        suggestions.appendChild(div);
    }
});

// Submit the guess on button click, submitGuess will check if a guess is fully entered or not
btn.addEventListener("click", function() {
    submitGuess();
});

// Pressing enter once will autocomplete the word, pressing it twice will submit the guess
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        if (selectedMount) {
            submitGuess();
        } else {
            const firstSuggestion = suggestions.querySelector("div");
            if (firstSuggestion) {
                input.value = firstSuggestion.textContent;
                selectedMount = firstSuggestion.textContent;
                suggestions.innerHTML = "";
            }
        }
    }
});

// FUNCTIONS

function submitGuess() {
    if (selectedMount) {
        if (selectedMount === correctMount){
            console.log("Correct! It was: ", correctMount)
        }
        else{
            console.log("Incorrect! It is not ", selectedMount);
            selectedMount = null;
            input.value = "";
        }
    }
}