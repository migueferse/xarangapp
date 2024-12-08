const scoresData = [
  { id: 1, name: 'Amparito Roca', pdfUrl: '/pdfs/amparito.pdf' },
  { id: 2, name: 'Tomás Ferrús', pdfUrl: '/pdfs/tomas.pdf' },
  { id: 3, name: 'Perez Barceló', pdfUrl: '/pdfs/barcelo.pdf' },
  { id: 4, name: 'Xabia', pdfUrl: '/pdfs/xabia.pdf' },
];

export const getScores = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(scoresData), 500);
  });
};

// export const getScores = async () => {
//   const response = await fetch('URL_API');
//   const data = await response.json();
//   return data;
// };