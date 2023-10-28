fetch('https://openlibrary.org/works/OL45804W/editions.json')
.then(response => response.json())
.then(data => {
    // Obtén una referencia al contenedor de tarjetas dentro de sec2
    const scroller = document.querySelector(".scroller");

    // Recorre los objetos en el JSON y actualiza los elementos HTML con los datos del JSON
    data.entries.forEach(item => {
        const tarjeta = document.querySelector(".tarjeta").cloneNode(true);

        // Actualiza el título del libro
        const titulo = tarjeta.querySelector(".titulo-tar");
        titulo.textContent = item.title;

        // Se asegura de que haya autores en tu JSON y actualiza el nombre del autor si existe
        if (item.authors && item.authors.length > 0) {
            const nombreAutor = tarjeta.querySelector(".nombre-autor");
            nombreAutor.textContent = item.authors[0].name;
        }

        // Agrega una imagen de portada a la tarjeta si existe la URL de la imagen en "covers"
        if (item.covers && item.covers.length > 0) {
            const coverID = item.covers[0];
            if (coverID) {
                const imagen = tarjeta.querySelector(".tarjeta-imagen");
                const coverURL = `https://covers.openlibrary.org/b/id/${coverID}-L.jpg`;
                imagen.src = coverURL;
            }
        }
            // Construye la URL de la página en Open Library utilizando la clave única
            const openLibraryURL = `https://openlibrary.org/works/${item.works[0].key}`;
            
            // Crea un enlace que rodea la tarjeta y apunta a la página del libro en Open Library
            const enlace = document.createElement("a");
            enlace.href = openLibraryURL;
            enlace.appendChild(tarjeta);

        // Agrega la tarjeta clonada al contenedor de scroller
        scroller.appendChild(tarjeta);
    });
})
.catch(error => console.error("Error al cargar el archivo JSON: " + error));
