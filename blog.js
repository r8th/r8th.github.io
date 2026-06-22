function generateBlogs(p) {
    blogHTMLOutput = ""
    p.blogs.forEach((bObj, bIdx) => {
        
        blogHTMLOutput += `<div class='pcg-section'>`
        let num = bIdx + 1
        num = num.toString().padStart(2, '0')
        blogHTMLOutput +=  `<p class='pcg-section-num'>${num} — ${bObj.brief}</p>`
        blogHTMLOutput += `<h2 class="pcg-section-heading">${bObj.heading}</h2>`
        
        console.log(bIdx)
        console.log(typeof bObj.body)
        if ((typeof bObj.body) === "string") {
            blogHTMLOutput += `<p class="pcg-section-body">${bObj.body}</p>`
        } else {
            bObj.body.forEach((paragraph) => {
                blogHTMLOutput += `<p class="pcg-section-body">${paragraph}</p>`
            });
        }
        
        bObj.images.forEach((imgIdx) => {
            if (typeof imgIdx === "number") {
                blogHTMLOutput += `<div class="pcg-img-block">`
                if(p.images[imgIdx].type == "video")
                {
                    blogHTMLOutput += `<video controls playsinline><source src="${p.images[imgIdx].src}" type="video/mp4"></video>`
                }
                else
                {
                    blogHTMLOutput += `<img src="${p.images[imgIdx].src}" alt="${p.images[imgIdx].alt}">`
                }
                blogHTMLOutput += `</div>`
            }
            else {
                blogHTMLOutput += `<div class="pcg-img-row" style="grid-template-columns: repeat(${imgIdx.length}, 1fr);">`
                imgIdx.forEach((imgIdx2) => {
                    blogHTMLOutput += `<img src="${p.images[imgIdx2].src}" alt="${p.images[imgIdx2].alt}">`
                });
                blogHTMLOutput += `</div>`
            }
        })
        blogHTMLOutput += `</div>`
    });

    refHTML = '<div class="pcg-section" id="s-resources">'
    refHTML += '<h2 class="pcg-section-heading">Resources</h2><div class="pcg-resources">'
    let useRef = false
    p.refs.forEach(element => {
        useRef = true
        refHTML += `<a href="${element.link}" target="_blank" rel="noopener" class="pcg-resource-link">`
        refHTML += `<span>${element.text}</span><span>↗</span>`
    });
    refHTML += "</div></div>"
    
    if(useRef)
    {
        blogHTMLOutput += refHTML
    }

    blogHTMLOutput += `</div>`
    return blogHTMLOutput
}