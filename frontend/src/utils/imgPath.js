export const imgPath = (type, path) => {
  return path
    ? `http://dev.backend.team07.vse.handson.pro/static/images/uploads/${type}/${path}`
    : 'https://picsum.photos/180/100';
  //return path? `http://localhost:4000/static/images/uploads/${type}/${path}` : "https://picsum.photos/180/100"
};
