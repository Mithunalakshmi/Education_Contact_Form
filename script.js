// Select the form
const form = document.getElementById("contactForm");

// Listen for form submission
form.addEventListener("submit", function (event) {

    // Prevent page reload
    event.preventDefault();

    // Get user inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Send data to backend
    fetch("http://localhost:5000/contact", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            message
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        form.reset();

    })

    .catch(error => {

        console.log(error);

        alert("Something went wrong!");

    });

});