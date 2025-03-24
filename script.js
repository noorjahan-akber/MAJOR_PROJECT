document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const trailName = urlParams.get("trail");

    if (!trailName) {
        document.getElementById("trail-name").textContent = "Trail Not Found";
        return;
    }

    fetch("trails.json")
        .then(response => response.json())
        .then(trailsData => {
            console.log("Fetched Data:", trailsData); // Debugging step
            console.log("Requested Trail:", trailName);

            const trail = trailsData[trailName];

            if (trail) {
                // Update title and info
                document.getElementById("trail-name").textContent = trail.name;
                document.getElementById("trail-info").textContent = 
                    `${trail.rating} • ${trail.difficulty} • ${trail.distance} • ${trail.time}`;
                document.getElementById("trail-description").textContent = trail.description;

                // Update images
                const imagesContainer = document.getElementById("trail-images");
imagesContainer.innerHTML = "";
trail.images.forEach(imgSrc => {
    let img = document.createElement("img");
    img.src = imgSrc;  // Directly use the filename
    img.alt = trail.name;
    imagesContainer.appendChild(img);
});

                // Update highlights
                const highlightsContainer = document.getElementById("trail-highlights");
                highlightsContainer.innerHTML = "";
                trail.highlights.forEach(highlight => {
                    let li = document.createElement("li");
                    li.textContent = highlight;
                    highlightsContainer.appendChild(li);
                });

            } else {
                document.getElementById("trail-name").textContent = "Trail Not Found";
            }
        })
        .catch(error => console.error("Error fetching trail data:", error));
});
