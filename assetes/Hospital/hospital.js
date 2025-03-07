const API_URL = "http://localhost:8080/hospitals"; 

// Fetch all hospitals
function fetchHospitals() {
    fetch(API_URL+"/getHospitals")
        .then(response => response.json())
        .then(data => displayHospitals(data))
        .catch(error => console.error("Fetch error:", error));
}

// Display hospitals in table
function displayHospitals(hospitals) {
    const tableBody = document.getElementById("hospitalTable");
    tableBody.innerHTML = "";
    hospitals.forEach(hospital => {
        let row = `<tr onclick="onRowClick(${hospital.id})">
            <td>${hospital.id}</td>
            <td>${hospital.name}</td>
            <td>${hospital.location}</td>
            <td>${hospital.adminName}</td>
            <td>${hospital.emailId}</td>
            <td>${hospital.specialization}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Redirect to doctor page with hospital ID
function onRowClick(hospitalId) {
    window.location.href = `../Doctor/doctor.html?hospitalId=${hospitalId}`;
}


// Handle form submission to add a hospital
document.getElementById("hospitalForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("hospitalName").value;
    const location = document.getElementById("hospitalLocation").value;
    const adminName = document.getElementById("adminName").value;
    const specialization = document.getElementById("specialization").value;
    const emailId = document.getElementById("emailId").value;

    const newHospital = {
        name: name,
        location: location,
        adminName:adminName,
        specialization:specialization,
        emailId:emailId


    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHospital)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Hospital added:", data);
        fetchHospitals(); // Refresh list after adding
    })
    .catch(error => console.error("Error saving hospital:", error));

    // Clear input fields
    document.getElementById("hospitalName").value = "";
    document.getElementById("hospitalLocation").value = "";
    document.getElementById("adminName").value = "";
    document.getElementById("specialization").value = "";
    document.getElementById("emailId").value = "";
});


// Load hospitals on page load
fetchHospitals();
