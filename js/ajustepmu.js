/*altura dos elementos e pmus*/

function ajustePmu(){
    	
    	 
    	var p = $('#pos');
		var position = p.offset();
		 
		var diferenca = 0;
		
		var chromeajuste = 0;
	
		var etop = position.top;
		
		if (etop>0){
			
			diferenca = etop;
		}


		/*ColunaEsquerda*/
	    $(".pmu10").offset({ top: etop + 30-diferenca}); //uta
	    $(".pmu1").offset({ top: etop + 30-diferenca});//uda
		$(".pmu3").offset({ top: etop + 143-diferenca});//utem
		$(".pmu12").offset({ top: etop + 363-diferenca}); //utalca
		$(".pmu4").offset({ top: etop + 475-diferenca}); //udec
		$(".pmu9").offset({ top: etop + 585-diferenca}); //ufro


		/*ColunaDireita*/
		$(".pmu5").offset({ top: etop + 30-diferenca});//Unt
	    $(".pmu11").offset({ top: etop + 143-diferenca}); //UTEC
		$(".pmu6").offset({ top: etop + 254-diferenca}); //UNSJ
		$(".pmu2").offset({ top: etop + 254-diferenca}); //USACH
		$(".pmu7").offset({ top: etop + 363-diferenca}); //unlp
		$(".pmu8").offset({ top: etop + 475-diferenca}); //Unco
		
	
		
		$(".referencias").offset({ top: etop + 465-diferenca});
	
}



