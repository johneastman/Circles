// Return time since epoch in seconds.
function getCurrentTime() {
    return (new Date()).getTime() / 1000;
}

// Return a random floating-point number within a specified range.
// Inclusive of min; inclusive of max.
function getRandomFloat(min, max) {
    return Math.random() * (max - min + 1) + min;
}

// Return a random integer within a specified range.
// Inclusive of min; exclusive of max.
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Return positive or negative one.
function sign() {
    return Math.random() < 0.5 ? -1 : 1;
}