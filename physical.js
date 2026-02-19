document.addEventListener('DOMContentLoaded', () => {
    const descriptionEl = document.getElementById('physical-description');
    const generateBtn = document.getElementById('generate-btn');

    let descriptions = [];

    // Load descriptions from JSON
    async function loadDescriptions() {
        try {
            const response = await fetch('random_physical_descriptions.json');
            if (!response.ok) {
                throw new Error('Failed to load random_physical_descriptions.json');
            }
            const data = await response.json();

            // The JSON is a simple array of objects with a "description" property
            descriptions = data.map(item => item.description);

            // Initial generation
            generateDescription();
        } catch (error) {
            console.error('Error loading physical descriptions:', error);
            descriptionEl.textContent = 'Error loading descriptions';
        }
    }

    function generateDescription() {
        if (descriptions.length > 0) {
            const randomIndex = Math.floor(Math.random() * descriptions.length);
            descriptionEl.textContent = descriptions[randomIndex];
        } else {
            descriptionEl.textContent = '---';
        }
    }

    generateBtn.addEventListener('click', () => {
        // Add a small animation effect on click
        generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            generateBtn.style.transform = '';
            generateDescription();
        }, 100);
    });

    loadDescriptions();
});
