// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

// Read the file and print its contents.
const fs = require("fs");

let filename = process.argv[2];
let filenameData;

try {
  filenameData = fs.readFileSync(filename, "utf8");
  keyWordData = fs.readFileSync("keywords.txt", "utf8");
  console.log("OK: " + filename);

  // Now that we have the data, we can use it.
  if (filenameData.length != 0) {
    console.log("we have data");
    // console.log(getName(filenameData));
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}

function getName(x) {
  return x.substring(0, 5);
}

keyWordData = keyWordData.split(",");

console.log(
  "these are the keywords: " + keyWordData + " length is " + keyWordData.length
);

var mapKeywords = new Map();


for(let i=0;i<keyWordData.length;i++)
{
    
    let wordx = keyWordData[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
    if(i>0)
    {
        wordx = wordx.substring(2);
    }
    mapKeywords.set(wordx, 0);
}

function checkRes(resume) {
    let resumeSplit = resume.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase().split(/\s+/);    
    for(let resumeWord of resumeSplit)
    {
        // console.log("resume word is " + resumeWord);
        // console.log("we do a get of resumeWord " + mapKeywords.get(resumeWord));
        if(mapKeywords.get(resumeWord) !== undefined)        
        {
            // console.log("resume word added is " + resumeWord);

            mapKeywords.set(resumeWord, mapKeywords.get(resumeWord) + 1);
        }
    }
}

checkRes(filenameData);

console.log(mapKeywords);
// here we will add the resume to its respective sheet(s) in the database based on its keywords
// each keyword will be a different sheet in the same firebase database
// after we update the database, we reset the map values to 0, so another resume can get checked
