var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { CircleContainer } from './circle-container';
var circleContainer = document.getElementById('circle-container');
var shuffleButton = document.getElementById('shuffle-button');
var selectionSortButton = document.getElementById("selection-sort");
var bubbleSortButton = document.getElementById("bubble-sort");
var numberOfOperationsElement = document.getElementById('number-of-operations');
var container = new CircleContainer('circle-container', 40);
//let circles: HTMLDivElement = [];
var numberOfOperations = 0;
var isDoneSorting = false;
var sorted = false;
function updateNumberOfOperations() {
    numberOfOperations++;
    if (numberOfOperationsElement) {
        numberOfOperationsElement.innerText = numberOfOperations.toString();
    }
}
/*
function createCircle() {
    const circle = document.createElement('div');
    const brightness = Math.floor(Math.random() * (80) + 10);
    const hue = 200;

    circle.className = 'circle';
    circle.style.borderRadius = '50%';
    circle.style.margin = '0px';
    circle.style.backgroundColor = `hsl(${hue}, 5%, ${brightness}%)`;
    circle.dataset.brightness = brightness.toString();

    if (circle.style.height == circle.style.width) {
        return circle;
    }
    return null;
}
async function bubbleSort(circles, i, j, delay_ms) {

    if (circleContainer == null){
        return null;
    }
    // bubble sort done -- return
    if (i >= circles.length - 1) {
        console.log("bubble sort done!")
        isDoneSorting = true;
        return;
    }
    if (j >= circles.length - i - 1) {
        // Move to the next iteration
        await new Promise(resolve => setTimeout(resolve, delay_ms)); //delay is needed to see changes
        bubbleSort(circles, i + 1, 0, delay_ms);
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

    await new Promise(resolve => setTimeout(resolve, delay_ms));
    bubbleSort(circles, i, j + 1, delay_ms);
}

async function selectionSortByBrightness(circles, i, delay_ms) {

    if (circleContainer == null){
        return null;
    }

    console.log(circles);
    const len = circles.length;

    //selection sort complete -- return
    if (i >= len - 1) {
     isDoneSorting = true;
     return;
    }
    numberOfOperations++;
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
/*
function sleep(delay_ms) {
    return new Promise(resolve => setTimeout(resolve, delay_ms));
}

/*
async function appendCircleWithDelay(circle, delay) {
    
    await sleep(delay); // Wait for the specified delay

    if(circleContainer){
        circleContainer.appendChild(circle);
    }
}

//fills the array with circles
//this function calls createCircle() to fill the array with circle "objects"
//it then pushes the object onto the circles array
async function fillArray(totalCircles, circles){
    console.log("fill array with circles called")
    circles.length = 0 // clear all existing elements
    for (let i = 0; i < totalCircles; i++) {
        const circle = createCircle();
        circles.push(circle);
    }
}

async function shuffleCircles(totalCircles, circles){

        const hue = 200;
        for (let i = 0; i < totalCircles; i++){
            const brightness = Math.floor(Math.random() * (80) + 10);
            circles[i].style.backgroundColor =  `hsl(${hue}, 5%, ${brightness}%)`;
            circles[i].dataset.brightness = brightness;
        }
}
async function fillScreenWithCircles(circles) {

    if (circleContainer === null) {
        return null;
    }

    circleContainer.innerHTML = ''
    circles.length = 0;

    const containerWidth = parseFloat(getComputedStyle(circleContainer).width);
    const containerHeight = parseFloat(getComputedStyle(circleContainer).height);

    const circleSize = (containerWidth + containerHeight) / 25;
    
    const columns = Math.floor(containerWidth / circleSize); // Approximate number of circles per row
    const rows = Math.floor(containerHeight / circleSize);   // Approximate number of circles per column
     
    circleContainer.style.gridTemplateColumns = `repeat(${columns}, ${circleSize}px`;
    circleContainer.style.gridTemplateRows = `repeat(${rows}, ${circleSize}px`;

    const totalCircles = columns * rows;

    fillArray(totalCircles, circles);

    for (let i = 0; i < totalCircles; i++) {
            const circle = circles[i]
            await appendCircleWithDelay(circle, 10);
    }
}
*/
//fillScreenWithCircles(circles);
console.log("test");
container.populateContainer();
if (shuffleButton) {
    shuffleButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var totalCircles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!isDoneSorting) return [3 /*break*/, 1];
                    alert("not done sorting!!");
                    return [3 /*break*/, 3];
                case 1:
                    if (!(isDoneSorting && sorted)) return [3 /*break*/, 3];
                    totalCircles = container.circles.length;
                    numberOfOperations = 0;
                    return [4 /*yield*/, container.shuffle()];
                case 2:
                    _a.sent();
                    sorted = false;
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
/*
if(selectionSortButton){
    selectionSortButton.addEventListener('click', async() => {
        if(sorted){
            alert("already sorted! Try shuffling.")
        } else {
            
        isDoneSorting = false;
        await selectionSortByBrightness(circles, 0, 10)
        sorted = true;
        numberOfOperations = 0;

        }
    });
}
if(bubbleSortButton){
    bubbleSortButton.addEventListener('click', async() => {
        if(sorted){
            alert("already sorted! Try shuffling.")
        } else {

        isDoneSorting = false;
        console.log(isDoneSorting)
        await bubbleSort(circles, 0, 0, 1)
        console.log(isDoneSorting)
        sorted = true;
        numberOfOperations = 0;

        }
    });
}
*/
// Recalculate on window resize to keep circles perfectly fitted
window.addEventListener('resize', function () {
    console.log('Window resized to:', window.innerWidth, window.innerHeight);
    container.populateContainer();
});
