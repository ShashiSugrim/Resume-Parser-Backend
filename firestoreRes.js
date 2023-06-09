const admin = require('firebase-admin');
var serviceAccount = require("./firebaseAdmin.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),    
  storageBucket: "gs://resume-parser-a7584.appspot.com"

});


const db = admin.firestore();

async function addResumeTOKeywords(keyword, resumeName) {
    const docRef = db.collection('keywords').doc(keyword);
    await docRef.set({
      resumes: admin.firestore.FieldValue.arrayUnion(resumeName)
    }, { merge: true });
    console.log(`Document updated`);
  }
    
async function addResumeToCollection(resumeName, name, resumeLink)
{
    const docRef = db.collection('resumes').doc(resumeName);
    await docRef.set({
        name: name,
      url: resumeLink
    }, { merge: true });
}

let keywordList = ["c++", "java", "react"]

for(let word of keywordList)
{
    console.log("word" + word);
    for(let i=1;i<=3;i++)
    {
        addResumeTOKeywords(word, ("resume"+i))
    }
}

addResumeToCollection("resume1", "johnny", "gdrive.com/resume1.pdf");
