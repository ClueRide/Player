var fs = require('fs');
var git = require('git-rev-sync')

console.log('Incrementing Build Number');


var file = fs.readFileSync('www/build/main.js', 'utf8');

var gitSha = git.short();

console.log('short', gitSha);

var pass1 = file.replace(/GIT_VERSION_STRING/g, gitSha);
var pass2 = pass1.replace(/BUILD_DATE/g, new Date());

fs.writeFileSync('www/build/main.js', pass2);

console.log('Incrementing Build Number Completed');
