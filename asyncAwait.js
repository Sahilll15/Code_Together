function delay(ms){
    return new Promise (resolve => setTimeout(resolve,ms));
}

async function asyncExample(){
    console.log("Start");
    await delay(2000);
    console.log("End");

}

asyncExample();