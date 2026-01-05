import { mockUser, mockCards } from "./mockData";

class Api {
  getUserInfo() {
    return Promise.resolve(mockUser);
  }

  getInitialCards() {
    return Promise.resolve(mockCards);
  }

  setUserInfo({ name, about }) {
    return Promise.resolve({ ...mockUser, name, about });
  }

  setAvatar({ avatar }) {
    return Promise.resolve({ ...mockUser, avatar });
  }

  addCard({ name, link }) {
    return Promise.resolve({
      _id: Date.now().toString(),
      name,
      link,
      owner: { _id: "demo-user" },
      likes: [],
    });
  }

  deleteCard() {
    return Promise.resolve();
  }

  changeLikeCardStatus(cardId, like) {
    return Promise.resolve();
  }
}

const api = new Api();
export default api;
