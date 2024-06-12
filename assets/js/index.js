

// Definimos una función asincrónica llamada getPosts que se ejecutará cuando se pulse el botón
async function getPosts() {
    // Usamos try-catch para manejar posibles errores durante la operación de fetch, forma de escribir el codigo que se acepte.
    try {
      // Hacemos una solicitud a la API usando fetch y esperamos su respuesta
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');

      
      // Verificamos si la respuesta no es correcta (status code no en el rango 200-299),tengo dudas siu despues del status 200 sigue siendo accesible. tengo que investigarlo.
      if (!response.ok) {
        // Si no es correcta, lanzamos un error con un mensaje específico, es importante destacar que segun lo estudiado, trow new error es muy utilizado en los manejos de errores, y tengo entendido que es una buena practica
        throw new Error('Hay un error en la llamada de la api ' + response.statusText);
      }
      

      // Convertimos la respuesta en un objeto JavaScript (parseando el JSON) y esperamos a que se complete, es importante cambiarlo a un formato json para una mejor legibilidad. segun el profesor es importante colocar el await para esperar la respuesta de la api y tenga un correcto funcionamiento.
      const data = await response.json();
      
      // Llamamos a la función displayPosts para mostrar los datos en la página
      displayPosts(data);

    } catch (error) {
      // Si hay un error en cualquier parte del bloque try, lo capturamos aquí
      console.error('hay un problema con esta operacion :', error);
      
      // Mostramos el mensaje de error en el contenedor con id 'post-data'
      document.getElementById('post-data').innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
  
  // Definimos la función displayPosts que toma un array de posts como argumento
  function displayPosts(posts) {
    // Obtenemos el contenedor donde se mostrarán los posts
    const postContainer = document.getElementById('post-data');
    
    // Creamos un elemento de lista desordenada (ul)
    const ul = document.createElement('ul');
    
    // Iteramos sobre cada post en el array de posts
    posts.forEach(post => {
      // Por cada post, creamos un elemento de lista (li)
      const li = document.createElement('li');
      
      // Establecemos el texto del li con el título y el cuerpo del post
      li.textContent = `Title: ${post.title}, Body: ${post.body}`;
      
      // Añadimos el li al ul
      ul.appendChild(li);
    });
  
    // Limpiamos cualquier contenido previo en el contenedor de posts, de esta forma aseguramos que si se da click varias veces no sigan saliendo
      postContainer.innerHTML = '';
    
    // Añadimos el ul con todos los posts al contenedor de posts
    postContainer.appendChild(ul);
  }