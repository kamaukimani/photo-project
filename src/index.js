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
        price: 100000
    }
    showServive(photoObj)
    addPhoto(photoObj)
 }
 // change the background color of the Add Service button to green when the mouse is over it
 const subBtn = document.querySelector("#sub")
 subBtn.addEventListener("mouseover", () => {
  subBtn.style.backgroundColor = "green "
 })
 //return the background color of the Add Service button to red when the mouse is out
 subBtn.addEventListener("mouseout", () => {
  subBtn.style.backgroundColor = "red"
 })
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
    <p>Rating:${image.rating}</p>
    <p>
    $<span class="price">${image.price}</span>Price
    <p>
    <span class="like ${image.liked ? "activate-heart" : ""}">${image.liked ? "♥" : "♡"}</span> 
    </div>
    <div class="buttons">
    <button id="increase">Increase $100000</button>
    <button id="reduce"> Reduce $50000</button>
    <button id="delete">Delete</button>
    </div>
    <br>
    <div class="purchase-button">
    <button id="purchase">Purchase Item</button>
    </div>
    `
    //Increase price by 100000
photo.querySelector("#increase").addEventListener("click", () => {
  if (image.price +100000 <= 999999){
    image.price += 100000;                                            //setting maximum price to 999999
    
  //image.price+= 100000
  photo.querySelector("span").textContent = image.price
  updatePrice(image)
  } else {
    alert("Maximum price 999999!")
  }

})
//Reduce price by 50000
photo.querySelector("#reduce").addEventListener("click", () => {
  if (image.price - 50000 >= 100000){                               // setting minimum price to 100000
  image.price-= 50000
    photo.querySelector("span").textContent = image.price
    reducePrice(image)
    } else {
      alert("Minimum price is 100000!")
    }
})
//delete service
photo.querySelector("#delete").addEventListener("click", () => {
  if( confirm("Are you sure you want to delete the servie?")){   //confirm before deleting service
    photo.remove()
    deleteImage(image.id)
  }
})

 

 // Like button
//  console.log(photo.querySelector("#like"))
    const heart = photo.querySelector(".like");
    heart.addEventListener("click", () => {
      image.liked = !image.liked;
      heart.innerText = image.liked ? "♥" : "♡";
      heart.classList.toggle("activate-heart", image.liked);
      updateLike(image.id, image.liked);
    });
    // heart.addEventListener("mouseover", () =>{
    //   alert("Click to set as Favorite!")
    // })

    //Add an alert to purchase button
    photo.querySelector("#purchase").addEventListener("click", () => {
      alert(`You've successfully purchased the Service!`)
    })
//console.log(photo.querySelector("#delete"))
//console.log(photo.querySelector("#reduce"))
 //console.log( photo.querySelector("span"))
//Add photo to  Dom
document.querySelector("#display").appendChild(photo)
}

 //sending a GET request to JSON

function getPhotos(){
fetch("http://localhost:3000/photoDetails")
.then(response => response.json())
.then(photoDetails => photoDetails.forEach(image => showServive(image)))

}
//Updating services using the form and make it persist
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

 //Function increase the price and make the price persist after reloading
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
 //Function to reduce price and make it persist when the page reloads
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

    //Function to change the like and make it persist when the page reloads
    function updateLike(id, likedStatus) {
    fetch(`http://localhost:3000/photoDetails/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ liked: likedStatus })
    })
      .then(response => response.json())
      .then(updated => console.log("Liked status updated:", updated));
  }
//Function to delete the servce 
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
//Function to render our images 
//Gets Data and renders our services 
function initialize(){
    getPhotos()
}
initialize()

})