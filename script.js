const imageContainer= document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unslpash API
let count = 50;
const apiKey = '6gCzElfIYOMU-0WArdouTqdvjEaRflnV843HhB59dzg';
let apiUrl = `https://api.unsplash.com/topics/covid-19/photos/?client_id=${apiKey}&count=${count}&per_page=50`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elemntsfunction 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elemnts for links & phots, add to DOM 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank', 
        });
        console.log(photosArray);
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then p[ut bothj inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplashed API
async function getPhotos () {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
    }
}
// Check to see if scrolling near botton of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && ready) {
        ready = false;
        getPhotos();
    }
});

// On load
getPhotos();