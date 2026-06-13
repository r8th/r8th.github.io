function generateSliders(p) {
    let sliderHTML = '';
    const sliderObjects = Array.isArray(p.sliders) ? p.sliders : (p.slider ? [p.slider] : []);
    const allSliderUsedIndices = [];

    sliderObjects.forEach(function (sObj, sIdx) {
        
        if (!sObj || !Array.isArray(sObj.images)) return;
        const raw = sObj.images;
        const imgsForSlider = raw.map(item => {
            if (typeof item === 'number') return p.images[item];
            if (typeof item === 'string') return { src: item, alt: '' };
            return item;
        }).filter(img => img && img.src);

        raw.forEach(i => { if (typeof i === 'number') allSliderUsedIndices.push(i); });

        if (imgsForSlider.length) {
            sliderHTML += `<div class="image-slider" data-slider-index="${sIdx}"><div class="slides">` +
                imgsForSlider.map((img, i) => `<img src="${img.src}" alt="${img.alt || ''}" class="${i === 0 ? 'active' : ''}">`).join('') +
                `</div><input class="project-slider" data-slider-index="${sIdx}" type="range" min="0" max="${Math.max(0, imgsForSlider.length - 1)}" value="0" step="0.01" aria-label="Project image slider"></div>`;
        }
    })
    return [allSliderUsedIndices, sliderHTML]
}

function initSliders() {
    const sliderContainers = document.querySelectorAll('#project-content .image-slider');
    sliderContainers.forEach(container => {
      const sliderInput = container.querySelector('.project-slider');
      const slidesEl = container.querySelector('.slides');
      const imgs = slidesEl ? slidesEl.querySelectorAll('img') : [];

      function setAspectFromFirst(img) {
        if (!img) return;
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        if (w && h) {
          const pct = (h / w) * 100;
          slidesEl.style.setProperty('--slider-aspect', pct + '%');
        }
      }

      const firstImg = imgs[0];
      if (firstImg) {
        if (firstImg.complete && firstImg.naturalWidth) {
          setAspectFromFirst(firstImg);
        } else {
          firstImg.addEventListener('load', () => setAspectFromFirst(firstImg));
        }
      }

      if (!sliderInput || imgs.length === 0) return;

      // smooth crossfade while dragging: interpolate opacity between neighboring images
      function handleInput() {
        const v = parseFloat(sliderInput.value);
        const max = Math.max(0, imgs.length - 1);
        const val = Math.max(0, Math.min(max, v));
        const lo = Math.floor(val);
        const hi = Math.min(max, Math.ceil(val));
        const t = val - lo;
        imgs.forEach((im, i) => {
          let op = 0;
          if (i === lo) op = 1 - t;
          else if (i === hi) op = t;
          im.style.opacity = op;
          im.classList.toggle('active', op >= 0.5);
        });
      }

      function snapToNearest() {
        const r = Math.round(parseFloat(sliderInput.value));
        sliderInput.value = String(r);
        handleInput();
      }

      sliderInput.addEventListener('input', handleInput);
      sliderInput.addEventListener('change', snapToNearest);
      sliderInput.addEventListener('pointerup', snapToNearest);
      sliderInput.addEventListener('mouseup', snapToNearest);
      sliderInput.addEventListener('touchend', snapToNearest);

      // initialize visual state
      handleInput();
    });
}