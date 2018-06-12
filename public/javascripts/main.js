console.log('hello world')
window.alert = function(message){
    bootbox.alert(message)
}

$('#moreInfoBtn').click(function () {
    alert({ 
        size: "small",
        title: "More Info on BrewBox",
        message: "BrewCheck is a simple app that allows you to make a checklist of all the breweries you've been too as well as breweries you would like to go to. Go ahead and make a new user, add some breweries and its information, and let others know what beers they have and rate them!",
    })
})