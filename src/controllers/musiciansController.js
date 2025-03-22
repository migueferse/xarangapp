import musiciansService from "../services/musiciansService";

const getAllMusicians = async () => {
  try {
    const musicians = await musiciansService.getMusicians();
    const instruments = await musiciansService.getInstruments();

    return musicians.map(musician => {
      const instrument = instruments.find(inst => inst.id === musician.instrument_id);
      return {
        ...musician,
        instrumentName: instrument ? instrument.name : "Sin instrumento"
      };
    });
  } catch (error) {
    console.error("Error fetching musicians:", error);
    throw error;
  }
};

const createMusician = async (musicianData) => {
  return await musiciansService.addMusician(musicianData);
};

const updateMusician = async (id, updatedData) => {
  return await musiciansService.editMusician(id, updatedData);
};

const removeMusician = async (id) => {
  return await musiciansService.deleteMusician(id);
};

const getMusicianById = async (id) => {
  try {
    const musician = await musiciansService.getMusicianById(id);
    const instruments = await musiciansService.getInstruments();

    if (musician) {
      const selectedInstrument = instruments.find(inst => inst.id === musician.instrument_id);
      return {
        ...musician,
        instrument_id: selectedInstrument ? selectedInstrument.id : "",
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching musician:", error);
    throw error;
  }
};

const getInstruments = async () => {
  return await musiciansService.getInstruments();
};

// const createOrUpdateMusician = async (musician) => {
//   try {
//     if (musician.id) {
//       await musiciansService.editMusician(musician.id, musician);
//       alert("Músico actualizado con éxito.");
//     } else {
//       await musiciansService.addMusician(musician);
//       alert("Nuevo músico creado con éxito.");
//     }
//   } catch (error) {
//     console.error("Error creando o actualizando músico:", error);
//   }
// }


export default {
  getAllMusicians,
  createMusician,
  updateMusician,
  removeMusician,
  getMusicianById,
  getInstruments,
  // createOrUpdateMusician,
};
