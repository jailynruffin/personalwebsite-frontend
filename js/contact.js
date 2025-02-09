const form = document.getElementById("contactForm");
const homeButton = document.getElementById("homeButton");

// Redirect to homepage on button click
homeButton.addEventListener("click", () => {
    window.location.href = "./index.html";
});

// Handle form submission
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const subject = document.getElementById("subject").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!subject || !email || !message) {
        alert("All fields are required.");
        return;
    }

    // Send data to the backend
    try {
        const response = await fetch("http://localhost:5000/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject, email, message }),
        });

        if (response.ok) {
            alert("Thank you for reaching out! I’ll get back to you soon.");
            window.location.href = "./index.html"; // Redirect to homepage
        } else {
            alert("Something went wrong. Please try again later.");
        }
    } catch (error) {
        console.error("Error sending email:", error);
        alert("Unable to send email. Please try again later.");
    }
});

document.getElementById("homeButton").addEventListener("click", () => {
    window.location.href = "./index.html"; // Redirect to homepage
});

