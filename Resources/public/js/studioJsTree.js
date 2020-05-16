
var to = false;

function cercaInAlbero(chi){
    myObj = "#"+chi.id.replace("_q", "");
    if(to) { clearTimeout(to); }
    to = setTimeout(function () {
        var v = $("#"+chi.id).val();
        $(myObj).jstree(true).search(v);
    }, 250);
}

function gestisciAlberi(treeOriginData,jsDiv,formArray, noCheckExpression, threeState=true, multiple=true){

    //Inizio selezione codici Settore nell'albero
    var myDiv;
    if(treeOriginData.success){

        var selected = [];
        //myDiv = "#jstree_sector_div";
        myDiv = jsDiv;


        //var obj2 = document.getElementById("form_arrayInteressi");
        var obj2 = document.getElementById(formArray);
        selected = obj2.value.split(",");

        var treeData = treeOriginData.items;
        for(var i=0;i<treeData.length;i++){
            if(treeData[i].parent == " "){
                treeData[i].parent = "#";
            }
            var trovato = false;
            for(var s=0; s<selected.length; s++){
                if(treeData[i].id == selected[s]){
                    trovato = true;
                    treeData[i].state = {"selected":true};
                }
            }
            if(!trovato){treeData[i].state = {"selected":false};}

            if(typeof noCheckExpression !== 'undefined'){
                if(treeData[i].id.match(noCheckExpression) != null){
                    treeData[i].a_attr = {"class":"no_checkbox"};
                }
            }
        }
        $(myDiv).jstree({
            'core' : {
                data : treeData,
                multiple: multiple,
                themes: {
                    name: 'proton',
                    responsive: true
                }
            },
            'plugins' : [ 'checkbox', 'search' ],
            'checkbox' : {
                three_state : threeState,
                //cascade: 'undetermined',
            },
        });
    }
}


function pulisciAlberi(selected, noCheckExpression){
    if(typeof noCheckExpression !== 'undefined'){
        appo = selected.split(",");
        myReturn = [];
        for(var i=0;i<appo.length;i++){
            if(appo[i].match(noCheckExpression) == null){
                myReturn.push(appo[i]);
            }
        }
        return String(myReturn.join());
    }else{
        return selected;
    }
}