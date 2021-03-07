const base_url = "https://api.football-data.org/v2";
const token = "d90b9aabb6f54bb99d0b05e4fd9f79da";
const AllMatch = `${base_url}/competitions/CL/matches?matchday=1`;
const teamDetail = `${base_url}/teams/`;
const AllTeams = `${base_url}/competitions/CL/standings?standingType=TOTAL`;

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    document.getElementById("loading").style.display = 'none';
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function fetchAPI(endpoint) {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": token
        }
    });
}

function getAllMatch() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(AllMatch).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getMatch(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(AllMatch)
            .then(status)
            .then(json)
            .then(data => {
                document.getElementById("loading").style.display = 'none';
                getMatch(data);
                resolve(data);
            })
        .catch(error);
    });
}

function getMatch(data){
    let temp = '';
    data.matches.forEach(match => {
        let date = new Date(Date.parse(match.utcDate));
        temp += `
        <div class="col m12 s12">
            <div class="card">
                <div class="match-title">
                    <h5>${formattedDate(date)}</h5>
                </div>
                <div class="card-content">
                    <a href="./detail.html?id=${match.homeTeam.id}">
                        <div class="col m4 s12 center match-team"  style="max-height: 300px;" >
                            <h6>HOME</h6>
                            <div class="match-picture" style="width: 100%;">
                            <img src="https://crests.football-data.org/${match.homeTeam.id}.svg" alt="${match.homeTeam.name}" style="width: 150px; object-fit: cover;">
                            </div>
                            <div class="match-content">${match.homeTeam.name}</div>
                        </div>
                    </a>
                    <div class="col m4 s12" style="text-align: center; justify-content: center; height: 200px;">
                        <h1>${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}</h1>
                        <h5>${match.group}</h5>
                    </div>
                    <a href="./detail.html?id=${match.awayTeam.id}">
                        <div class="col m4 s12 center match-team"  style="max-height: 300px;" >
                            <h6>AWAY</h6>
                            <div class="match-picture" style="width: 100%;">
                            <img src="https://crests.football-data.org/${match.awayTeam.id}.svg" alt="${match.awayTeam.name}" style="width: 150px; object-fit: cover;">
                            </div>
                            <div class="match-content">${match.awayTeam.name}</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        `;
    });
    document.getElementById('match').innerHTML = temp;
}

function formattedDate(date) {
    let temp = "";
    // Hari
    const Day = ["Sunday, ", "Monday, ", "Tuesday, ", "Wednesday, ", "Thursday, ", "Friday, ", "Saturday, "];
    if(date.getDay() == 0) {
        temp += Day[0];
    } else if (date.getDay() == 1) {
        temp += Day[1];
    } else if (date.getDay() == 2) {
        temp += Day[2];
    } else if (date.getDay() == 3) {
        temp += Day[3];
    } else if (date.getDay() == 4) {
        temp += Day[4];
    } else if (date.getDay() == 5) {
        temp += Day[5];
    } else if (date.getDay() == 6) {
        temp += Day[6];
    }

    // Tanggal
    temp += date.getDate() + " ";

    // Bulan
    const Months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if(date.getMonth() == 0) {
        temp += Months[0];
    } else if(date.getMonth() == 1) {
        temp += Months[1];
    } else if(date.getMonth() == 2) {
        temp += Months[2];
    } else if(date.getMonth() == 3) {
        temp += Months[3];
    } else if(date.getMonth() == 4) {
        temp += Months[4];
    } else if(date.getMonth() == 5) {
        temp += Months[5];
    } else if(date.getMonth() == 6) {
        temp += Months[6];
    } else if(date.getMonth() == 7) {
        temp += Months[7];
    } else if(date.getMonth() == 8) {
        temp += Months[8];
    } else if(date.getMonth() == 9) {
        temp += Months[9];
    } else if(date.getMonth() == 10) {
        temp += Months[10];
    } else if(date.getMonth() == 11) {
        temp += Months[11];
    }

    // Tahun
    temp += " " + date.getFullYear();

    return temp;
}

