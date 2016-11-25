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
$(this).append('<img alt="Bloquea esta IP" src="images/connected.png"/>');
});
}
