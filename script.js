document.addEventListener('DOMContentLoaded', function() {
    fetchPhotos();

    const loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.addEventListener('click', function() {
        fetchPhotos();
    });
});

function fetchPhotos() {
    fetch('https://api.unsplash.com/photos/random?count=9&client_id=Yn9JntVrR_RboDyJZZc32AHjbAgKhX4I-StTn04Zd88')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayPhotos(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayPhotos(photos) {
    const photoGallery = document.getElementById('photo-gallery');
    photoGallery.innerHTML = ''; // Clear previous photos

    photos.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.classList.add('col');
        photoCard.innerHTML = `
            <div class="card">
                <img src="${photo.urls.regular}" class="card-img-top" alt="${photo.alt_description}">
                <div class="card-body">
                    <p class="card-text">${photo.alt_description}</p>
                </div>
            </div>
        `;
        photoGallery.appendChild(photoCard);
    });
}
