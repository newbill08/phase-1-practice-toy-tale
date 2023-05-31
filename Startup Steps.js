// /*

// Set up event listeners to respond to user events:

// Identify the elements in your HTML that require event listeners, such as form submission or button clicks.
// Use JavaScript to select those elements using querySelector or getElementById.
// Attach event listeners to the selected elements using addEventListener.
// Inside the event listener functions, define the desired behavior or actions to be performed when the event occurs.
// Use fetch() to make a "GET" request and render the returned toys to the DOM:

// Use the fetch() function to send a GET request to the API endpoint that provides the list of toys.
// Handle the response using .then() to extract the JSON data.
// Iterate over the returned toys and generate the HTML code for each toy, creating a card-like structure.
// Append the generated HTML to the DOM to display the toys on the page.
// Use fetch() to make a "POST" request to create a new toy and add it to the DOM:

// Set up an event listener for the form submission event.
// Inside the event listener function, prevent the default form submission behavior using event.preventDefault().
// Retrieve the form input values using querySelector or getElementById.
// Create an object or JSON payload containing the toy data to be sent with the request.
// Use the fetch() function with the "POST" method and the appropriate endpoint to send the data to the server.
// Handle the response using .then() to extract the JSON data for the newly created toy.
// Generate the HTML code for the new toy based on the response data and append it to the DOM to display the newly added toy.
// Use fetch() to make a "PATCH" request that updates an existing toy and render the updated information to the DOM:

// Set up an event listener for the "like" button click event.
// Inside the event listener function, retrieve the necessary information about the toy that is being liked, such as the toy ID or other unique identifier.
// Use the fetch() function with the "PATCH" method and the appropriate endpoint to send the update request to the server.
// Handle the response using .then() to extract the JSON data for the updated toy.
// Find the corresponding DOM element for the toy that was updated.
// Update the relevant information in the DOM element, such as the number of likes, based on the response data.

// */





// // Run code: "json-server --watch db.json"
// //Kill code:  lsof -i :3000     
// //            kill -9 <PID>


// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   const toyCollection = document.querySelector("#toy-collection");

//   // Toggle the toy form visibility
//   addBtn.addEventListener("click", () => {
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });

//   // Fetch Andy's Toys and render them to the DOM
//   fetchToys();

//   // Add event listener for the toy form submit button
//   const toyForm = document.querySelector(".add-toy-form");
//   toyForm.addEventListener("submit", handleToyFormSubmit);

//   // Add event listener for toy like buttons
//   toyCollection.addEventListener("click", handleLikeButtonClick);
// });

// function fetchToys() {
//   fetch("http://localhost:3000/toys")
//     .then((response) => response.json())
//     .then((toys) => {
//       toys.forEach((toy) => renderToyCard(toy));
//     });
// }

// function renderToyCard(toy) {
//   const toyCollection = document.querySelector("#toy-collection");

//   // Create card elements
//   const card = document.createElement("div");
//   card.classList.add("card");

//   const name = document.createElement("h2");
//   name.textContent = toy.name;

//   const image = document.createElement("img");
//   image.src = toy.image;
//   image.classList.add("toy-avatar");

//   const likes = document.createElement("p");
//   likes.textContent = `${toy.likes} Likes`;

//   const button = document.createElement("button");
//   button.classList.add("like-btn");
//   button.textContent = "Like ❤️";
//   button.dataset.id = toy.id;

//   // Append elements to the card
//   card.appendChild(name);
//   card.appendChild(image);
//   card.appendChild(likes);
//   card.appendChild(button);

//   // Append the card to the toy collection
//   toyCollection.appendChild(card);
// }

// function handleToyFormSubmit(event) {
//   event.preventDefault();

//   const nameInput = document.querySelector('input[name="name"]');
//   const imageInput = document.querySelector('input[name="image"]');

//   const name = nameInput.value;
//   const image = imageInput.value;

//   const newToy = {
//     name,
//     image,
//     likes: 0,
//   };

//   createToy(newToy);
//   nameInput.value = "";
//   imageInput.value = "";
// }

// function createToy(toy) {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(toy),
//   };

//   fetch("http://localhost:3000/toys", options)
//     .then((response) => response.json())
//     .then((toy) => renderToyCard(toy));
// }

// function handleLikeButtonClick(event) {
//   if (event.target.classList.contains("like-btn")) {
//     const button = event.target;
//     const toyId = button.dataset.id;
//     const likesElement = button.previousElementSibling;

//     const currentLikes = parseInt(likesElement.textContent);
//     const newLikes = currentLikes + 1;

//     updateToyLikes(toyId, newLikes)
//       .then((updatedToy) => {
//         likesElement.textContent = `${updatedToy.likes} Likes`;
//       })
//       .catch((error) => {
//         console.error("Failed to update toy likes:", error);
//       });
//   }
// }

// function updateToyLikes(toyId, likes) {
//   const options = {
  
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         likes: likes,
//       }),
//     };
  
//     return fetch(`http://localhost:3000/toys/${toyId}`, options)
//       .then((response) => response.json())
//       .catch((error) => {
//         console.error("Failed to update toy likes:", error);
//       });
//   }