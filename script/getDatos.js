export const getDatos = () => {
  const form = document.querySelector(".generateCurp");
  const data = new FormData(form);

  return {
    nombre: data.get("nombre"),
    apellidoPaterno: data.get("apellidoPaterno"),
    apellidoMaterno: data.get("apellidoMaterno"),
    fechaNacimiento: data.get("fechaNacimiento"),
    gender: data.get("gender"),
    estado: data.get("entidadFederativa"),
  };
};
