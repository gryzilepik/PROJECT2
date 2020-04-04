let kierunekX = 0;
let kierunekY = 0;
let robak, animacja, animacja2, animacja3, strona, x, y, jablko, el, koniec, b, czy_wonsz = false, czy_ogon = false, czy_moze_zmienic_kierunek = true;
let wynik = 0;

document.addEventListener("DOMContentLoaded", function(){ 
    
    stworz.addEventListener("click", nowaGra);
    rank = document.createElement('div');
    plansza = document.createElement('div');
    rank.id = "rank";
    main.appendChild(rank);
    ranking();
    
});
function ruch(event)
{    
    var klawisz = event.key; 
    if (klawisz == 'ArrowLeft' && strona != "PRAWO" && czy_moze_zmienic_kierunek == true)
    {
        strona = "LEWO";
        kierunekX = (-1) * grubosc.value;
        kierunekY = 0;
        czy_moze_zmienic_kierunek = false;
        
    }
    else if (klawisz == 'ArrowDown' && strona != "GORA" && czy_moze_zmienic_kierunek == true)
    {
        strona = "DOL";
        kierunekY = 1 * grubosc.value;  
        kierunekX = 0; 
        czy_moze_zmienic_kierunek = false;       
    }
    else if (klawisz == 'ArrowRight' && strona != "LEWO" && czy_moze_zmienic_kierunek == true)
    {
        strona = "PRAWO";
        kierunekX = 1 * grubosc.value; 
        kierunekY = 0;
        czy_moze_zmienic_kierunek = false;
    }
    else if (klawisz == 'ArrowUp' && strona != "DOL" && czy_moze_zmienic_kierunek == true)
    {
        strona = "GORA"; 
        kierunekY = (-1) * grubosc.value;  
        kierunekX = 0; 
        czy_moze_zmienic_kierunek = false;      
    }
    
}

function nowy_ogon()
{
	el =document.querySelectorAll(".ogon");
	if(el.length>0)
	{
		for(i =el.length-1; i>0; i--)
		{
			el[i].style.top =el[i-1].style.top;
			el[i].style.left =el[i-1].style.left;
		}
		el[0].style.top =robak.style.top;
		el[0].style.left =robak.style.left;
        czy_ogon = true;
	}
}

function kierunki()
{   
	nowy_ogon();
    let top = robak.offsetTop;
    let left = robak.offsetLeft;  
    robak.style.top = top+kierunekY+"px";
    robak.style.left = left+kierunekX+"px";
    czy_moze_zmienic_kierunek = true;
}  

function dobazy()
{
    clearInterval(animacja3);
    clearInterval(animacja2);
    clearInterval(animacja);
    koniec  = prompt("Przegrana, twój wynik to: "+wynik+"\nPodaj nazwę gracza:", "Nazwa gracza");
    if(koniec != null)
    {
        var polaczenie = new XMLHttpRequest();
        polaczenie.open("GET", "zapis.php?nazwa_gracza="+koniec+"&wynik="+wynik);
        polaczenie.send();
        polaczenie.onreadystatechange =function(){
            if(polaczenie.readyState ==4 && polaczenie.status == 200)
                console.log(polaczenie.response);
        };
        ranking();
        przegrana();
        
    }
    else
    {
        ranking();
        przegrana();
    }
}

function ranking()
{
   var polaczenie2 = new XMLHttpRequest();
    polaczenie2.open("GET", "odczyt.php");
    polaczenie2.send();
    polaczenie2.onreadystatechange  =function(){
        if(polaczenie2.readyState ==4 && polaczenie2.status == 200)
            rank.innerHTML=polaczenie2.response;
    }       
}


function nowaGra()
{
    clearInterval(animacja);
	clearInterval(animacja2);
	clearInterval(animacja3);
    animacja =setInterval(kierunki, 150 / szybkosc.value);
    animacja2 = setInterval(kolizja, 150 / szybkosc.value);
    animacja3 = setInterval(jedzenie, 150 / szybkosc.value);   
    rank.id = "rank";    
    plansza.id="plansza";
	plansza.style.width=wielkosc.value +"px";
	plansza.style.height=wielkosc.value +"px";
    plansza.innerHTML="";
    main.appendChild(plansza);
    main.appendChild(rank);
    ranking();
    robak = document.createElement('div');
    robak.id = "wonsz";
	robak.style.width=grubosc.value +"px";
	robak.style.height=grubosc.value +"px";
    plansza.appendChild(robak);
    czy_wonsz = true;
    document.addEventListener('keydown', ruch);      
    robak = document.getElementById("wonsz");
    plansza = document.getElementById("plansza");
     console.log(plansza.offsetTop);   
    
    randomJablko();   
}

