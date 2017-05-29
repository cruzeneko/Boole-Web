var interceptors = [];

function receiveMessage(e) {
   for(var i = 0; i<interceptors.length; i++)
       interceptors[i](e.data);
}

function addNewInterceptor(fun){
    interceptors[interceptors.length] = fun;
}


function configureNewExercise( config ) {
    configure(config);
}

function resetApplication( ) {

}
