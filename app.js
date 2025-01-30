var simboli=[
{
			name:'zvjezdica',
			img:'imgs/zvjezdica.png'
		},
		
		{
			name:'3list',
			img:'imgs/3list.png'
		},
		
		{
			name:'list',
			img:'imgs/list.png'
		},
		
		{
			name:'flower',
			img:'imgs/flower.png'
		},

		{
			name:'dijamant',
			img:'imgs/dij.png'
		},
		{
			name:'srce',
			img:'imgs/srce.png'
		}


];

for (let i=0;i<simboli.length;i++){
	simboli[i].id=i;
}
function pripada(array, e){

	for (let a of array){if (a===e) return true;}
		return false;
}

//document.getElementById('score').display="none"; doesn't work
var kombinacijaId;
var kombinacija;
var lista= document.getElementsByClassName("red"); //lista divova u svakom su 
var stalni_red= document.getElementById("stalan");
var cardsChosen =['','','',''];
var cardsChosenId=['','','',''];
let red_ubacuje;
let s=0;
let k=0;
var score;//za tu igru
var ukupni_score=0;

function novaIgra(){
	score=100; 
	ukupni_score+=score;
	red_ubacuje=0;
	s=0;k=0;
	kombinacija=[];
	kombinacijaId=[];
	
	for (let i =0; i<7;i++){
		while(lista[i].firstChild){
			lista[i].removeChild(lista[i].lastChild); //ovaj dio sluzi da ocistimo sva polja ako pokrecemo igricu drugi/treci put
	}
	}

//sljedeci dio koda nam doda sva polja

for(let i=0; i<7; i++){
	for(let j=0; j<4;j++){

		var card=document.createElement('button');
		card.setAttribute('type', 'button');
		card.setAttribute('class', 'btn btn-outline-secondary');
		card.addEventListener('click', klik_na_polje);
		var slika=document.createElement('img')
		slika.setAttribute('src', 'imgs/blenk.png');
		card.appendChild(slika);
		lista[i].appendChild(card);
	}
}

stalni_red.style.display = "block";

	//generisanje kombinacije
	for (let i=0;i<4;i++) {
		var el=Math.floor(Math.random()*6);
		
		kombinacijaId.push(el);
		kombinacija.push(simboli[el]);
	}
 
}


function novaIgra1(){//kad se prvi put igra ili nakon izgubljene igre kada ponovo pokrenemo
	ukupni_score=0;
	document.getElementById('score').innerHTML='';
	
	if (stalni_red.childNodes[0].disabled===true){
	for (let e of stalni_red.childNodes){e.disabled=false;}
}
novaIgra();
}

function ubaci(i){

	if(pripada(cardsChosen,'')===false) return;//ako su sva popunjena da ne moze ubacit!


	for(let e of cardsChosen)  if (e===''){ k= cardsChosen.indexOf(e); break;}
	//prva koja je prazna se pop.
	
	cardsChosenId[k]=i;
	cardsChosen[k]=simboli[i].name;
	var tajbutton=lista[red_ubacuje].childNodes[k];
	tajbutton.firstChild.setAttribute('src',simboli[i].img);
	s++;
	if(pripada(cardsChosen,'')===false) kreirajDugme(); //ako nakon ovog ubacivanja imam sve onda stvori dugme
	

}



function klik_na_polje(){ //ova funkcija sluzi da se izbrise unos u nekom polju
	if(this.firstChild.getAttribute('src')!='imgs/blenk.png') {//this je button a first child je img
		this.firstChild.setAttribute('src','imgs/blenk.png' );
		indeks= Array.from(this.parentNode.children).indexOf(this); // preuzeto sa stackOverflow https://stackoverflow.com/questions/5913927/get-child-node-index
		cardsChosenId[indeks]='';
		cardsChosen[indeks]='';
		if (s===4) izbrisiDugme(); //s=4 jer se jos nije pozvala provjera!
		s--;
}
	
}

var ok_button;

