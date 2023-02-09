const nameInput = document.querySelector("#name-input");
const searchBtn = document.querySelector("#search"); 

const title = document.querySelector("#title");

const loading = document.querySelector("#div-loading");

const nameElement = document.querySelector(".name"); 
const imageElement = document.querySelector(".image");
const idElement = document.querySelector(".id"); 
const locationElement = document.querySelector(".location"); 
const originElement = document.querySelector(".origin"); 
const genderElement = document.querySelector(".gender"); 
const speciesElement = document.querySelector(".species"); 

const infoContainer = document.querySelector("#character-data");

const mensagemContainer = document.querySelector("#mensagem"); 
const mensagem = document.createElement("h1");

const sugestoesContainer = document.querySelector("#sugestoes");
const sugestoesBotao = document.querySelectorAll("#sugestoes button");

//FUNCAO RESPONSAVEL PELO CONSUMO DA API
const getDatasAPI = async(id) => {
    const apiWeatherURL = `https://rickandmortyapi.com/api/character/${id}`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data; 
}    

//ACRESCIMO DAS INFORMACOES DOS PERSONAGENS
const acrescimo = async(data) => {

    loading.classList.remove("loading-visivel");
    loading.classList.add("hide2");

    nameElement.innerText = data.name; 
    imageElement.setAttribute(
        "src",
       `${data.image}`
    );
    idElement.innerText = `Id: ${data.id}`;
    locationElement.innerText = `Location: ${data.location.name}`;
    originElement.innerText = `Origin: ${data.origin.name}`;
    genderElement.innerText = `Gender: ${data.gender}`;
    speciesElement.innerText = `Species: ${data.species}`;

    infoContainer.classList.remove("hide"); /*faz o container aparecer na tela*/

    nameInput.value = '';
}


//CASO NOME INVALIDO - APRESENTA UMA MENSAGEM
const nomeInvalido = async () => {

    loading.classList.remove("loading-visivel");
    loading.classList.add("hide2");

    mensagem.innerText = `Este nome é Inválido`;

    mensagemContainer.appendChild(mensagem);

    mensagemContainer.classList.remove("hide3");
    mensagemContainer.classList.add("mensagem-visivel");
}

const elementosHide = async () => {
    if(title.classList != "hide5"){
        title.classList.add("hide5");
    }
    if(sugestoesContainer.classList != "hide4"){
        sugestoesContainer.classList.remove("sugestoesAparente");
        sugestoesContainer.classList.add("hide4");
    }
    if(infoContainer.classList != "hide"){
        infoContainer.classList.add("hide");
    }    
    if(mensagemContainer.classList != "hide3"){
        mensagemContainer.classList.remove("mensagem-visivel");
        mensagemContainer.classList.add("hide3");
    }
    loading.classList.remove("hide2");
    loading.classList.add("loading-visivel");
}

//FUNCAO PRINCIPAL - VERIFICAR A API QUE CONTEM AS INFORMACOES DO PERSONAGEM DOS PERSONAGENS
const getDatasCharacter = async (name) => {
    elementosHide();

    //ESTRUTURA DE REPETICAO -> VERIFICAR A API COM AS INFORMACOES DO PERSONAGEM
    for (id = 1; id < 828; id++){
        const data = await getDatasAPI(id); //CHAMA A FUNCAO QUE CONSOME API
        if (name === data.name) {
            acrescimo(data); //CHAMA A FUNCAO QUE ACRESCENTA AS INFORMACOES DOS PERSONAGENS
            break;
        }
        //CASO O NOME SEJA INVALIDO
        if(id === 827){
            nomeInvalido();
        }
    };
}

//EVENTOS

//CLICAR NO BOTAO
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInput.value;

    getDatasCharacter(name); //CHAMA A FUNCAO PRINCIPAL
});

//PRECIONAR ENTER
nameInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const name = e.target.value;

        getDatasCharacter(name); //CHAMA A FUNCAO PRINCIPAL
    }
});
//PRECIONAR UMA SUGESTAO
sugestoesBotao.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("id");
  
      getDatasCharacter(name);
    });
});
