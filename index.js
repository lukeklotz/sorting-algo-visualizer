const circleContainer = document.getElementById('circle-container');
const shuffleButton = document.getElementById('shuffle-button');
const selectionSortButton = document.getElementById("selection-sort");
const bubbleSortButton = document.getElementById("bubble-sort");
const numberOfOperationsElement = document.getElementById('number-of-operations');

let circles = []
let numberOfOperations = 0;

function updateNumberOfOperations() {
    numberOfOperations++;
    numberOfOperationsElement.innerText = numberOfOperations;
}


function createCircle() {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.borderRadius = '50%'; // Makes the div a circle
    circle.style.margin = '0px'; // No margin
   
    // Generate a random brightness value between 30% and 80%
    const brightness = Math.floor(Math.random() * (80 - 30 + 1)) + 30;
    const hue = 10;  
    
    circle.style.backgroundColor = `hsl(${hue}, 100%, ${brightness}%)`;

    circle.dataset.brightness = brightness;

    return circle;
}

async function bubbleSortByBrightness(circles, i, j, delay_ms) {
    if (i >= circles.length - 1) return;

    if (j >= circles.length - i - 1) {
        // Move to the next iteration
        await new Promise(resolve => setTimeout(resolve, delay_ms)); // Adjust delay as needed
        bubbleSortByBrightness(circles, i + 1, 0);
        return;
    }

    const circle1 = circles[j];
    const circle2 = circles[j + 1];

    const brightness1 = parseFloat(circle1.dataset.brightness);
    const brightness2 = parseFloat(circle2.dataset.brightness);

    if (brightness1 > brightness2) {
        // Swap circles
        circleContainer.insertBefore(circle2, circle1);
        circles[j] = circle2;
        circles[j + 1] = circle1;
        updateNumberOfOperations();
    }

    // Continue with the next pair
    await new Promise(resolve => setTimeout(resolve, delay_ms)); // Adjust delay as needed
    bubbleSortByBrightness(circles, i, j + 1);
}

async function selectionSortByBrightness(circles, i, delay_ms) {
    const len = circles.length;
    if (i >= len - 1) return;
    
    numberOfOperations++;
    console.log(numberOfOperations)
    
    // Find the index of the minimum element in the unsorted part
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
        const brightness1 = parseFloat(circles[j].dataset.brightness);
        const brightness2 = parseFloat(circles[minIndex].dataset.brightness);
        if (brightness1 < brightness2) {
            minIndex = j;
        }
    }

    // If the minimum index is not the current index, swap the circles
    if (minIndex !== i) {
        const circleToMove = circles[minIndex];
        circleContainer.insertBefore(circleToMove, circles[i]);
        circles.splice(i, 0, circles.splice(minIndex, 1)[0]);
        updateNumberOfOperations();
    }

    // Delay for visualization
    await new Promise(resolve => setTimeout(resolve, delay_ms)); // Adjust delay as needed
    
    // Continue with the next iteration
    await selectionSortByBrightness(circles, i + 1, delay_ms);
}

function sleep(delay_ms) {
    return new Promise(resolve => setTimeout(resolve, delay_ms));
}

async function appendCircleWithDelay(circle, delay) {
    
    await sleep(delay); // Wait for the specified delay
    circleContainer.appendChild(circle);
}

function fillArray(totalCircles, circles){
    circles.length = 0 // clear all existing elements
    for (let i = 0; i < totalCircles; i++) {
        const circle = createCircle();
        circles.push(circle);
    }
}

async function shuffleCircles(totalCircles, circles){
        for (let i = 0; i < totalCircles; i++){
            const brightness = Math.floor(Math.random() * (80 - 30 + 1)) + 30;
            const hue = 10;
            circles[i].style.backgroundColor =  `hsl(${hue}, 100%, ${brightness}%)`;
            circles[i].dataset.brightness = brightness;
        }
}

async function fillScreenWithCircles(circles) {

    circleContainer.innerHTML = '';
    circles.length = 0;

    const containerWidth = parseFloat(getComputedStyle(circleContainer).width);
    const containerHeight = parseFloat(getComputedStyle(circleContainer).height);

    const circleSize = 80;
    
    const columns = Math.floor(containerWidth / circleSize); // Approximate number of circles per row
    const rows = Math.floor(containerHeight / circleSize);   // Approximate number of circles per column
     
    circleContainer.style.gridTemplateColumns = `repeat(${columns}, ${circleSize}px)`;
    circleContainer.style.gridTemplateRows = `repeat(${rows}, ${circleSize}px)`;

    const totalCircles = columns * rows;

    fillArray(totalCircles, circles);  

    if (circles.length !== totalCircles) {
        console.error('Failed to create the correct number of circles.');
        return;
    }

    for (let i = 0; i < totalCircles; i++) {
            const circle = circles[i]
            if(circle instanceof Node){
                await appendCircleWithDelay(circle, 10);
            } else {
                console.error('Invalid node encountered', circle)
            }
    } 
}

fillScreenWithCircles(circles);

if(shuffleButton){
    shuffleButton.addEventListener('click', async() => {
        totalCircles = circles.length
        numberOfOperations = 0;
        await shuffleCircles(totalCircles, circles)
    })
}

if(selectionSortButton){
    selectionSortButton.addEventListener('click', async() => {
        await selectionSortByBrightness(circles, 0, 0, 10)
        numberOfOperations = 0;
    });
}
if(bubbleSortButton){
    bubbleSortButton.addEventListener('click', async() => {
            await bubbleSortByBrightness(circles, 0, 0, 10)
            console.log("bubble sort clicked!")     
            numberOfOperations = 0;
    });
}


// Recalculate on window resize to keep circles perfectly fitted
window.addEventListener('resize', () => {
    fillScreenWithCircles(circles);
});
