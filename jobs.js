document.addEventListener('DOMContentLoaded', () => {
    const jobTitleEl = document.getElementById('job-title');
    const jobCategoryEl = document.getElementById('job-category');
    const jobWealthEl = document.getElementById('job-wealth');
    const generateBtn = document.getElementById('generate-btn');

    let jobsData = [];

    // Load jobs from JSON
    async function loadJobs() {
        try {
            const response = await fetch('job_categories_mixed.json');
            if (!response.ok) {
                throw new Error('Failed to load job_categories_mixed.json');
            }
            const data = await response.json();

            jobsData = data;

            // Initial generation
            generateJob();
        } catch (error) {
            console.error('Error loading job categories:', error);
            jobTitleEl.textContent = 'Error loading data';
        }
    }

    function generateJob() {
        if (jobsData.length > 0) {
            const randomIndex = Math.floor(Math.random() * jobsData.length);
            const job = jobsData[randomIndex];

            jobTitleEl.textContent = job.title;
            jobCategoryEl.textContent = job.category;
            jobWealthEl.textContent = job.wealth_potential;
        } else {
            jobTitleEl.textContent = '---';
        }
    }

    generateBtn.addEventListener('click', () => {
        // Add a small animation effect on click
        generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            generateBtn.style.transform = '';
            generateJob();
        }, 100);
    });

    loadJobs();
});
