function outer(){
    const varOut = "Hello";
    
    function inner(){
        const varIn = "World";
        
        console.log(varIn);
        console.log(varOut);
    }
    
    return inner;

}

const innerFunction = outer();
innerFunction();