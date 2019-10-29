var niebieski = 'linear-gradient(to left, rgb(0, 55, 207), rgb(8, 98, 216))';
var czerwony = 'linear-gradient(to left, rgb(255, 72, 72), #d10000)';
var zolty = 'linear-gradient(to left, rgba(255, 233, 32), #be9200)';
var zielony = 'linear-gradient(to left, rgb(35, 220, 74), #008f00)';

var musicCheck = 0;

let musicThemes = [
	new Audio('sound/1.mp3'),//0
	new Audio('sound/2.mp3'),//1
	new Audio('sound/3.mp3'),//2
	new Audio('sound/4.mp3'),//3
	new Audio('sound/5.mp3'),//4
	new Audio('sound/6.mp3'),//5
	new Audio('sound/correct answer.mp3'),//6
	new Audio('sound/final answer.mp3'),//7
	new Audio('sound/wrong answer.mp3'),//8
];

musicThemes.forEach((theme) => {
	theme.volume = 0.3;
});

let question = document.querySelector('.question');
let anwsers = [ ...document.querySelectorAll('.anwser') ];
let gameindex = -1;
let nextBtn = document.querySelector('.next');
document.querySelectorAll('img').forEach((el, index) => {
	el.index = index;
	el.addEventListener('click', function(event) {
		el.src = el.src.substring(0, el.src.length - 4) + 'x.png';
		if (el.src.match('5050')) {
			console.log('5050');
			let counter = 0;
			let random;
			while (counter < 2) {
				random = Math.floor(Math.random() * 4);
				if (random != gameInfo[gameindex].rightIndex && gameInfo[gameindex].answers[random] != '') {
					gameInfo[gameindex].answers[random] = '';
					anwsers[random].innerHTML = '';
					counter++;
				}
			}
		}
		el.style.pointerEvents = 'none';
	});
});

function game() {
	allOff();
	console.log('przed zwiekszeniem' + musicCheck);
	musicCheck++;
	console.log('po zwiekszeniu' + musicCheck);
	hideAll();
	document.getElementById('a1').style.display = 'none';
	question = document.querySelector('.question');
	anwsers = [ ...document.querySelectorAll('.anwser') ];
	gameindex++;
	nextBtn.style.pointerEvents = 'none';
	question.innerHTML = gameInfo[gameindex].question;
	for (i = 0; i < 4; i++) {
		anwsers[i].style.pointerEvents = 'auto';
		anwsers[i].style.backgroundImage = niebieski;
		anwsers[i].innerHTML = gameInfo[gameindex].answers[i];
	}
	anwsers.forEach((anwser, index) => {
		anwser.index = index;
		anwser.addEventListener('click', function(event) {
			console.log(anwser.index);
			onAnwser(anwser.index, gameInfo[gameindex].rightIndex);
		});
	});
	document.querySelectorAll('img').forEach((el) => {
		el.style.pointerEvents = 'auto';
	});
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
async function onAnwser(index, rightIndex) {
	for (i = 0; i < 4; i++) {
		anwsers[i].style.pointerEvents = 'none';
	}
	document.querySelectorAll('img').forEach((el) => {
		el.style.pointerEvents = 'none';
	});
	allOff();
	musicThemes[7].load();
	musicThemes[7].play();
    anwsers[index].style.backgroundImage = zolty;
    await sleep(750);
    anwsers[index].style.backgroundImage = niebieski;
    await sleep(750);
    anwsers[index].style.backgroundImage = zolty;
    await sleep(750);
    anwsers[index].style.backgroundImage = niebieski;
    await sleep(750);
    anwsers[index].style.backgroundImage = zolty;
    await sleep(750);
    anwsers[index].style.backgroundImage = niebieski;
    await sleep(750);
    anwsers[index].style.backgroundImage = zolty;
    await sleep(750);
    anwsers[index].style.backgroundImage = niebieski;
    await sleep(750);
    
	if (index == rightIndex) {
		allOff();
		musicThemes[6].load();
		musicThemes[6].play(); // correct sound
		anwsers[index].style.backgroundImage = zielony;
		nextBtn.style.pointerEvents = 'auto';
		nextBtn.addEventListener('click', game);
	} else {
		await sleep(750);
		allOff();
		musicThemes[8].play(); // wrong sound
		anwsers[index].style.backgroundImage = czerwony;
		await sleep(1000);
		anwsers[rightIndex].style.backgroundImage = zielony;
		nextBtn.innerHTML = 'PRZEGRAŁEŚ';
	}
}
game();

function hideAll() {
	checkNext = 0;
	document.querySelector('#a1').style.display = 'none';
	document.querySelector('#a2').style.display = 'none';
	document.querySelector('#a3').style.display = 'none';
	document.querySelector('#a4').style.display = 'none';
	document.querySelector('.question').style.display = 'none';
}

//PRINTING NEXT QUESTION/ANWSER ON BUTTON CLICK
var checkNext = 0;

function showNext() {
	switch (checkNext) {
		case 0:
			musicTheme();
			document.querySelector('.question').style.display = 'block';
			checkNext++;
			break;
		case 1:
			document.querySelector('#a1').style.display = 'block';
			checkNext++;
			break;
		case 2:
			document.querySelector('#a2').style.display = 'block';
			checkNext++;
			break;
		case 3:
			document.querySelector('#a3').style.display = 'block';
			checkNext++;
			break;
		case 4:
			document.querySelector('#a4').style.display = 'block';
			checkNext++;
			break;
		default:
			console.log('pokazales juz wszystko chyba pozdro');
			break;
	}
}
function musicTheme() {

	//Nie jestem pewien czy to działa pepega 
	//no nie działa Pepege
	/*musicThemes.forEach((theme, index) => {
		if (index == musicCheck + 1 || index == musicCheck) {
			theme.play();
		}
	});*/

	if (musicCheck == 1 || musicCheck == 2) {
		musicThemes[0].load();
	 	musicThemes[0].play();
	 } else if (musicCheck == 3 || musicCheck == 4) {
		musicThemes[1].load();
		musicThemes[1].play();
	 } else if (musicCheck == 5 || musicCheck == 6) {
		musicThemes[2].load();
		musicThemes[2].play();
	 } else if (musicCheck == 7 || musicCheck == 8) {
		musicThemes[3].load();
		musicThemes[3].play();
	 } else if (musicCheck == 9 || musicCheck == 10) {
		musicThemes[4].load();
		musicThemes[4].play();
	 } else if (musicCheck == 11) {
		musicThemes[5].load();
		musicThemes[5].play();
	 }
}
function allOff() {
	musicThemes.forEach((theme) => {
		theme.pause();
	});
}