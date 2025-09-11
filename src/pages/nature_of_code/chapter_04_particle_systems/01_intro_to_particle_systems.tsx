import React, { useRef, useEffect } from "react";
import { stripIndent } from "common-tags";
import { vec2 } from "gl-matrix";
import {
    CANVAS_WIDTH,
    CANVAS_WIDTH_RATIO,
    getMousePosition,
} from "../../../../constants";

export default () => {
    const example4_1Ref = useRef(null);
    const example4_2Ref = useRef(null);
    const example4_3Ref = useRef(null);
    const example4_4Ref = useRef(null);

    useEffect(() => {
        example4_1(example4_1Ref.current!);
        example4_2(example4_2Ref.current!);
        example4_3(example4_3Ref.current!);
        example4_4(example4_4Ref.current!);
    });

    return (
        <div>
            <h1>Intro to Particle Systems</h1>
            <h2>Lifespan</h2>
            <p>
                When generating a continuous stream of particles they cant live
                forever. So as new particles are born, old particles need to be
                removed, creating the illusion of an infinite stream of
                particles.
            </p>
            <p>
                There are many ways to decide when a particle is ready to be
                removed. It could "die" when it comes into contact with another
                object or when it leaves the frame of the canvas. For now, lets
                give particles a <code className="language-js">lifespan</code>{" "}
                variable that acts like a timer. It will start at 255 and count
                down to 0 as the sketch progress, at which point the particle
                will be considered dead.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    class Paricle {
                        constructor(x, y) {
                            this.position = createVector(x, y);
                            this.acceleration = createVector();
                            this.velocity = createVector();
                            this.lifespan = 255;
                        }
                        update() {
                            this.velocity.add(this.acceleration)
                            this.position.add(this.velocity)
                            this.lifespan -= 2.0;
                        }

                        display() {
                            circle(this.position.x, this.position.y, 8)
                        }
                    }
                `}
                </code>
            </pre>
            <p>
                With the addition of the{" "}
                <code className="language-js">lifespan</code> property, we'll
                need one more method, one that can be queried to determine
                wether the particle is alive or dead.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    isDead() {
                        return (this.lifespan < 0.0)
                    }
                `}
                </code>
            </pre>
            <p>
                Before we get to the next step of making many particles, it's
                worth taking a moment to confirm that the particle works
                correctly.
            </p>
            <h3>Example 4.1: A Single Particle</h3>
            <canvas ref={example4_1Ref}></canvas>
            <h2>An Array of Particles</h2>
            <p>
                When trying to manipulate the contents of an array while
                iterating through that very same array there are a multitude of
                pitfalls that we must be wary of. The can of worms about to be
                opened in this example is discussed{" "}
                <a href="https://natureofcode.com/particles/#an-array-of-particles">
                    here
                </a>
                .
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    const particles = [];

                    function animate() {
                        particles.push(new Particle())

                        // Loop through the array backward for deletion.
                        for (let i = particles.length - 1;i > 0;i++){
                            particles[i].run();

                            if (particles[i].isDead()) {
                                particles.splice(i, 1)
                            }
                        }
                    }
                `}
                </code>
            </pre>
            <h3>Example 4.2: An Array of Particles</h3>
            <canvas ref={example4_2Ref}></canvas>
            <h2>A Particle Emitter</h2>
            <p>
                Writing a class describing the list, or system, of{" "}
                <code className="language-js">Particle</code> objects iteslf
                will allow us to clean up our main animate function, removing
                the bulky logic of looping through all the particles. As an
                added bonus, it will also open the possibility of having
                multiple particle emitters.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    class Emitter {
                        constructor(
                            this.particles = [];
                        )

                        addParticle() {
                            this.particles.push(new Particle())
                        }

                        run() {
                            this.addParticle();

                            for (let i = this.particles.length - 1; i > 0; i--) {
                                this.particles[i].run();

                                if (this.particles[i].isDead()) {
                                    this.particles.splice(i, 1);
                                }
                            }
                        }
                    }
                `}
                </code>
            </pre>
            <p>Now in our main animation/game loop:</p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        function animate() {
                            emitter.run();
                        }
                    `}
                </code>
            </pre>
            <h3>Example 4.3: A Single Particle Emitter</h3>
            <canvas ref={example4_3Ref}></canvas>
            <p>
                The example emitter is a static source of particles. However the
                emitter could have it's own behaviours: experiencing physics,
                oscillating, reacting to user input, or exhibiting any other
                kind of motion described previously. The particles could also
                have more complex and intreguing patterns.
            </p>
            <h2>A System of Emitters</h2>
            <p>
                So far, we've described an individual particle and organized its
                code into a <code className="language-js">Particle</code> class.
                We've also described a system of particles and organized the
                code into an <code className="language-js">Emitter</code> class.
                There's no reason we couldn't also build a collection of many
                particle emitters: a system of systems!
            </p>
            <h3>Example 4.4: A System of Systems </h3>
            <figure>
                <canvas ref={example4_4Ref}></canvas>
                <figcaption>Clicking the mouse adds a new emitter.</figcaption>
            </figure>
            <p>
                Whenever the mouse is clicked, a new{" "}
                <code className="language-js">Emitter</code> object is created
                and placed into the array:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    canvas.onclick = (e) => {
                        let [x, y] = getMousePosition(e)

                        emitters.push(new Emitter(x, y))
                    }
                `}
                </code>
            </pre>
            <p>Now our animate loop looks like this:</p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    let emitters = []

                    function animate() {
                        for (let emitter of emitters) {
                            emitter.run()
                            emitter.addParticle()
                        }
                    }
                `}
                </code>
            </pre>
        </div>
    );
};

export class Particle {
    graphics: CanvasRenderingContext2D;
    physics: {};
    x: number;
    y: number;
    position: vec2;
    velocity: vec2;
    acceleration: vec2;
    lifespan: number;

    constructor(graphics: CanvasRenderingContext2D, x?: number, y?: number) {
        this.graphics = graphics;
        this.position = vec2.fromValues(
            x ? x : this.graphics.canvas.width / 2,
            y ? y : 50
        );
        this.velocity = vec2.fromValues(
            Math.random() * (1 - -1) + -1,
            Math.random() * (0 - -2) + -2
        );
        this.acceleration = vec2.fromValues(0, 0);
        this.lifespan = 255;
    }

    update() {
        vec2.add(this.position, this.position, this.velocity);
        vec2.add(this.velocity, this.velocity, this.acceleration);
        this.lifespan -= 2;

        vec2.zero(this.acceleration);
    }

    draw() {
        this.graphics.fillStyle = `rgba(0, 0, 0, ${this.lifespan / 255})`;
        this.graphics.beginPath();
        this.graphics.arc(
            this.position[0],
            this.position[1],
            5,
            0,
            Math.PI * 2
        );
        this.graphics.fill();
        this.graphics.closePath();
    }

    applyForce(force: vec2) {
        vec2.add(this.acceleration, this.acceleration, force);
    }

    isDead() {
        return this.lifespan < 0;
    }

    run() {
        this.applyForce(physics.gravity);
        this.update();
        this.draw();
    }
}

class Emitter {
    particles: Particle[];
    graphics: CanvasRenderingContext2D;
    x: number;
    y: number;

    constructor(graphics, x, y) {
        this.particles = [];
        this.graphics = graphics;
        this.x = x;
        this.y = y;
    }

    addParticle() {
        this.particles.push(
            new Particle(
                this.graphics,
                this.x ? this.x : undefined,
                this.y ? this.y : undefined
            )
        );
    }

    run() {
        this.addParticle();

        for (let i = this.particles.length - 1; i > 0; i--) {
            this.particles[i].run();

            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}

const physics = {
    gravity: vec2.fromValues(0, 0.08),
};

function example4_1(c: HTMLCanvasElement) {
    const graphics = c.getContext("2d")!;

    graphics.canvas.width = CANVAS_WIDTH;
    graphics.canvas.height = graphics.canvas.width / CANVAS_WIDTH_RATIO;

    let particle = new Particle(graphics);

    function animate() {
        requestAnimationFrame(animate);
        graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);

        particle.run();
        if (particle.isDead()) {
            particle = new Particle(graphics);
        }
    }

    requestAnimationFrame(animate);
}

function example4_2(c: HTMLCanvasElement) {
    const graphics = c.getContext("2d")!;

    graphics.canvas.width = CANVAS_WIDTH;
    graphics.canvas.height = graphics.canvas.width / CANVAS_WIDTH_RATIO;

    let particles: Particle[] = [];

    function animate() {
        requestAnimationFrame(animate);
        graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        particles.push(new Particle(graphics));

        for (let i = particles.length - 1; i > 0; i--) {
            particles[i].run();

            if (particles[i].isDead()) {
                particles.splice(i, 1);
            }
        }
    }

    requestAnimationFrame(animate);
}
function example4_3(c: HTMLCanvasElement) {
    const graphics = c.getContext("2d")!;

    graphics.canvas.width = CANVAS_WIDTH;
    graphics.canvas.height = graphics.canvas.width / CANVAS_WIDTH_RATIO;

    const emitter = new Emitter(graphics);

    function animate() {
        requestAnimationFrame(animate);
        graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);

        emitter.run();
    }

    requestAnimationFrame(animate);
}
function example4_4(c: HTMLCanvasElement) {
    const graphics = c.getContext("2d")!;

    graphics.canvas.width = CANVAS_WIDTH;
    graphics.canvas.height = graphics.canvas.width / CANVAS_WIDTH_RATIO;

    const emitters: Emitter[] = [];

    graphics.canvas.onclick = (e) => {
        const [x, y] = getMousePosition(e);

        emitters.push(new Emitter(graphics, x, y));
    };

    function animate() {
        requestAnimationFrame(animate);
        graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);

        for (let emitter of emitters) {
            emitter.run();
            emitter.addParticle();
        }
    }

    requestAnimationFrame(animate);
}
