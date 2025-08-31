const cloudName = "SEU_CLOUD_NAME"; // substitua pelo seu Cloudinary cloud name
const tag = "ong-fotos"; // ou nome da pasta/tag
const galleryContainer = document.getElementById('gallery');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxText = document.getElementById('lightbox-text');
const closeLightbox = document.getElementById('close-lightbox');

// Fetch imagens da tag/pasta no Cloudinary
async function fetchCloudinaryImages() {
    const url = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        data.resources.forEach((image) => {
            const imgURL = `https://res.cloudinary.com/${cloudName}/image/upload/${image.public_id}.jpg`;
            const imgText = image.context?.custom?.alt || "Imagem da ONG";

            const imageDiv = document.createElement('div');
            imageDiv.classList.add('image');

            const img = document.createElement('img');
            img.src = imgURL;
            img.alt = imgText;
            img.setAttribute('data-text', imgText);

            imageDiv.appendChild(img);
            galleryContainer.appendChild(imageDiv);

            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxText.textContent = img.getAttribute('data-text');
                lightbox.classList.remove('hidden');
            });
        });
    } catch (error) {
        console.error("Erro ao carregar imagens do Cloudinary:", error);
    }
}

closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});

fetchCloudinaryImages();
