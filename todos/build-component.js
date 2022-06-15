const fs = require('fs-extra');
const concat = require('concat');

build = async () =>{

  const scripts = [
    './dist/todos/main.js',
    './dist/todos/polyfills.js',
    './dist/todos/runtime.js',
    './dist/todos/scripts.js'
  ];

  const styles = [
    './dist/todos/styles.css'
  ];

  // FOR SHELL-NATIVE
  await fs.ensureDir('../shell-native/components');
  await concat(scripts, '../shell-native/components/tf-todos.js');
  await concat(styles, '../shell-native/components/tf-todos.css');

  // FOR SHELL-ANGULAR
  await fs.ensureDir('../shell-angular/components');
  await concat(scripts, '../shell-angular/components/tf-todos.js');
  await concat(styles, '../shell-angular/components/tf-todos.css');
}
build();