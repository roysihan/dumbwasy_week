document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const listItem = document.createElement("li");
    listItem.textContent = `Name: ${name}, Email: ${email}, Phone: ${phone}, Subject: ${subject}, Message: ${message}`;

    document.getElementById("submissionList").appendChild(listItem);

    document.getElementById("contactForm").reset();
  });
