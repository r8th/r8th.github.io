// Configuration: Add new projects here
const projects = [
    {
        id: "dungeoncrawl",
        title: "Dungeon Crawl",
        description: "A fast-paced dungeon crawler with procedural generation.",
        tags: ["Unity", "C#", "PC"],
        thumbnail: "Projects/DungeonCrawl/IMGs/SS_01.jpg",
        // Images and GIFs for the detail page
        gallery: [
            { type: "image", src: "Projects/DungeonCrawl/IMGs/SS_01.jpg" },
            { type: "image", src: "Projects/DungeonCrawl/IMGs/SS_02.jpg" },
            { type: "image", src: "Projects/DungeonCrawl/IMGs/SS_03.jpg" },
            { type: "gif", src: "Projects/DungeonCrawl/GIFs/GIF_01.gif" }
        ],
        fullDescription: `
            Dungeon Crawl is an action-packed RPG where players explore infinite procedural dungeons.
            
            Features:
            - Procedural level generation.
            - Dynamic lighting system.
            - Over 50 unique enemies.
        `
    },
    {
        id: "bmw-m3",
        title: "2003 BMW E46 M3",
        description: "High fidelity 3D model of the BMW E46 M3.",
        tags: ["3D Modelling", "Automotive"],
        thumbnail: "Projects/2003 BMW E46 M3/IMGs/rogrady_2003BMWe46M3_01.png",
        gallery: [
            { type: "image", src: "Projects/2003 BMW E46 M3/IMGs/rogrady_2003BMWe46M3_01.png" }
        ],
        fullDescription: `
            A highly detailed 3D render of the 2003 BMW E46 M3. Focus on realistic materials and lighting.
        `
    },
    {
        id: "white-pine",
        title: "Eastern White Pine Environment",
        description: "Realistic environment art showcasing eastern white pines.",
        tags: ["Environment Art", "Unreal Engine"],
        thumbnail: "Projects/Eastern White Pine Environment/IMGs/HighresScreenshot00028.png",
        gallery: [
            { type: "video", src: "Projects/Eastern White Pine Environment/VIDs/rogrady2_CHAR_Rigging_Animation.mp4" },
            { type: "image", src: "Projects/Eastern White Pine Environment/IMGs/HighresScreenshot00027.png" },
            { type: "image", src: "Projects/Eastern White Pine Environment/IMGs/HighresScreenshot00028.png" },
            { type: "image", src: "Projects/Eastern White Pine Environment/IMGs/rogrady2_CHAR_Rigging_Animation.png" }
        ],
        fullDescription: `
            Created an immersive forest environment featuring the Eastern White Pine.
            Includes a rigging animation demonstration.
        `
    },
    {
        id: "ottos-odyssey",
        title: "Otto's Odyssey",
        description: "An adventurous journey through stylized worlds.",
        tags: ["Game Dev", "Stylized"],
        thumbnail: "Projects/Otto's Odyssey/IMGs/HighresScreenshot00003.png",
        gallery: [
            { type: "image", src: "Projects/Otto's Odyssey/IMGs/HighresScreenshot00003.png" },
            { type: "image", src: "Projects/Otto's Odyssey/IMGs/HighresScreenshot00004.png" },
            { type: "image", src: "Projects/Otto's Odyssey/IMGs/HighresScreenshot00010.png" },
            { type: "image", src: "Projects/Otto's Odyssey/IMGs/modbashkit.png" }
        ],
        fullDescription: `
            Otto's Odyssey is a stylized adventure game. 
            Showcasing level design and prop modeling skills.
        `
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('project-grid');
    const detailContainer = document.getElementById('project-detail');

    if (projectGrid) {
        // We are on index.html
        renderProjectGrid();
    } else if (detailContainer) {
        // We are on project.html
        loadProjectDetail();
    } else if (document.getElementById('contact-form')) {
        // We are on contact.html
        setupContactForm();
    }
});

function setupContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const subject = `Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        const mailtoLink = `mailto:17rogrady@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    });
}

function renderProjectGrid() {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = projects.map(project => `
        <article class="project-card" onclick="window.location.href='project.html?id=${project.id}'">
            <img src="${project.thumbnail}" alt="${project.title}" class="card-image">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');
}

function loadProjectDetail() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        document.getElementById('project-detail').innerHTML = '<h2>Project not found</h2>';
        return;
    }

    // Set page title
    document.title = `${project.title} - My Portfolio`;

    // Populate content
    const container = document.getElementById('project-detail');

    // Generate gallery HTML
    const galleryHtml = project.gallery.map(item => {
        if (item.type === 'gif' || item.type === 'image') {
            return `<div class="gallery-item"><img src="${item.src}" alt="Project media"></div>`;
        } else if (item.type === 'video') {
            return `
                <div class="gallery-item">
                    <video controls>
                        <source src="${item.src}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>`;
        }
        return '';
    }).join('');

    container.innerHTML = `
        <a href="index.html" class="back-link">&larr; Back to Projects</a>
        
        <header class="detail-header">
            <h1>${project.title}</h1>
            <div class="project-info" style="max-width: 800px; margin: 1rem auto; text-align: center;">
                <p>${project.fullDescription.replace(/\n/g, '<br>')}</p>
            </div>
        </header>

        <div class="detail-gallery">
            ${galleryHtml}
        </div>
    `;
}

