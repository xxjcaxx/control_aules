//funció per omplir els clients

clients={};
for(i=1;i<255;i++){
	clients[i]={'on':0};
}

ipeth1=0; 
xarxaeth1=0;
ipeth0=0;
ipeth2=0;

function obtener_datos(){
	var array;
	for(i=1;i<255;i++){
	clients[i]={'on':0};
	}
	$.get('pcs.php',{opt:"solo_ips"},function(data){
           	array = data.split(';');
		for(i=0;i<array.length;i++){
			clients[array[i].split('.')[3]]['on']=1;
		}
        });

}

function get_pcs(){
		$.get('pcs.php',{ opt: "actualitzar"},function(data){
				$("#panel").html("<span>Llista de clients:</span>");
				$("#panel").append(data);
				}).done(function(){                             
					f_pcs();
                                	obtener_datos();
                			$.get('mapa.php',function(data){
						$("#panel").append(data);
					}).done(function(){f_mapa();}); 
					});

}


// El botó d'actualitzar clients
$(document).on("click","#act_clients",function(event){
		$("#panel").html('<img src="images/loading.gif"/>');
                get_pcs();
		});

//el Logo de control d'aula
$(document).on("click","#control",function(event){ refrescar();});

// El logo de totes les aules
$(document).on("click","#totes",function(event){
		$("#panel").html('<img src="images/loading.gif"/>');
		$.get('totes.php', function(data){
				$("#panel").html("<span>Totes les aules</span>");
				$("#panel").append(data);
				}).done(function(){                             
					}); 
		});

// Refrescar IPtables i Llista de clients
function refrescar(){
		$.get('iptables.php',function(data){
				$("#actual").html("<span>resultat de IPtables:</span>");
				$("#actual").append(data);
				}).done(function(){

		                $("#panel").html('<img src="images/loading.gif"/>');
				get_pcs();
                                $("#actual pre").hide();
				$("#actual span").on("click",function(event){$("#actual pre").toggle(400);});
				});
}

// Inici del document on carrega tots els divs
$(function(){
                refrescar();
                 // mestres se carrega tot, podem anar donant funcionalitat als botons:
                $("#btots").on("click",function(event){bloquear('btots');});
                $("#dtots").on("click",function(event){bloquear('dtots');});
                $("#ralentir").on("click",function(event){slow();});
                $("#reset").on("click",function(event){reset();});
    //            $("#capturartots").on("click",function(event){capturartots();});

		grafics = $(".line").peity("line",{'height':'50px','width':'200px'});
		updaten();
                 
                $('#eth0in').on("click",function(event){grafiques();});
                // http://benpickles.github.io/peity/#pie-charts
                 
                // dades fonamentals
                ipeth1=$("#ipeth1").text(); 
		rxaeth1=ipeth1.split(".")[0]+"."+ipeth1.split(".")[1]+"."+ipeth1.split(".")[2];
                ipeth0=$("#ipeth0").text();
                ipeth2=$("#ipeth2").text();
               
		capturarMapa();
		});

