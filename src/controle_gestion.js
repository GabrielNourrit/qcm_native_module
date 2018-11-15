$("#start-qcm").click(function(){

call_db();

});


/************************/
/*******FABRIQUES*********/
/************************/

//fonction qui demande au serveur des données pour faire un formulaire
function call_db(){
$.post('src/server.php',{token:1}, function (data) {
	var JSON = $.parseJSON(data);
	if(JSON==="probleme")
		$("#qcm").html(fin_qcm());
	else{
        $("#qcm").html(create_ask(JSON));
    }
    });
}

function fin_qcm(){
	return "<p>fini</p>";
}

//fonction qui permet de crée un formulaire (design)
function create_ask(JSON){
var ask = "";
var i = 0;

//la question
 ask = "<h4>"+JSON.question+"</h4>"+
	'<ul class="demo-list-item mdl-list">';
//remplissage des propositions
	for(var p of JSON.propositions){
  	ask+='<li class="mdl-list__item">'+
	'<label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-'+i+'">'+
  		'<input type="radio" id="option-'+i+'" class="mdl-radio__button" name="options" value="'+i+'"';
  		if(i==0) ask+='checked' // si on est sur le premier on le coche par défaut
  		ask+='>'+
  		'<span class="mdl-radio__label"> '+p+'</span>'+
	'</label>'+
	'</li>';
	i++;
	}
	//puis alert et toggle check + bouton next
	ask+='</ul>'+
	'<div class="alert d-none" role="alert"></div>'+
	'<button id="submit" onclick=\'tester("'+JSON.justification.replace("'","&apos;")+'")\' class="mdl-button mdl-button--raised mdl-button--colored" style="float:right;">'+
  	'Tester'+
	'</button>';

	return ask;
}

//fonction qui affiche les notifications
function tester(detail){
	$('input[name=boisson]:checked').val();
	$(".alert").toggleClass("d-none");
	$(".alert").toggleClass("alert-primary");
	$(".alert").append(detail);
	$("#submit").text("Suivant");
	$("#submit")[0].onclick="";
	$("#submit").click(function(){
		call_db();
	});
}