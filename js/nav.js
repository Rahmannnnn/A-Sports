document.addEventListener("DOMContentLoaded", function() {

    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
    loadNav();
   
    function loadNav() {
        const xml = new XMLHttpRequest();
        xml.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status != 200) return;

            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
            elm.innerHTML = xml.responseText;
            });

            document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                elm.addEventListener("click", function(event) {
                  // Tutup sidenav
                  const sidenav = document.querySelector(".sidenav");
                  M.Sidenav.getInstance(sidenav).close();
         
                  // Muat konten halaman yang dipanggil
                  page = event.target.getAttribute("href").substr(1);
                  loadPage(page);
                });
              });
        }
        };
        xml.open("GET", "nav.html", true);
        xml.send();
    }

    let page = window.location.hash.substr(1);

    if (page === "") page = "home";
    loadPage(page);
    
    function loadPage(page) {
        const xml = new XMLHttpRequest();
        xml.onreadystatechange = function() {
            if (this.readyState === 4) {
                const content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xml.responseText;
                    
                    if(page === "home"){
                        run();
                    } else if(page === "matches") {
                        getAllMatch();
                    } else if(page === "teams") {
                        getAllTeams();
                    } else if(page === "saved") {
                        getSavedTeams();
                    }
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xml.open("GET", `pages/${page}.html`, true);
        xml.send();
    }

    function run(){
        const slider = document.querySelectorAll('.slider');
        M.Slider.init(slider, {
            indicators: false,
            interval: 4000,
            height: 500
        });
    }


});