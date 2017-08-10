function beforePrint () {
    window.alert('Click OK to open the printable pdf of this feature in a new window.');
    window.open("http://apps.urban.org/features/long-prison-terms/a_matter_of_time_print_version.pdf")
}
function afterPrint() {
    console.log("printed");
}
window.onbeforeprint = beforePrint;
window.onafterprint = afterPrint;
 
var printHandler = function(mql) {
    if(mql.matches) {
        beforePrint();
    } else {
       afterPrint();
    }
};
 
var mql = window.matchMedia('print');
mql.addListener(printHandler);