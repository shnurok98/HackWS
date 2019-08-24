let posAr = true;

function onShowBars(pos){
	if(pos){
		// $('.statusBar').animate({'top': '-40px'});
		$('.sideBar').animate({'left': '-215px'});
		$('.showIcon').css({'transform': 'rotate(0deg)'});
		$('#showBar').animate({'left': '1px'});
		
		$('.armor').css({'display': 'none'});
	}else{
		// $('.statusBar').animate({'top': '0px'});
		$('.sideBar').animate({'left': '0px'});
		$('.showIcon').css({'transform': 'rotate(180deg)'});
		$('#showBar').animate({'left': '215px'});

		$('.armor').css({'display': 'block'});
	};



	posAr = !pos;
}

