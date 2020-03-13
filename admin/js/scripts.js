// Classe client
class client {
    constructor(on, bloqued, select) {
        this.on = on;
        this.bloqued = bloqued;
        this.select = select;
        this.ip = 'IP no definida'
    }
    setData(on, bloqued, select) {
        this.on = on;
        this.bloqued = bloqued;
        //this.select = select;
    }
}

//funció per omplir els clients
let clients = [];
for (let i = 1; i < 255; i++) {
    clients[i] = new client(0, 0, 0);
}

// Dades globals
let ipeth1 = 0;
let xarxaeth1 = 0;
let ipeth0 = 0;
let ipeth2 = 0;
let percent_actualizar = 0;
let intervalos = [];
let pause_actualizar = 0;
let grafics_tots = 1; // Si se mostren o no el grafics de tots o sols els actius


/*
Aquesta funcio recorre tots els PCS que estan actius i obté la informacio
*/
function obtener_datos(opciones) {
    let array;
    for (let i = 1; i < 255; i++) { // iniciar tots els clients a 0
        clients[i].setData(0, 0);
    }

    return $.get('pcs.php', { opt: opciones }, function(data) {
        array = data.split(';');
        //console.log(array);
        for (let i = 0; i < array.length; i++) {
            let nHost = array[i].split('.')[3] // El numero de host
            clients[nHost].on = 1;
            clients[nHost].ip = array[i];
        }
    });

}

/*
Aquesta funció recorre els pcs que estan bloquejats per marcar bloqued en l'array
*/

function obtener_bloqued() {
    return $.get('pcs.php', { opt: "bloqued" }, function(data) {
        let array = data.split(' ');
        if (array[0] != '')
            for (let i = 0; i < array.length; i++) {
                clients[array[i].split('.')[3]].bloqued = 1;
            }
    });


}

/*
Funció que crida a les altres funcions per generar la llista de clients
*/
function get_pcs(act) {
    $.when(obtener_datos(act), obtener_bloqued()).done(function(x) { // primer ha d'obtindre les dades
        $("#panel").html("<span>Llista de clients:</span>");
        $("#panel").append('<div id="clients"></div>');
        $("#clients").append('<ul id="ul_clients"></ul>');
        for (let i = 1; i < 255; i++) {
            if (clients[i].on == 1) {
                $("#ul_clients").append(`<li id="c${clients[i]['ip']}" client="${i}"><span>${clients[i]['ip']}</span>`);
            }
        }
        $("#clients").append('<div id="boto_actualitzar"><button type="button" id="act_clients">Actualitzar clients amb nmap</button></div>');
        f_pcs(); // Ara crida a formatejar els PCs

        $.get('adm_clients.php', { order: "mapa" }, function(data) { // Els dibuixos dels clients
            $("#panel").append(data);
        }).done(function() { f_mapa(); });

    });
    return 1;
}


// El botó d'actualitzar clients
$(document).on("click", "#act_clients", function(event) {
    l();
    get_pcs("actualitzar");
});

//el Logo de control d'aula
$(document).on("click", "#control", function(event) { refrescar(); });

// El logo de totes les aules
$(document).on("click", "#totes", function(event) {
    l();
    $.get('totes.php', function(data) {
        $("#panel").html("<span>Totes les aules</span>");
        $("#panel").append(data);
    }).done(function() {});
});




// El gif de loading
function l() { $("#panel").html('<img src="images/loading.gif"/>'); }


// Refrescar IPtables i Llista de clients
function refrescar() {
    $.get('adm_clients.php', { order: 'iptables' }, function(data) {
        $("#actual").html('<span id="resiptas">Resultat de IPtables:</span>');
        $("#actual").append('<span id="resipadv">Monitor QoS</span>');
        $("#actual").append(data);
    }).done(function() {
        l();
        get_pcs("solo_ips");
        $.get('adm_clients.php', { order: 'observar' })
        $("#actual pre").hide();
        //$("#actual span#resipadv").hide();
        $("#actual span#resiptables").on("click", function(event) { $("#actual pre").toggle(400); /*$("#actual #resipadv").toggle(400);*/ });
    });

}
// Mostrar coses de QoS
$(document).on("click", "#actual span#resipadv", function(event) {
    console.log('QoS');
    monitorQoS();
});
$(document).on("click", "#actual span#resiptas", function(event) {
    console.log('QoS');
    monitorIPtables();
});



