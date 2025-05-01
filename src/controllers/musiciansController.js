import musiciansService from "../services/musiciansService";

const getAuthToken = () => {
  return sessionStorage.getItem('authToken');
};

const getAllMusicians = async () => {
  const token = getAuthToken();
  try {
    const musiciansData = await musiciansService.getMusicians(token);
    return musiciansData;
  } catch (error) {
    console.error("Error fetching musicians:", error);
    throw error;
  }
};

const createMusician = async (musicianData) => {
  const token = getAuthToken();
  return await musiciansService.addMusician(musicianData, token);
};

const updateMusician = async (id, updatedData) => {
  const token = getAuthToken();
  return await musiciansService.editMusician(id, updatedData, token);
};

const removeMusician = async (id) => {
  const token = getAuthToken();
  return await musiciansService.deleteMusician(id, token);
};

const getMusicianById = async (id) => {
  const token = getAuthToken();
  try {
    const musician = await musiciansService.getMusicianById(id, token);
    const instruments = await musiciansService.getInstruments(token);

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

const getMusicianDetails = async (id) => {
  const token = getAuthToken();
  try {
    const musicianDetails = await musiciansService.getMusicianDetails(id, token);
    return musicianDetails;
  } catch (error) {
    console.error("Error fetching musician details with events:", error);
    throw error;
  }
};

const getInstruments = async () => {
  const token = getAuthToken();
  return await musiciansService.getInstruments(token);
};

const getPendingEvents = async () => {
  const token = getAuthToken();
  try {
      return await musiciansService.getPendingEvents(token);
  } catch (error) {
      console.error("Error fetching pending events:", error);
      throw error;
  }
};

const acceptEvent = async (eventId) => {
  const token = getAuthToken();
  try {
      return await musiciansService.acceptEvent(eventId, token);
  } catch (error) {
      console.error("Error accepting event:", error);
      throw error;
  }
};

const rejectEvent = async (eventId) => {
  const token = getAuthToken();
  try {
      return await musiciansService.rejectEvent(eventId, token);
  } catch (error) {
      console.error("Error rejecting event:", error);
      throw error;
  }
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
  getMusicianDetails,
  getInstruments,
  getPendingEvents,
  acceptEvent,
  rejectEvent,
  // createOrUpdateMusician,
};
