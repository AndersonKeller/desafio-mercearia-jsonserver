//INSTANCIA DE UM NOVO DB
//CRIANDO UM NOVO DADO
export const newDb = indexedDB.open("database", 2, function (upgradeDb) {
    console.log("Creating a new object store.");
    if (!upgradeDb.objectStoreNames.contains("firstOS")) {
        upgradeDb.createObjectStore("firstOS");
    }
});
//createItemDb();
//createItemDb();
//EXEMPLO DE ADD UM ITEM

export function createItemDb() {
    const res = newDb
        .then(function (db) {
            const tx = db.transaction("store", "readwrite");
            const store = tx.objectStore("store");
            const item = {
                name: "sandwich",
                price: 4.99,
                description: "A very tasty sandwich",
                created: new Date().getTime(),
            };
            store.add(item);
            return tx.complete;
        })
        .then(function () {
            console.log("Added item to the store!");
        });
    return res;
}

/** newDb
    .then(function (db) {
        const tx = db.transaction("store", "readwrite");
        const store = tx.objectStore("store");
        const item = {
            name: "sandwich",
            price: 4.99,
            description: "A very tasty sandwich",
            created: new Date().getTime(),
        };
        store.add(item);
        return tx.complete;
    })
    .then(function () {
        console.log("Added item to the store!");
    });
//EXEMPLO DE UM GET ITEM
newDb
    .then(function (db) {
        const tx = db.transaction("store", "readonly");
        const store = tx.objectStore("store");
        return store.get("sandwich");
    })
    .then(function (val) {
        console.dir(val);
    });
// EXEMPLO DE UM PUT UPDATE
newDb
    .then(function (db) {
        const tx = db.transaction("store", "readwrite");
        const store = tx.objectStore("store");
        const item = {
            name: "sandwich",
            price: 99.99,
            description: "A very tasty, but quite expensive, sandwich",
            created: new Date().getTime(),
        };
        store.put(item);
        return tx.complete;
    })
    .then(function () {
        console.log("Item updated!");
    });
// DELETE
const key = "KEY";
newDb
    .then(function (db) {
        const tx = db.transaction("store", "readwrite");
        const store = tx.objectStore("store");
        store.delete(key);
        return tx.complete;
    })
    .then(function () {
        console.log("Item deleted.");
    });
//GET ALL
//Aqui você está chamando getAll()o "store"armazenamento de objetos. Isso retorna todos os objetos no armazenamento ordenados pela chave primária.
newDb
    .then(function (db) {
        const tx = db.transaction("store", "readonly");
        const store = tx.objectStore("store");
        return store.getAll();
    })
    .then(function (items) {
        console.log("Items by name:", items);
    });
// CURSOR, PERCORRE ITEM POR ITEM ATÉ RETORNAR UNDEFENIED
newDb
    .then(function (db) {
        const tx = db.transaction("store", "readonly");
        const store = tx.objectStore("store");
        return store.openCursor();
    })
    .then(function logItems(cursor) {
        if (!cursor) {
            return;
        }
        console.log("Cursored at:", cursor.key);
        for (const field in cursor.value) {
            console.log(cursor.value[field]);
        }
        return cursor.continue().then(logItems);
    })
    .then(function () {
        console.log("Done cursoring.");
    });
// INDICES
//Os índices permitem que você busque os dados em um armazenamento de objeto por uma propriedade diferente da chave primária.
// Você pode criar um índice em qualquer propriedade (que se torna o caminho-chave para o índice),
// especificar um intervalo nessa propriedade e obter os dados dentro do intervalo usando o getAll()método ou um cursor.
// upperBound()
// lowerBound()
// bound()(o que significa ambos)
// only()
// includes()
function searchItems(lower, upper) {
    if (lower === "" && upper === "") {
        return;
    }

    let range;
    if (lower !== "" && upper !== "") {
        range = IDBKeyRange.bound(lower, upper);
    } else if (lower === "") {
        range = IDBKeyRange.upperBound(upper);
    } else {
        range = IDBKeyRange.lowerBound(lower);
    }

    newDb
        .then(function (db) {
            const tx = db.transaction(["store"], "readonly");
            const store = tx.objectStore("store");
            const index = store.index("price");
            return index.openCursor(range);
        })
        .then(function showRange(cursor) {
            if (!cursor) {
                return;
            }
            console.log("Cursored at:", cursor.key);
            for (const field in cursor.value) {
                console.log(cursor.value[field]);
            }
            return cursor.continue().then(showRange);
        })
        .then(function () {
            console.log("Done cursoring.");
        });
}**/
