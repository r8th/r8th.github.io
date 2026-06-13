function generateGallery(allSliderUsedIndices, p) {
    let galleryHTML = `<div class="gallery-grid">`;

    p.images.forEach((img, idx) => {
        if (!allSliderUsedIndices.includes(idx)) {
            const inner = img.src
                ? `<img src="${img.src}" alt="${img.alt}" loading="lazy">`
                : placeholderHTML(img.alt);
            galleryHTML += `<div class="gallery-item">${inner}</div>`;
        }
    });

    galleryHTML += `</div>`;
    return galleryHTML
}