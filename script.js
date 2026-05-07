document.addEventListener("DOMContentLoaded", function () {

    // Fill footer
    const footer = document.getElementById("footer");
    if (footer) {
        footer.innerHTML = `
            <div class="info">
                <b>BLANTO PROJECTS SCHRIJNWERKERIJ</b>
                |
                <a href="https://www.google.com/maps/place/Mechelbaan+64,+2861+Sint-Katelijne-Waver/@51.0560242,4.5611745,988m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47c3e373b0f79d9f:0xc47afb7d5dd05a42!8m2!3d51.0560242!4d4.5637548!16s%2Fg%2F11crx65l1h?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">Mechelbaan 64 - 2861 OLV-Waver</a>
                |
                <a href="mailto:info@blanto.be">info@blanto.be</a>
                |
                BE 0694 797 934
            </div>
        `;
    }

    // Mobile menu toggle
    const menuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", function () {
            mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
        });

        mobileMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mobileMenu.style.display = "none";
            });
        });
    }

    // Lightbox for gallery pages
    const galleryPage = document.querySelector(".gallery-page");
    if (galleryPage) {
        const lightbox = document.createElement("div");
        lightbox.id = "lightbox";
        lightbox.innerHTML = `
            <button id="lightbox-close">&#x2715;</button>
            <button id="lightbox-prev">&#x2039;</button>
            <img id="lightbox-img" src="" alt="">
            <button id="lightbox-next">&#x203A;</button>
            <button id="lightbox-rotate" title="Draaien">&#x21BB;</button>
        `;
        document.body.appendChild(lightbox);

        const lb         = document.getElementById("lightbox");
        const lbImg      = document.getElementById("lightbox-img");
        const lbClose    = document.getElementById("lightbox-close");
        const lbPrev     = document.getElementById("lightbox-prev");
        const lbNext     = document.getElementById("lightbox-next");
        const lbRotate   = document.getElementById("lightbox-rotate");

        const imgs = Array.from(galleryPage.querySelectorAll("img"));
        let current = 0;

        // Store per-image rotation (in degrees) so it persists while browsing
        const rotations = new Array(imgs.length).fill(0);

        function applyRotation() {
            const deg = rotations[current];
            lbImg.style.transform = `rotate(${deg}deg)`;
            // When portrait (90/270°), scale down so it fits the viewport
            const isPortrait = deg % 180 !== 0;
            lbImg.style.maxWidth  = isPortrait ? "90vh" : "90vw";
            lbImg.style.maxHeight = isPortrait ? "90vw" : "90vh";
        }

        function openAt(index) {
            current = index;
            lbImg.src = imgs[current].src;
            applyRotation();
            lb.classList.add("open");
        }

        imgs.forEach((img, i) => img.addEventListener("click", () => openAt(i)));

        lbClose.addEventListener("click", () => lb.classList.remove("open"));
        lb.addEventListener("click", (e) => { if (e.target === lb) lb.classList.remove("open"); });

        lbPrev.addEventListener("click", () => openAt((current - 1 + imgs.length) % imgs.length));
        lbNext.addEventListener("click", () => openAt((current + 1) % imgs.length));

        lbRotate.addEventListener("click", () => {
            rotations[current] = (rotations[current] + 90) % 360;
            applyRotation();
        });

        document.addEventListener("keydown", (e) => {
            if (!lb.classList.contains("open")) return;
            if (e.key === "ArrowLeft")  lbPrev.click();
            if (e.key === "ArrowRight") lbNext.click();
            if (e.key === "Escape")     lb.classList.remove("open");
            if (e.key === "r")          lbRotate.click();
        });
    }

});
