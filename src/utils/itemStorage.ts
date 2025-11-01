import type { Item } from "@/types/Item";

const STORAGE_KEY = "exchangeShopItems";

export const loadItemsFromStorage = (): Item[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((item: any) => ({
      ...item,
      price: BigInt(item.price),
    }));
  } catch (error) {
    console.error("Error loading items from storage:", error);
    return [];
  }
};

export const saveItemsToStorage = (items: Item[]): void => {
  try {
    const itemsToStore = items.map((item) => ({
      ...item,
      price: item.price.toString(),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsToStore));
  } catch (error) {
    console.error("Error saving items to storage:", error);
  }
};

export const addItemToStorage = (item: Omit<Item, "id">): Item => {
  const items = loadItemsFromStorage();
  const maxId = items.length > 0 ? Math.max(...items.map((i) => i.id)) : -1;
  const newItem = { ...item, id: maxId + 1 };
  saveItemsToStorage([...items, newItem]);
  return newItem;
};

export const updateItemInStorage = (updatedItem: Item): void => {
  const items = loadItemsFromStorage();
  const updatedItems = items.map((item) =>
    item.id === updatedItem.id ? updatedItem : item
  );
  saveItemsToStorage(updatedItems);
};

export const deleteItemFromStorage = (itemId: number): void => {
  const items = loadItemsFromStorage();
  const filteredItems = items.filter((item) => item.id !== itemId);
  saveItemsToStorage(filteredItems);
};
