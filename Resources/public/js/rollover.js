function rolloverSezioni(sezione){

    $( "#"+sezione ).toggle();

    $("#attiva"+sezione).css('cursor', 'pointer');

    $( "#attiva"+sezione ).click(function() {

        if('u-text-r-xs Icon Icon-collapse' == document.getElementById("sp"+sezione).getAttribute("class").valueOf()){
            document.getElementById("sp"+sezione).setAttribute("class", 'u-text-r-xs Icon Icon-expand');
        }else{
            document.getElementById("sp"+sezione).setAttribute("class", 'u-text-r-xs Icon Icon-collapse');
        }

        $( "#"+sezione ).toggle( "blind", function() {
            // Animation complete.
        });
    });
}
function showErrors(){
    var idDivs = [];
    $(".Alert--error").each(function() {
        if ( (null!=$(this).closest("div.top-div-legend")) && (null!=$(this).closest("div.top-div-legend")[0]) ) {
            idTopLegendDiv=$(this).closest("div.top-div-legend")[0].id;
            if (jQuery.inArray(idTopLegendDiv, idDivs) === -1) {
                idDivs.push(idTopLegendDiv);
                $("#"+idTopLegendDiv).toggle();
                document.getElementById("sp"+idTopLegendDiv).setAttribute("class", 'u-text-r-xs Icon Icon-collapse');
            }
        }
    });
}