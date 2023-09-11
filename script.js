document.addEventListener('DOMContentLoaded', function () {


    // Función para cargar datos de un país específico
    async function loadCountryData(countryName) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            const data = await response.json();

            const countryList = document.getElementById('country-list');
            countryList.innerHTML = ''; // Limpiar la lista antes de agregar resultados

            if (data.status === 404) {
                const errorItem = document.createElement('li');
                errorItem.textContent = 'País no encontrado';
                countryList.appendChild(errorItem);
            } else {
                // Mostrar información del país
                data.forEach(country => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Nombre: ${country.name.common}, Capital: ${country.capital}, Población: ${country.population}`;
                    countryList.appendChild(listItem);
                });
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    }

    // Manejar la búsqueda cuando se envía el formulario
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const countryNameInput = document.getElementById('country-name');
        const countryName = countryNameInput.value.trim();

        if (countryName) {
            loadCountryData(countryName);
        }
    });

});