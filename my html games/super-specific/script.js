var textInput = document.getElementById("text-input");
var today_wordle_answer;
var current_cached_text; // For performance reasons
// Languages used in web development
var languages = [
    "javascript",
    "typescript",
    "html",
    "css",
    "xml",
    "json",
    "php",
    "svg"
]
var randomNumber = Math.floor((Math.random() * 9) + 1);
fetch("https://wordle-answers-solutions.p.rapidapi.com/today?rapidapi-key=f2d217ced3msh1f989cd33bf7767p1226afjsne808b7cb332f").then(function(value) {
    // I swear the stupid Promise<string> thing it was returning was making me rage >:(
    // Fix the types people! Stop returning pointless wrappers for other types when the obvious better method is actually returning said object without any wrappers
    today_wordle_answer = value.text().then(function(value) {
        today_wordle_answer = value;
        // We get the answer manually, JSON.parse didn't behave so we have to do this instead
        today_wordle_answer = JSONparse(today_wordle_answer);
        console.log(today_wordle_answer); // Log it to the console to make sure it's correct
        // Continually check for the answer
        // Don't worry, we only get the answer once, if we kept getting it we would probably get ratelimited
        setInterval(check, 20);
        function check() {
            // Performance would be sacrificed if this if didn't exist
            if (textInput.value != current_cached_text) {
                // This tells you if your text is correct or is wrong, if it's wrong, it tells you what's wrong
                var note = document.getElementById("note");

                // All the conditions
                if (!textInput.value.toLowerCase().includes(today_wordle_answer.toLowerCase()) && textInput.value != null) {
                    if (note.innerText != "" || note.innerText != null) {
                        note.innerText = "Your text must contain today's wordle answer (case-sensitive)"; // We should add an array of conditions which we can iterate over, creating new <p> elements as we go on
                    } else {
                        note.innerText = note.innerText + "\nYour text must contain today's wordle answer (case-sensitive)";
                    }
                    console.log("Missing wordle answer"); // Need this to make sure things work, it's my first time doing any games in javascript using web requests
                }

                if (!textInput.value.includes("@") && textInput.value != null) {
                    if (note.innerText != "" || note.innerText != null) {
                        note.innerText = "Your text must contain the character \"@\"";
                    } else {
                        note.innerText = note.innerText + "\nYour text must contain the character \"@\"";
                    }
                    console.log("Missing @"); // Need this to make sure things work, it's my first time doing any games in javascript using web requests
                }

                if (!textInput.value.includes("🔴⚠️") && textInput.value != null) {
                    if (note.innerText != "" || note.innerText != null) {
                        note.innerText = "Please put my emojis \"🔴⚠️\" in your text :)";
                    } else {
                        note.innerText = note.innerText + "\nPlease put my emojis \"🔴⚠️\" in your text :)";
                    }
                    console.log("Missing 🔴⚠️"); // Need this to make sure things work, it's my first time doing any games in javascript using web requests
                }

                if (!textInput.value.includes("®") && textInput.value != null) {
                    if (note.innerText != "" || note.innerText != null) {
                        note.innerText = "Put \"®\" in your text to indicate you registered your text here";
                    } else {
                        note.innerText = note.innerText + "\nPut \"®\" in your text to indicate you registered your text here";
                    }
                    console.log("Missing ®"); // Need this to make sure things work, it's my first time doing any games in javascript using web requests
                }

                if (textInput.value.length < 8) {
                    if (note.innerText != "" || note.innerText != null) {
                        note.innerText = "Your text must be at least 8 characters long";
                    } else {
                        note.innerText = note.innerText + "\nYour text must be at least 8 characters long";
                    }
                    console.log("Less than 8 characters long"); // Need this to make sure things work, it's my first time doing any games in javascript using web requests
                }

                if (!textInput.value.includes("#") && textInput.value != null) {
                    if (note.innerText != "" || note.innerText != null) {
                        note.innerText = "Your text must contain the character \"#\"";
                    } else {
                        note.innerText = note.innerText + "\nYour text must contain the character \"#\"";
                    }
                    console.log("Missing @"); // Need this to make sure things work, it's my first time doing any games in javascript using web requests
                }

                var detectedLanguageName = false;
                languages.forEach(function(value, index, array) {
                    if (textInput.value.includes(value)) {
                        detectedLanguageName = true;
                        return;
                    }
                });
                if (!detectedLanguageName) {
                    if (note.innerText != "" || note.innerText != null) {
                        note.innerText = "Your text must contain the name of a language used in web development";
                    } else {
                        note.innerText = note.innerText + "\nYour text must contain the name of a language used in web development";
                    }
                }

                if (!containsNumber(textInput.value)) {
                    if (note.innerText != "" || note.innerText != null) {
                        note.innerText = "Your text must contain a number";
                    } else {
                        note.innerText = note.innerText + "\nYour text must contain a number";
                    }
                }

                if (!textInput.value.includes(randomNumber.toString())) {
                    if (note.innerText != "" || note.innerText != null) {
                        note.innerText = "Your text must contain the random number :" + randomNumber;
                    } else {
                        note.innerText = note.innerText + "\nYour text must contain the random number :" + randomNumber;
                    }
                }

                // We have the wordle answer in there, so we update the note, telling the player that their text meets our standards
                // This if is getting filled with conditions so we might need to split it up soon
                if (textInput.value.includes(today_wordle_answer) && textInput.value.includes("@") && textInput.value.includes("🔴⚠️") && textInput.value.includes("®") && textInput.value.length > 8 && textInput.value.includes("#") && detectedLanguageName && containsNumber(textInput.value) && textInput.value.includes(randomNumber.toString())) {
                    note.innerText = "Lookin' good!";
                    console.log("Good");
                }
            }
            current_cached_text = textInput.value;
        }
    });
});

/**
 * Properly parse a single-line JSON string
 * @param {*} str the JSON string to parse
 * @returns the value from str, as a string
 */
function JSONparse(str) {
    var res = str;
    res = res.replace("{", "");
    res = res.replace("}", "");
    res = res.replace(/['"]+/g, ''); // This took too long, I was wondering what the "g" flag was
    res = res.replace("today", "");
    res = res.replace(":", "");
    return res;
}

/**
 * Checks if n contains a number
 * @param {*} n The string to check
 * @returns boolean indicating if n contains a number
 */
function containsNumber(n) {
    var matches = n.match(/\d+/g);
    return matches != null;
  }