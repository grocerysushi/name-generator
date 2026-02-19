document.addEventListener('DOMContentLoaded', () => {
    const maleNameEl = document.getElementById('male-name');
    const femaleNameEl = document.getElementById('female-name');
    const generateBtn = document.getElementById('generate-btn');

    let namesData = {
        male: [],
        female: []
    };

    // Load names from JSON
    async function loadNames() {
        try {
            const response = await fetch('2000_fantasy_names.json');
            if (!response.ok) {
                throw new Error('Failed to load 2000_fantasy_names.json');
            }
            const data = await response.json();

            // Use the keys found in the fantasy JSON file
            if (data.fantasy_male_names) {
                namesData.male = data.fantasy_male_names;
            }
            if (data.fantasy_female_names) {
                namesData.female = data.fantasy_female_names;
            }

            // Initial generation
            generateNames();
        } catch (error) {
            console.error('Error loading fantasy names:', error);
            maleNameEl.textContent = 'Error';
            femaleNameEl.textContent = 'Error';
        }
    }

    function getRandomName(list) {
        if (!list || list.length === 0) return '---';
        return list[Math.floor(Math.random() * list.length)];
    }

    function generateNames() {
        if (namesData.male.length > 0 || namesData.female.length > 0) {
            maleNameEl.textContent = getRandomName(namesData.male);
            femaleNameEl.textContent = getRandomName(namesData.female);
        }
    }

    generateBtn.addEventListener('click', () => {
        // Add a small animation effect on click
        generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            generateBtn.style.transform = '';
            generateNames();
        }, 100);
    });

    loadNames();
});
