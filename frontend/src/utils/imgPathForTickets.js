export const imgPathForTicket = (type, path) => {
  return path
    ? //? `http://localhost:4000/static/images/uploads/${type}/${path}`
      `http://dev.backend.team07.vse.handson.pro/static/images/uploads/${type}/${path}`
    : 'https://warengo.gumlet.net/media/statuses/d0470d80-d80a-42c4-a492-9d6f61f146e1.jpg?w=640&h=320&mode=crop&s=cad5146217a8240eb34295051b5c8ff7';
};
