





// Run code: "json-server --watch db.json"
//Kill code:  lsof -i :3000     
//            kill -9 <PID>


let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  // Toggle the toy form visibility
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch Andy's Toys and render them to the DOM
  fetchToys();

  // Add event listener for the toy form submit button
  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", handleToyFormSubmit);

  // Add event listener for toy like buttons
  toyCollection.addEventListener("click", handleLikeButtonClick);


function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => {
      toys.forEach((toy) => renderToyCard(toy));
    });
}

function renderToyCard(toy) {
  const toyCollection = document.querySelector("#toy-collection");

  // Create card elements
  const card = document.createElement("div");
  card.classList.add("card");

  const name = document.createElement("h2");
  name.textContent = toy.name;

  const image = document.createElement("img");
  image.src = toy.image;
  image.classList.add("toy-avatar");

  const likes = document.createElement("p");
  likes.textContent = `${toy.likes} Likes`;

  const button = document.createElement("button");
  button.classList.add("like-btn");
  button.textContent = "Like ❤️";
  button.dataset.id = toy.id;

  // Append elements to the card
  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(likes);
  card.appendChild(button);

  // Append the card to the toy collection
  toyCollection.appendChild(card);
}

function handleToyFormSubmit(event) {
 // event.preventDefault();
 e.stopImmediatePropagation()
  const nameInput = document.querySelector('input[name="name"]');
  const imageInput = document.querySelector('input[name="image"]');

  const name = nameInput.value;
  const image = imageInput.value;

  const newToy = {
    name,
    image,
    likes: 0,
  };

  createToy(newToy);
  nameInput.value = "";
  imageInput.value = "";
}

function createToy(toy) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toy),
  };

  fetch("http://localhost:3000/toys", options)
    .then((response) => response.json())
    .then((toy) => renderToyCard(toy));
}

function handleLikeButtonClick(event) {
  if (event.target.classList.contains("like-btn")) {
    const button = event.target;
    const toyId = button.dataset.id;
    const likesElement = button.previousElementSibling;

    const currentLikes = parseInt(likesElement.textContent);
    const newLikes = currentLikes + 1;

    updateToyLikes(toyId, newLikes)
      .then((updatedToy) => {
        likesElement.textContent = `${updatedToy.likes} Likes`;
      })
      .catch((error) => {
      console.error("Failed to update toy likes:", error);
    });
  }}


  function updateToyLikes(toyId, likes) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: likes,
      }),
    };
  
    return fetch(`http://localhost:3000/toys/${toyId}`, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update toy likes");
        }
      })
      .catch((error) => {
        console.error("Failed to update toy likes:", error);
      });
  }
});