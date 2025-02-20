import { TChat, TMessage } from "../types/";

let request: IDBOpenDBRequest;
let db: IDBDatabase;

export enum Stores {
  Chats = "chats",
  Messages = "messages",
}


export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Open the connection
    const request = indexedDB.open('chats_data');

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result; // Use event.target.result instead of request.result

      // If the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Chats)) {
        console.log('Creating chats store');
        db.createObjectStore(Stores.Chats, { autoIncrement: true, keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(Stores.Messages)) {
        console.log('Creating messages store');
        const store = db.createObjectStore(Stores.Messages, { autoIncrement: true, keyPath: 'id' });
        store.createIndex('chat_id', 'chat_id', { unique: false });
      }
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result; // Use event.target.result
      console.log('request.onsuccess - initDB', db.version);
      resolve(true);
    };

    request.onerror = (event: Event) => {
      console.error('Error opening database:', (event.target as IDBOpenDBRequest).error);
      resolve(false);
    };
  });
};

export const add = (storeName: string, data: TChat|TMessage) => {
  return new Promise(resolve => {
    request = indexedDB.open('chats_data');

    request.onsuccess = () => {
      console.log('Storing data in ', storeName);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    }

    request.onerror = () => {
      const error = request.error?.message;
      if(error){
        resolve(error);
      }else {
        resolve('Failed due to unknown error!');
      }
    }
  });
}

export const list  = (storeName: string) => {
  return new Promise( (resolve) => {
    request = indexedDB.open('chats_data');

    request.onsuccess = () => {
      console.log('Retrieving data...');
      db = request.result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.getAll();

      res.onsuccess = () => {
        resolve(res.result);
      };
    }
  });
}

export const getMessages = (id: number) => {
  return new Promise(resolve => {
    request = indexedDB.open('chats_data');

    request.onsuccess = () => {
      console.log('Retrieving chat messages...');
      db = request.result;
      const tx = db.transaction(Stores.Messages, 'readonly');
      const store = tx.objectStore(Stores.Messages);
      const index = store.index('chat_id');

      const req = index.getAll(id);

      req.onsuccess = function(event: Event) {
        const messages = (event.target as IDBRequest<TMessage[]>).result;
        console.log(`Messages with chat_id ${id} retrieved successfully`);
        resolve(messages);
      };

      req.onerror = ( event: Event ) => {
        console.error('Failed to query messages: ', (event.target as IDBRequest).error);
      }
    }
  });
}
