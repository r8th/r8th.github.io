function generateBlogs(p) {
    blogHTMLOutput = ""
    p.blogs.forEach((bObj, bIdx) => {
        
        blogHTMLOutput += `<div class='pcg-section'>`
        let num = bIdx + 1
        num = num.toString().padStart(2, '0')
        blogHTMLOutput +=  `<p class='pcg-section-num'>${num} — ${bObj.brief}</p>`
        blogHTMLOutput += `<h2 class="pcg-section-heading">${bObj.heading}</h2>`
        if (!typeof bObj.body === "string") {
            bObj.body.forEach((paragraph) => {
                blogHTMLOutput += `<p class="pcg-section-body">${paragraph}</p>`
            });
        } else {
            blogHTMLOutput += `<p class="pcg-section-body">${bObj.body}</p>`
        }
        
        bObj.images.forEach((imgIdx) => {
            if (typeof imgIdx === "number") {
                blogHTMLOutput += `<div class="pcg-img-block">`
                blogHTMLOutput += `<img src="${p.images[imgIdx].src}" alt="${p.images[imgIdx].alt}">`
                blogHTMLOutput += `</div>`

            }
            else {
                blogHTMLOutput += `<div class="pcg-img-pair">`
                imgIdx.forEach((imgIdx2) => {
                    blogHTMLOutput += `<img src="${p.images[imgIdx2].src}" alt="${p.images[imgIdx2].alt}">`
                });
                blogHTMLOutput += `</div>`
            }
        })
        blogHTMLOutput += `</div>`
    });
    return blogHTMLOutput
}