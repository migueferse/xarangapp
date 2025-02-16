import musiciansService from "../services/musiciansService";

const getAllMusicians = () => {
  return musiciansService.getMusicians();
};

const createMusician = (musicianData) => {
  musiciansService.addMusician(musicianData);
};

const updateMusician = (id, updatedData) => {
  musiciansService.editMusician(id, updatedData);
};

const removeMusician = (id) => {
  musiciansService.deleteMusician(id);
};

const getMusicianById = (id) => {
  return musiciansService.getMusicianById(id);
};

const createOrUpdateMusician = (musician) => {
  if (musician.id) {
    musiciansService.editMusician(musician.id, musician)
    alert("Músico actualizado con éxito.");
  } else {
    musiciansService.addMusician(musician)
    alert("Nuevo músico creado con éxito.");
  }
}


export default {
  getAllMusicians,
  createMusician,
  updateMusician,
  removeMusician,
  getMusicianById,
  createOrUpdateMusician,
};
