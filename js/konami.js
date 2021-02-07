/** wrapping this around a self invoking function so VK, pattern etc cannot be accessed from the console... */
(function(){
    const VK = {
        UP_KEY : 38,
        DOWN_KEY : 40,
        LEFT_KEY: 37,
        RIGHT_KEY: 39,
        B_KEY: 66,
        A_KEY: 65
    }
    
    const pattern = [
        VK.UP_KEY,
        VK.UP_KEY,
        VK.DOWN_KEY,
        VK.DOWN_KEY,
        VK.LEFT_KEY,
        VK.RIGHT_KEY,
        VK.LEFT_KEY,
        VK.RIGHT_KEY,
        VK.B_KEY,
        VK.A_KEY
    ];
    
    let matchedOcurrances = 0;
    
    /** creating a key handler for the konami code */
    const keyHandler = function(e) {
        e = e || window.event;
        
        /** if the current matched occurance index does match the keyCode, increment and check the lengths are the same. Else reset counter! */
        matchedOcurrances = pattern[matchedOcurrances] === e.keyCode ? (matchedOcurrances + 1) : 0;         
        
        /** if the lengths are the same, code complete!! */
        if(matchedOcurrances === pattern.length) {            
            alert("Konami code actived!");
            // resetting the match occurances.
            matchedOcurrances = 0;
        }       
    }
    
    document.addEventListener('keydown', keyHandler, false);
})();
