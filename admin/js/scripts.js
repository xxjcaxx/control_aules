
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
					});
		});

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
			
			if($("#actual").text().indexOf(ip.substring(1)) > 0 ){
				$(this).addClass('off');
			        $block.attr('src','images/disconnected.png');
				}

			$(this).append($block);
			$block.on("click",function(event){ 
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
				});  },1000);


			});

			}

	});
}

function bloquear(ip){
	$.get('bloquear.php',{ip:ip},function(data){}).done(function(){console.log('bloqueado '+ip)});
	} 
function desbloquear(ip){
	$.get('bloquear.php',{ipd:ip},function(data){}).done(function(){console.log('desbloqueado '+ip)});
	} 


