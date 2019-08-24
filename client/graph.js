let slIndProj = 0;
let slIndKv = 0;

let podschet;

// graphiki
let barChart;
let densityData;

window.onload = function(){

	

	calcul();

	let densityCanvas = document.getElementById("densityChart");
	let oilCanvas = document.getElementById("oilChart");
	let densityCanvas1 = document.getElementById("densityChart1");
	let oilCanvas1 = document.getElementById("oilChart1");

	Chart.defaults.global.defaultFontFamily = "Lato";
	Chart.defaults.global.defaultFontSize = 14;

	densityData = {
		data: [podschet.mashtab, podschet.initiatia, podschet.pilot, podschet.latent],
		backgroundColor: [
		'rgba(0, 99, 141)',
		'rgba(97, 225, 225)',
		'rgba(225, 32, 225)',
		"#63FF84",
		],

		borderWidth: 2,
		hoverBorderWidth: 0
	};

	let chartOptions = {
		title:{
			display: true,
			text: 'Стадии выполнения'
		},
		legend:{
			display: false
		},
		scales: {
			yAxes: [{
				barPercentage: 0.5
			}],
			xAxes: [{
				ticks: {
					beginAtZero:true,
					stepSize: 1
				}
			}]
		},
		elements: {
			rectangle: {
				borderSkipped: 'left',
			}
		}
	};

	barChart = new Chart(densityCanvas, {
		type: 'horizontalBar',
		data: {
			labels: [projects[0].stadiya, projects[1].stadiya, projects[2].stadiya, projects[3].stadiya],
			datasets: [densityData],
		},
		options: chartOptions
	});

	// Второй график

	let oilData = {
		labels: [projects[0].mashtab, projects[2].mashtab, projects[3].mashtab],
		datasets: [
		{
			data: [podschet.krupn, podschet.sredn, podschet.melki],
			backgroundColor: [
			"#FF6384",
			"#63FF84",
			"#8463FF",
			"#6384FF"
			]
		}]
	};

	let pieChart = new Chart(oilCanvas, {
		type: 'pie',
		data: oilData
	});

	// Третий график

	let densityData1 = {
		data: [podschet.kv1, podschet.kv2, podschet.kv3, podschet.kv4],
		backgroundColor: [
		'rgba(0, 99, 0)',
		'rgba(0, 225, 225)',
		'rgba(225, 99, 225)',
		"#84FF63"
		],

		borderWidth: 2,
		hoverBorderWidth: 0
	};

	let chartOptions1 = {
		title:{
			display: true,
			text: 'Количество обязательств'
		},
		legend:{
			display: false
		},
		scales: {
			yAxes: [{
				barPercentage: 0.5
			}],
			xAxes: [{
				ticks: {
					beginAtZero:true,
					stepSize: 1
				}
			}]
		},
		elements: {
			rectangle: {
				borderSkipped: 'left',
			}
		}
	};

	let barChart1 = new Chart(densityCanvas1, {
		type: 'horizontalBar',
		data: {
			labels: ["1 квартал", "2 квартал", "3 квартал", '4 квартал'],
			datasets: [densityData1],
		},
		options: chartOptions1
	}); 

	// Четвертый график

	let oilData1 = {
		labels: [redDinam[0].kray[0].name, redDinam[0].kray[1].name, redDinam[0].kray[2].name, redDinam[0].kray[3].name],
		// "Алтайский край","Москва","Московская область","Нижегородская область"
  		datasets: [{
    		data: [redDinam[0].kray[0]['2018'], redDinam[0].kray[1]['2018'], redDinam[0].kray[2]['2018'], redDinam[0].kray[3]['2018']],
  		  backgroundColor: [
     		 "rgba(255, 0, 0, 0.5)",
      		 "rgba(100, 255, 0, 0.5)",
      		 "rgba(200, 50, 255, 0.5)",
     		 "rgba(0, 100, 255, 0.5)"
   			 ]
 		 }]
	};
	
	let charoilCanvas1 = {
		startAngle: -Math.PI / 10,
		
		animation: {
		  animateRotate: false
		}
	  };


	let pieChart1 = new Chart(oilCanvas1, {

		type: 'polarArea',
		data: oilData1,
		options: charoilCanvas1
	});


	//MajorFigures

	$('#numall').text(projects.length);
	$('#numred').text(podschet.ispoln);
	$('#numwa').text(podschet.vliyaem);
	$('#numres').text(podschet.kv1 + podschet.kv2 + podschet.kv3 + podschet.kv4);
	$('#numresall').text(podschet.viObiaz);
	$('#numreswa').text(podschet.ejegod);
}


