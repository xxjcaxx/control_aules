$(document).on("click","#act_clients",function(event){
$("#panel").html('<img src="images/loading.gif"/>');

$.get('pcs.php',{ opt: "actualitzar" },function(data){
$("#panel").html("<span>Llista de clients:</span>");
$("#panel").append(data);
}).done(function(){                             
f_pcs();
}); 
});



$(function()
{

$.get('iptables.php',function(data){
$("#actual").append("<span>resultat de IPtables:</span>");
$("#actual").append(data);
});
$.get('pcs.php',function(data){
$("#panel").html("<span>Llista de clients:</span>");
$("#panel").append(data);
}).done(function(){
//console.log($("#panel ul li"));
//$("#panel ul li").css('color','red');
f_pcs();
});

});




function f_pcs(){


$("#panel ul li").each(function(i){
ip=$(this).attr('id');
console.log(ip);
if(/^c192.168.[0-9]+.25[0-4]/.test(ip)){
$(this).addClass('servers');
} 
else {

$(this).append('<img title="Bloquear esta IP" id="b'+ip+'" alt="Bloquea esta IP" src="images/connected.png"/>');

if(/^c192.168.[0-9]+.[0-9]{1,2}$/.test(ip)){$(this).addClass('desconeguts');}
}
});
}
