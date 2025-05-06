let emitters = [];  

function setup() {  
    createCanvas(windowWidth, windowHeight);  
    // Create an emitter at the center  
    emitters.push(new Emitter(width / 2, height / 2));  
}  

function draw() {  
    background(0);  
    for (let emitter of emitters) {  
        emitter.emit();  
        emitter.update();  
        emitter.display();  
    }  
}  

class Emitter {  
    constructor(x, y) {  
        this.position = createVector(x, y);  
        this.particles = [];  
        this.emitRate = 5; // Number of particles to emit each frame  
    }  

    emit() {  
        for (let i = 0; i < this.emitRate; i++) {  
            this.particles.push(new Particle(this.position.x, this.position.y));  
        }  
    }  

    update() {  
        for (let particle of this.particles) {  
            particle.update();  
        }  
        // Remove particles that are off-screen  
        this.particles = this.particles.filter(p => p.isAlive());  
    }  

    display() {  
        for (let particle of this.particles) {  
            particle.display();  
        }  
    }  
}  

class Particle {  
    constructor(x, y) {  
        this.position = createVector(x, y);  
        this.velocity = p5.Vector.random2D().mult(random(2, 5)); // Random direction and speed  
        this.lifespan = 255; // Particle lifespan  
        this.color = color(random(255), random(255), random(255)); // Random color  
        this.size = random(5, 15); // Random size  
    }  

    update() {  
        this.position.add(this.velocity);  
        this.lifespan -= 2; // Decrease lifespan over time  
    }  

    display() {  
        stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);  
        strokeWeight(this.size); // Variable size  
        point(this.position.x, this.position.y);  
    }  

    isAlive() {  
        return this.lifespan > 0;  
    }  
}  