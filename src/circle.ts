export class Circle {
    element: HTMLDivElement;
    brightness: number;

    constructor(size: number) {
        const circle = document.createElement('div') as HTMLDivElement;
        const hue = 200;  
        this.brightness = Math.floor(Math.random() * (80) + 10);

        circle.className = 'circle';
        circle.style.borderRadius = '50%'; 
        circle.style.margin = '0px'; 
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.backgroundColor = `hsl(${hue}, 5%, ${this.brightness}%)`;
        circle.dataset.brightness = this.brightness.toString();

        this.element = circle;
    }

    async clear() {
        this.element.remove();
    }
}