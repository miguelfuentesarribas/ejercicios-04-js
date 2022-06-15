
//constantes
const authRequestUrl = "https://id.twitch.tv/oauth2/token?client_id=i2b59j1pxt7dt6f0stfgr96lezsghb&client_secret=t8zqo0fg3lmbexspjg5leenp3ikqrj&grant_type=client_credentials";
const gameListUrl = "https://api.igdb.com/v4/games";
const clientID = 'i2b59j1pxt7dt6f0stfgr96lezsghb';
const shooterId = '5';
const strategyId = '10';
const adentureId = '31';



// boton activo
var inputsContiner = document.getElementById("inputsDiv");
var btns = inputsContiner.getElementsByClassName("btn");

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        current = document.getElementsByClassName("active");
        console.log(current[0].id);
        genre = current[0].id;
        setParams();
    });
}

//lista y valores por defectp
var genre = document.getElementsByClassName("active")[0].id;
var token = '';
var lista = [];
async function setParams() {
    token = await getToken();
    lista = await getGames(genre);
    console.log(lista);
    document.getElementById("datosFin").innerHTML = pintarFinal(lista);
}
setParams();

function pintarFinal(lista) {
    if (lista == undefined) {
        return null;
    }
    return lista.map(function(game){
        return '<li>' + game.name + '</li>';
    }).join('');
}

async function getToken() {
    const response = await fetch(authRequestUrl, {method: 'POST'})
    const data = await response.json()
    return data.access_token;
}

async function getGames(genero) {

    if (genero == 'shooter') {
        var a = shooterId
    } else if (genero == 'strategy') {
        var a = strategyId
    } else {
        var a = adentureId
    }

    try {
    const response = await fetch(
        gameListUrl, {
            method: 'POST',
            headers: {
                'Client-ID': `${clientID}`,
                'Authorization': `Bearer ${token}`,
            },
            body: `fields name;limit 500; where genres = (${a});`
        }
    );
    const data = await response.json()
    data.flat();
    return data;
    } catch (error) {
        console.error(err);
    }
}


