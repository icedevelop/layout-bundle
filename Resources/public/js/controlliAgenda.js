var imgupldallowed = ["jpg","png","jpeg"];
var attachupldallowed = ["jpg","png","jpeg","pdf"];

function submitPubblica(){
    document.getElementById('form_tipoSubmit').value = 'PUBBLICATA';
    if(checkData('PUBBLICA')){
        document.getElementsByName("form")[0].submit();
        //document.getElementById("form_save").click();
    }
}
function submitBozza(){
    document.getElementById('form_tipoSubmit').value = 'BOZZA';
    if(checkData('BOZZA')){
        document.getElementsByName("form")[0].submit();
    }
}
function dateGr(strDataG, strDataL)
{
    if (strDataL == "") return true;
    if (strDataG == "") return false;

    var dataTimeL = strDataL.split(' ');
    var dataTimeG = strDataG.split(' ');

    var partiL = dataTimeL[0].split('/');
    var partiG = dataTimeG[0].split('/');

    var timeL = "00:00";
    if (dataTimeL.length > 1)
        timeL = dataTimeL[1];
    var timeG = "00:00";
    if (dataTimeG.length > 1)
        timeG = dataTimeG[1];


    var dataG = partiG[2] + partiG[1] + partiG[0] + timeG;
    var dataL = partiL[2] + partiL[1] + partiL[0] + timeL;

    if( dataG > dataL)
        return true;
    else
        return false;
}

function dateGrEq(strDataG, strDataL)
{
    if (strDataG == strDataL){
        return true;
    }else{
        return dateGr(strDataG,strDataL);
    }
}
//function checkData(operazione) => in html => *INCLUDERE*
function checkData(operazione) {
    document.getElementById("form_arraySettori").value = String($("#jstree_sector_div").jstree("get_checked"));
    document.getElementById("form_arrayPaesi").value = String($("#jstree_paesi_div").jstree("get_checked"));

    if (operazione != 'ANTEPRIMA') {
        if (convalidaCampiObbligatori(operazione))
            return true;
        return false;
    } else
        return true;
}
//function confermaExportSud() => in html => *INCLUDERE*
function confermaExportSud() {
    if (!document.getElementById('form_promozione').checked) {
        if (document.getElementById('form_formazione').checked) {
            alert("Attenzione per selezionare il piano Formazione la notizia deve essere associata al Piano Export Sud - Promozione");
            document.getElementById('form_formazione').checked = false;
        }
    }
}
//function enableEmail() { => in html => *INCLUDERE*
function enableEmail() {
    var txt = document.getElementById('form_email_b2b');
    txt.value = "";
    txt.disabled = !txt.disabled;
}
//function enableMaxAdesioni() { => in html => *INCLUDERE*
function enableMaxAdesioni() {
    var txt = document.getElementById('form_max_adesioni');
    txt.value = "";
    txt.disabled = !txt.disabled;
}
//function getDati() => in function in html => *INCLUDERE*
function getDati()
{
}
//function someFunction() { => in html => *INCLUDERE*
function someFunction() {

    var testo = "";
    var id = "";

    var ctrlOggetto = document.getElementById('form_cod_oggetto');
    var ctrlTitoloItaltrade = document.getElementById('form_titoloItaltrade');
    var ctrlCittaItaltrade = document.getElementById('form_cittasvolgimentoItaltrade');
    var ctrlOggettoItaltrade = document.getElementById('form_cod_oggettoItaltrade');

    for(var i=0;i<ctrlOggetto.options.length;i++)
    {
        if (ctrlOggetto.options[i].selected==true)
        {
            valore = ctrlOggetto.options[i].value;
            for(var j=0;j<ctrlOggettoItaltrade.options.length;j++)
            {
                if (ctrlOggettoItaltrade.options[j].value==valore)
                {
                    ctrlOggettoItaltrade.options[j].selected=true;
                    ctrlTitoloItaltrade.disabled = false;
                    ctrlCittaItaltrade.disabled = false;
                    break;
                }
                else {
                    ctrlOggettoItaltrade.options[0].selected=true;
                    ctrlTitoloItaltrade.disabled = true;
                    ctrlCittaItaltrade.disabled = true;
                }

            }

            break;
        }
    }
}

