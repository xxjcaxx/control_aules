//funció per omplir els clients

clients={};
for(i=1;i<255;i++){
	clients[i]={'on':0, 'bloqued':0, 'select':0};
}


ipeth1=0; 
xarxaeth1=0;
ipeth0=0;
ipeth2=0;
percent_actualizar=0;
intervalos=[];
pause_actualizar=0;

function obtener_datos(opciones){
	var array;
	for(i=1;i<255;i++){
	clients[i]={'on':0, 'bloqued':0, 'select':clients[i]['select']};
	}

     return $.get('pcs.php',{opt:opciones},function(data){
           	array = data.split(';');
                console.log(array);
		for(i=0;i<array.length;i++){
			clients[array[i].split('.')[3]]['on']=1;        
			clients[array[i].split('.')[3]]['ip']=array[i];
		}
        });
    
}
function obtener_bloqued(){
     return $.get('pcs.php',{opt:"bloqued"},function(data){
			array = data.split(' ');
			if(array[0]!='') for(i=0;i<array.length;i++){
				clients[array[i].split('.')[3]]['bloqued']=1;
					}
		});
        
    
}

function get_pcs(act){
	$.when(obtener_datos(act),obtener_bloqued()).done(function(x){
	$("#panel").html("<span>Llista de clients:</span>");
	$("#panel").append('<div id="clients"></div>');
	$("#clients").append('<ul id="ul_clients"></ul>');
	for(i=1;i<255;i++){
		if(clients[i]['on']==1){
			$("#ul_clients").append('<li id="c'+clients[i]['ip']+'" client="'+i+'"><span>'+clients[i]['ip']+'</span>');
		}
	}
	$("#clients").append('<div><button type="button" id="act_clients">Actualitzar clients amb nmap</button></div>');
	f_pcs();
      	$.get('mapa.php',function(data){
		$("#panel").append(data);
	}).done(function(){f_mapa();});

	});
	return 1;
}


// El botó d'actualitzar clients
$(document).on("click","#act_clients",function(event){ l(); get_pcs("actualitzar");	});

//el Logo de control d'aula
$(document).on("click","#control",function(event){ refrescar();});

// El logo de totes les aules
$(document).on("click","#totes",function(event){
                l();
		$.get('totes.php', function(data){
				$("#panel").html("<span>Totes les aules</span>");
				$("#panel").append(data);
				}).done(function(){                             
					}); 
		});




// El gif de loading
function l(){ $("#panel").html('<img src="images/loading.gif"/>');}


// Refrescar IPtables i Llista de clients
function refrescar(){
				$.get('iptables.php',function(data){
				$("#actual").html('<span id="resiptables">Resultat de IPtables:</span>');
                                $("#actual").append('<span id="resipadv">Monitor QoS</span>');
				$("#actual").append(data);
				}).done(function(){
		                l();
				get_pcs("solo_ips");
                                $("#actual pre").hide();
                                //$("#actual span#resipadv").hide();
				$("#actual span#resiptables").on("click",function(event){$("#actual pre").toggle(400);/*$("#actual #resipadv").toggle(400);*/});
				});
				
}
// Mostrar coses de QoS
$(document).on("click","#actual span#resipadv",function(event){ console.log('QoS'); monitorQoS();});

// Inici del document on carrega tots els divs
$(function(){
                l(); //refrescar();
                 // mestres se carrega tot, podem anar donant funcionalitat als botons:
                $("#btots").on("click",function(event){bloquear('btots');});
                $("#dtots").on("click",function(event){bloquear('dtots');});
                $("#ralentir").on("click",function(event){slow(tipo='r');});
                $("#qos").on("click",function(event){slow(tipo='qos');});
                $("#reset").on("click",function(event){reset();});
		updateall();
                 
                $('#net').on("click",function(event){grafiques();});
                $('#pausar').on("click",function(event){pausar();});
                 
                // dades fonamentals
                ipeth1=$("#ipeth1").text(); 
		xarxaeth1=ipeth1.split(".")[0]+"."+ipeth1.split(".")[1]+"."+ipeth1.split(".")[2];
                ipeth0=$("#ipeth0").text();
                ipeth2=$("#ipeth2").text();
               
		capturarMapa();
	        $('#seleccionar_clientes').hide();	
		});