// Inici del document on carrega tots els divs


$(function() {
    l(); //refrescar();
    // mestres se carrega tot, podem anar donant funcionalitat als botons:
    $("#btots").on("click", function(event) { bloquear('btots'); });
    $("#dtots").on("click", function(event) { bloquear('dtots'); });
    $("#ralentir").on("click", function(event) { slow(tipo = 'r'); });
    $("#qos").on("click", function(event) { slow(tipo = 'qos'); });
    $("#reset").on("click", function(event) { reset(); });
    updateall();

    $('#net').on("click", function(event) { grafiques(); });
    $('#pausar').on("click", function(event) { pausar(); });

    // dades fonamentals
    ipeth1 = $("#ipeth1").text();
    xarxaeth1 = ipeth1.split(".")[0] + "." + ipeth1.split(".")[1] + "." + ipeth1.split(".")[2];
    ipeth0 = $("#ipeth0").text();
    ipeth2 = $("#ipeth2").text();

    capturarMapa();
    $('#seleccionar_clientes').hide();
});


// Funció per a donar color i format als clients
function f_pcs() {
    $("#panel ul li").each(function(i) {
        let ip = $(this).attr('id');
        let client = $(this).attr('client');

        if (client > 250) { $(this).addClass('servers'); } else if (client == 100) { $(this).addClass('profe'); } else {
            if (client < 100) { $(this).addClass('desconeguts'); }

            var $block = $(`<img title="Bloquear esta IP"  id="b${ip}" class="bloquea" alt="Bloquea esta IP" src="images/connected.png"/>`);
            if (clients[client].bloqued == 1) {
                $(this).addClass('off');
                $block.attr('src', 'images/disconnected.png');
            };
            $(this).append($block);
            $block.on("click", function(event) {
                var scroll = $(window).scrollTop();
                if (!$(this).parent().hasClass('off')) {
                    bloquear(ip.substring(1));
                } else {
                    desbloquear(ip.substring(1));
                }
                $("html").scrollTop(scroll);
            });
        }
        // les estadistiques per client
        $(this).on("click", function(event) {
            mostrar_acct($(this), ip.substring(1));
        });
    });

    // mostrar la tortuga
    if ($("#actual").text().indexOf('hashlimit') > 0) {
        console.log('tortuga');
        turtle('put');
    }
}

function f_mapa() {
    let t = Math.random()
    for (i = 101; i < 125; i++) {
        if (clients[i]['on'] == 1) {
            $('#mapa_pantalla_' + i).css({
                'background-color': '#1ABC9C',
                'background-image': `url("images/graph/control_aules/captura${i}.jpg?${t}")`,
                'background-size': 'contain'
            }).html(`<span class="mapa_pc_numero">${i}</span>`);
            //console.log(i); 
        } else {
            $('#mapa_pantalla_' + i).html(`<img src="images/apagar.svg" id="wol${i}" class="wol" />`)
            $('#wol' + i).on('click', function(event) {
                wol($(this).attr('id'));
            });
        }
    }

}

///////////////////////// BLOQUEAR ///////////////////////////////////////

function bloquear(ip) {
    l();
    $.get('adm_clients.php', { order: 'bloquear', ip: ip }, function(data) {}).done(function() {
        refrescar();
    });
}

function desbloquear(ip) {
    l();
    $.get('adm_clients.php', { order: 'bloquear', ipd: ip }, function(data) {}).done(function() {
        refrescar();
    });
}


///////////////////////// RALENTIR /////////////////////

function slow(tipo) {

    if ($('.turtle').length == 0) {
        l();
        var velocitat = $('#velocitat').val();
        var streaming = $('#streaming').val();
        var burst = $('#burst').val();
        var mode = $('#banmode').val();
        $.get('adm_clients.php', { order: 'slow', v: velocitat, s: streaming, l: burst, m: mode, tipo: tipo }, function(data) {}).done(function() {
            console.log('Lent');
            refrescar();
        });
    }
}

function turtle(act) {
    if (act == 'put') {
        $("#panel ul li").each(function(i) {
            $(this).prepend('<img class="turtle" src="images/turtle.png" title="Ralentizat" />');
        });
    }
    if (act == 'del') {
        $('.turtle').each(function(i) { $(this).remove(); });
    }
}

