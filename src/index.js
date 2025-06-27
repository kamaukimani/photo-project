document.addEventListener("DOMContentLoaded", () => {
console.log("are we really")
//http://localhost:3000/photoDetails

let form = document.querySelector("form")
 form.addEventListener("submit",handleForm)

 function handleForm(e){
    e.preventDefault()
    let photoObj = {
        name: e.target.name.value,
        imageUrl: e.target.image_Url.value,
        description: e.target.description.value,
        rating: e.target.rating.value,
        price: 0
    }
    showServive(photoObj)
    addPhoto(photoObj)
 }
 function showServive(image){
    // Building the image
    let photo = document.createElement("li")
    photo.className = "photos"
    photo.innerHTML = `
    <div class="image-container">
    <img src="${image.imageUrl}">
    </div>
    <div class="photo">
    <h3>${image.name}</h3>
    <p>${image.description}</p>
    <p>${image.rating}</p>
    <p>
    $<span class="price">${image.price}</span>Price
    <p>
    </div>
    <div class="buttons">
    <button id="increase">Increase $100000</button>
    <button id="reduce"> Reduce $50000</button>
    <button id="delete">Delete</button>
    </div>
    `
photo.querySelector("#increase").addEventListener("click", () => {
    image.price+= 100000
  photo.querySelector("span").textContent = image.price
  updatePrice(image)

})
photo.querySelector("#reduce").addEventListener("click", () => {
    image.price-= 50000
    photo.querySelector("span").textContent = image.price
    reducePrice(image)
})
photo.querySelector("#delete").addEventListener("click", () => {
    photo.remove()
    deleteImage(image.id)
})
//console.log(photo.querySelector("#delete"))
//console.log(photo.querySelector("#reduce"))
 //console.log( photo.querySelector("span"))
//Add photo to  Dom
document.querySelector("#display").appendChild(photo)
}

 

function getPhotos(){
fetch("http://localhost:3000/photoDetails")
.then(response => response.json())
.then(photoDetails => photoDetails.forEach(image => showServive(image)))

}

 function addPhoto(photoObj){
    fetch("http://localhost:3000/photoDetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(photoObj)
    })
    .then(response => response.json())
    .then(image => console.log(image))
 }
 function updatePrice(photoObj){
    fetch(`http://localhost:3000/photoDetails/${photoObj.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(photoObj) 
    })
    .then(response => response.json())
    .then(image => console.log(image))
 }
 function reducePrice(photoObj){
    fetch(`http://localhost:3000/photoDetails/${photoObj.id}`, {
         method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(photoObj) 
    })
    .then(response => response.json())
    .then(image => console.log(image))
    }
 function deleteImage(id){
    fetch(`http://localhost:3000/photoDetails/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(image => console.log(image))

 }

function initialize(){
    getPhotos()
}
initialize()

})
/*
// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");


const hearts = document.querySelectorAll(".like-glyph");
hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    mimicServerCall()
      .then(() => {
        // If the heart is empty, fill it
        if (heart.innerText === EMPTY_HEART) {
          heart.innerText = FULL_HEART;
          heart.classList.add("activated-heart");
        } else {
          // If the heart is full, empty it
          heart.innerText = EMPTY_HEART;
          heart.classList.remove("activated-heart");
        }
      })
      .catch(error => {
        // Show the error modal with the message
        modal.classList.remove("hidden");
        modalMessage.innerText = error;

        // Hide the modal after 3 seconds
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 3000);
      });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
*/