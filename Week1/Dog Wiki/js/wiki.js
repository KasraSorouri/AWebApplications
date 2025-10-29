let page = document.getElementsByClassName('container')[0]

// Dogs Breed
let dogBreeds = [
  'Beagle',
  'Dhole',
  'Chow',
  'Eskimo',
  'Husky',
]

// Get Dogs Information
let getDogInfo = async (breed) => {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`;
  let response = await fetch(url)
  let data = await response.json()
  return data.extract
}

// Get Dogs Image
let getDogImage = async (breed) => {
  const url = `https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`
  let response = await fetch(url)
  let data = await response.json()
  return data.message
}

// Make Dog Wiki
const makeWikiItem = (dog) => {
  let newDog = document.createElement('div')
  newDog.classList.add('wiki-item')

  let newHeader = document.createElement('h1')
  newHeader.classList.add('wiki-header')
  newHeader.innerText = dog.breed
  newDog.appendChild(newHeader)

  let newContent = document.createElement('div')
  newContent.classList.add('wiki-content')
  newDog.appendChild(newContent)

  let newParagraph = document.createElement('p')
  newParagraph.classList.add('wiki-text')
  newParagraph.innerText = dog.text
  newContent.appendChild(newParagraph)

  let newImgContainer = document.createElement('div')
  newImgContainer.classList.add('img-container')
  newContent.appendChild(newImgContainer)

  let newImg = document.createElement('img')
  newImg.classList.add('wiki-img')
  newImg.src = dog.img
  newImgContainer.appendChild(newImg)

  page.appendChild(newDog)
}

// Make Wiki Page
dogBreeds.forEach(async (breed) => {
  let dog = {
    breed: breed,
    text: await getDogInfo(breed),
    img: await getDogImage(breed)
  }
  makeWikiItem(dog)
})