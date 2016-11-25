
$(document).on("click","#act_clients",function(event){
$("#panel").html('<img src="images/loading.gif"/>');

$.get('pcs.php',{ opt: "actualitzar" },function(data){
$("#panel").html("<span>Llista de clients:</span>");
$("#panel").append(data);
}).done(funtion(){ 
$("#panel").append("sadf");

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
});

});
