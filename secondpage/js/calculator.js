document.addEventListener('DOMContentLoaded', function () {

    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
    }

    const themeButton = document.getElementById('bubu');
    if (themeButton) {
        themeButton.addEventListener('click', function (event) {
            event.preventDefault();
            toggleTheme();
        });
    }

    applySavedTheme();


    // ===== CALCULATOR =====
    const calculateButton = document.getElementById('calculate-button');

    if (calculateButton) {
        calculateButton.addEventListener('click', function () {

            const fromCity = document.getElementById('from-city')?.value;
            const toCity = document.getElementById('to-city')?.value;
            const result = document.getElementById('result');

            if (!fromCity || !toCity || !result) return;

            if (fromCity === toCity) {
                result.textContent = 'You are already in the selected city!';
                return;
            }

            const travelCosts = {
                irkutsk: { bratsk: 1200, angarsk: 300, listvyanka: 500 },
                bratsk: { irkutsk: 1200, angarsk: 1500, listvyanka: 1700 },
                angarsk: { irkutsk: 300, bratsk: 1500, listvyanka: 600 },
                listvyanka: { irkutsk: 500, bratsk: 1700, angarsk: 600 }
            };

            const cost = travelCosts[fromCity]?.[toCity];

            if (cost === undefined) {
                result.textContent = 'Route not found.';
                return;
            }

            result.textContent = `The travel cost from ${capitalize(fromCity)} to ${capitalize(toCity)} is ${cost} rubles.`;
        });
    }


    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

});