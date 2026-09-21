/**
 * Q2 - Node.js File Management
 * Uses the built-in 'fs' (File System) module to:
 *   1. Create / write a file with user-provided content
 *   2. Read the file contents
 *   3. Append additional content
 *   4. Display the final contents
 *
 * Run: node Q2_file_management.js
 */

const fs       = require('fs');
const readline = require('readline');

// Create an interface to read input from the terminal
const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout
});

/**
 * prompt(question) - wraps rl.question in a Promise so we can use async/await
 */
function prompt(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

/**
 * main() - orchestrates all file operations sequentially
 */
async function main() {
  console.log('\n===== Node.js File Management =====\n');

  // Step 1: Get filename and initial content from the user
  const filename       = await prompt('Enter filename (e.g. notes.txt): ');
  const initialContent = await prompt('Enter content to write to the file: ');

  // Step 2: Create / Write the file
  fs.writeFileSync(filename, initialContent, 'utf8');
  console.log(`\n[CREATE] File "${filename}" created successfully.`);

  // Step 3: Read and display the file contents
  let contents = fs.readFileSync(filename, 'utf8');
  console.log('\n[READ] Current file contents:');
  console.log('-----------------------------');
  console.log(contents);
  console.log('-----------------------------');

  // Step 4: Append additional content provided by the user
  const appendContent = await prompt('\nEnter additional content to append: ');
  fs.appendFileSync(filename, '\n' + appendContent, 'utf8');
  console.log(`\n[APPEND] Content appended to "${filename}".`);

  // Step 5: Read and display the final file contents
  contents = fs.readFileSync(filename, 'utf8');
  console.log('\n[FINAL] Final file contents:');
  console.log('-----------------------------');
  console.log(contents);
  console.log('-----------------------------\n');

  rl.close();
}

main();
