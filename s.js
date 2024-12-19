// Initialize EmailJS
(function () {
    emailjs.init("YOUR_USER_ID"); // Replace YOUR_USER_ID with your EmailJS user ID
})();

const sosButton = document.getElementById("sos-button");
const statusText = document.getElementById("status");

// Function to get user's geolocation
function getLocationAndSendSOS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            sendSOSEmail,
            function (error) {
                alert("Error getting location: " + error.message);
                statusText.textContent = "Location access denied or unavailable.";
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
        statusText.textContent = "Geolocation is not supported.";
    }
}

// Function to send an SOS email
function sendSOSEmail(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Define email parameters
    const emailParams = {
        to_email: "recipient@example.com", // Replace with the recipient's email
        subject: "SOS Alert",
        message: `SOS! The user is in distress. Their current location is: \n Latitude: ${latitude} \n Longitude: ${longitude}`
    };

    // Send the email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams) // Replace with your EmailJS service and template ID
        .then(function (response) {
            console.log("SUCCESS!", response.status, response.text);
            statusText.textContent = "SOS sent successfully! Help is on the way.";
        }, function (error) {
            console.log("FAILED...", error);
            statusText.textContent = "Failed to send SOS. Please try again.";
        });
}

// Add event listener to the SOS button
sosButton.addEventListener("click", function () {
    statusText.textContent = "Sending SOS...";
    getLocationAndSendSOS();
});
