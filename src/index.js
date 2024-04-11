// index.js//
//load dom//
//fire display ramen function//
//get request data from serve to get all ramen objects//
//load each images to dom using img tag inside #ramen-menu div//
//show details for first ramen when DOM loades, without click
//click event listener on an image from the #ramen-menu div
//fire a callback function called handleClick

//import { target } from "happy-dom/cjs/PropertySymbol.cjs";

//handleClick should show all information about that ramen displayed inside the #ramen-detail div, where it says insert comment/rating
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

const domLoaded = document.addEventListener("DOMContentLoaded", (e) => { });
console.log("hi")

const handleClick = (ramen) => { //ramen=the click event info

  fetch(`http://localhost:3000/ramens/${ramen.target.id}`, {
    method: "GET",
    header: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(ramen.id)
  })
    .then((resp) => resp.json())
    .then((data) => ramenIdArr(data))

  function ramenIdArr(newRamen) {
    let div = document.getElementById('ramen-detail')
    let h3 = document.getElementsByClassName("restaurant")[0]
    let h2 = document.getElementsByClassName("name")[0]
    h2.textContent = newRamen.name
    h3.textContent = newRamen.restaurant
    let rating = document.getElementById('rating-display')
    rating.textContent = newRamen.rating
    let comment = document.getElementById('comment-display')
    comment.textContent = newRamen.comment
    let pic = document.getElementsByClassName('detail-image')[0]
    pic.src = newRamen.image
  }

}

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
}

document.addEventListener('submit', addSubmitListener)


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

  let menu = document.getElementById("ramen-menu")

  function ramenMenuData(returnedData) {
    returnedData.forEach((eachRamen) => {
      let img = document.createElement('img')
      img.src = eachRamen.image
      img.id = eachRamen.id
      menu.append(img)
      img.addEventListener('click', handleClick)
    })

  }
};

const main = () => {
  displayRamens();
  addSubmitListener();
}

main();

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

