/*
   "type"		    : string: either "config" or "reset".
   "statement"              : html string
   "inputVars"              : integer
   "outputVars"             : integer
   "inputs"                 : Array of Strings
   "outputs"                : Array of Strings
   "trainingMode"           : Boolean
   "weblabAvailableInputs"  : Array of Strings 
   "weblabAvailableOutputs" : Array of Strings
*/


function receiveMessage(e) {
    var type = e.data.type;
    
    if(type === "config") {
        configureNewExercise( e.data );
    }
    else if(type === "reset") {
        resetApplication( e.data );
    }
}


function configureNewExercise( config ) {
    configure(config);
}

function resetApplication( ) {

}
