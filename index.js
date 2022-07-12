
//constantes
const authRequestUrl = "https://id.twitch.tv/oauth2/token?client_id=i2b59j1pxt7dt6f0stfgr96lezsghb&client_secret=t8zqo0fg3lmbexspjg5leenp3ikqrj&grant_type=client_credentials";
const gameListUrl = "https://api.igdb.com/v4/games";
const clientID = 'i2b59j1pxt7dt6f0stfgr96lezsghb';
const shooterId = '5';
const plataformId = '8';
const adventureId = '31';

//lista y valores por defectp
var genre = document.getElementsByClassName("active")[0].id;
var token = '';
var lista = [];
async function setParams() {
    token = await getToken(); 
    lista = await getGames(genre);
    document.getElementById("datosFin").innerHTML = pintarFinal(lista);
}
setParams();

async function getToken() {
    const response = await fetch(authRequestUrl, {method: 'POST'})
    const data = await response.json()
    return data.access_token;
}

async function getGames(genero) {
    let id = genero == 'shooter' ? shooterId : (genero == 'plataform' ? plataformId : adventureId);

    try {
    const response = await fetch(
        gameListUrl, {
            method: 'POST',
            headers: {
                'Client-ID': `${clientID}`,
                'Authorization': `Bearer ${token}`,
            },
            body: `fields name;limit 500; where genres = (${id});`
        }
    );
    const data = await response.json()
    data.flat();
    return data;
    } catch (error) {
        console.error(err);
    }
}


// boton activo
var inputsContiner = document.getElementById("inputsDiv");
var btns = inputsContiner.getElementsByClassName("btn");

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        current = document.getElementsByClassName("active");
        genre = current[0].id;
        setParams();
    });
}


function pintarFinal(lista) {
    if (lista == undefined) {
        return null;
    }
    return lista.map(function(game){
        return '<li>' + game.name + '</li>';
    }).join('');
}


function pulsada() {
    var inputValue = document.getElementById("searchbar");
    var lista2 = lista.filter(gameName =>
        gameName.name.toLowerCase().includes(inputValue.value)
    );
    document.getElementById("datosFin").innerHTML = pintarFinal(lista2);
}

