const STORAGE_KEY = 'art_gallery_data';

export const localStorageUtils = {
  // Сохранение данных
  saveData: (data: any) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Ошибка при сохранении в localStorage:', error);
    }
  },

  // Загрузка данных
  loadData: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Ошибка при загрузке из localStorage:', error);
      return null;
    }
  },

  // Очистка данных
  clearData: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Ошибка при очистке localStorage:', error);
    }
  }
};