// Funció per a donar color i format als clients
function f_pcs(){
	$("#panel ul li").each(function(i){
			var ip=$(this).attr('id');
                        var client=$(this).attr('client');
	
          		if(client>250){	$(this).addClass('servers');} 
			else if(client==100){$(this).addClass('profe');}
			else { if(client<100){$(this).addClass('desconeguts');}

			var $block = $('<img title="Bloquear esta IP"  id="b'+ip+'" class="bloquea" alt="Bloquea esta IP" src="images/connected.png"/>');
                        if(clients[client]['bloqued']==1){$(this).addClass('off'); $block.attr('src','images/disconnected.png');};
			$(this).append($block);
			$block.on("click",function(event){ 
                                var scroll = $(window).scrollTop();
				if(!$(this).parent().hasClass('off')){
					bloquear(ip.substring(1));
				} else {
					desbloquear(ip.substring(1));
				}
                                $("html").scrollTop(scroll);
			});
			}
                        // les estadistiques per client
			$(this).on("click", function(event){
				mostrar_acct($(this),ip.substring(1));

			});
	});

			// mostrar la tortuga
			if($("#actual").text().indexOf('hashlimit') > 0 ){
                                console.log('tortuga');
				turtle('put');
				}
}

function f_mapa(){
        var t = Math.random()
	for(i=101;i<125;i++){
		if(clients[i]['on']==1){
			$('#mapa_pantalla_'+i).css({'background-color':'#1ABC9C','background-image':'url("images/graph/control_aules/captura'+i+'.jpg?'+t+'")','background-size': 'contain'}).html('<span class="mapa_pc_numero">'+i+'</span>') ;
                        //console.log(i); 
		} else {
			$('#mapa_pantalla_'+i).html('<img src="images/apagar.svg" id="wol'+i+'" class="wol" />')
	                $('#wol'+i).on('click',function(event){
				wol($(this).attr('id'));
                	 });

			}
	}

}

///////////////////////// BLOQUEAR ///////////////////////////////////////

function bloquear(ip){
        l();        
	$.get('bloquear.php',{ip:ip},function(data){}).done(function(){
        refrescar();
	 }); 
	} 
function desbloquear(ip){
	l();
        $.get('bloquear.php',{ipd:ip},function(data){}).done(function(){
        refrescar();
	 });
	} 


///////////////////////// RALENTIR /////////////////////

function slow(tipo){

 if($('.turtle').length == 0) {
        l();
	var velocitat = $('#velocitat').val();
	var streaming = $('#streaming').val();
	var burst = $('#burst').val();
	var mode = $('#banmode').val();
	$.get('slow.php',{v:velocitat,s:streaming,l:burst,m:mode,tipo:tipo},function(data){}).done(function(){console.log('Lent'); refrescar(); });
	}
}

function turtle(act){
	if(act=='put'){
        	$("#panel ul li").each(function(i){
			$(this).prepend('<img class="turtle" src="images/turtle.png" title="Ralentizat" />');
		});
	}	
	if(act=='del'){
                 $('.turtle').each(function(i){$(this).remove();}); 
	}
}

function reset(){
        l();
	$.get('reset.php',function(data){}).done(function(){console.log('Reset'); 
		 turtle('del');
                 refrescar();
           });
}

/////////////////////////////// GRAFIQUES /////////////////

//Seleccionar clientes
$(document).on("click","#ocultar_seleccionar",function(event){ $('#seleccionar_clientes').toggle('600'); });

$(document).on("click","label.input_container",function(event){
	if( $(event.target).is("input") ) {
		//console.log($(event.target).prop('checked'));
		if ($(event.target).prop('checked')){ clients[$(event.target).attr('value')]['select']=1;}
		else { clients[$(event.target).attr('value')]['select']=0;}
		//console.log(clients);
                seleccionats=[]
		for(i=1;i<255;i++){
			if(clients[i]['select']==1){seleccionats.push(xarxaeth1+"."+i)}
		}
	        //console.log(seleccionats);	

		$.post( "seleccionar_clients.php", { 'llista_clients[]': seleccionats } );
	}

});


function updaten() {
	$("#graphxarxa").attr('src', $("#graphxarxa").attr('src')+'?'+Math.random());
        $("#estadistiques_hora").html('10 Minuts:</br> <img src="images/graph/control_aules/total5minuts.png?'+Math.random()+'"/></br> 2 hores: </br><img src="images/graph/control_aules/totalhora.png?'+Math.random()+'"/></br>');
        $("#estadistiques_hui").html('<img src="images/graph/control_aules/total.png?'+Math.random()+'"/>');
        $("#estadistiques_setmana").html('<img src="images/graph/control_aules/totalsemana.png?'+Math.random()+'"/>');
        $("#estadistiques_setmana").append('<img src="images/graph/control_aules/totalsemanamedia.png?'+Math.random()+'"/>');
        refrescar();
	capturarMapa();
        percent_actualizar=0;
}

