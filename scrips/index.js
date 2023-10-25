// Realiza una solicitud para cargar el archivo JSON
fetch('https://openlibrary.org/works/OL45804W/editions.json')
    .then(response => response.json())
    .then(data => {
        // Obtén una referencia al contenedor de tarjetas dentro de sec2
        const scroller = document.querySelector("#sec2 .scroller");

        // Recorre los objetos en el JSON y actualiza los elementos HTML con los datos del JSON
        data.entries.forEach(item => {
            const tarjeta = document.querySelector(".tarjeta");

            // Actualiza el título del libro
            const titulo = tarjeta.querySelector(".titulo-tar");
            titulo.textContent = item.title;

            // Asegúrate de que haya autores en tu JSON y actualiza el nombre del autor si existe
            if (item.authors && item.authors.length > 0) {
                const nombreAutor = tarjeta.querySelector(".nombre-autor");
                nombreAutor.textContent = item.authors[0].name;
            }

            // Clona la tarjeta y agrega la tarjeta clonada al contenedor de scroller
            const tarjetaClon = tarjeta.cloneNode(true);
            scroller.appendChild(tarjetaClon);
        });
    })
    .catch(error => console.error("Error al cargar el archivo JSON: " + error));