function controlloformati(upldallowed, field){
    var txt = "";
    $("input[id^="+field+"]").each(function() {
        if("" != this.value){
            var allowed = false;
            var nomefile = this.value.split(".");
            var estensione = nomefile[nomefile.length-1];
            upldallowed.forEach(function(item, index){
                if(estensione.toLowerCase()==item){allowed = true;}
            });
            if(!allowed){
                appo = this.value.split("\\");
                appo = appo[appo.length-1];
                txt+="Il file "+appo+" ha un formato non ammesso; ";
            }
        }
    });
    return txt;
}

function looksLikeADate(value){

    if('' == value.length){
        return false;
    }

    if(value.length != 10){
        return false;
    }

    var parti = value.split('/');

    if(parti.length != 3){
        return false;
    }

    if(parti[0].length != 2){
        return false;
    }

    if(isNaN(parti[0])){
        return false;
    }

    if(parti[0] > 31){
        return false;
    }

    if(parti[0] < 1){
        return false;
    }

    if(parti[1].length != 2){
        return false;
    }

    if(isNaN(parti[1])){
        return false;
    }

    if(parti[1] > 12){
        return false;
    }

    if(parti[1] < 1){
        return false;
    }

    if(parti[2].length != 4){
        return false;
    }

    if(isNaN(parti[2])){
        return false;
    }

    if(parti[2] < 1900){
        return false;
    }

    return true;
}

