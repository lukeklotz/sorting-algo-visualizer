import { Circle } from "./circle"

export class Sort {
    arr: Circle[]; 
    constructor(circles: Circle[]) {
        this.arr = circles; 
    }

    async bubbleSort() {
        const n = this.arr.length;
        for(let i = 0; i < n - 1; ++i){
            for(let j = 0; j < n - i - 1; j++) {
                if(this.arr[j].brightness < this.arr[j + 1].brightness) {
                    const temp = this.arr[j];
                    this.arr[j] = this.arr[j + 1];
                    this.arr[j + 1] = temp;
                }
            }
        }
    }
}