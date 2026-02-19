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
            const response = await fetch('names.json');
            if (!response.ok) {
                throw new Error('Failed to load names.json');
            }
            const data = await response.json();

            // Map the actual keys from names.json to our namesData object
            if (data.male_first_200) {
                namesData.male = data.male_first_200;
            }
            if (data.female_first_200) {
                namesData.female = data.female_first_200;
            }

            // Handle unique names if they exist in the file
            if (data.male_unique) {
                namesData.male = namesData.male.concat(data.male_unique);
            }
            if (data.female_unique) {
                namesData.female = namesData.female.concat(data.female_unique);
            }

            // Initial generation
            generateNames();
        } catch (error) {
            console.error('Error loading names:', error);
            maleNameEl.textContent = 'Error';
            femaleNameEl.textContent = 'Error';

            // Fallback for demo purposes if file is empty/missing
            if (namesData.male.length === 0) {
                maleNameEl.textContent = 'Save names.json';
                femaleNameEl.textContent = 'to see names';
            }
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
