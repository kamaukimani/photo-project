console.log("are we really")
//http://localhost:3000/photoDetails
function getPhotos(){
fetch("http://localhost:3000/photoDetails")
.then(response => response.json())
.then(photoDetails => photoDetails.forEach(e => handleForm(e)))

}

 let form = document.querySelector("form")
 form.addEventListener("submit", handleForm)
 function handleForm(e){
e.preventDefault()
let photo = document.createElement("li")
photo.className = "photos"
photo.innerHTML = `
<img src="${e.imageUrl}">
<div class="photo">
<h3>${e.name}</h3>
<p>${e.description}</p>
<p>${e.rating}</p>
<p>${e.likes}</p>
</div>
<div classs="buttons">
<button>like</button>
<button>Delete</button>
</div>
`

//Add photo to  Dom
document.querySelector("#display").appendChild(photo)
}

function initialize(){
    handleForm()
}
initialize()
