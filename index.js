let modeButtons = document.getElementsByClassName("mode-button");
let selectedMode = "";
for(let i=0; i<modeButtons.length; i++){
    modeButtons.item(i).onclick = onModeChange;
}
modeButtons.item(0).click();

function onModeChange(click){
    if(selectedMode!==click.target.textContent){
        selectedMode=click.target.textContent;
        for(let i=0; i<modeButtons.length; i++){
            modeButtons.item(i).style.background = "#c9ff00";
        }
        click.target.style.background="#00ff1e";
        switch(click.target.textContent){
            case "Disabled":
                
                break;
            case "Match":

                break;
            case "Auto":

                break;
            case "Teleop":

                break;
        }
    }
}