var dbPromised = idb.open("a-sport", 1, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("team", "team", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.add(team);
      return tx.complete;
    })
    .then(function() {
      console.log(team.name + " berhasil disimpan");
      M.toast({html: team.name + " berhasil disimpan"});
    });
}

function deleteSaved(id) {
  dbPromised
  .then(function(db) {
    var tx = db.transaction("teams", "readwrite");
    var store = tx.objectStore("teams");
    store.delete(id);
    return tx.complete;
  })
  .then(function() {
    console.log("tim berhasil dihapus");
    M.toast({html: "tim berhasil dihapus"})
  });
} 

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}