function updateall(){
        updaten();
	intervalos[0]=window.setInterval(updaten, 60000);
        intervalos[1]=window.setInterval(function(){
		percent_actualizar+=1; 
		$('#progress_actualizar').val(percent_actualizar);
	},600);
}

function pausar(){
	if(pause_actualizar==0){
		pause_actualizar=1;
		window.clearInterval(intervalos[0])
		window.clearInterval(intervalos[1])
		$('#pausar').html('▶');
	}
	else {
		pause_actualizar=0;
		updateall();
		$('#pausar').html('⏸');
	}
}

function grafiques(){
	if($("#graphxarxa").length == 0) { $("#net").append('<img id="graphxarxa" src="images/graph/output.png"/>'); $("#mostrarg").remove(); }
	else { $("#graphxarxa").remove(); $("#net").append('<span id="mostrarg">(Gràfics en Kbits/s)</span>'); }
}

function mostrar_acct($linea,ip){

        var n = ip.split(".");
	if($linea.find('span.consum').length==0){
  		$.getJSON("ips_acct.js",function(data){
		console.log("Acct: "+ip);

			$linea.append('<span class="consum">Consum: in: '+data[ip]['in']+' out: '+data[ip]['out']+' <img  class="graph" src="images/graph/control_aules/spd'+n[3]+'.png"/></span>');
                	$linea.after('<a class="acaptura" id="image'+n[3]+'" href="images/graph/control_aules/captura'+n[3]+'.jpg" target="_blank"><span class="capturar" id="capturar'+n[3]+'"></span></a>');
		//	$linea.after('<input type="text" name="proces" id="proces'+n[3]+'" value="Proces"></input>');
               		 capturar(n[3]);
		}).done(function(){console.log(ip);});
                $linea.find('img.bloquea').after('<img src="images/apagar.svg" id="apagar'+n[3]+'" class="apaga" />');
                $linea.find('img.bloquea').after('<img src="images/alert.png" id="notifi'+n[3]+'" class="notifica" />');
                $('#apagar'+n[3]).on('click',function(event){
			apagar($(this).attr('id'));
                 });
                $('#notifi'+n[3]).on('click',function(event){
			notificar($(this).attr('id'));
                 });
	}

	else {
		$linea.find('span.consum').remove();
                $("#capturar"+n[3]).remove();
                $linea.find('img.apaga').remove();
                $linea.find('img.notifica').remove();
                $('#proces'+n[3]).remove();
	     }

}

///////////////////////////////////////////////////CAPTURES////////////////////////

function capturar(n){
  $.get('capturar.php',{ip:n},function(data){}).done(function(){
                $("#capturar"+n).append('<img src="images/graph/control_aules/captura'+n+'.jpg" />');
		});
}

function capturarSolo(n){
  $.get('capturar.php',{ip:n},function(data){}).done(function(){console.log(n)});
}
function capturarTodos(t){
  $.get('capturar.php',{targets:t},function(data){}).done(function(){console.log(t)});
}

function capturarMapa(){
targets="";
for(i=101;i<125;i++){
 if(clients[i]['on']==1) {
        targets=targets+" "+i;
 }
}
//console.log(targets);
$.get('observar.php');
}



////////////////////////////////////////////////////////////ADMINSTRACIO//////////////////////////////
function apagar(id){
  n=id.substring(6);
  $.get('apagar.php',{ip:n},function(data){console.log(data);}).done(function(){
	});
}
function wol(id){
  n=id.substring(3);
  $.get('wol.php',{ip:n},function(data){console.log(data);}).done(function(){
	});
}
function notificar(id){
	n=id.substring(6);
  	$.get('notificar.php',{ip:n,mensaje:'hola mon'},function(data){console.log(data);}).done(function(){
	});
}

/////////////////////////////////////////////MONITOR AVANÇAT ///////////////////////////////////////
function monitorQoS(){
 $.get('monitorqos.php',function(data){
                                $("#actual pre").remove();
                                $("#actual").append(data);
                                });
}


/*
TODO:

bloquear desde cliente

Gràfics dels clients més actius


*/
