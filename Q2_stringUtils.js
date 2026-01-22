// Function to capitalize the first letter of a string
const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Function to reverse a string
const reverseString = (str) => {
    return str.split('').reverse().join('');
};

// Function to count vowels in a string
const countVowels = (str) => {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
};

// Exporting the functions as an object
module.exports = {
    capitalize,
    reverseString,
    countVowels
};
