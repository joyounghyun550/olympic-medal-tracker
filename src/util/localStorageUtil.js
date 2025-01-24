export const STORAGE_KEYS = { COUNTRIES: "countriesEl" };

const localStorageUtil = {
  get(key) {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key, id) {
    const items = this.get(key).filter((item) => item.id !== id);
    this.set(key, items);
  },
  exists(key, id) {
    return this.get(key).some((item) => item.id === id);
  },
};

export default localStorageUtil;