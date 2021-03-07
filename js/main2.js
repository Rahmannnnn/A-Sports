if (!("serviceWorker" in navigator)) {
    console.error("ServiceWorker: Browser tidak mendukung.");
} else {
    navigator.serviceWorker
    .register("/service-worker.js")
    .then(function(registration) {
        console.log("ServiceWorker: Pendaftaran berhasil. Scope:", registration.scope);
    })
    .catch(function(error) {
        console.error("ServiceWorker: Pendaftaran gagal. Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const tooltip = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltip);

    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    var idParam = urlParams.get("id");
    
    var save = document.getElementById("save");
    var delete_btn = document.getElementById("delete");
    if (isFromSaved) {
        save.style.display = 'none';
        getSavedTeamById();
    } else {
        getById(parseInt(idParam)).then(function(result){
            if(result){
                save.style.display = 'none';
            } else {
                delete_btn.style.display = 'none';
            }
        });
        
        var item = getTeamById();
    }

    delete_btn.onclick = function() {              
        deleteSaved(parseInt(idParam));
        if(isFromSaved) {
            location.href = "/index.html#saved";
        } else {
            delete_btn.style.display = 'none';
            save.style.display = 'block';
            
        }
        
    }

    save.onclick = function() {
        item.then(function (team) {
            saveForLater(team);
        });
        save.style.display = 'none';
        delete_btn.style.display = 'block';
    }
});