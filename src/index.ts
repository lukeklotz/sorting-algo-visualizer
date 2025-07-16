import { CircleContainer } from './circle-container'
const shuffleButton = document.getElementById('shuffle-button');
const selectionSortButton = document.getElementById("selection-sort");
const bubbleSortButton = document.getElementById("bubble-sort");
const numberOfOperationsElement = document.getElementById('number-of-operations');
const container = new CircleContainer('circle-container');

container.populateContainer();

//let circles: HTMLDivElement = [];
let isDoneSorting: boolean = false;
let sorted = false;


function updateNumberOfOperations() {
    if(numberOfOperationsElement){
        numberOfOperationsElement.innerText = container.totalOps.toString();
    }
}

if(shuffleButton){
    shuffleButton.addEventListener('click', async() => {
        if(!sorted){
            alert("not done sorting!")
        }
        else { 
            await container.shuffle();
            sorted = false;
        }
    })
}
if(selectionSortButton){
    selectionSortButton.addEventListener('click', async() => {
        if(sorted){
            alert("already sorted! Try shuffling.")
        } else {
            
            await container.selectionSort();
            sorted = true;
            updateNumberOfOperations();
        }
    });
}

if(bubbleSortButton){
    bubbleSortButton.addEventListener('click', async() => {
        if(sorted){
            alert("already sorted! Try shuffling.")
        } else {
            isDoneSorting = false;
            await container.bubbleSort();
            sorted = true;
            updateNumberOfOperations();
        }
    });
}

// Recalculate on window resize to keep circles perfectly fitted
window.addEventListener('resize', () => {
    console.log('Window resized to:', window.innerWidth, window.innerHeight);
    container.populateContainer();
});
