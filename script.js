let getbtn = document.getElementById('getData');
let postbtn = document.getElementById('postData');

getbtn.addEventListener('click', () => {
    console.log('hiii');
    fetch("http://localhost:8080/doctors/getAllDoctor")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error fetching doctors:", error));


})

getbtn.addEventListener('click', () => {

    const newDoctor = {
        name: "Dr. John Doe",
        specialization: "Cardiology",
        hospital: { id: 1 }  // Assuming hospital ID is 1
    };

    fetch("http://localhost:8080/doctors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDoctor)
    })
        .then(response => response.json())
        .then(data => console.log("Doctor added:", data))
        .catch(error => console.error("Error adding doctor:", error));
})  