//const listE1 = document.querySelector('ul');

let duration = 3900;
let maxQuestions=60;

let currentQuestionIndex = 0;
let loadedData = '';
let loadedLang2Data = '';
let CorrectdCount = 0;
let WrongCount = 0;
let selectedOptions = [];
var radios = document.getElementsByName('option');
let currentQtnNo = 0;
let isSaveNextStatus = true;
let timerInterval;


let examName='Exam';
let studentName='mahesh';
let reviewProcess = false;
let selectedLanguage = 1;


//
loadExamDetails();
function loadExamDetails(){
// Assume your JSON file is 'data.json' in the same directory as your JavaScript file

fetch('user.json')
  .then(response => response.json())
  .then(udata => {
    
    examName= udata[0].examid;
    maxQuestions= udata[0].maxquestions;
    //duration= udata[0].duration;


  })
  .catch(error => console.error('Error fetching JSON:', error));
}


loadExamDataLang1();
function loadExamDataLang1(){

     fetch('./loadj2.json')
       .then(res => {
          return res.json();
       })
       .then(data  => {
        data.forEach(user => {
            loadedData = data;
             
        }); startExam(loadedData);
       })
        .catch(error => console.logerror());
        
};


loadExamDataLang2();
function loadExamDataLang2(){

     fetch('./loadtel.json')
       .then(res => {
          return res.json();
       })
       .then(data1  => {
        data1.forEach(user => {
            loadedLang2Data = data1;
             
        }); 
       })
        .catch(error => console.logerror());
        
};


// Assuming you have a container element in your HTML where buttons will be appended
const container = document.getElementById('allbtns');
let btnname="";
// Function to be called when a button is clicked
function buttonClickHandler(event) {
     btnname= event.target.id;
   // alert(`Button ${event.target.id} clicked!`);
    setQuestionById(btnname,selectedOptions[btnname]);
}

// Loop to create buttons
for (let i = 1; i <= maxQuestions; i++) {
    // Create a button element
    const button = document.createElement('button');
    
    // Set button attributes (optional)
    button.setAttribute('id', `${i}`);
    button.textContent = `${i}`;

    button.style.padding = '10px 20px';
    button.style.margin = '5px';
    button.style.backgroundColor = 'grey';
    button.style.color = 'black';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.width ='55px';
    
    // Assign click event handler
    button.addEventListener('click', buttonClickHandler);
    
    // Append the button to the container
    container.appendChild(button);
}






const questionElement = document.getElementById("question");
const nxtButton = document.getElementById("next-btn");

//const changeLang = document.getElementById("change-lang");


function startExam(loadedData){
    showQuestion();
}


function setImageByID(qimgid){
  const img = document.getElementById('qimg');
  if(qimgid>0){
    
    const imgpath = "./"+qimgid+".jpg";
    img.src = imgpath; // Adjust the path accordingly
    img.style.display ='block';
    
  }
  else{
    img.style.display='none';
  }
}


function showQuestion() {

  if(selectedLanguage == 1){
     const imid = loadedData[currentQuestionIndex].imgid;
     setImageByID(imid) ;      

    currentQtnNo = loadedData[currentQuestionIndex].qid;
    questionElement.innerHTML = currentQtnNo + ".  " +loadedData[currentQuestionIndex].qname;
   
    document.getElementById("opt1").nextElementSibling.textContent="(1)"+loadedData[currentQuestionIndex].qopt1;
    document.getElementById("opt2").nextElementSibling.textContent="(2)"+loadedData[currentQuestionIndex].qopt2;
    document.getElementById("opt3").nextElementSibling.textContent="(3)"+loadedData[currentQuestionIndex].qopt3;
    document.getElementById("opt4").nextElementSibling.textContent="(4)"+loadedData[currentQuestionIndex].qopt4;
  }
  if(selectedLanguage == 2){
    currentQtnNo = loadedLang2Data[currentQuestionIndex].qid;
    questionElement.innerHTML = currentQtnNo + ".  " +loadedLang2Data[currentQuestionIndex].qname;
   
    document.getElementById("opt1").nextElementSibling.textContent="(1)"+loadedLang2Data[currentQuestionIndex].qopt1;
    document.getElementById("opt2").nextElementSibling.textContent="(2)"+loadedLang2Data[currentQuestionIndex].qopt2;
    document.getElementById("opt3").nextElementSibling.textContent="(3)"+loadedLang2Data[currentQuestionIndex].qopt3;
    document.getElementById("opt4").nextElementSibling.textContent="(4)"+loadedLang2Data[currentQuestionIndex].qopt4;
    
  }
   
    const nextBtn = document.getElementById("next-btn");
    nextBtn.innerHTML = "Save and Next";
  
}

