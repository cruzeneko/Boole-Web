window.onload = function() {
    //alert("called!");
    window.addEventListener('message', receiveMessage);
    addNewInterceptor(configureNewExercise);
    addNewInterceptor(configureNewIntegration);
    localizeAll();
}