function getAllTeams() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(AllTeams).then(response => {
                if (response) {
                    response.json().then(data => {
                        getTeam(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(AllTeams)
            .then(status)
            .then(json)
            .then(data => {
                document.getElementById("loading").style.display = 'none';
                getTeam(data);
                resolve(data);
            })
    
        .catch(error);
    });
}

function getTeam(data) {
    let temp = '';
    let i = 0;
    const group_name = ["A","B","C","D","E","F","G","H"];

    data.standings.forEach(standing => {
        temp += `<div class="row box">`;
        temp += `<div class="col m12 s12 group-name center"><h6>Group ${group_name[i]}</h6></div>`;
        i += 1;
        standing.table.forEach(table => {
            table = JSON.parse(JSON.stringify(table).replace(/^http:\/\//i, 'https://'));  
            temp += `
            <div class="col m6 s12">
                <div class="card team-card center">
                    <a href="./detail.html?id=${table.team.id}">
                        <div class="card-image team-image">
                            <img src="${table.team.crestUrl}" alt="${table.team.name}">
                            <div class="picture-overlay">
                                <p class="detail-button">Detail</p>	
                            </div>
                        </div>
                        <div class="card-content">
                            <h6>${table.team.name}</h6>
                        </div>
                    </a>
                </div>
            </div>
            `;
        });
        temp += `</div>`;
    });
    document.getElementById('teams').innerHTML= temp;
}

function getTeamById() {
    return new Promise(function(resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(teamDetail + idParam).then(response => {
                if (response) {
                    response.json().then(data => {
                        IDTeam(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(teamDetail + idParam)
        .then(status)
        .then(json)
        .then(data => {
            IDTeam(data);
            resolve(data);
        })
    });
}

function IDTeam(data) {
    document.getElementById("loading").style.display = 'none';
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));  

    let temp = ``;
    temp += `
        <div class="container">
            <div class="row detail">
                <div class="col m12 s12 center detail-name">
                    <h3>${data.name}</h3>
                </div>
                <div class="col m12 s12 detail-image">
                    <img src="${data.crestUrl}">
                </div>
                <div class="col m12 s12 detail-content">
                    <table class="highlight">
                        <tr>
                            <th>Name</th>
                            <td>${data.name}</td>
                        </tr>
                        <tr>
                            <th>Short Name</th>
                            <td>${data.shortName}</td>
                        </tr>
                        <tr>
                            <th>Area</th>
                            <td>${data.area.name}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>${data.address}</td>
                        </tr>
                        <tr>
                            <th>Venue</th>
                            <td>${data.venue}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>${data.phone}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${data.email}</td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td style="color=#ff9800; cursor=pointer;"><a href="${data.website}" target="_blank">${data.website}</a></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `;
    document.getElementById("body-content").innerHTML = temp;
    document.getElementById("judul").innerHTML = `A SPORT - ${data.name}`;
}

function getSavedTeams() {
    getAll().then(teams => {
        document.getElementById("loading").style.display = 'none';
        let temp = "";

        if(teams.length) {
            teams.forEach(team => {
                team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));  

                temp += `
                    <div class="col m6 s12">
                        <div class="card team-card center">
                            <a href="./detail.html?id=${team.id}&saved=true">
                                <div class="card-image team-image">
                                    <img src="${team.crestUrl}" alt="${team.name}">
                                    <div class="picture-overlay">
                                        <p class="detail-button">Detail</p>
                                    </div>
                                </div>
                                <div class="card-content">
                                    <h6>${team.name}</h6>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
            });
        } else {
            temp += `
                <h6 class="center" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);">
                    Oops.. Belum ada tim yang anda simpan.
                </h6>
            `;
        }
        document.getElementById("saved-team").innerHTML = temp;
    })
}

function getSavedTeamById() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    getById(parseInt(idParam)).then(team => {
        document.getElementById("loading").style.display = 'none';
        let temp = "";
        temp += `
            <div class="container">
                <div class="row detail">
                    <div class="col m12 s12 center detail-name">
                        <h3>${team.name}</h3>
                    </div>
                    <div class="col m12 s12 detail-image">
                        <img src="${team.crestUrl}" alt="${team.name}">
                    </div>
                    <div class="col m12 s12 detail-content">
                        <table class="highlight">
                            <tr>
                                <th>Name</th>
                                <td>${team.name}</td>
                            </tr>
                            <tr>
                                <th>Short Name</th>
                                <td>${team.shortName}</td>
                            </tr>
                            <tr>
                                <th>Area</th>
                                <td>${team.area.name}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>${team.address}</td>
                            </tr>
                            <tr>
                                <th>Venue</th>
                                <td>${team.venue}</td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td>${team.phone}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>${team.email}</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                <td style="color=#ff9800; cursor=pointer;"><a href="${team.website}" target="_blank">${team.website}</a></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("body-content").innerHTML = temp;
        document.getElementById("judul").innerHTML = `A SPORT - ${team.name}`;
    });
}