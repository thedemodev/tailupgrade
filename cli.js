#!/usr/bin/env node

/*
*  Author: Arif Yuliannur
*  Github: virkillz
*  Email: virkill@gmail.com
*  Desc: Just simple search string and replace to upgrade tailwind prior v.1 
*        into v.1.0.4. Require parth to folder with HTML files as argument and 
*        will split the converted verion inside /output inside the given path.
*/


const fs = require('fs');
const pathlib = require('path');

if (process.argv.length <= 2) {
	const usageText = `
 _______  _______  ___   ___      __   __  _______  _______  ______    _______  ______   _______ 
|       ||   _   ||   | |   |    |  | |  ||       ||       ||    _ |  |   _   ||      | |       |
|_     _||  |_|  ||   | |   |    |  | |  ||    _  ||    ___||   | ||  |  |_|  ||  _    ||    ___|
  |   |  |       ||   | |   |    |  |_|  ||   |_| ||   | __ |   |_||_ |       || | |   ||   |___ 
  |   |  |       ||   | |   |___ |       ||    ___||   ||  ||    __  ||       || |_|   ||    ___|
  |   |  |   _   ||   | |       ||       ||   |    |   |_| ||   |  | ||   _   ||       ||   |___ 
  |___|  |__| |__||___| |_______||_______||___|    |_______||___|  |_||__| |__||______| |_______|

                                                                                          v 0.1.0

	tailupgrade will convert class name in .html files from version 0.7.* to be compatible with 1.0.4.
	It will create 'output' folder in the same directory with the converted files.
  
	usage:
	  tailupdrage <path>
  
	example:
	   tailupgrade .
	`
	console.log(usageText);
	process.exit(-1);
}

var path = process.argv[2];
console.log("Scanning: " + path + " for .html files");

if (!fs.existsSync(path)) {
	console.log("The given path " + path + " did not exist");
	process.exit(-1);
}


fs.readdir(path, function (err, items) {
	console.log("path adalah " + path)
	for (var i = 0; i < items.length; i++) {
		if (getExtention(items[i]) == "html") {
			console.log("Working on " + items[i]);
			var result = convertHtml(path, items[i]);
		};
	}
});


function getExtention(filename) {
	return filename.split('.').pop();
}

function convertHtml(path, filename) {
	var result = "";
	fs.readFile(path + "/" + filename, 'utf8', function (err, data) {
		if (err) {
			console.log("Cannot read the file.");
			return console.log(err);
		}
		// You can evaluate the replacement rule here just in case we miss something. Feel free to make PR.
		result += data.replace(/tracking-tight/g, 'tracking-tighter')
			.replace(/tracking-wide/g, 'tracking-wider')
			.replace(/darkest/g, '900')
			.replace(/darker/g, '800')
			.replace(/dark/g, '700')
			.replace(/lighter/g, '200')
			.replace(/lightest/g, '100')
			.replace(/light/g, '400')
			.replace(/grey/g, 'gray')
			.replace(/(gray|indigo|red|blue|yellow|primary|secondary|danger|success|warning|green|teal|pink|purple) /g, '$1-500 ')
			.replace(/(gray|indigo|red|blue|yellow|primary|secondary|danger|success|warning|green|teal|pink|purple)"/g, '$1-500"')
			.replace(/list-reset/g, "")
			.replace(/pin-none/g, "inset-auto")
			.replace(/pin-y/g, "inset-y-0")
			.replace(/pin-x/g, "inset-x-o")
			.replace(/pin-t/g, "top-0")
			.replace(/pin-r/g, "right-0")
			.replace(/pin-b/g, "bottom-0")
			.replace(/pin-l/g, "left-0")
			.replace(/pin /g, "inset-0")
			.replace(/pin"/g, 'inset-0"')
			.replace(/flex-no-grow/g, "flex-grow-0")
			.replace(/flex-no-shrink/g, "flex-shrink-0")
			.replace(/roman/g, "not-italic")
			.replace(/max-w-xl/g, "max-w-6xl")
			.replace(/max-w-md/g, "max-w-xl")			
			.replace(/max-w-lg/g, "max-w-4xl");

			let dir = pathlib.resolve(path, "../") + "/output"

			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}

			fs.writeFile(dir + "/" + filename, result, 'utf8', function (err) {
				if (err) { console.log(err); }
				else { console.log("Done. Check " + dir + "/" + filename) }
				;
			});
	});
}