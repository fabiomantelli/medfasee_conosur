<?php 
session_start();
?>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Proyecto MedFasee .:. Monitoreo del sistema el&eacute;ctrico en tiempo real</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.7">
    <script language="JavaScript" src="js/jquery-3.3.1.min.js"></script>
    <script language="JavaScript" src="js/dadospdc.js"></script>
	<script language="JavaScript" src="js/math.js"></script>
	<script language="JavaScript" src="js/componentSimetricaPositiva.js"></script>
    <script language="JavaScript" src="js/fasores.js"></script>
    <script language="JavaScript" src="js/ajustepmu.js"></script>
    <link rel="stylesheet" type="text/css" href="css/estrutura.css" />



</head>
<body>

<input type="hidden" id="pos"/>

<center>
<input type="hidden" id="sessao" value="<?=isset($_SESSION['referencia']);?>"/>

    <div class="mapa">


	<div class="conteudo"> 
		
	    
	    <div class="freq_hora" >
	    
		    <div class="chile">
		        <div class='frequencia freqchile' id="frequencia"> 00.0000 Hz  </div>
		        <div class='hora horachile' id="hora"> 00:00:00 00/00/0000 </div> 
		     </div>
	        
	        <div class="argentina">
	        		
	        		 <div class='frequencia freqArgentina' id="frequenciaArgentina"> 00.0000 Hz  </div>
	        		 <div class='hora horaArgentina' id="hora"> 00:00:00 00/00/0000 </div> 
	        
	        </div>
	       
	
		</div>
	 	
	    
	        <div class="seqPositiva">
	        
	            <div class='fasorSeqPos1 seqPos' id="seqPmu1" style="display:none"> </div><!-- uda -->
	            <div class='fasorSeqPos2 seqPos' id="seqPmu2" style="display:none">  </div><!-- USACH -->
	            <div class='fasorSeqPos3 seqPos' id="seqPmu3" style="display:none">  </div><!-- utem -->
	            <div class='fasorSeqPos4 seqPos' id="seqPmu4" style="display:none"></div><!-- udec -->
	            <div class='fasorSeqPos9 seqPos' id="seqPmu9" style="display:none"></div><!-- ufro -->
	            <div class='fasorSeqPos10 seqPos' id="seqPmu10" style="display:none"></div><!-- uta -->
	            <div class='fasorSeqPos12 seqPos hidden' id="seqPmu12" style="display:none"></div><!-- utalca -->
	            
	           
	        </div>
	        
	        
	          <div class="seqPositivaArgentina">
	         
	        
	            <div class='fasorSeqPos5 seqPos' id="seqPmu5" style="display:none"> </div><!-- unt -->
	            <div class='fasorSeqPos6 seqPos' id="seqPmu6" style="display:none">  </div><!-- unsj -->
	            <div class='fasorSeqPos7 seqPos' id="seqPmu7" style="display:none"></div><!-- unlp -->
	            <div class='fasorSeqPos8 seqPos' id="seqPmu8" style="display:none"></div><!-- Unco -->
                <div class='fasorSeqPos11 seqPos' id="seqPmu11" style="display:none"></div><!-- pucv -> UTEC -->
	        
	        </div>
	        
	        
	        <div class="chile">
	         	<div id="circChile" style="display:block"></div>
	        </div> 
	        
	         <div class="argentina">
	         	<div id="circArgentina" style="display:block"></div>
	 		</div> 
	 		
	 		
	  		<div class="pmu1 chile" id="1"><!-- uda -->
		        <div class='faseA' id="va"> </div>
	            <div class='faseB' id="vb">  </div>
	            <div class='faseC' id="vc"></div>
	           
	        </div>
	        
	
	 
	         <div class="pmu2 chile" id="2"><!-- usach -->
				<div class='faseC' id="vc"></div>
	            <div class='faseA' id="va"> </div>
	            <div class='faseB' id="vb">  </div>
	            
	        </div>
	        
	        <div class="pmu3 chile" id="3"><!-- utem -->
	            <div class="fasores">
	                <div class='faseA' id="va"> </div>
	                <div class='faseB' id="vb"> </div>
	                <div class='faseC' id="vc"> </div>
	               
	            </div>
	
	        </div>
	
	        <div class="pmu4 chile" id="4"><!-- udec -->
				<div class='faseC' id="vc"></div>
	            <div class='faseA' id="va"> </div>
	            <div class='faseB' id="vb">  </div>
	           
	        </div>
	        
	         <div class="pmu9 chile" id="9"><!-- ufro -->
				<div class='faseC' id="vc"></div>
	            <div class='faseA' id="va"> </div>
	            <div class='faseB' id="vb">  </div>
	           
	        </div>
	        

	        
	         <div class="pmu12 chile" id="12"><!-- utalca -->
				<div class='faseC' id="vc"></div>
	            <div class='faseA' id="va"> </div>
	            <div class='faseB' id="vb">  </div>
	           
	        </div>
	                
	        
	         <div class="pmu10 chile" id="10"> <!-- uta -->
				<div class='faseC' id="vc"></div>
	            <div class='faseA' id="va"> </div>
	            <div class='faseB' id="vb">  </div>
	           
	        </div>
			
	        <!-- Argentina -->
	         <div class="pmu5 argentina" id="5">
				<div class='faseC' id="vc"></div>
	            <div class='faseA' id="va"> </div>
	            <div class='faseB' id="vb">  </div>
	           
	        </div>
	        
	         <div class="pmu6 argentina" id="6">
				<div class='faseC' id="vc"></div>
	            <div class='faseA' id="va"> </div>
	            <div class='faseB' id="vb">  </div>
	            
	        </div>
	        
	         <div class="pmu7 argentina" id="7">
				<div class='faseC' id="vc"></div>
	            <div class='faseA' id="va"> </div>
	            <div class='faseB' id="vb">  </div>
	            
	        </div>
	        
	         <div class="pmu8 argentina" id="8">
				<div class='faseC' id="vc"></div>
	            <div class='faseA' id="va"> </div>
	            <div class='faseB' id="vb">  </div>
	            
	        </div>

            <div class="pmu11 argentina" id="11"><!-- UTEC -->
                <div class='faseC' id="vc"></div>
                <div class='faseA' id="va"> </div>
                <div class='faseB' id="vb">  </div>

            </div>
	       
	     
	        
	       
	        <div class="referencias"">
		        <div class="refchile">
		        
		        		<div class="ref1 refchile">    <input type="radio"  name="referencias" class="radioReferenciasChile " value="color2" id=1  /> <label > <span id="sp1" style="color:#4C0066">UDA </span> - Universidad de Atacama </label></div>
		        		<div class="ref2 refchile">    <input type="radio"  name="referencias" class="radioReferenciasChile" value="color2" id=2  /> <label> <span id="sp2" style="color:#B25900" >USACH  </span>- Universidad de Santiago de Chile </label></div>
						<div class="ref3 refchile">    <input type="radio"  name="referencias" class="radioReferenciasChile" value="color2" id=3 /> <label> <span id="sp3" style="color:#95959F">UTEM  </span>- Universidad Tecnológica Metropolitana  </label></div>
		                <div class="ref4 refchile">    <input type="radio"  name="referencias" class="radioReferenciasChile" value="color2" id=4 /> <label> <span id="sp4" style="color:#B28500" >UdeC  </span>- Universidad de Concepción </label></div>
						<div class="ref9 refchile">    <input type="radio"  name="referencias" class="radioReferenciasChile" value="color2" id=9 /> <label> <span id="sp9" style="color:#4DA6FF" >UFRO  </span>- Universidade de La Frontera </label></div>
		         		<div class="ref10 refchile">    <input type="radio"  name="referencias" class="radioReferenciasChile" value="color2" id=10  /> <label> <span id="sp10" style="color:#FFA64D" >UTA  </span>- Universidad de Tarapac&aacute; </label></div>
						<div class="ref12 refchile" style="color:#CACAD9">    <input type="radio"  name="referencias" class="radioReferenciasChile "  id=12  /> <label > <span id="sp12" style="color:#D90000">UTalca </span> - Universidad de Talca  </label></div>
		
		            </div>
		            
		         <div class="refargentina">
		                <div class="ref5 refargentina ">    <input type="radio"  name="referenciasArgentina" class="radioReferenciasArgentina " value="color2" id=5 checked /> <label > <span id="sp5" style="color:#00008C">UNT </span> - Universidad Nacional de Tucum&aacute;n  </label></div>
                        <div class="ref11 refargentina">    <input type="radio"  name="referenciasArgentina" class="radioReferenciasArgentina " value="color2" id=11  /> <label > <span id="sp11" style="color:#00B200">UTEC </span> - Universidad Tecnológica del Uruguay </label></div>

                        <div class="ref6  refargentina">    <input type="radio"  name="referenciasArgentina" class="radioReferenciasArgentina" value="color2" id=6 /> <label> <span id="sp6" style="color:#8C0000" >UNSJ  </span>- Universidad Nacional de San Juan </label></div>
		                <div class="ref7 refargentina">    <input type="radio"  name="referenciasArgentina" class="radioReferenciasArgentina" value="color2" id=7  /> <label>  <span id="sp7" style="color:#003F10" >UNLP  </span>- Universidad Nacional de La Plata   </label></div>
		                <div class="ref8 refargentina ">    <input type="radio"  name="referenciasArgentina" class="radioReferenciasArgentina" value="color2" id=8 /> <label> <span id="sp8" style="color:#008C8C" >UNCo  </span>- Universidad Nacional del Comahue </label></div>
                 </div>
		            
	          </div>
	
	
	
	
	    </div>
</div>    
   
<script>



</script>
</center>
</body>
</html>