document.getElementById("next-btn").onclick = setNextQuestion;
document.getElementById("Review-btn").onclick = setReviewStatus;
document.getElementById("onxt-btn").onclick = setOnlyNextQuestion;
document.getElementById("submit-btn").onclick = setAnalysisData;
document.getElementById("anxt-btn").onclick = setAnalysisNextQuestion;


// Enable and Disable For Telugu and English languages

 // document.getElementById("change-lang").onclick = setLanguage;
  const langSel = document.getElementById("change-lang");
  langSel.style.display= 'none';


function setLanguage(){

  const langbtn = document.getElementById("change-lang");
  if(langbtn.innerHTML=='TELUGU') {
    selectedLanguage = 2;
    langbtn.innerHTML= "ENGLISH";
  }
  else {
    selectedLanguage = 1;
    langbtn.innerHTML= "TELUGU";
  }

  showQuestion();
}


document.getElementById("download-pdf").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default form submission or link behavior
  let content = [];

  // Add basic information like student name, exam name, total questions, etc.
  const sname = "Name : " + localStorage.getItem('stdntname');
  const exname = "Exam  : " + examName;
  const tmarks = "Total Questions :" + maxQuestions;
  let noatt = maxQuestions - (CorrectdCount + WrongCount);
  const notattempt = "Not Attempted : " + noatt;
  let attmptd = maxQuestions - noatt;
  const attempt = "Attempted : " + attmptd;
  const resmarks = "Correct : " + CorrectdCount;
  const wrmarks = "Wrong : " + WrongCount;
  const examresult = "Note : Exam Result/State Ranks of all students will be provided tomorrow";
  const contactdet = "For more details contact/whatsapp on 8125250125 ";

  // Apply replaceSymbols to basic information
  content += `<h2>${replaceSymbols(exname)}</h2>`;
  content += `<p><strong>${replaceSymbols(sname)}</strong></p>`;
  content += `<p>${replaceSymbols(tmarks)}</p>`;
  content += `<p>${replaceSymbols(notattempt)}</p>`;
  content += `<p>${replaceSymbols(attempt)}</p>`;
  content += `<p>${replaceSymbols(resmarks)}</p>`;
  content += `<p>${replaceSymbols(wrmarks)}</p>`;
  content += `<p>${replaceSymbols(examresult)}</p>`;
  content += `<p>${replaceSymbols(contactdet)}</p>`;
  content += '<br><br>';

  // Sort the loadedData based on qid (question id) to ensure the correct order
  loadedData.sort((a, b) => a.qid - b.qid);

  // Function to convert image to base64
  function getBase64Image(imgElement) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.height = imgElement.naturalHeight;
      canvas.width = imgElement.naturalWidth;
      ctx.drawImage(imgElement, 0, 0);
      resolve(canvas.toDataURL("image/jpg"));
    });
  }

  // This function will process each question in sequence (keeping the order intact)
  async function processQuestions() {
    for (let q of loadedData) {
      if (q.imgid > 0) {
        // If the question has an image, we need to load it
        const imgElement = new Image();
        imgElement.src = `${q.imgid}.jpg`;

        // Wait for image to load before adding it to HTML
        await new Promise((resolve) => {
          imgElement.onload = async function() {
            const base64Image = await getBase64Image(imgElement);
            addQuestionHTML(q, base64Image);  // Add question HTML with image
            resolve();  // Resolve the promise once the image is loaded and HTML is added
          };
        });
      } else {
        // If no image for this question, just add question content
        addQuestionHTML(q);
      }
    }

    // After all questions are processed, initiate the download
    downloadHTML(content);
  }

  // Start processing questions
  processQuestions();

  // Function to add question HTML content (with or without image)
  function addQuestionHTML(q, base64Image = '') {
    // Replace symbols in q.qname, q.qopt1, q.qopt2, q.qopt3, q.qopt4, and q.qhint
    const formattedQName = replaceSymbols(q.qname).replace(/<br\s*\/?>/gi, '\n');
    const formattedOpt1 = replaceSymbols(q.qopt1);
    const formattedOpt2 = replaceSymbols(q.qopt2);
    const formattedOpt3 = replaceSymbols(q.qopt3);
    const formattedOpt4 = replaceSymbols(q.qopt4);
    const formattedHint = replaceSymbols(q.qhint);

    content += `<div id="question_${q.qid}">`;

    if (base64Image) {
      content += `<img id="qimg_${q.qid}" src="${base64Image}" style="display:block;" />`;
    }

    content += `<h3>Q${q.qid}. ${formattedQName}</h3>`;
    content += `<ul>`;
    content += `<li>1. ${formattedOpt1}</li>`;
    content += `<li>2. ${formattedOpt2}</li>`;
    content += `<li>3. ${formattedOpt3}</li>`;
    content += `<li>4. ${formattedOpt4}</li>`;
    content += `<br>`;
    const userSelection = selectedOptions[q.qid];
    content += `<li>Your Selection: Option ${userSelection}</li>`;
    content += `<li>Answer: Option ${q.qans}</li>`;
    content += `<br>`;
    if (formattedHint.length > 3) {
      content += `<li>Hint: ${formattedHint.replace(/\n/g, '<br>')}</li>`;
    } else {
      content += `<li>Hint: ${formattedHint}</li>`;  // If it's 3 characters or less, just display as is.
    }
    
    content += `</div><br><br>`;
  }

  // Function to download the HTML file after all content has been processed
  function downloadHTML(content) {
    console.log("Download function triggered");

    // Check if the content has been properly populated
    if (!content || content.length === 0) {
      console.error("Content is empty or not generated correctly");
      return;
    }

    // Create a Blob from the content string
    const blob = new Blob([content], { type: 'text/html' });

    // Create a link element to trigger the download
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Response.html'; // Specify the download file name
    document.body.appendChild(a);

    // Trigger the click event to download the file
    a.click();

    // Clean up by revoking the object URL and removing the link element
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
});

