// index.js//
//load dom//
//fire display ramen function//
//get request data from serve to get all ramen objects//
//load each images to dom using img tag inside #ramen-menu div//
//show details for first ramen when DOM loades, without click
//click event listener on an image from the #ramen-menu div//
//fire a callback function called handleClick//

//import { target } from "happy-dom/cjs/PropertySymbol.cjs";

//handleClick should show all information about that ramen displayed inside the #ramen-detail div, where it says insert comment/rating//
//Update the rating and comment for a ramen by submitting a form. Changes should be reflected on the frontend. No need to persist.add the HTML given in intro to the index.html file to create the edit form
//updates persist (patch request)

//attatch a submit event to the new-ramen form using addSubmitListener
//after submishion, create a new ramen
//add the new ramen to the #ramen-menu div
//new ramen persists (post request)
//delete a ramen, can be button or not
//deleted ramen persists (delete request)

// Callbacks
//when "ramen" class name is 'clicked' have div with ID ramen-detail update

function afterLoad() {
    let div = document.getElementById('ramen-detail')
    let h3 = document.getElementsByClassName("restaurant")[0]
    let h2 = document.getElementsByClassName("name")[0]
    let rating = document.getElementById('rating-display')
    let comment = document.getElementById('comment-display')
    let pic = document.getElementsByClassName('detail-image')[0]

    fetch(`http://localhost:3000/ramens/1`, {
    method: "GET",
    header: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      h2.textContent = data.name
      h3.textContent = data.restaurant
      rating.textContent = data.rating
      comment.textContent = data.comment
      pic.src = data.image
  console.log("hi")
    })
   
}

afterLoad();

const addSubmitListener = (ramenForm) => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    let formNewRestaurant = document.getElementById("new-restaurant");
    let formImage = document.getElementById("new-image");
    let formRating = document.getElementById("new-rating");
    let formComment = document.getElementById("new-comment")
    let addNewRamen = document.getElementById("ramen-menu")
    let img = document.createElement('img')
    let newRamenPic = formImage.textContent
    img.src = e.target.image.value
    addNewRamen.append(img)

    const newRamenFlavor = {
      name: e.target.name.value,
      image: e.target.image.value,
      restaurant: e.target.restaurant.value,
      rating: e.target.rating.value,
      comment: formComment.value,
    }
    console.log(newRamenFlavor)

    fetch("http://localhost:3000/ramens", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRamenFlavor)
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
  })
}

const displayRamens = (domLoaded) => {
  fetch("http://localhost:3000/ramens", {
    method: "GET",
    header: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
    .then((resp) => resp.json())
    .then((data) => ramenMenuData(data))


  //       pic.src = eachRamen.currentTarget
  // console.log(pic.src)


  function ramenMenuData(returnedData) {
    returnedData.forEach((eachRamen) => {
      let menu = document.getElementById("ramen-menu")
      let img = document.createElement('img')
      img.src = eachRamen.image
      img.id = eachRamen.id
      menu.append(img)
      img.addEventListener('click', (e) => handleClick(e.currentTarget))
    })
  }
};

const handleClick = (ramen) => {
  fetch(`http://localhost:3000/ramens/${ramen.id}`, {
    method: "GET",
    header: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  })
    .then((resp) => resp.json())
    .then((data) => ramenIdArr(data))

  function ramenIdArr(newRamen) {
    console.log(newRamen)
    let div = document.getElementById('ramen-detail')
    let h3 = document.getElementsByClassName("restaurant")[0]
    let h2 = document.getElementsByClassName("name")[0]
    let rating = document.getElementById('rating-display')
    let comment = document.getElementById('comment-display')
    let pic = document.getElementsByClassName('detail-image')[0]
    h2.textContent = newRamen.name
    h3.textContent = newRamen.restaurant
    rating.textContent = newRamen.rating
    comment.innerText = newRamen.comment
    pic.src = newRamen.image

  }
}

const main = () => {
  displayRamens();
  const form = document.getElementById('new-ramen');
  addSubmitListener(form);
}

main();

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

