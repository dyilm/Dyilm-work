var itt = 0;

var myInterval = setInterval(function () {
    console.log('coucou');
    itt++;
    if (itt == 3) {
        clearInterval(myInterval);
    }
}, 1000);
