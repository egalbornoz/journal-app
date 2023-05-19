export const fileUpload = async (file) => {
  if (!file) throw new Error("No hay archivos para subir");
  const cloudUrl = " https://api.cloudinary.com/v1_1/drptumuxg/upload";

  const formData = new FormData();

  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    //Si hay error
    if (!resp.ok) throw new Error("No se pudo subir la imagen");

    // Serializamos el body(la imagen)

    const cloudResp = await resp.json();

    // se retorna la url de la imagen
    return cloudResp.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
