
// El botó d'actualitzar clients
$(document).on("click","#act_clients",function(event){
		$("#panel").html('<img src="images/loading.gif"/>');
		$.get('pcs.php',{ opt: "actualitzar" },function(data){
				$("#panel").html("<span>Llista de clients:</span>");
				$("#panel").append(data);
				}).done(function(){                             
					f_pcs();
					}); 
		});



// Inici del document on carrega tots els divs
$(function()
		{

		$.get('iptables.php',function(data){
				$("#actual").append("<span>resultat de IPtables:</span>");
				$("#actual").append(data);
				}).done(function(){
				$.get('pcs.php',function(data){
					$("#panel").html("<span>Llista de clients:</span>");
					$("#panel").append(data);
					}).done(function(){
					//console.log($("#panel ul li"));
					//$("#panel ul li").css('color','red');
					f_pcs();
					}).done(function(){ // Ja tinc tot fet, passe a donar format js a algunes coses
                                        $("#actual pre").hide();
					$("#actual span").on("click",function(event){$("#actual pre").toggle(400);});

                                                
                                        });
                                  
 

		});
                 // mestres se carrega tot, podem anar donant funcionalitat als botons:
                $("#btots").on("click",function(event){bloquear('btots');});
                $("#dtots").on("click",function(event){bloquear('dtots');});
                $("#ralentir").on("click",function(event){slow();});
                $("#reset").on("click",function(event){reset();});

		grafics = $(".line").peity("line",{'height':'50px','width':'200px'});
		updaten();
                
                $('#eth0in').on("click",function(event){grafiques();});
                // http://benpickles.github.io/peity/#pie-charts

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
			var $block = $('<img title="Bloquear esta IP"  id="b'+ip+'" alt="Bloquea esta IP" src="images/connected.png"/>');
			

			// Per mostrar els desconnectats i els ralentits
			if($("#actual").text().indexOf(ip.substring(1)) > 0 ){
				$(this).addClass('off');
			        $block.attr('src','images/disconnected.png');
				}
i

			$(this).append($block);
			$block.on("click",function(event){ 
                                var scroll = $(window).scrollTop();

				if(!$(this).parent().hasClass('off')){
					bloquear(ip.substring(1));
					$(this).parent().addClass('off');
					$(this).attr('src','images/disconnected.png');
				} else {
					desbloquear(ip.substring(1));
					$(this).parent().removeClass('off');
					$(this).attr('src','images/connected.png');
				}
				$("#actual").html('');
				setTimeout(function(){     
				$.get('iptables.php',function(data){
				$("#actual").append("<span>resultat de IPtables:</span>");
				$("#actual").append(data);
                                        $("#actual pre").hide();
					$("#actual span").on("click",function(event){$("#actual pre").toggle(400);});
				});  },1000);
                                $("html").scrollTop(scroll);
			});

			}

	});

			// mostrar la tortuga
			if($("#actual").text().indexOf('noqueue') < 0 ){
				turtle('put');

				}
}


///////////////////////// BLOQUEAR ///////////////////////////////////////

function bloquear(ip){
	$.get('bloquear.php',{ip:ip},function(data){}).done(function(){console.log('bloqueado '+ip)});
	} 
function desbloquear(ip){
	$.get('bloquear.php',{ipd:ip},function(data){}).done(function(){console.log('desbloqueado '+ip)});
	} 


///////////////////////// RALENTIR /////////////////////

function slow(){

 if($('.turtle').length == 0) {

	var velocitat = $('#velocitat').val();
	$.get('slow.php',{v:velocitat},function(data){}).done(function(){console.log('Lent')});
     //   $("#panel ul li").each(function(i){
	//$(this).prepend('<img class="turtle" src="images/turtle.png" title="Ralentizat" />');
	
	//});
        turtle('put');
	}
}

function turtle(act){
if(act=='put'){

        $("#panel ul li").each(function(i){
	$(this).prepend('<img class="turtle" src="images/turtle.png" title="Ralentizat" />');
	console.log('put');
	});
}
if(act=='del'){

                 $('.turtle').each(function(i){$(this).remove();}); 
	
}
}

function reset(){
       
	$.get('reset.php',function(data){}).done(function(){console.log('Reset'); 
                 $('.turtle').each(function(i){$(this).remove();}); 
           });

}


/////////////////////////////// GRAFIQUES /////////////////

function updaten() {
	  $.get("xarxa.php",{q:'in'}, function(data) {
		      $("#eth0in span.line").html(data);
                     // console.log( $("#eth0in span.line").html(data));
		     // console.log(data);
                      grafics.change();
                      var arr = data.split(',');
                      var max = Math.max(...arr);
                      $('#min').html(max);
                      $("#eth0in")
		          window.setTimeout(updaten, 60000);
		      });
	  $.get("xarxa.php",{q:'out'}, function(data) {
		      $("#eth0out span.line").html(data);
                     // console.log( $("#eth0in span.line").html(data));
		     // console.log(data);
                      grafics.change();

                      var arr = data.split(',');
                      var max = Math.max(...arr);
                      $('#mout').html(max);
		          //window.setTimeout(updaten, 10000);
		      });
		if($("#graphxarxa").length > 0) 
		 $("#graphxarxa").attr('src', $("#graphxarxa").attr('src')+'?'+Math.random());
}

function grafiques(){

if($("#graphxarxa").length == 0) $("#net").append('<img id="graphxarxa" src="images/graph/output.png"/>');
else $("#graphxarxa").attr('src', $("#graphxarxa").attr('src')+'?'+Math.random());
}
