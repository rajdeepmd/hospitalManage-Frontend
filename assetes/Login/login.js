const API_URL = "http://localhost:8080";

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginData = {
        emailId: username,
        password: password
    };

    fetch(`${API_URL}/doctors/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Invalid credentials");
        }
        return response.json();
    })
    .then(data => {
        console.log("Login successful:", data);
        
        // Role-Based Redirection
        if (data.role === "ADMIN") {
            // window.location.href = `doctor.html?doctorId=${data.id}`;
            window.location.href = `../Doctor/doctor.html?hospitalId=${data.hospitalId}`;
        } else {
            window.location.href = `../Patient/patient.html?doctorId=${data.id}`;
        } 
        // else if (data.role === "DOCTOR" ) {
        //     window.location.href = `patient.html?doctorId=${data.id}`;
        // } 
        // else {
        //     document.getElementById("errorMessage").textContent = "Unauthorized role!";
        // }
    })
    .catch(error => {
        document.getElementById("errorMessage").textContent = "Invalid username or password!";
        console.error("Login error:", error);
    });

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
});
