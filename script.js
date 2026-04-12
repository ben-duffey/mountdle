const input = document.getElementById("guess-input")
const suggestions = document.getElementById("suggestions")
const btn = document.getElementById("guess-btn")
const mounts = [
    "Invincible",
    "Mimiron's Head",
    "Ashes of Al'ar",
    "Pureblood Fire Hawk",
    "Swift Spectral Tiger"
];
const correctMount = "Invincible"

let selectedMount = null;

// EVENT LISTENERS

input.addEventListener("input", function() {
    const typed = input.value.toLowerCase();
    suggestions.innerHTML = "";
    selectedMount = null;

    if (typed === "") return;

    const matches = mounts.filter(function(mount) {
        return mount.toLowerCase().includes(typed);
    });

    matches.forEach(function(mount) {
        const div = document.createElement("div");
        div.textContent = mount;
        div.addEventListener("click", function() {
            input.value = mount;
            selectedMount = mount;
            suggestions.innerHTML = "";
        });
        suggestions.appendChild(div);
    });
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