// Function to replace special characters with HTML entities
function replaceSymbols(text) {
  return text
    .replace(/π/g, '&pi;')   // Replace π (Pi)
    .replace(/√/g, '&radic;') // Replace √ (Square Root)
    .replace(/θ/g, '&theta;') // Replace θ (Theta)
    .replace(/α/g, '&alpha;') // Replace α (Alpha)
    .replace(/△/g, '&#9650;') // Replace △ (Triangle symbol)
    .replace(/∞/g, '&infin;')  // Replace ∞ (Infinity)
    .replace(/≠/g, '&ne;')     // Replace ≠ (Not equal)
    .replace(/≥/g, '&ge;')     // Replace ≥ (Greater than or equal)
    .replace(/°/g, '&deg;')   // Replace ° (Degree symbol)
    .replace(/²/g, '&sup2;')   // Replace ² (Square)
    .replace(/³/g, '&sup3;')
    .replace(/Ω/g, '&Omega;')  
    .replace(/≤/g, '&le;');    // Replace ≤ (Less than or equal)
}



function examSummaryReport(){
  let notAttempterd="";
  notAttempterd= maxQuestions -(CorrectdCount+WrongCount);
 
 const resbtn1=document.getElementById("res-status1");
 resbtn1.style.display='inline';
 resbtn1.innerHTML="TOTAL   QUESTIONS  : "+maxQuestions+"<br>"+"<br>"+"NOT ATTEMPTED : "+notAttempterd;
 
 
 const resbtn2=document.getElementById("res-status2");
 resbtn2.style.display='inline';
 resbtn2.innerHTML="CORRECT : " +CorrectdCount+"<br>"+"<br>"+"WRONG : "+WrongCount;
 
  
  const pdfbtn=document.getElementById("download-pdf");
  pdfbtn.style.display='inline';
  
  showSubmitAlert();

 // to save the details in data base... enaable this call
 setExamResultToDatabase();

}

