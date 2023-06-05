let addToy = false

const getToyData = () => {
  return fetch("http://localhost:3000/toys").then((resp) => resp.json())
}

const postToyData = (newToy) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newToy)
  }
  return fetch("http://localhost:3000/toys", config).then(data => data.json())
}

const updateToyLikes = (e) => {
  const likes = parseInt(e.target.previousSibling.textContent) + 1

  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes})
  }
  fetch(`http://localhost:3000/toys/${e.target.id}`, config)
    .then(resp => resp.json())
    .then(data => {
      e.target.previousSibling.textContent = `${data.likes} Likes`
    })
}

const idEl = (id) => document.getElementById(id)
const newEl = (el) => document.createElement(el)

const newCardFrom = (toy) => {
  const cardDiv = newEl("div")
  const cardH2 = newEl("h2")
  const cardImg = newEl("img")
  const cardP = newEl("p")
  const cardBtn = newEl("button")

  cardDiv.classList.add("card")

  cardH2.textContent = toy.name

  cardImg.src = toy.image
  cardImg.classList.add("toy-avatar")
  cardImg.alt = `${toy.name} Avatar`

  cardP.textContent = `${toy.likes} Likes`

  cardBtn.textContent = "Like ❤️"
  cardBtn.id = toy.id
  cardBtn.addEventListener("click", updateToyLikes)

  cardDiv.append(cardH2, cardImg, cardP, cardBtn)
  return cardDiv
}

const renderCards = (toysData) => {
  const toyCollection = idEl("toy-collection")
  toysData.forEach((toyData) => {
    toyCollection.appendChild(newCardFrom(toyData))
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  const addToyForm = document.querySelector(".add-toy-form")

  getToyData().then((data) => renderCards(data))

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })

  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const newToy = {
      ...data,
      likes: 0
    }
    postToyData(newToy).then(data => {
      const toyCard = newCardFrom(data)
      const toyCollection = idEl("toy-collection")
      toyCollection.appendChild(toyCard)
    })
    e.target.reset()
  })
})