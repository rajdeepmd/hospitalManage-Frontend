const urlParams = new URLSearchParams(window.location.search);
const hospitalId = urlParams.get("hospitalId");
const API_URL = "http://localhost:8080";

// Fetch hospital details
function fetchHospitalDetails() {
    fetch(`${API_URL}/doctors/getDoctors/${hospitalId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("hospitalName").textContent = `Hospital: ${data.hospital.name}`;
        })
        .catch(error => console.error("Fetch error:", error));
}

// Fetch doctors for hospital
function fetchDoctors() {
    fetch(`${API_URL}/doctors/getAllDoctorList/${hospitalId}`)
        .then(response => response.json())
        .then(data => displayDoctors(data))
        .catch(error => console.error("Fetch error:", error));
}

// Display doctors in table
function displayDoctors(doctors) {
    const tableBody = document.getElementById("doctorTable");
    tableBody.innerHTML = "";
    var sr = 1;

    doctors.forEach(doctor => {
        let row = document.createElement("tr");
        
        // Set row data
        row.innerHTML = `
            <td>${sr}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
        `;

        // Add click event to row
        row.addEventListener("click", function () {
            window.location.href = `../Patient/patient.html?doctorId=${doctor.id}`;
        });

        tableBody.appendChild(row);
        sr++;
    });
}


// Handle form submission to add doctor
document.getElementById("doctorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("doctorName").value;
    const specialization = document.getElementById("specialization").value;

    const newDoctor = {
        name: name,
        specialization: specialization,
        hospital: {
            id:hospitalId
        }
    };

    fetch(`${API_URL}/doctors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Doctor added:", data);
        fetchDoctors(); // Refresh list after adding
    });

    document.getElementById("doctorName").value = "";
    document.getElementById("specialization").value = "";
});

fetchHospitalDetails();
fetchDoctors();