function onSlProj(e){
	slIndProj = e.selectedIndex;
	reSlKv();
	$('#tegName').text(grafObiaz[slIndProj].teg);
	$('#otvnameLiz').text(grafObiaz[slIndProj].control);
	$('#statusObiaz').text(grafObiaz[slIndProj].status);
	$('#description').text(grafObiaz[slIndProj].name);
	$('#otvSouza').text(grafObiaz[slIndProj].lala);
	$('#otvSouzaIst').text(grafObiaz[slIndProj].source);	
}

function reSlKv(){
	$('#sl_kv').empty();
	grafObiaz[slIndProj].list.forEach(function(value, key){
		$('#sl_kv').append(`
			<option value="${value.name}">${value.name}</option>
		`);
	});
}

function onSlKv(e){
	slIndKv = e.selectedIndex;
	$('#ctrlDate').text(grafObiaz[slIndProj].list[slIndKv].controlDate);
	$('#perc').text(grafObiaz[slIndProj].list[slIndKv].procent);
}

function onFilter(e) {
	let sortAr = [];
	podschet.mashtab = 0;
	podschet.initiatia = 0;
	podschet.pilot = 0;
	podschet.latent = 0;

	console.log(e.value);
	projects.forEach(function(value, key){
		if(value.mashtab == e.value) sortAr.push(projects[key]);
	});
	console.log(sortAr);
	sortAr.forEach(function(value, key){
		if(value.stadiya == 'Масштабирование') podschet.mashtab++;
		if(value.stadiya == 'Инициация') podschet.initiatia++;
		if(value.stadiya == 'Пилот') podschet.pilot++;
		if(value.stadiya == 'Латентный') podschet.latent++;
	});

	if(e.value == 'none') calcul();
	
	densityData.data = [podschet.mashtab, podschet.initiatia, podschet.pilot, podschet.latent]
	updateDataset(barChart, densityData);
}

function updateDataset(chart, data){
	chart.data.datasets.forEach((datasets)=>{datasets.data.pop()});
	chart.data.datasets.forEach((datasets)=>{datasets.data.push(data)});
	chart.update();
}

function calcul(){
	podschet = {
		// лев верх график
		mashtab: 0,
		initiatia: 0,
		pilot: 0,
		latent: 0,
		// прав верх график
		krupn: 0,
		sredn: 0,
		melki: 0,
		// лев низ график
		kv1: 0,
		kv2: 0,
		kv3: 0,
		kv4: 0,

		//majorFigures
		viObiaz: 0,
		ejegod: 0,
		ispoln: 0,
		vliyaem: 0
	};

	// Подсчитываем кол-во одинак данных для графиков
	projects.forEach(function(value, key){
		if(value.stadiya == 'Масштабирование') podschet.mashtab++;
		if(value.stadiya == 'Инициация') podschet.initiatia++;
		if(value.stadiya == 'Пилот') podschet.pilot++;
		if(value.stadiya == 'Латентный') podschet.latent++;

		if(value.mashtab == 'Крупный') podschet.krupn++;
		if(value.mashtab == 'средний') podschet.sredn++;
		if(value.mashtab == 'мелкий') podschet.melki++;

		if(value.smth == 'Исполняем') podschet.ispoln++;
		if(value.smth == 'Влияем') podschet.vliyaem++;
	});

	grafObiaz.forEach(function(value, key){
		let elm;
		if(value.status == 'снят с контроля') podschet.viObiaz++;
		if(value.ejegod == 'yes') podschet.ejegod++;
		value.list.forEach(function(zn, kl){
			if(zn.kv == '1') podschet.kv1++;
			if(zn.kv == '2') podschet.kv2++;
			if(zn.kv == '3') podschet.kv3++;
			if(zn.kv == '4') podschet.kv4++;
		});

		$('#sl_proj').append(`
			<option value="${value.teg}">${value.teg}</option>
		`);

	});

	reSlKv();
}