function setExamResultToDatabase(){
  // Retrieve username from localStorage
   studentName = localStorage.getItem('stdntname');
   institutename = localStorage.getItem('institutename');
   phoneno= localStorage.getItem('phoneno');

  const firebaseConfig = {
    apiKey: "AIzaSyAdwlJCdrMnKC_Pa4Lrtaq2yct8x3IC-ps",
    authDomain: "myexam-1987.firebaseapp.com",
    projectId: "myexam-1987",
    storageBucket: "myexam-1987.appspot.com",
    messagingSenderId: "50845302692",
    appId: "1:50845302692:web:324cae25843d6d7fba8b31",
    measurementId: "G-5BGSTMV6NT"
  };
  
firebase.initializeApp(firebaseConfig);
   // Get a reference to the database service
const database = firebase.database();

// Reference to the "users" node in your database
const usersRef = database.ref(examName);
// Example data to be inserted
const userData = {
  name: studentName,
  marks: CorrectdCount,
  school: institutename,
  phone: phoneno
};

// Push data to Firebase Realtime Database under "users" node
  usersRef.push(userData);

}



function setButtonColorsAfterExam(){
  reviewProcess=true;
  const form=document.getElementById('optn-btns');
  const elements=form.elements;
   for(let i=0; i<elements.length;i++){
     elements[i].disabled = false;
   }
   let loopvar=0;
   currentQuestionIndex=0;
   CorrectdCount=0;
   WrongCount=0;
   for(let i=1; i<=maxQuestions;i++){
     loopvar=i;
     const crtbtn=document.getElementById(loopvar);
    if(selectedOptions[currentQuestionIndex+1]==loadedData[currentQuestionIndex].qans)
      {
        crtbtn.style.background='green';
        CorrectdCount=CorrectdCount+1;
      }
      else if(selectedOptions[currentQuestionIndex+1]>0){
        crtbtn.style.background='red';
        WrongCount=WrongCount+1;
      }
      else
      {
        crtbtn.style.background='grey';
      }
      currentQuestionIndex=currentQuestionIndex+1;
    }
  setAnalysisData();

}


const timerElement = document.getElementById('timer');



document.getElementById('close-btn').addEventListener('click',()=> {

  const userConfirmed = confirm("Are you sure to Submit the Exam?");
  
  // Check the user's response
  if (userConfirmed) {
      
  } else {
      return;
  }

  if(timerInterval){
    clearInterval(timerInterval);
    timerInterval = null;
    setAnalysis();
    setAnalysisData();
    setButtonColorsAfterExam();
    examSummaryReport();
    
  }
});

function setAnalysisNextQuestion ()
{
  let selectdOptionVal=0;
  if(reviewProcess){

  }
  else{
  currentQuestionIndex = currentQuestionIndex + 1;
  }
  
  if(currentQuestionIndex==maxQuestions){
    currentQuestionIndex=0;
  }
  showQuestion();
  selectdOptionVal = selectedOptions[currentQuestionIndex+1];
  for(var i = 0 ; i < radios.length; i++){
    radios[i].checked=false;
  }
  if(selectdOptionVal>0){
    radios[selectdOptionVal-1].checked = true;
  }

  for(var i = 0 ; i < radios.length; i++){
    radios[i].disabled=true;
  }

  //const hintbtn = document.getElementById("hint-btn");
 // hintbtn.innerHTML= loadedData[currentQuestionIndex].qhint;

  const tarea = document.getElementById("hintTextArea");
  tarea.value = loadedData[currentQuestionIndex].qhint;
  tarea.setAttribute('readonly', 'readonly');


  const ansbtn = document.getElementById("ans-btn");
  ansbtn.innerHTML="ANSWER - OPTION:"+ loadedData[currentQuestionIndex].qans;
    
  if(selectedOptions[currentQuestionIndex+1]==loadedData[currentQuestionIndex].qans)
  {
    ansbtn.style.background='green';
  }
  else if(selectedOptions[currentQuestionIndex+1]>0){
    ansbtn.style.background='red';
  }
  else
  {
    ansbtn.style.background='grey';
  }

  const form=document.getElementById('radio-btns');
  const elements=form.elements;
   for(let i=0; i<elements.length;i++){
     elements[i].readonly = true;
   }


   // Example of calling the showAlert function
  // showSubmitAlert();


}

