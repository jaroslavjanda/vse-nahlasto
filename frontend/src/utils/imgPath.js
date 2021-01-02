export const imgPath = (type, path) => {
  return path
    ? `http://dev.backend.team07.vse.handson.pro/static/images/uploads/${type}/${path}`
    : 'https://prazska.drbna.cz/files/drbna/images/page/2020/07/10/size4-15943884430361-241-105212608-3020232741357677-2709616158246803003-o.jpg';
  //return path? `http://localhost:4000/static/images/uploads/${type}/${path}` : "https://picsum.photos/180/100"
};
