const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unspash API
const count = 30;
const apiKey = 'gZ8fs0GKfMwBtWuuLvTMLd_O3kQ8FS3ZR2a3BFVKKu8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
    }
}

// Helper Function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for(const key in  attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display Photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener for Load
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, and then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//  Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();