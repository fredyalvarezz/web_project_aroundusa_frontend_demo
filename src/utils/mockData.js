export const mockUser = {
  _id: "demo-user",
  name: "Fredy Alvarez",
  about: "Desarrollador Web Junior",
  avatar: "https://i.imgur.com/8RKXAIV.png",
};

export const mockCards = [
  {
    _id: "1",
    name: "Yosemite Valley",
    link: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    owner: { _id: "demo-user" },
    likes: [],
  },
  {
    _id: "2",
    name: "Lake Louise",
    link: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    owner: { _id: "demo-user" },
    likes: [],
  },
];