function izbrisiDugme(){
	ok_button.style.display='none';
}
function kreirajDugme(){
	ok_button= document.createElement('button');
	ok_button.textContent='OK';
	ok_button.setAttribute('type', 'button');
	ok_button.setAttribute('class', 'btn btn-outline-secondary btn-lg');
	lista[red_ubacuje].appendChild(ok_button);
	ok_button.addEventListener('click', Provjera);
}
var kombinacijaId_kopija=[];
function Provjera(){
	var greenLight=0;
	var whiteLight=0;
	let l;
	kombinacijaId_kopija=[];
	for (let i=0; i<4; i++)kombinacijaId_kopija.push(kombinacijaId[i]);
		
	for (let i=0; i<cardsChosenId.length; i++){
		
		if(cardsChosenId[i]===kombinacijaId[i]){ 
			greenLight++;
			kombinacijaId_kopija[i]='';
			cardsChosenId[i]='';
		} 
		}//prvo provjerimo da li ima da se poklapaju na istom mjestu a onda da li ima da su sadrzane
		for (let i=0; i<cardsChosenId.length; i++){
		
		if (cardsChosenId[i]!=='' && pripada(kombinacijaId_kopija,cardsChosenId[i])){
			l = kombinacijaId_kopija.indexOf(cardsChosenId[i]);
			kombinacijaId_kopija[l]=''; //izbaci mi taj iz kombinacije_kopije da ih vise ne poredim 
			whiteLight++;

			}
			} 
		cardsChosenId=['','','',''];//ocisti za sljedeci red
		cardsChosen=['','','',''];
	

	for (let e of lista[red_ubacuje].childNodes){e.disabled=true;} //sluzi da nakon provjere ne mozemo mijenjati taj red
		izbrisiDugme();
	for (let i=0; i<greenLight; i++){
		var grl= document.createElement('img');
		grl.setAttribute('src', 'imgs/green.png')
		lista[red_ubacuje].appendChild(grl);
	}
	for (let i=0; i<whiteLight; i++){
		var whl= document.createElement('img');
		whl.setAttribute('src', 'imgs/white.png')
		lista[red_ubacuje].appendChild(whl);
	}
	if (greenLight<4) {
		if(red_ubacuje===6){ //ako je izgubio
				var trazeno=document.createElement('div'); //trazena kombinacija
				for (let e of kombinacija){
					let sl= document.createElement('img');
					sl.setAttribute('src', e.img);
					sl.style.width='30px';
					trazeno.appendChild(sl);
				}
				
			

				document.getElementById('score').innerHTML='Tražena kombinacija je ';
				document.getElementById('score').appendChild(trazeno);
				trazeno.style.display='inline';
				ukupni_score=ukupni_score-40;
				document.getElementById('score').appendChild(document.createTextNode('. Osvojeni broj bodova je '+ukupni_score+ '. Za ponovno pokretanje igre pritisnite '));
				var btn = document.createElement('button');
				btn.setAttribute('class', 'btn btn-success');
				btn.setAttribute('type','button');
				btn.textContent='START';
				btn.addEventListener('click', novaIgra1);
				document.getElementById('score').appendChild(btn);

				/*var btn1 = document.createElement('button');
				btn1.setAttribute('class', 'btn btn-success');
				btn1.setAttribute('type','button');
				btn1.textContent='OVDJE';
				btn1.addEventListener('click', ()=>{window.open('glavna.html','_self');});
				
				document.getElementById('paragraf').innerHTML='Za povratak na glavnu stranicu pritisnite ';
				document.getElementById('paragraf').appendChild(btn1);

				ne treba mi ovo jer sam odlucila da uvijek imam mogucnot povratka na glavnu stranicu
				jer u slučaju da neko klikne button "Igraj" a nije siguran u pravila treba da se moze vratiti nazad
				bez da mora pobijediti ili izgubiti!
				*/
			}


		ukupni_score-=10;

		}
	if (greenLight===4){// tad smo pobijedili - treba dalje disable one dole buttons i dati mogućnost da igra ponovo pri cemu ce se bodovi zbrajat
		Pobjeda();
		return;
		}
red_ubacuje++;
s=s%4;
}


function Pobjeda(){
	setTimeout(()=>{
		document.getElementById('score').innerHTML='Pogodili ste kombinaciju! Vaš ukupni rezultat je '+ ukupni_score + ' bodova.';
	novaIgra();

	/*
	var btn1 = document.createElement('button');
	btn1.setAttribute('class', 'btn btn-success');
	btn1.setAttribute('type','button');
	btn1.setAttribute('id', 'btn');
	btn1.textContent='OVDJE';
	btn1.addEventListener('click', ()=>{window.open('glavna.html','_self');});
	
	document.getElementById('paragraf').innerHTML='Za povratak na glavnu stranicu pritisnite ';
	document.getElementById('paragraf').appendChild(btn1);
	*/
	}

		,500); //stavila sam timeout jer zelim da korisnik vidi sva 4 svjetla tj da je pogodio
		//nakon toga se automatski generise nova kombinacija kao sto je trazeno u specifikacijama projekta



		/*
		U prvoj verziji igrice sam radila ovako, da se pojavi pop-up prozor koji pita korisnika da li zeli nastaviti igrati
		setTimeout(()=>{
			if(confirm('Želite li nastaviti igrati?')){

			document.getElementById('score').innerHTML='Osvojili ste ukupno '+ ukupni_score+ ' bodova.'; //ovo u narednoj igri pise
			novaIgra();
		}
		else{
			for (let e of stalni_red.childNodes){e.disabled=true;}
			var btn1 = document.createElement('button');
			btn1.setAttribute('class', 'btn btn-success');
			btn1.setAttribute('type','button');
			btn1.setAttribute('id', 'btn');
			btn1.textContent='OVDJE';
			btn1.addEventListener('click', ()=>{window.open('glavna.html','_self');});
			
			document.getElementById('paragraf').innerHTML='Za povratak na glavnu stranicu pritisnite ';
			document.getElementById('paragraf').appendChild(btn1);
		}
}, 700);*/

	
}

window.onload=novaIgra1;
