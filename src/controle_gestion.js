$("#start-qcm").click(function(){
		call_db();
});

$("#reinit").click(function(){
$.post('src/reinit.php',{token:1}, function (data){
	location.reload();
});
});


/************************/
/*******FABRIQUES********/
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
		maj_progress_bar();
    });
}

function fin_qcm(){
	return "<p>fini</p>";
}

//fonction qui permet de crée un formulaire (design)
function create_ask(JSON){
var ask = "";
var i = 0;
//la justif
Cookies.set('justif', JSON.justification.replace("'","&apos;"));

//la question
 ask = "<h4>"+JSON.question+"</h4>"+
	'<ul class="demo-list-item mdl-list">';
//remplissage des propositions
if(JSON.type=="assert"){
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
	ask+='</ul>';
}else{
	ask+='<div class="mdl-textfield mdl-js-textfield">'+
	'<textarea class="mdl-textfield__input" type="text" rows= "3" id="story" name="story"'+
 '       rows="5" cols="33" placeholder="Réponse...">'+
'</textarea>'+
'</div>';
}
	var reponse;
	(JSON.type=="assert")? reponse = JSON.reponse : reponse = -1;
	//puis alert et toggle check + bouton next
	ask+='<div class="alert d-none" role="alert"></div>'+
	'<button id="submit" onclick=\'tester('+reponse+')\' class="mdl-button mdl-button--raised mdl-button--colored" style="float:right;">'+
  	'Tester'+
	'</button>';

	return ask;
}

//fonction qui affiche les notifications
function tester(reponse){
	var detail = Cookies.get('justif');
	//verification & fixation couleur bulle
	var color;
	if(reponse==-1)
		color = "alert-primary";
	else{
		if($('input:checked').val() == reponse)
			color = "alert-success";
		else
			color= "alert-danger";
	}

	
	$(".alert").toggleClass("d-none");
	$(".alert").toggleClass(color);
	$(".alert").append(detail);
	$("#submit").text("Suivant");
	$("#submit")[0].onclick="";
	$("#submit").click(function(){
		maj_progress_bar();
		call_db();
    });
	};

function maj_progress_bar(){
	$.post('src/pourcent.php',{token:1}, function (data) {
		var prog = $.parseJSON(data);
		if(prog!=="0%"){
		$("#progression").attr("aria-valuenow",prog);
		$("#progression").attr("style","width:"+prog);
		$("#progression").text(prog);
	}
    });
}