//function convalidaCampiObbligatori(operazione) => in function in html => *INCLUDERE*
function convalidaCampiObbligatori(operazione) {


    var rifEsteriChoisCounter = 0;

    $("input[id^=form_rif_esteri_chois_]").each(function() {
        if(this.checked){
            rifEsteriChoisCounter++;
        }
    });

    if(rifEsteriChoisCounter>5){
        alert("Riferimenti ICE Estero prevede la selezione di massimo cinque elementi");
        return false;
    }

    var msg = "";
    msg += controlloformati(imgupldallowed, 'form_image');
    msg += controlloformati(imgupldallowed, 'form_banner');
    msg += controlloformati(attachupldallowed, 'form_brochure');

    if("" != msg){
        alert(msg);
        return false;
    }

    var DFI = document.getElementById('form_data_fine').value;
    var DIA = document.getElementById('form_data_inizio_adesione').value;
    var DFA = document.getElementById('form_data_fine_adesione').value;
    var DII = document.getElementById('form_data_inizio').value;



    if(operazione == 'PUBBLICA'){

        if(""==DFI){
            alert("La Data Fine Iniziativa è obbligatoria");
            return false;
        }else{
            if(!looksLikeADate(DFI)){
                alert("Il formato della Data Fine Iniziativa non è valido");
                return false;
            }
        }

        if(""==DII){
            alert("La Data Inizio Iniziativa è obbligatoria");
            return false;
        }else{
            if(!looksLikeADate(DII)){
                alert("Il formato della Data Inizio Iniziativa non è valido");
                return false;
            }
        }

        if(dateGrEq(DII,DFI)){
            alert("Non è possibile inserire una Data di Inizio Iniziativa successiva alla Data Fine Iniziativa");
            return false;
        }

        if(""!=DIA){
            if(!looksLikeADate(DIA)){
                alert("Il formato della Data Inizio Adesione non è valido");
                return false;
            }

            if(dateGrEq(DIA,DII)){
                alert("Non è possibile inserire una Data di Inizio Adesione successiva alla Data Inizio Iniziativa");
                return false;
            }

            if(dateGrEq(DIA,DFI)){
                alert("Non è possibile inserire una Data di Inizio Adesione successiva alla Data Fine Iniziativa");
                return false;
            }
        }

        if(""!=DFA){
            if(!looksLikeADate(DFA)){
                alert("Il formato della Data Fine Adesione non è valido");
                return false;
            }

            if(dateGrEq(DFA,DII)){
                alert("Non è possibile inserire una Data di Fine Adesione successiva alla Data Inizio Iniziativa");
                return false;
            }
        }

        if(""!=DFA && ""!=DIA){
            if(!dateGrEq(DFA,DIA)){
                alert("Non è possibile inserire una Data di Inizio Adesione successiva alla Data Fine Adesione");
                return false;
            }
        }
    }

    var m_oblDataA = "ctl00_Top_lblObDataA";//????????????????????
    var m_oblDataDa = "ctl00_Top_lblObDataDa";//????????????????????
    var m_oblDataScad = "ctl00_Top_lblObDataScad";//????????????????????
    var retValue = true;
    var testo = CKEDITOR.instances["form_testo_originale"].getData();
    var perche = CKEDITOR.instances["form_perche_partecipare"].getData();
    //var testo = document.getElementById("form_testo_originale").value;

    var enaCtr = false;
    enaCtr = enaCtr || (operazione == 'INVIA') || (operazione == 'PUBBLICA');

    var dataCtr = false;

    if (true) {
        dataCtr = false;
        //var tmpData = document.getElementById('form_data_pubblicazione_day').value+'/'+document.getElementById('form_data_pubblicazione_month').value+'/'+document.getElementById('form_data_pubblicazione_year').value;
        var tmpData = document.getElementById('form_data_pubblicazione').value;
        if (tmpData != "") {
            dataCtr = true;
            if(!notiziaInModifica){
                if (dateGr(oggi, tmpData)) {
                    alert("La data pubblicazione deve essere maggiore della data odierna");
                    return false;
                }
            }
        }
        if (tmpData == "" && operazione == 'PUBBLICA') {
            alert("La data pubblicazione è obbligatoria per la pubblicazione delle notizie");
            return false;
        }
    }

    var adAttiva = document.getElementById('form_adesione_attiva').checked;
    //var dataIb2b2 = document.getElementById('form_data_inizio_adesione_b2b_day').value+'/'+document.getElementById('form_data_inizio_adesione_b2b_month').value+'/'+document.getElementById('form_data_inizio_adesione_b2b_year').value;
    var dataIb2b2 = document.getElementById('form_data_inizio_adesione_b2b').value;
    //var dataIa2 = document.getElementById('form_data_inizio_adesione_day').value+'/'+document.getElementById('form_data_inizio_adesione_month').value+'/'+document.getElementById('form_data_inizio_adesione_year').value;
    var dataIa2 = document.getElementById('form_data_inizio_adesione').value;
    //var dataSb2b1 = document.getElementById('form_data_scadenza_adesione_b2b_day').value+'/'+document.getElementById('form_data_scadenza_adesione_b2b_month').value+'/'+document.getElementById('form_data_scadenza_adesione_b2b_year').value;
    var dataSb2b1 = document.getElementById('form_data_scadenza_adesione_b2b').value;
    //var dataSa1 = document.getElementById('form_data_fine_adesione_day').value+'/'+document.getElementById('form_data_fine_adesione_month').value+'/'+document.getElementById('form_data_fine_adesione_year').value;
    var dataSa1 = document.getElementById('form_data_fine_adesione').value;


    if (adAttiva) {
        if (dataIb2b2 != "" & dataSb2b1 != "") {
            if (dateGr(dataIb2b2, dataSb2b1)) {
                alert("La data di fine adesione B2B deve essere maggiore o uguale della data di inizio adesione B2B");
                return false;
            }
        }

        if (dataIb2b2 != "") {
            if (!dateGrEq(dataIb2b2, dataIa2)) {
                alert("La data di inizio adesione B2B deve essere maggiore o uguale alla data di inizio adesione iniziativa");
                return false;
            }
        }

        if (dataSb2b1 != "") {
            if (dateGr(dataSb2b1, dataSa1)) {
                alert("La data di fine adesione B2B non può essere maggiore della data di fine adesione iniziativa");
                return false;
            }
        }
    }



    if (dataSa1 != "" & dataIa2 != "") {
        if (dateGr(dataIa2, dataSa1)) {
            alert("La data di fine adesione non può essere minore della data di inizio adesione iniziativa");
            return false;
        }
    }



    if (!enaCtr && !dataCtr)
        return true;

    var t = '0';
    var s = 'BOZZA';
    //var dataDa = document.getElementById('form_data_inizio_day').value+'/'+document.getElementById('form_data_inizio_month').value+'/'+document.getElementById('form_data_inizio_year').value;
    var dataDa = document.getElementById('form_data_inizio').value;
    //var dataA = document.getElementById('form_data_fine_day').value+'/'+document.getElementById('form_data_fine_month').value+'/'+document.getElementById('form_data_fine_year').value;
    var dataA = document.getElementById('form_data_fine').value;
    //var dataScad = document.getElementById('form_data_inizio_adesione_day').value+'/'+document.getElementById('form_data_inizio_adesione_month').value+'/'+document.getElementById('form_data_inizio_adesione_year').value;
    var dataScad = document.getElementById('form_data_inizio_adesione').value;
    var dataFineScad = document.getElementById('form_data_fine_adesione').value;
    var ddlPS = document.getElementById('form_paese_svolgimento');

    if (document.getElementById(m_oblDataDa) != null) {
        if (dataDa == '') {
            alert("La data Inizio Iniziativa è obbligatoria.");
            return false;

        }
    }

    if (document.getElementById(m_oblDataA) != null) {
        if (dataA == '') {
            alert("La data Fine Iniziativa è obbligatoria.");
            return false;
        }
    }
    if (dataDa != '' && dataA != '' && dateGr(dataDa, dataA)) {
        alert("La data di Inizio Iniziativa deve essere minore od uguale alla data di Fine Iniziativa");
        return false;
    }
    if (document.getElementById(m_oblDataScad) != null) {
        if (dataScad == '') {
            alert("La Data Scadenza Adesione è obbligatoria.");
            return false;
        }
    }
/*
il rullo e le sue date npn sono state implementate
    if (true) {
        var rulloDa = document.getElementById(m_txtRulloDa).value;
        var rulloA = document.getElementById(m_txtRulloA).value;
        if ((rulloDa == '') && (rulloA != '')) {
            alert("E' necessario inserire anche la data di inizio di Presenza su Rullo");
            return false;
        }
        if ((rulloDa != '') && (rulloA != '') && dateGr(rulloDa, rulloA)) {
            alert("La data di Presenza su Rullo di inizio deve essere minore od uguale alla data di fine.");
            return false;
        }
    }
*/
    if (document.getElementById('form_titolo').value.length == 0) {
        alert("E' necessario digitare il Titolo della notizia");
        retValue = false;
    } else if (testo.length == 0) {
        //Se Tipologia = Promozionale, il Testo della Notizia non è obbligatorio...
        if (t != '3') {
            alert("E' necessario digitare il testo della notizia");
            retValue = false;
        }
        //...serve solo la conferma dell'utente...
        else {
            if (operazione == 'PUBBLICA') {
                if (!confirm('Attenzione: stai pubblicando la Notizia senza il testo. Confermi?'))
                    retValue = false;
            }
        }
    } else if (document.getElementById('form_titoloItaltrade').value == "COMPILARE SOLO IN LINGUA INGLESE" || document.getElementById('form_titoloItaltrade').value.split(".").join("").length == 0) //[^\w\.@-]
    {
        var ctrlOggettoItaltrade = document.getElementById('form_cod_oggettoItaltrade');
        for(i=0;i<ctrlOggettoItaltrade.options.length;i++) {
            if (ctrlOggettoItaltrade.options[i].selected==true) {
                valoreItaltrade = ctrlOggettoItaltrade.options[i].value;
            }
        }

        var ctrlOggetto = document.getElementById('form_cod_oggetto');
        for (i = 0; i < ctrlOggetto.options.length; i++) {
            if (ctrlOggetto.options[i].selected == true) {
                valore = ctrlOggetto.options[i].value;
            }
        }

        if (valoreItaltrade.length != 0 || (valoreItaltrade.length == 0 && valore.length == "")) {
            alert("E' necessario digitare il campo Titolo per Sito estero preferibilmente in lingua inglese");
            retValue = false;
        }

    } else if ("" == document.getElementById('form_arrayPaesi').value && operazione == 'PUBBLICA'){//else if (!selectSelectedValue('form_paesi')) {
        alert("E' necessario scegliere un Paese per la Classificazione");
        retValue = false;
    } else if ("" == document.getElementById('form_arraySettori').value && operazione == 'PUBBLICA'){//else if (!selectSelectedValue('form_settori')) {
        alert("E' necessario scegliere un Settore per la Classificazione");
        retValue = false;
    } else if (document.getElementById('form_cittasvolgimento').value.length != 0) {

        var ctrlOggettoItaltrade = document.getElementById('form_cod_oggettoItaltrade');
        for(i=0;i<ctrlOggettoItaltrade.options.length;i++) {
            if (ctrlOggettoItaltrade.options[i].selected==true) {
                valoreItaltrade = ctrlOggettoItaltrade.options[i].value;
            }
        }

        var ctrlOggetto = document.getElementById('form_cod_oggetto');
        for (i = 0; i < ctrlOggetto.options.length; i++) {
            if (ctrlOggetto.options[i].selected == true) {
                valore = ctrlOggetto.options[i].value;
            }
        }
        if (valoreItaltrade.length != 0 || (valoreItaltrade.length == 0 && valore.length == "")) {
            if (document.getElementById('form_cittasvolgimentoItaltrade').value.length == 0 || document.getElementById('form_cittasvolgimentoItaltrade').value == "COMPILARE SOLO IN LINGUA INGLESE") {
                alert("E' necessario digitare il campo Città per Sito estero preferibilmente in lingua inglese");
                retValue = false;
            }
        }
    }


    //-- INIZIO -- VERIFICO SELEZIONE DEL PAESE DI SVOLGIMENTO NEL CASO DI INSERIMENTO NOTIZIA IN ITALTRADE --
    var ctrlOggettoItaltrade = document.getElementById('form_cod_oggettoItaltrade');
    for(i=0;i<ctrlOggettoItaltrade.options.length;i++) {
        if (ctrlOggettoItaltrade.options[i].selected==true) {
            valoreItaltrade = ctrlOggettoItaltrade.options[i].value;
        }
    }

    var ctrlOggetto = document.getElementById('form_cod_oggetto');
    for (i = 0; i < ctrlOggetto.options.length; i++) {
        if (ctrlOggetto.options[i].selected == true) {
            valore = ctrlOggetto.options[i].value;
        }
    }

    if (valoreItaltrade.length != 0 || (valoreItaltrade.length == 0 && valore.length == "")) {
        if (ddlPS.options[ddlPS.options.selectedIndex].value == 0) {
            alert("E' necessario selezionare il paese di svolgimento dell\'Iniziativa");
            retValue = false;
        }
    }
    //-- FINE -- VERIFICO SELEZIONE DEL PAESE DI SVOLGIMENTO NEL CASO DI INSERIMENTO NOTIZIA IN ITALTRADE --


    if (adAttiva) {

        if (dataFineScad == "") {
            alert("La Data Fine Adesione è obbligatoria, in caso di adesione attiva");
            return false;
        }

        if (document.getElementById('form_attiva_catalogo').checked) {
            if (document.getElementById('form_pagamento').checked) {
                alert("Non è possibile attivare il Catalogo nel caso di Iniziativa a pagamento");
                retValue = false;
            }

            if (document.getElementById('form_pagamento_interprete').checked) {
                alert("Non è possibile attivare la \"Traduzione a pagamento\" nel caso di attivazione del Catalogo");
                retValue = false;
            }

            if (!document.getElementById('form_max_adesioni').value == "") {
                alert("Non è possibile impostare un valore nel campo \"Num. Max Adesioni\" nel caso di attivazione del Catalogo");
                retValue = false;
            }
        }

        if (document.getElementById('form_interprete').checked) {
            var ddl = document.getElementById('form_lingue');
            if (ddl.options[ddl.options.selectedIndex].value == "") {
                alert("E' necessario selezionare la lingua dell\'iniziativa se si seleziona il campo Interprete");
                retValue = false;
            }
        }

        if (!document.getElementById('form_b2b').checked) {
            var txtE = document.getElementById('form_email_b2b');
            if (txtE.value != "") {
                alert("E' necessario selezionare il campo \"B2B\" se si inserisce un indirizzo email nel campo \"Indirizzo email di riferimento per il B2B\"");
                retValue = false;
            }
        }

        if (!document.getElementById('form_max_adesioni').value == "") {
            var chkPaga = document.getElementById('form_pagamento');
            if (chkPaga.checked) {
                alert("E' possibile impostare il numero massimo di adesioni (campo \"Num. Max Adesioni\") solo se l\'Iniziativa non è a pagamento (campo \"Iniziativa a pagamento\"");
                retValue = false;
            }
        }
    }


    if ('True' == 'True') {
        if (document.getElementById('form_subiniziativa').checked) {

            if (document.getElementById('form_pagamento').checked) {
                alert("Non è possibile impostare l'iniziativa come SubIniziativa nel caso di Iniziativa a pagamento");
                retValue = false;
            } else {

                if (document.getElementById('form_annosub').value == "") {
                    alert("In caso di SubIniziativa, devi inserire l\'Anno dell\'iniziativa di riferimento");
                    retValue = false;
                }

                if (document.getElementById('form_progsub').value == "") {
                    alert("In caso di SubIniziativa, devi inserire il codice Prog dell\'iniziativa di riferimento");
                    retValue = false;
                }

                if (document.getElementById('form_inizsub').value == "") {
                    alert("In caso di SubIniziativa, devi inserire il codice Iniz dell\'iniziativa di riferimento");
                    retValue = false;
                }

            }
        } else {

            if (document.getElementById('form_annosub').value != "") {
                alert("Se inserisci l\'Anno dell\'iniziativa di riferimento, devi impostare l'iniziativa come SubIniziativa");
                retValue = false;
            }

            if (document.getElementById('form_progsub').value != "") {
                alert("Se inserisci il codice Prog dell\'iniziativa di riferimento, devi impostare l'iniziativa come SubIniziativa");
                retValue = false;
            }

            if (document.getElementById('form_inizsub').value != "") {
                alert("Se inserisci il codice Iniz dell\'iniziativa di riferimento, devi impostare l'iniziativa come SubIniziativa");
                retValue = false;
            }

        }
    }


    if (document.getElementById('form_b2b').checked) {

        var ddlLD = document.getElementById('form_lingua_desc_libera');
        if (ddlLD.options[ddlLD.options.selectedIndex].value != "") {
            alert("Non è possibile selezionare la Lingua delle descrizioni libere nel caso di Iniziativa B2B");
            retValue = false;
        }
    }


    var maxADO = document.getElementById('form_max_adesioni').value;
    if (maxADO != "") {
        if (isNaN(maxADO)) {
            alert("Inserisci un valore numerico nel campo \"Num. Max Adesioni\"!");
            retValue = false;
        }
    }


    var dataIb2b = document.getElementById('form_data_inizio_adesione_b2b').value;
    var dataIa = document.getElementById('form_data_inizio_adesione').value;
    var dataSb2b = document.getElementById('form_data_scadenza_adesione_b2b').value;
    var dataSa = document.getElementById('form_data_fine_adesione').value;

    if (adAttiva) {
        if (dataIb2b != "" || dataSb2b != "") {
            if (!document.getElementById('form_b2b').checked) {
                alert("E' necessario selezionare il campo \"B2B\" se si inseriscono le date di adesione B2B");
                retValue = false;
            }
        }

        if (dataSa == "") {
            if (dataIb2b != "" || dataSb2b != "") {
                alert("La data di inizio o fine adesione B2B possono essere inserite solo se presente anche la data di fine adesione iniziativa");
                retValue = false;
            }
        }
    }


    return retValue;
}