function przegrana()
{
	wynik = 0;
    kierunekX = 0;
    kierunekY = 0;
    strona = "";
	plansza.remove();
    rank.remove();
    jablko.remove();
    nowaGra();
}

function kolizja() 
{
    
	if(sciany.checked)
	{
		plansza.style.border = "3px dashed black";
		if(robak.offsetTop - plansza.offsetTop < 3 && strona == "GORA")
			robak.style.top = parseInt(plansza.offsetTop) + parseInt(plansza.offsetHeight) - grubosc.value - 3 + "px";
		else if(robak.offsetLeft - plansza.offsetLeft < 3 && strona == "LEWO")
			robak.style.left = parseInt(plansza.offsetLeft) + parseInt(plansza.offsetWidth) - grubosc.value - 3 + "px";
		else if(plansza.offsetHeight + plansza.offsetTop - robak.offsetTop <= 3 && strona == "DOL")
			robak.style.top = parseInt(plansza.offsetTop) + 3 + "px";
		else if(plansza.offsetWidth + plansza.offsetLeft - robak.offsetLeft <= 3 && strona == "PRAWO")
			robak.style.left = parseInt(plansza.offsetLeft) + 3 + "px";
	}
	else
	{
        plansza.style.border = "3px solid black";
		if((robak.offsetTop - plansza.offsetTop < 3 && strona == "GORA") || (robak.offsetLeft - plansza.offsetLeft < 3 && strona == "LEWO") || (plansza.offsetHeight + plansza.offsetTop - robak.offsetTop <= 3 && strona == "DOL") || (plansza.offsetWidth + plansza.offsetLeft - robak.offsetLeft <= 3 && strona == "PRAWO"))
		{
			dobazy();
		}
	}
	for(i=1; i<el.length; i++)
		if (el[i].offsetTop == robak.offsetTop && el[i].offsetLeft == robak.offsetLeft)
		{
			dobazy();
		}
}
  

function randomJablko()
{  
	
	//y =parseInt(Math.random()*plansza.offsetHeight/grubosc.value)*grubosc.value+plansza.offsetTop+plansza.offsetParent.offsetTop+1;
    y = parseInt(Math.random()*wielkosc.value/grubosc.value)*grubosc.value + plansza.offsetTop+3;
	//x =parseInt(Math.random()*plansza.offsetWidth/grubosc.value)*grubosc.value+plansza.offsetLeft+plansza.offsetParent.offsetLeft+1;
    x = parseInt(Math.random()*wielkosc.value/grubosc.value)*grubosc.value + plansza.offsetLeft+3;
	jablko = document.createElement('div');
	jablko.id = "jablko";
	jablko.style.top = y + "px";
	jablko.style.left = x + "px";
	jablko.style.width=grubosc.value +"px";
	jablko.style.height=grubosc.value +"px";
	/*if(el[0])
	{
		for (let i = 0; i<el.length; i++)
		{
			if(el[i].style.top = jablko.style.top && el[i].style.left = jablko.style.left)
			{
				randomJablko();
			}
			else
				plansza.appendChild(jablko);	
		}
	}
	else*/
		plansza.appendChild(jablko);	
		
}

let animacja4 = setInterval(sprawdz, 150 / szybkosc.value);
function sprawdz()
{
	if(czy_wonsz = true)
	{
        if(czy_ogon =  true)
        {    
            for (let i = 0; i<el.length; i++)
            {
                if(el[i].style.top = y && el[i].style.left = x)
                {
                    randomJablko();
                }
            }
        }
        else
            if(robak.style.top = y && robak.style.left = x)
                randomJablko();
	}
}


function jedzenie() 
{
    if(robak.offsetTop == jablko.offsetTop && robak.offsetLeft == jablko.offsetLeft)
    {
		robak.style.top+=grubosc.value+"px";
		jablko.remove();
		wynik+=5;
        w.innerHTML = "WYNIK: "+wynik;
		ogon = document.createElement('div');
		ogon.className = 'ogon';
		ogon.style.width = grubosc.value + "px";
		ogon.style.height = grubosc.value + "px";
		ogon.style.top = robak.style.top;
		ogon.style.left = robak.style.left;
		plansza.appendChild(ogon);
        randomJablko();	
	}
}
//let o = 0;
//let animacja4 = setInterval(obrot, 20);
//function obrot()
//{
//	jablko.style.transform = "rotate("+o+"deg)";
//	o+=10;
//}





