export class Circle {
    element: HTMLDivElement;

    constructor(size: number) {
        const circle = document.createElement('div') as HTMLDivElement;
        const brightness = Math.floor(Math.random() * (80) + 10);
        const hue = 200;  

        circle.className = 'circle';
        circle.style.borderRadius = '50%'; 
        circle.style.margin = '0px'; 
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.backgroundColor = `hsl(${hue}, 5%, ${brightness}%)`;
        circle.dataset.brightness = brightness.toString();

        this.element = circle;
    }

    async clear() {
        this.element.remove();
    }
}