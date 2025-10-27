
        // Initialize EmailJS (use your public key)
        (function(){ 
            emailjs.init("5fFjsmWwmEgEjzfCs"); 
        })();

        // Projects array
      const projects = [ 

    {
        projectId: "ML001",
        image: "/images/Project/ML001.png",
        tags: ["Flask","Python","Machine Learning"],
        name: "Diabetes Predictor App",
        description: "A Flask-based machine learning web app that predicts diabetes risk using health parameters like glucose, BMI, and blood pressure.",
        originalPrice: 2000,
        discount: 15,
        demoVideoLink: "https://drive.google.com/file/d/1HkBsELI0N9g25BM-r08_vNRDJLT3SW82/view?usp=sharing",
        language: "Python"
    }
];


        const projectsContainer = document.getElementById("projectsContainer");
        const projectSelect = document.getElementById("projectName");
        const contactForm = document.getElementById("contactForm");
        const demoModalEl = document.getElementById("demoModal");
        const demoModal = new bootstrap.Modal(demoModalEl);
        const searchInput = document.getElementById("searchInput");
        const languageFilter = document.getElementById("languageFilter");
        const searchBtn = document.getElementById("searchBtn");
        const categoryButtons = document.querySelectorAll(".btn-category");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const paginationNumbers = document.getElementById("paginationNumbers");
        const projectCount = document.getElementById("projectCount");

        let currentFilter = "all";
        let currentPage = 1;
        const perPage = 6;

        // Render projects with pagination
        function renderProjects(filteredProjects) {
            projectsContainer.innerHTML = "";
            const start = (currentPage - 1) * perPage;
            const end = start + perPage;
            const paginated = filteredProjects.slice(start, end);

            if (paginated.length === 0) {
                projectsContainer.innerHTML = `<p class="text-center text-muted">No projects found.</p>`;
                paginationNumbers.innerHTML = "";
                projectCount.textContent = "";
                return;
            }

paginated.forEach((p) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col-lg-4 col-md-6 col-12 mb-4";

    cardDiv.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${p.image}" class="card-img-top" alt="${p.name}" style="height:200px; object-fit:cover;">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${p.name}</h5>
                <div class="mb-2">
    ${p.tags.map(tag => `<span class="badge badge-parrot me-1" style="font-size: 1rem; padding: 0.45rem 0.75rem;">${tag}</span>`).join('')}
</div>

                <p class="card-text flex-grow-1">${p.description}</p>
                
                <div class="d-flex gap-2 mt-3">
                    <!-- Email Icon Button -->
                    <button class="btn w-50 request-email-btn"
                            style="background-color:#f2cc8f; color:#000; border:none; transition:0.3s;"
                            onmouseover="this.style.backgroundColor='#e07a5f'; this.style.color='#fff';"
                            onmouseout="this.style.backgroundColor='#f2cc8f'; this.style.color='#000';"
                            data-bs-toggle="modal"
                            data-bs-target="#demoModal"
                            data-project-id="${p.projectId}"
                            data-project-name="${p.name}"
                            data-project-index="${projects.indexOf(p)}"
                            title="Request Demo via Email">
                        <i class="bi bi-envelope-fill"></i> Email
                    </button>

                    <!-- WhatsApp Button -->
 <a href="https://wa.me/9491084767?text=${encodeURIComponent(`Hi, I want more details on this project: ${p.name} (${p.projectId})`)}"
   target="_blank"
   class="btn w-50"
   style="background-color:#f2cc8f; color:#000; border:none; transition:0.3s; display:flex; justify-content:center; align-items:center;"
   onmouseover="this.style.backgroundColor='#e07a5f'; this.style.color='#fff';"
   onmouseout="this.style.backgroundColor='#f2cc8f'; this.style.color='#000';"
   title="Contact via WhatsApp">
    <i class="bi bi-whatsapp"></i> WhatsApp
</a>


                </div>
            </div>
        </div>
    `;

    projectsContainer.appendChild(cardDiv);
});




            updatePagination(filteredProjects.length);
        }

        function updatePagination(totalItems) {
            paginationNumbers.innerHTML = "";
            const totalPages = Math.ceil(totalItems / perPage);

            projectCount.textContent = `Showing page ${currentPage} of ${totalPages} | Total Projects: ${totalItems}`;

            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;

            // Create first page button
            if (totalPages > 1) {
                const firstBtn = document.createElement("button");
                firstBtn.textContent = 1;
                firstBtn.className = "btn btn-sm mx-1 pagination-btn " + (1 === currentPage ? "text-white" : "btn-outline-secondary");
                firstBtn.style.backgroundColor = 1 === currentPage ? "#e07a5f" : "";
                firstBtn.addEventListener("click", () => {
                    currentPage = 1;
                    renderProjects(getFilteredProjects());
                });
                paginationNumbers.appendChild(firstBtn);
            }

            // Add ellipsis if needed (when current page is beyond page 4)
            if (currentPage > 4) {
                const ellipsis = document.createElement("span");
                ellipsis.textContent = "...";
                ellipsis.className = "mx-1 pagination-ellipsis";
                paginationNumbers.appendChild(ellipsis);
            }

            // Determine which page numbers to show
            let startPage = Math.max(2, currentPage - 2);
            let endPage = Math.min(totalPages - 1, currentPage + 2);

            // Adjust if we're near the beginning
            if (currentPage <= 4) {
                endPage = Math.min(totalPages - 1, 5);
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 3) {
                startPage = Math.max(2, totalPages - 4);
            }

            // Create page number buttons
            for (let i = startPage; i <= endPage; i++) {
                // Skip if we're showing first or last page separately
                if (i === 1 || i === totalPages) continue;
                
                const btn = document.createElement("button");
                btn.textContent = i;
                btn.className = "btn btn-sm mx-1 pagination-btn " + (i === currentPage ? "text-white" : "btn-outline-secondary");
                btn.style.backgroundColor = i === currentPage ? "#e07a5f" : "";
                btn.addEventListener("click", () => {
                    currentPage = i;
                    renderProjects(getFilteredProjects());
                });
                paginationNumbers.appendChild(btn);
            }

            // Add ellipsis if needed (when there are pages between endPage and last page)
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement("span");
                ellipsis.textContent = "...";
                ellipsis.className = "mx-1 pagination-ellipsis";
                paginationNumbers.appendChild(ellipsis);
            }

            // Create last page button if there's more than one page
            if (totalPages > 1) {
                const lastBtn = document.createElement("button");
                lastBtn.textContent = totalPages;
                lastBtn.className = "btn btn-sm mx-1 pagination-btn " + (totalPages === currentPage ? "text-white" : "btn-outline-secondary");
                lastBtn.style.backgroundColor = totalPages === currentPage ? "#e07a5f" : "";
                lastBtn.addEventListener("click", () => {
                    currentPage = totalPages;
                    renderProjects(getFilteredProjects());
                });
                paginationNumbers.appendChild(lastBtn);
            }
        }

        function getFilteredProjects() {
            let filtered = projects;

            // Apply category filter
            if (currentFilter !== "all") {
                filtered = filtered.filter(p =>
                    p.language.toLowerCase().includes(currentFilter.toLowerCase()) ||
                    p.tags.some(tag => tag.toLowerCase() === currentFilter.toLowerCase())
                );
            }

            // Apply search + dropdown filters
            const searchValue = searchInput.value.trim().toLowerCase();
            const typeValue = languageFilter.value.trim().toLowerCase();

            if (searchValue) {
                filtered = filtered.filter(p => p.name.toLowerCase().includes(searchValue));
            }
            if (typeValue) {
                filtered = filtered.filter(p =>
                    p.language.toLowerCase().includes(typeValue) ||
                    p.tags.some(tag => tag.toLowerCase() === typeValue)
                );
            }

            return filtered;
        }

        // Populate dropdown with project options
        function populateProjectDropdown() {
            projectSelect.innerHTML = '<option value="">Select a project</option>';
            projects.forEach((p, idx) => {
                const option = document.createElement("option");
                option.value = String(idx);
                option.textContent = p.name;
                projectSelect.appendChild(option);
            });
        }

        // When modal opens, read data-project-index from the triggering button and set dropdown
        demoModalEl.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            if (!button) return;
            const projectIndex = button.getAttribute('data-project-index');
            if (projectIndex !== null) {
                projectSelect.value = projectIndex;
            }
        });

        // Handle form submit
        contactForm.addEventListener("submit", function(e){
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(contactForm));
            // projectName holds the index (string). Convert to number.
            const projectIdx = Number(formData.projectName);
            const project = projects[projectIdx];

            if (!project) {
                alert("Please select a valid project.");
                return;
            }

            // Send to Team (no .then purposely, we do both)
            emailjs.send("service_mi80889","template_hepkq4r",{
                user_name: formData.name,
                user_phone: formData.phone,
                user_email: formData.email,
                project_name: project.name
            }).catch(err => console.error("Team email failed:", err));

            // Send to User
            emailjs.send("service_mi80889","template_vewvt36",{
                user_name: formData.name,
                user_email: formData.email,
                project_name: project.name,
                demo_video_link: project.demoVideoLink,
                language: project.language,
                original_price: project.originalPrice,
                discount: project.discount
            }).then(()=> {
                alert(`✅ Demo link sent to ${formData.email} for ${project.name}`);
                demoModal.hide();
                contactForm.reset();
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }).catch(err => {
                console.error("User email failed:", err);
                alert("❌ Failed to send email, try again later.");
            });
        });

        // Category button click logic
        categoryButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                categoryButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentFilter = btn.dataset.filter;
                currentPage = 1;
                searchInput.value = "";
                languageFilter.selectedIndex = 0;
                renderProjects(getFilteredProjects());
            });
        });

        // Search button logic
        searchBtn.addEventListener("click", () => {
            currentPage = 1;
            renderProjects(getFilteredProjects());
        });

        // Enter key in search input
        searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                currentPage = 1;
                renderProjects(getFilteredProjects());
            }
        });

        // Pagination controls
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderProjects(getFilteredProjects());
            }
        });
        nextBtn.addEventListener("click", () => {
            const filtered = getFilteredProjects();
            if (currentPage * perPage < filtered.length) {
                currentPage++;
                renderProjects(filtered);
            }
        });

        // Initial load
        populateProjectDropdown();
        renderProjects(projects);
    













        // counter function code



  // Select all elements with class 'counter-display'
  const counters = document.querySelectorAll('.counter-display');
  const duration = 5000; // total animation time in milliseconds (5 seconds)

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target'); // get the final number
    let startTimestamp = null;

    function smoothCount(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;

      // easing function for smooth animation
      const easeOutQuad = (t) => t * (2 - t);
      const easedProgress = easeOutQuad(Math.min(progress / duration, 1));

      const current = Math.floor(easedProgress * target);
      counter.textContent = current + "+"; // add the "+" sign

      if (progress < duration) {
        requestAnimationFrame(smoothCount); // continue animation
      } else {
        counter.textContent = target + "+"; // ensure exact final number
      }
    }

    requestAnimationFrame(smoothCount); // start animation
  });