// Function to show the alert with Yes/No options
function showSubmitAlert() {
  // Use confirm to show a dialog with Yes and No options
  const userConfirmed = confirm("Your exam has completed..Do u want to downlod response sheet?");

  // Check the user's response
  if (userConfirmed) {
    // User clicked "Yes"
    const pdfbtn = document.getElementById("download-pdf");
    pdfbtn.click();
    
  } else {
    // User clicked "No"
  }
}



function setAnalysisData(){
  let selectdOptionVal = 0;
  currentQuestionIndex = 0;

  const ansbtn = document.getElementById("ans-btn");
  ansbtn.style.display = 'inline';

  
  const anxtbtn = document.getElementById("anxt-btn");
  anxtbtn.style.display = 'none';
  
  //const hintbtn = document.getElementById("hint-btn");
 // hintbtn.style.display = 'inline';

  
  const hint1 = document.getElementById("hintTextArea");
  hint1.style.display = 'inline';

  const submtbtn = document.getElementById("submit-btn");
  submtbtn.style.display = 'none';

  
  const form1=document.getElementById('radio-btns');
  const elements1=form1.elements;
   for(let i=0; i<elements1.length;i++){
    elements1[i].disabled = false;
   }
  showQuestion();
  selectdOptionVal = selectedOptions[currentQuestionIndex+1];

  for(var i = 0 ; i < radios.length; i++){
    radios[i].checked=false;
  }
  if (selectdOptionVal>0){
    radios[selectdOptionVal-1].checked = true;
  }
  
  for(var i = 0 ; i < radios.length; i++){
    radios[i].disabled=true;
  }



  //hintbtn.innerHTML= loadedData[currentQuestionIndex].qhint;
  const tarea = document.getElementById("hintTextArea");
  tarea.value = loadedData[currentQuestionIndex].qhint;
  tarea.setAttribute('readonly', 'readonly');

 // document.getElementById("hintTextArea").value = loadedData[currentQuestionIndex].qhint;


  ansbtn.innerHTML="ANSWER - OPTION:"+ loadedData[currentQuestionIndex].qans;
    
  if(selectedOptions[currentQuestionIndex+1]==loadedData[currentQuestionIndex].qans)
  {
    ansbtn.style.background='green';
  }
  else if(selectedOptions[currentQuestionIndex+1]>0){
    ansbtn.style.background='red';
  }
  else
  {
    ansbtn.style.background='grey';
  }
  const form=document.getElementById('radio-btns');
  const elements=form.elements;
   for(let i=0; i<elements.length;i++){
     elements[i].readonly = true;
   }

}

function setAnalysis(){
  const submitbtn = document.getElementById("submit-btn");
    submitbtn.style.display = 'none';
  const nxtbtn = document.getElementById("next-btn"); 
    nxtbtn.style.display = 'none';
  const onxbtn = document.getElementById("onxt-btn"); 
    onxbtn.style.display = 'none'; 
  const rvbtn = document.getElementById("Review-btn");
    rvbtn.style.display = 'none';
  const closebtn = document.getElementById("close-btn");
    closebtn.style.display = 'none';

  timerElement.textContent = 'Time: 0:0:0';

  
  const form1=document.getElementById('radio-btns');
  const elements1=form1.elements;
   for(let i=0; i<elements1.length;i++){
    elements1[i].disabled = true;
   }
}


