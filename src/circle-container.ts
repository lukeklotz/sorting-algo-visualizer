import { Circle } from './circle';

export class CircleContainer {
    circles: Circle[] = [];
    container: HTMLElement; 
    columns: number;
    rows: number;
    totalCircles: number;
    containerSize: DOMRect;
    containerWidth: number;
    containerHeight: number;
    circleSize: number;
    totalOps: number;
    totalOpsElement: HTMLElement | null;

    constructor(containerId: string) {

        const containerElement = document.getElementById(containerId);
        if(!containerElement) {
            throw new Error('Container element not found');
        }
        this.container = containerElement;
        this.circleSize = 30;
        this.containerSize = this.container.getBoundingClientRect();
        this.containerWidth = this.containerSize.width;
        this.containerHeight = this.containerSize.height;
        this.columns = Math.floor(this.containerWidth / this.circleSize);
        this.rows = Math.floor(this.containerHeight / this.circleSize);
        this.totalCircles = this.columns * this.rows;
        this.totalOps = 0;
        this.totalOpsElement = document.getElementById('number-of-operations');
    }

    updateTotalOps() {
        if(this.totalOpsElement){
            this.totalOps += 1;
            this.totalOpsElement.innerText = this.totalOps.toString();
        }
    }

    async sleep(delay: number) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    
    async populateContainer() {

        if (!this.container) {
            throw new Error("Error populating the container. Container is null.");
        }
        this.container.innerHTML = ''; //clear DOM
        this.circles.length = 0;       //clear array
 
        //fill array;
        for(let i = 0; i < this.totalCircles; i++) {
            const circle = new Circle(this.circleSize);
            this.circles.push(circle);
            this.container.appendChild(circle.element);
            await this.sleep(1);
        }
    }

    async shuffle() {
        for (let i = this.circles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.circles[i], this.circles[j]] = [this.circles[j], this.circles[i]];
        }
    
        this.container.innerHTML = '';
        for (const circle of this.circles) {
            this.container.appendChild(circle.element);
            await this.sleep(1);
        }

        this.totalOps = 0;
    } 

    getList(){
        return this.circles;
    }

    async bubbleSort() {
        this.totalOps = 0;
        const n = this.circles.length;
        for(let i = 0; i < n - 1; ++i){
            for(let j = 0; j < n - i - 1; j++) {
                if(this.circles[j].brightness < this.circles[j + 1].brightness) {
                    const temp = this.circles[j];
                    this.circles[j] = this.circles[j + 1];
                    this.circles[j + 1] = temp;

                    this.updateTotalOps();
                    
                    this.container.innerHTML = '';
                    for (const circle of this.circles) {
                        this.container.appendChild(circle.element);
                    }

                    await this.sleep(1);
                }
            }
        }
    }   
    async selectionSort() {
        this.totalOps = 0;
        const n = this.circles.length;
    
        for (let i = 0; i < n - 1; i++) {
            let maxIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (this.circles[j].brightness > this.circles[maxIndex].brightness) {
                    maxIndex = j;
                }
            }
    
            if (maxIndex !== i) {
                const temp = this.circles[i];
                this.circles[i] = this.circles[maxIndex];
                this.circles[maxIndex] = temp;

                this.updateTotalOps();
    
                this.container.innerHTML = '';
                for (const circle of this.circles) {
                    this.container.appendChild(circle.element);
                }
    
                await this.sleep(1);
            }
        }
    }

}