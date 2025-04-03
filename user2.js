let pswrd="";
let usrname="";

var examDur = {
  examduration: 0
};


loadExamDetails();

function loadExamDetails(){
fetch('user.json')
  .then(response => response.json())
  .then(udata => {
    pswrd= udata[0].pwrd;
  //  usrname=udata[0].usr;
     examDur.examduration = udata[0].duration;
    //examduration=udata[0].duration;

  })
  .catch(error => console.error('Error fetching JSON:', error));
}


document.getElementById('phone').addEventListener('input', function() {
  this.value = this.value.replace(/\D/g, '');
});

// script.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Get values from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    //if(password==pswrd)
      if((password.length)>1){
        window.location.href = "exam2.html";
    }
    else {
      alert("Invalid User");
    }
    
  });

  function displayText() {
    // Replace this with your dynamic text assignment logic
    var dynamicText = "Hi....\n1. Make sure your INTERNET and BATTERY fine.\n2.Don't press Back or Refresh button. ";
    dynamicText = dynamicText+"\n3. Exam will be CLOSED AUTOMATICALLY once specified duration completed.";

    dynamicText = dynamicText+"\n 4. TIMER is running down once you click on login and EXAM WILL START immediatly. \n 5.Attempt the Exam Only once(Multiple attempts get ZERO marks)."

    alert(dynamicText);
}
  