// Funció per a donar color i format als clients
function f_pcs(){
	$("#panel ul li").each(function(i){
			var ip=$(this).attr('id');
			//console.log(ip);
			if(/^c192.168.[0-9]+.25[0-4]/.test(ip)){
			$(this).addClass('servers');
			} 
			else if(/^c192.168.[0-9]+.100$/.test(ip)){$(this).addClass('profe');}
			else {
			if(/^c192.168.[0-9]+.[0-9]{1,2}$/.test(ip)){$(this).addClass('desconeguts');}
			var $block = $('<img title="Bloquear esta IP"  id="b'+ip+'" class="bloquea" alt="Bloquea esta IP" src="images/connected.png"/>');
			

			// Per mostrar els desconnectats mire en els IPtables actuals a vore si està la IP
			if($("#actual").text().indexOf(ip.substring(1)) > 0 ){
				$(this).addClass('off');
			        $block.attr('src','images/disconnected.png');
				}



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
			if($("#actual").text().indexOf('noqueue') < 0 ){
				turtle('put');
				}
}

function f_mapa(){
        var t = Math.random()
	for(i=101;i<125;i++){
		if(clients[i]['on']==1){
			$('#mapa_pantalla_'+i).css({'background-color':'#1ABC9C','background-image':'url("images/graph/control_aules/captura'+i+'.jpg?'+t+'")','background-size': 'contain'}).html('<span class="mapa_pc_numero">'+i+'</span>') ;
                        //console.log(i); 
		}
	}

}


///////////////////////// BLOQUEAR ///////////////////////////////////////

function bloquear(ip){
        
	$("#panel").html('<img src="images/loading.gif"/>');
	$.get('bloquear.php',{ip:ip},function(data){}).done(function(){
        refrescar();
	 }); 
	} 
function desbloquear(ip){
	$("#panel").html('<img src="images/loading.gif"/>');
	$.get('bloquear.php',{ipd:ip},function(data){}).done(function(){
        refrescar();
	 });
	} 


///////////////////////// RALENTIR /////////////////////

function slow(){

 if($('.turtle').length == 0) {

	var velocitat = $('#velocitat').val();
	$.get('slow.php',{v:velocitat},function(data){}).done(function(){console.log('Lent'); refrescar(); });
       // turtle('put');
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
       
	$.get('reset.php',function(data){}).done(function(){console.log('Reset'); 
                 $('.turtle').each(function(i){$(this).remove();}); 
                 refrescar();
           });
}


/////////////////////////////// GRAFIQUES /////////////////

function updaten() {
	  $.get("xarxa.php",{q:'in'}, function(data) {
		      $("#eth0in span.line").html(data);
                      grafics.change();
                      var arr = data.split(',');
                      var max = Math.max(...arr);
                      $('#min').html(max);
                  //    $("#eth0in")
		          window.setTimeout(updaten, 60000);
		      });
	  $.get("xarxa.php",{q:'out'}, function(data) {
		      $("#eth0out span.line").html(data);
                      grafics.change();

                      var arr = data.split(',');
                      var max = Math.max(...arr);
                      $('#mout').html(max);
		      });
		//if($("#graphxarxa").length > 0) 
		 $("#graphxarxa").attr('src', $("#graphxarxa").attr('src')+'?'+Math.random());
		 $("#graphtotal").attr('src', $("#graphtotal").attr('src')+'?'+Math.random());
                 $("#estadistiques_hui").html('<img src="images/graph/control_aules/total.png?'+Math.random()+'"/>');

                 $("#estadistiques_setmana").html('<img src="images/graph/control_aules/totalsemana.png?'+Math.random()+'"/>');
}

function grafiques(){
	if($("#graphxarxa").length == 0) $("#net").append('<img id="graphxarxa" src="images/graph/output.png"/>');
	else $("#graphxarxa").remove();
	if($("#graphtotal").length == 0) $("#net").append('<p id="graphtotal"><img src="images/graph/control_aules/total.png"/><img src="images/graph/control_aules/totalsemana.png"/></p>');
	else $("#graphtotal").remove();
}

function mostrar_acct($linea,ip){

        var n = ip.split(".");
	if($linea.find('span.consum').length==0){
  		$.getJSON("ips_acct.js",function(data){
		console.log("Acct: "+ip);

			$linea.append('<span class="consum">Consum: in: '+data[ip]['in']+' out: '+data[ip]['out']+' <img  class="graph" src="images/graph/control_aules/spd'+n[3]+'.png"/></span>');
                	$linea.after('<a class="acaptura" id="image'+n[3]+'" href="images/graph/control_aules/captura'+n[3]+'.jpg" target="_blank"><span class="capturar" id="capturar'+n[3]+'"></span></a>');
               		 capturar(n[3]);
		});
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

function capturarMapa(){
console.log('capturar');
for(i=101;i<125;i++){
 if(clients[i]['on']==1) {
	console.log("capturant: "+i);
	capturarSolo(i);
 }
}
setTimeout(capturarMapa, 60000);
f_mapa();
}



////////////////////////////////////////////////////////////ADMINSTRACIO//////////////////////////////
function apagar(id){
  n=id.substring(6);
  $.get('apagar.php',{ip:n},function(data){console.log(data);}).done(function(){
});
}

function notificar(id){

n=id.substring(6);
  $.get('notificar.php',{ip:n,mensaje:'hola mon'},function(data){console.log(data);}).done(function(){

});
}

/*
TODO:

Wakeonlan

ansible

bloquear desde cliente


Gràfics dels clients més actius

Detectar el sistema operatiu del clients

Capturar pantalles:
export DISPLAY=:0
export XAUTHORITY=/home/$(who | grep 'tty7' | cut -d" " -f1)/.Xauthority
scrot captura.png
ssh root@192.168.9.111 /root/captura.sh
scp root@192.168.9.111:/home/captura.png ./admin/
http://raspberrypi.stackexchange.com/questions/12838/capturing-screenshot-over-ssh
ssh root@192.168.9.101 'bash -s' < captures.sh > /var/lib/control_aules/client1.png

Obtindre una terminal:
https://github.com/krishnasrinivas/wetty

*/