function setOnlyNextQuestion(){

  var selectedIndex = -1;
  for(var i = 0 ; i < radios.length; i++){
    if(radios[i].checked){
        selectedIndex = i+1;
        break;
    }
   }
   isSaveNextStatus = false;
  setNextQuestion();

}


function setReviewStatus(){
  var selectedIndex = -1;
  for(var i = 0 ; i < radios.length; i++){
    if(radios[i].checked){
        selectedIndex = i+1;
        break;
    }
   }
   
  if (selectedIndex != -1){
    selectedOptions[currentQtnNo] = selectedIndex;
    setNextQuestion();
    const button = document.getElementById(currentQuestionIndex);
    button.style.backgroundColor = 'yellow';


  }
  else {
    alert("Select any option");
  }
  
 
}


function setQuestionById(qid,prvSelId){

  
  if(reviewProcess){
    currentQuestionIndex = qid-1;
    setAnalysisNextQuestion();
    return;
  }
  currentQuestionIndex = qid - 1;
  if(currentQuestionIndex==maxQuestions){
    currentQuestionIndex=0;
  }
  var selectedIndex = -1;
  for(var i = 0 ; i < radios.length; i++){
    if(radios[i].checked){
        selectedIndex = i+1;
        break;
    }
   }
   
  if (selectedIndex != -1){
    selectedOptions[currentQtnNo] = selectedIndex;

  }

  
    showQuestion();
    
    for(var i = 0 ; i < radios.length; i++){
      radios[i].checked=false;
    }

    if(prvSelId>0){
         radios[prvSelId-1].checked=true;
    }
      

}


function setExamResultscores(){
  
  //alert("YOUR SCORE: " +CorrectdCount );
  const nextBtn = document.getElementById("next-btn");
  nextBtn.style.display = 'none';
 
  
  const rvwBtn = document.getElementById("Review-btn");
  rvwBtn.style.display = 'none';
  const onxbtn =document.getElementById("onxt-btn");
  onxbtn.style.display ='none';

}


function setNextQuestion(){

var selectedIndex = -1;
  for(var i = 0 ; i < radios.length; i++){
    if(radios[i].checked){
        selectedIndex = i+1;
        break;
    }
   }
   
  if (selectedIndex != -1){
    selectedOptions[currentQuestionIndex+1] = selectedIndex;
    
    const button = document.getElementById(currentQuestionIndex+1);
    button.style.backgroundColor = 'green';
  }
  else if(isSaveNextStatus == true) {
    alert("Select Any Option");
    return;
  }

    currentQuestionIndex = currentQuestionIndex + 1;
    if(currentQuestionIndex==maxQuestions){
      currentQuestionIndex=0;
    }
    isSaveNextStatus = true;
    showQuestion();
   let selectdOptionVal = selectedOptions[currentQuestionIndex+1];
  for(var i = 0 ; i < radios.length; i++){
    radios[i].checked=false;
  }
  if(selectdOptionVal>0){
    radios[selectdOptionVal-1].checked = true;
  }

}

// TIMER FUNCTION
document.addEventListener('DOMContentLoaded', function() {
  
  let countdownTime = duration; // Example: 1 hour

  function updateTimer() {
    
      if (countdownTime <= 0) {
          clearInterval(timerInterval);
          timerElement.textContent = 'Time: 0:0:0';
          onTimerEnd();
          return;
      }

      countdownTime--;
      const hrs = Math.floor(countdownTime / 3600);
      const mins = Math.floor((countdownTime % 3600) / 60);
      const secs = countdownTime % 60;

      timerElement.textContent = 
          `Remaining : ${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function onTimerEnd() {
     // alert("TIME COMPLETED");
       setAnalysis();
       setAnalysisData()
       setButtonColorsAfterExam();
       examSummaryReport();

      // You can add more logic here, like showing a message to the user
  }

  function startTimer() {
      // Initialize the timer display
      //countdownTime = 10; // Reset the time if necessary
      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);
  }
  startTimer();
});




