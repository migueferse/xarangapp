const musicians = [
  { id: 1, name: "Miguel Ángel", lastName: "Fernández", nickname: "Migue", instrument: "Saxo Tenor", phone: "123456789", email: "migue@a.com" },
  { id: 2, name: "Jose Luis", lastName: "Dominguez", nickname: "Jose", instrument: "Caja", phone: "987654321", email: "jose@a.com" },
  { id: 3, name: "Raúl", lastName:"Sanz", nickname: "Diavolo", instrument: "Bombo", phone: "555555555", email: "raul@a.com"  },
];

const getMusicians = () => {
  return [...musicians];
};

const getMusicianById = (id) => {
  return musicians.find((musician) => musician.id === parseInt(id));
};

const addMusician = (newMusician) => {
  newMusician.id = musicians.length + 1;
  musicians.push(newMusician);
};

const editMusician = (id, updatedMusician) => {
  const index = musicians.findIndex((musician) => musician.id === id);
  if (index !== -1) {
    musicians[index] = { ...musicians[index], ...updatedMusician };
  }
};

const deleteMusician = (id) => {
  const index = musicians.findIndex((musician) => musician.id === id);
  if (index !== -1) {
    musicians.splice(index, 1);
  }
};

export default {
  getMusicians,
  getMusicianById,
  addMusician,
  editMusician,
  deleteMusician,
};
