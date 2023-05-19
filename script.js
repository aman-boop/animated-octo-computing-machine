// Selecting elements from the HTML document
const rscreen = document.getElementById('rscreen'); // Input screen
const preview = document.getElementById('preview'); // Preview screen
const buttons = document.querySelectorAll('.button'); // Collection of buttons
const result = document.getElementById('R'); // Result button
const clear = document.getElementById('C'); // Clear button
const deleteValue = document.getElementById('Del'); // Delete button

// Variables to track the state
let needClear = false; // Flag to indicate if input screen needs to be cleared
let transitionDone = false; // Flag to indicate if transition effect on preview is completed

// Event listener for the result button
result.addEventListener('click', function() {
  rscreen.value = eval(rscreen.value); // Evaluate the expression in the input screen
  needClear = true; // Set flag to clear the input screen on the next input
  preview.className = 'initial-state'; // Reset the class name of the preview
});

// Event listeners for each button in the collection
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    if (needClear) {
      rscreen.value = ''; // Clear the input screen if needed
      needClear = false; // Reset the flag
    }
    rscreen.value += button.innerHTML.split(' ').join(''); // Append the button value to the input screen
    showPreview(); // Update the preview
  });
});

// Event listener for the delete button
deleteValue.addEventListener('click', function() {
  rscreen.value = rscreen.value.slice(0, -1); // Remove the last character from the input screen
  let lengthOf = rscreen.value.length;
  if (
    rscreen.value.length == 0 ||
    rscreen.value[lengthOf - 1] == '+' ||
    rscreen.value[lengthOf - 1] == '/' ||
    rscreen.value[lengthOf - 1] == '*' ||
    rscreen.value[lengthOf - 1] == '-' ||
    rscreen.value[lengthOf - 1] == '.'
  ) {
    resetPreview(); // Reset the preview if the input screen is empty or ends with an operator or dot
    return;
  } else if (!rscreen.value.includes('+') &&
    !rscreen.value.includes('/') &&
    !rscreen.value.includes('*') &&
    !rscreen.value.includes('-')) {
    resetPreview(); // Reset the preview if there are no operators in the input screen
    return;
  }
  showPreview(); // Update the preview
});

// Event listener for the clear button
clear.addEventListener('click', function() {
  rscreen.value = ''; // Clear the input screen
  needClear = false; // Reset the flag
  transitionDone = true; // Set the transition flag
});

// Function to update the preview
function showPreview() {
  if (!transitionDone) {
    preview.className = 'target-state'; // Add a transition effect to the preview if transition is not completed
  }
  preview.value = eval(rscreen.value); // Evaluate the input screen and assign the result to the preview
}

// Function to reset the preview
function resetPreview() {
  preview.className = 'initial-state'; // Reset the class name of the preview
}