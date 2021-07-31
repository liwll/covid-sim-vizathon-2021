init();
        
function init() {
    var url = "https://api.covid19api.com/summary";
    var today = new Date();

    var date = 'as of ' + today;
    document.getElementById("current-date").innerHTML = date;

    var data = '';

    $.get(url, function(data){
        document.getElementById('confirmed-cases').innerHTML = data.Global.TotalConfirmed.toLocaleString("en-US");
        document.getElementById('total-deaths').innerHTML = data.Global.TotalDeaths.toLocaleString("en-US");
        document.getElementById('total-recovered').innerHTML = data.Global.TotalRecovered.toLocaleString("en-US");
        console.log(data.Global);
    });
}

function clearData() {
    $("#confirmed-cases").empty();
    $("#total-deaths").empty();
    $("#total-recovered").empty();
}

function refreshData() {
    clearData();
    init();
}