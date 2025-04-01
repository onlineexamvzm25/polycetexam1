document.getElementById("validationForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form submission

    let valid = true;

    // Clear previous error messages
    document.querySelectorAll(".error-message").forEach(function(span) {
        span.textContent = "";
    });

   

    // Phone Number Validation (must be exactly 10 digits)
    let phone = document.getElementById("phone").value;
    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").textContent = "Phone number must be exactly 10 digits.";
        valid = false;
    }

    // District Validation
    let district = document.getElementById("district").value;
    if (district === "") {
        document.getElementById("districtError").textContent = "Please select a district.";
        valid = false;
    }

    // If all inputs are valid, show success
    if (valid) {
        window.location.href = "examschedule.html";
        //alert("Form submitted successfully!");
        // Add form submission logic here (e.g., send data to the server)
    }
});

// Phone input event: Allow only numeric input and prevent non-numeric characters
document.getElementById("phone").addEventListener('keydown', function(event) {
    // Allow backspace, delete, and numbers
    if (!((event.key >= '0' && event.key <= '9') || event.key === 'Backspace' || event.key === 'Delete')) {
        event.preventDefault();
    }
});
