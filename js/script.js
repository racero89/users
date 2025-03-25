const url = "https://jsonplaceholder.typicode.com/users";

function edadAleatoria() {
  return Math.floor(Math.random() * (60 - 18 + 1)) + 18;
}

function obtenerUsuarios() {
  fetch(url)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then((usuarios) => {
      const listaUsuarios = document.getElementById("listaUsuarios");
      listaUsuarios.innerHTML = "";

      const usuariosConDatos = usuarios.map((usuario) => ({
        ...usuario,
        age: edadAleatoria(),
        address: {
          city: "Madrid",
          country: "España",
        },
      }));

      usuariosConDatos.forEach((usuario) => {
        const li = document.createElement("li");
        li.textContent = `ID: ${usuario.id}, Nombre: ${usuario.name}, Edad: ${usuario.age}, Email: ${usuario.email}, Ciudad: ${usuario.address.city}, País: ${usuario.address.country}`;
        listaUsuarios.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error al obtener usuarios:", error);
      document.getElementById("listaUsuarios").innerHTML =
        "<li>Error al cargar usuarios</li>";
    });
}

obtenerUsuarios();
