const galleryContainer = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxText = document.getElementById('lightbox-text');
const closeLightbox = document.getElementById('close-lightbox');

async function fetchCloudinaryImages() {
    try {
        const response = await fetch("/api/images");
        const data = await response.json();

        data.forEach((image) => {
            const imageDiv = document.createElement("div");
            imageDiv.classList.add("image");

            const img = document.createElement("img");
            img.src = image.url;
            img.alt = image.alt;
            img.setAttribute("data-text", image.alt);

            imageDiv.appendChild(img);
            galleryContainer.appendChild(imageDiv);

            img.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightboxText.textContent = img.getAttribute("data-text");
                lightbox.classList.remove("hidden");
            });
        });
    } catch (error) {
        console.error("Erro ao carregar imagens:", error);
    }
}

closeLightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add("hidden");
    }
});

fetchCloudinaryImages();
