let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export enum Stores {
  Chats = "chats",
  Messages = "messages",
}


export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open('chats_data');

    request.onupgradeneeded = () => {
      db = request.result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Chats)) {
        console.log('Creating chats store');
        db.createObjectStore(Stores.Chats, { autoIncrement: true, keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(Stores.Messages)) {
        console.log('Creating messages store');
        db.createObjectStore(Stores.Messages, { autoIncrement: true, keyPath: 'id' });
      }
      // no need to resolve here
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      console.log('request.onsuccess - initDB', version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};
