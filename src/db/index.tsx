<Bimport { TChat, TMessage } from "../types/";

let db: IDBDatabase | null = null;

export enum Stores {
  Chats = "chats",
  Messages = "messages",
}

// ✅ Open database once and reuse it
export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("chats_data");

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(Stores.Chats)) {
        console.log("Creating chats store");
        db.createObjectStore(Stores.Chats, { autoIncrement: true, keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(Stores.Messages)) {
        console.log("Creating messages store");
        const store = db.createObjectStore(Stores.Messages, { autoIncrement: true, keyPath: "id" });
        store.createIndex("chat_id", "chat_id", { unique: false });
      }
    };

    request.onsuccess = (event: Event) => {
      db = (event.target as IDBOpenDBRequest).result;
      console.log("Database initialized");
      resolve(true);
    };

    request.onerror = () => {
      console.error("Error opening database:", request.error);
      resolve(false);
    };
  });
};

// ✅ Ensure DB is ready before performing operations
const getDB = async (): Promise<IDBDatabase> => {
  if (db) return db;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open("chats_data");

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

// ✅ Reuse `getDB()` instead of opening DB again
export const add = async (storeName: string, data: TChat | TMessage) => {
  try {
    const db = await getDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.add(data);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(data);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to add data:", error);
    return error;
  }
};

export const list = async (storeName: string) => {
  try {
    const db = await getDB();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to list data:", error);
    return error;
  }
};

export const getMessages = async (id: number) => {
  try {
    const db = await getDB();
    const tx = db.transaction(Stores.Messages, "readonly");
    const store = tx.objectStore(Stores.Messages);
    const index = store.index("chat_id");
    const request = index.getAll(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    return error;
  }
};