function reset() {
    l();
    $.get('adm_clients.php', { order: 'reset' }, function(data) {}).done(function() {
        console.log('Reset');
        turtle('del');
        refrescar();
    });
}

/////////////////////////////// GRAFIQUES /////////////////

//Seleccionar clientes
$(document).on("click", "#ocultar_seleccionar", function(event) { $('#seleccionar_clientes').toggle('600'); });

$(document).on("click", "label.input_container", function(event) {
    if ($(event.target).is("input")) {
        //console.log($(event.target).prop('checked'));
        if ($(event.target).prop('checked')) { clients[$(event.target).attr('value')]['select'] = 1; } else { clients[$(event.target).attr('value')]['select'] = 0; }
        //console.log(clients);
        seleccionats = []
        for (i = 1; i < 255; i++) {
            if (clients[i]['select'] == 1) { seleccionats.push(xarxaeth1 + "." + i) }
        }
        //console.log(seleccionats);	

        $.post("seleccionar_clients.php", { 'llista_clients[]': seleccionats });
    }

});


function updaten() {
    $("#graphxarxa").attr('src', $("#graphxarxa").attr('src') + '?' + Math.random());
    $("#estadistiques_hora").html('10 Minuts:</br> <img id="img10minuts" src="images/graph/control_aules/total5minuts.png?' + Math.random() + '"/></br> 2 hores: </br><img id="img2hores"  src="images/graph/control_aules/totalhora.png?' + Math.random() + '"/></br>');
    $("#estadistiques_hui").html('<img id="imghui"  src="images/graph/control_aules/total.png?' + Math.random() + '"/>');
    $("#estadistiques_setmana").html('<img id="imgsetmana"  src="images/graph/control_aules/totalsemana.png?' + Math.random() + '"/>');
    $("#estadistiques_setmana").append('<img id="imgsetmanamitjana"  src="images/graph/control_aules/totalsemanamedia.png?' + Math.random() + '"/>');
    refrescar();
    capturarMapa();
    percent_actualizar = 0;
}

$(document).on("click", "#img10minuts", function(event) {
    if (grafics_tots) {
        grafics_tots = 0;
        $("#img10minuts").attr("src", 'images/graph/control_aules/total5minutstots.png?' + Math.random());
        $("#img2hores").attr("src", 'images/graph/control_aules/totalhoratots.png?' + Math.random());
        $("#imghui").attr("src", 'images/graph/control_aules/totaltots.png?' + Math.random());
        $("#imgsetmana").attr("src", 'images/graph/control_aules/totalsemanatots.png?' + Math.random());
        $("#imgsetmanamitjana").attr("src", 'images/graph/control_aules/totalsemanamediatots.png?' + Math.random());
    } else {
        grafics_tots = 1;
        $("#estadistiques_hora").html('10 Minuts:</br> <img id="img10minuts" src="images/graph/control_aules/total5minuts.png?' + Math.random() + '"/></br> 2 hores: </br><img id="img2hores"  src="images/graph/control_aules/totalhora.png?' + Math.random() + '"/></br>');
        $("#estadistiques_hui").html('<img id="imghui"  src="images/graph/control_aules/total.png?' + Math.random() + '"/>');
        $("#estadistiques_setmana").html('<img id="imgsetmana"  src="images/graph/control_aules/totalsemana.png?' + Math.random() + '"/>');
        $("#estadistiques_setmana").append('<img id="imgsetmanamitjana"  src="images/graph/control_aules/totalsemanamedia.png?' + Math.random() + '"/>');
    }
});

function updateall() {
    updaten();
    intervalos[0] = window.setInterval(updaten, 60000);
    intervalos[1] = window.setInterval(function() {
        percent_actualizar += 1;
        $('#progress_actualizar').val(percent_actualizar);
    }, 600);
}

function pausar() {
    if (pause_actualizar == 0) {
        pause_actualizar = 1;
        window.clearInterval(intervalos[0])
        window.clearInterval(intervalos[1])
        $('#pausar').html('▶');
    } else {
        pause_actualizar = 0;
        updateall();
        $('#pausar').html('⏸');
    }
}

