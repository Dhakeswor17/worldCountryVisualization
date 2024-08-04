// Fetch country data and store it globally
let countriesData = [];

fetch('https://restcountries.com/v2/all')
    .then(res => res.json())
    .then(data => {
        countriesData = data;
        // Display the default view (e.g., most populated) on initial load
        sortAndDisplay('population');
    });

const displayCountries = (countries, criteria) => {
    let container = document.getElementById('container');
    container.innerHTML = ''; // Clear previous content

    countries.forEach(items => {
        let countryNames = items.name;
        let population = items.population;
        let languages = items.languages.length;

        let div = document.createElement('div');
        div.className = 'countriesList';

        let countryNameDiv = document.createElement('div');
        countryNameDiv.className = 'countryName';
        countryNameDiv.textContent = countryNames;

        let nastedDiv = document.createElement('div');
        nastedDiv.className = 'nastedClass';
        if (criteria === 'population') {
            nastedDiv.style.width = population * 0.000001 + 'px';
            nastedDiv.textContent = population;
        } else if (criteria === 'languages') {
            nastedDiv.style.width = languages * 20 + 'px';
            nastedDiv.textContent = languages;
        }

        // Append the country name and nested div to the main div
        div.appendChild(countryNameDiv);
        div.appendChild(nastedDiv);

        // Finally, append the main div to the container
        container.appendChild(div);
    });
};

const sortAndDisplay = (criteria) => {
    let sortedCountries = [...countriesData]; // Create a copy of the countries data
    if (criteria === 'population') {
        sortedCountries.sort((a, b) => b.population - a.population);
    } else if (criteria === 'languages') {
        sortedCountries.sort((a, b) => b.languages.length - a.languages.length);
    }

    displayCountries(sortedCountries.slice(0, 10), criteria); // Display top 10 countries based on the criteria
};

document.getElementById('populated').addEventListener('click', () => {
    document.getElementById('countries').innerText = 'populated';
    sortAndDisplay('population');
});

document.getElementById('spoken').addEventListener('click', () => {
    document.getElementById('countries').innerText = 'languages spoken';
    sortAndDisplay('languages');
});
