const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get("doctorId");
const API_URL = "http://localhost:8080";

// Fetch doctor details
function fetchDoctorDetails() {
    fetch(`${API_URL}/doctors/getDoctors/${doctorId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("doctorName").textContent = `Doctor: ${data.name}`;
        })
        .catch(error => console.error("Fetch error:", error));
}

// Fetch patients for doctor
function fetchPatients() {
    fetch(`${API_URL}/patients/getPatientByDoctor/${doctorId}`)
        .then(response => response.json())
        .then(data => displayPatients(data))
        .catch(error => console.error("Fetch error:", error));
}

// Display patients in table
function displayPatients(patients) {
    const tableBody = document.getElementById("patientTable");
    tableBody.innerHTML = "";
    var sr = 1;
    patients.forEach(patient => {
        let row = `<tr>
            <td>${sr}</td>
            <td>${patient.name}</td>
            <td>${patient.disease}</td>
            <td>${patient.revisiteDate}</td>
            <td>${patient.age}</td>
        </tr>`;
        tableBody.innerHTML += row;
        sr++;
    });
}

// Handle form submission to add patient
document.getElementById("patientForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("patientName").value;
    const disease = document.getElementById("disease").value;
    const revisiteDate = document.getElementById("revisiteDate").value;
    const age = document.getElementById("age").value;

    const newPatient = {
        name: name,
        disease: disease,
        doctor: {
            id: doctorId
        },
        revisiteDate: revisiteDate,
        age: age

    };

    fetch(`${API_URL}/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Patient added:", data);
            fetchPatients(); // Refresh list after adding
        });

    document.getElementById("patientName").value = "";
    document.getElementById("disease").value = "";
    document.getElementById("revisiteDate").value = "";
    document.getElementById("age").value = "";
});

fetchDoctorDetails();
fetchPatients();