function grafiques() {
    if ($("#graphxarxa").length == 0) {
        $("#div_graphxarxa").append('<img id="graphxarxa" src="images/graph/output.png"/>');
        $("#mostrarg").remove();
        $("#info_graphxarxa").show();
        console.log("mostrar");
    } else {
        $("#graphxarxa").remove();
        $("#info_graphxarxa").hide();
        $("#div_graphxarxa").append('<span id="mostrarg">(Gràfics en Kbits/s)</span>');
    }
}

function mostrar_acct($linea, ip) {

    var n = ip.split(".");
    if ($linea.find('span.consum').length == 0) {
        $.getJSON("ips_acct.js", function(data) {
            console.log("Acct: " + ip);

            $linea.append('<span class="consum">Consum: in: ' + data[ip]['in'] + ' out: ' + data[ip]['out'] + ' <img  class="graph" src="images/graph/control_aules/spd' + n[3] + '.png"/></span>');
            $linea.after('<a class="acaptura" id="image' + n[3] + '" href="images/graph/control_aules/captura' + n[3] + '.jpg" target="_blank"><span class="capturar" id="capturar' + n[3] + '"></span></a>');
            //	$linea.after('<input type="text" name="proces" id="proces'+n[3]+'" value="Proces"></input>');
            capturar(n[3]);
        }).done(function() { console.log(ip); });
        $linea.find('img.bloquea').after('<img src="images/apagar.svg" id="apagar' + n[3] + '" class="apaga" />');
        $linea.find('img.bloquea').after('<img src="images/alert.png" id="notifi' + n[3] + '" class="notifica" />');
        $('#apagar' + n[3]).on('click', function(event) {
            apagar($(this).attr('id'));
        });
        $('#notifi' + n[3]).on('click', function(event) {
            notificar($(this).attr('id'));
        });
    } else {
        $linea.find('span.consum').remove();
        $("#capturar" + n[3]).remove();
        $linea.find('img.apaga').remove();
        $linea.find('img.notifica').remove();
        $('#proces' + n[3]).remove();
    }

}

///////////////////////////////////////////////////CAPTURES////////////////////////

function capturar(n) {
    $.get('adm_clients.php', { order: 'capturar', ip: n }, function(data) {}).done(function() {
        $("#capturar" + n).append('<img src="images/graph/control_aules/captura' + n + '.jpg" />');
    });
}

function capturarSolo(n) {
    $.get('adm_clients.php', { order: 'capturar', ip: n }, function(data) {}).done(function() { console.log(n) });
}

function capturarTodos(t) {
    $.get('adm_clients.php', { order: 'capturar', targets: t }, function(data) {}).done(function() { console.log(t) });
}

function capturarMapa() {
    targets = "";
    for (i = 101; i < 125; i++) {
        if (clients[i]['on'] == 1) {
            targets = targets + " " + i;
        }
    }
    //console.log(targets);
    $.get('adm_clients.php', { order: 'capturar' });
}



////////////////////////////////////////////////////////////ADMINSTRACIO//////////////////////////////
function apagar(id) {
    n = id.substring(6);
    $.get('adm_clients.php', { order: 'apagar', ip: n }, function(data) { console.log(data); }).done(function() {});
}

function wol(id) {
    n = id.substring(3);
    $.get('adm_clients.php', { order: 'wol', ip: n }, function(data) { console.log(data); }).done(function() {});
}

function notificar(id) {
    n = id.substring(6);
    $.get('adm_clients.php', { order: 'notificar', ip: n, mensaje: 'hola mon' }, function(data) { console.log(data); }).done(function() {});
}

/////////////////////////////////////////////MONITOR AVANÇAT ///////////////////////////////////////
function monitorQoS() {
    $.get('adm_clients.php', { order: 'monitorqos' }, function(data) {
        $("#actual pre").remove();
        $("#actual").append(data);
    });
}

function monitorIPtables() {
    $.get('adm_clients.php', { order: 'iptables' }, function(data) {
        $("#actual pre").remove();
        $("#actual").append(data);
    });
}


/*
TODO:


Gràfics dels clients més actius

Fitxers de configuració i adaptació a nous tipus de xarxes.

Reorganitzar la configuració i els fitxers temporals

Administració centralitzada del centre.
*/