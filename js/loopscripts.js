// Example: projects array
const projects = [
  {
    image: "/templatemo_587_tiya_golf_club/images/members/iplscoreprediction.png",
    tags: ["Python", "Flask", "Machine Learning"],
    name: "IPL Score Prediction",
    description: "Model + Web UI to predict IPL match scores.",
    originalPrice: 5000,
    discount: 20,
    demoVideoLink: "https://youtu.be/sample123",
    language: "Python"
  },
  {
    image: "/templatemo_587_tiya_golf_club/images/members/ecommerce.png",
    tags: ["ASP.NET", "C#", "MVC"],
    name: "E-Commerce Website",
    description: "Full-featured e-commerce platform with admin dashboard.",
    originalPrice: 8000,
    discount: 25,
    demoVideoLink: "https://youtu.be/sample456",
    language: "C#"
  }
];

// Containers
const projectsContainer = document.getElementById("projectsContainer");
const projectSelect = document.getElementById("projectSelect");

// ✅ Filter only Python projects
const pythonProjects = projects.filter(p => p.language === "Python");

pythonProjects.forEach((p, idx) => {
  // Card
  const cardDiv = document.createElement("div");
  cardDiv.className = "col-lg-4 col-md-6 col-12 mb-4";

  cardDiv.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${p.image}" class="card-img-top" alt="${p.name}" style="height:200px; object-fit:cover;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${p.name}</h5>
        <div class="mb-2">
          ${p.tags.map(tag => `<span class="badge badge-parrot me-1">${tag}</span>`).join('')}
        </div>
        <p class="card-text flex-grow-1">${p.description}</p>
        <button class="btn request-btn mt-auto"
                data-bs-toggle="modal"
                data-bs-target="#demoModal"
                data-project-index="${idx}">
          Request Demo
        </button>
      </div>
    </div>
  `;
  projectsContainer.appendChild(cardDiv);

  // Dropdown option (value is index)
  const option = document.createElement("option");
  option.value = String(idx);
  option.textContent = p.name;
  projectSelect.appendChild(option);
});
