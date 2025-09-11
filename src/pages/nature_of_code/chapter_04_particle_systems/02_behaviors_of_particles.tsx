import { stripIndent } from "common-tags";
import React, { useRef, useEffect } from "react";
import { Particle } from "./01_intro_to_particle_systems";
import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO, p5 } from "../../../../constants";
import { vec2 } from "gl-matrix";
import { Vector } from "p5";

export default () => {
    const example4_5Ref = useRef(null);
    const example4_6Ref = useRef(null);
    const example4_7Ref = useRef(null);

    useEffect(() => {
        example4_5(example4_5Ref.current!);
        example4_6(example4_6Ref.current!);
        example4_7(example4_7Ref.current!);
    });
    return (
        <div>
            <h1>Behaviors of Particles</h1>
            <p>
                By harnessing two fundamental OOP principles, inheritance and
                polymorphism, we can create particle systems with significantly
                more variety and interest. If you need a refresher on these
                topics you can read more about them{" "}
                <a href="https://natureofcode.com/particles/#inheritance-and-polymorpism">
                    here
                </a>
                .
            </p>
            <h2>Particles with Inheritance and Polymorphism</h2>
            <p>
                Now lets write a <code className="language-js">Particle</code>{" "}
                class based on the theory behind inheritance and polymorphism.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    class Confetti extends Particle {
                        constructor(x, y) {
                            // super calls the constructor from the parent class
                            super(x, y);
                            
                            // We could add variables for only Confetti here.
                        }

                        // Overide the draw() mehod.
                        draw() {
                            rec(this.position.x, this.position.y, 12);
                        }
                    }
                `}
                </code>
            </pre>
            <p>
                We can add a bit more fun. Say we want to have each{" "}
                <code className="language-js">Confetti</code> particle rotate:
            </p>
            <pre className="language-js">
                <code>{`let angle = map(this.position.x, 0, width, 0, Math.PI * 4)`}</code>
            </pre>
            <h3>
                Example 4.5: A Particle System with Inheritance and Polymorphism
            </h3>
            <canvas ref={example4_5Ref}></canvas>
            <h2>Particle Systems with Forces</h2>
            <p>
                Say we want to apply forces to the individual particles in a
                system. We could hardcode a force and apply it in the{" "}
                <code className="language-js">Particle</code> class. However we
                could also consider a broader, more generic solution.
            </p>
            <p>
                We could pass the force to the emitter and let it manage all the
                individual particles:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    function animate() {
                        let gravity = createVector(0, 0.1);
                        emitter.applyForce(gravity);

                        emitter.addParticle();
                        emitter.run();
                    }
                `}
                </code>
            </pre>
            <p>
                We of course have to define the{" "}
                <code className="language-js">applyForce()</code> method in the{" "}
                <code className="language-js">Emitter</code> class.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    applyForce(force) {
                        for (let particle of this.particles) {
                            particle.applyForce(force);
                        }
                    }
                `}
                </code>
            </pre>
            <h3>Example 4.6: A Particle System with Forces</h3>
            <canvas ref={example4_6Ref}></canvas>
            <h2>Particle Systems with Repellers</h2>
            <p>
                What if we wanted to take our code one step futher and apply a
                force on a particular particle rather than uniformly applying
                it? Lets incorporate a new{" "}
                <code className="language-js">Repeller</code> object to
                illustrate.
            </p>
            <p>
                In order to incorporate a new{" "}
                <code className="language-js">Repeller</code> object we will
                need two major additions to the code:
            </p>
            <ul>
                <li>
                    A <code className="language-js">Repeller</code> object
                    (declared, initialized, and displayed)
                </li>
                <li>
                    A method that passes the{" "}
                    <code className="language-js">Repeller</code>
                    object into the particle emitter so that the repeller can
                    aply a force to each particle object.
                </li>
            </ul>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    let emitter = new Emitter();
                    let repeller = new Repeller();

                    function animate() {
                        let gravity = createVector(0, 0.1);

                        emitter.applyForce(gravity);
                        emitter.applyRepeller(repeller);
                        emitter.run();
                        repeller.show();
                    }
                `}
                </code>
            </pre>
            <p>
                Creating a <code className="language-js">Repeller</code> object
                is duplicate of the{" "}
                <code className="language-js">Attractor</code> class from
                Example 2.6. We'll change the{" "}
                <code className="language-js">mass</code> property to one called
                <code className="language-js">power</code> to the{" "}
                <code className="language-js">Repeller</code>. This property can
                be used to adjust the strength of the repellent force:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    class Repeller {
                        constructor(x, y) {
                            this.position = createVector(x, y);
                            this.power = 150;
                        }

                        display() {
                            graphics.beginPath();
                            graphics.arc(
                                this.position.x,
                                this.position.y,
                                32,
                                0,
                                Math.PI * 2
                            );
                            graphics.fill("red");
                            graphics.closePath();
                        }
                    }
                `}
                </code>
            </pre>
            <p>
                Writing the <code className="language-js">applyRepeller()</code>{" "}
                method involves passinging a{" "}
                <code className="language-js">Repeller</code> object in{" "}
                <code className="language-js">applyRepeller()</code> and ask
                that method to do the work of calculating the force between the
                repeller and each particle.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    applyRepeller(repeller) {
                        for (let particle of this.particles) {
                            let force = repeller.repel(particle);
                            particle.applyForce(force);
                        }
                    }
                `}
                </code>
            </pre>
            <p>
                The <code className="language-js">repel()</code> method
                calculates a vector to be applied to each{" "}
                <code className="language-js">Particle</code> object.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    repel(particle) {
                        let force = p5.Vector.sub(this.position, particle.position);

                        let distance = force.mag();
                        distance = constrain(distance, 5, 50);

                        let strength = -1 * this.power / (distance * distance);

                        force.setMag(strength);
                        return force;
                    }
                `}
                </code>
            </pre>
            <p>
                Throught this entire process of adding a repeller to the
                environment, we never once considered editing the{" "}
                <code className="language-js">Particle</code> class itself. A
                particle doesn't have to know anything about the details of its
                environment; it simply needs to manage its position, velocity,
                and acceleration, as well as have te ability to recieve an
                external force and act on it.
            </p>
            <h3>Example 4.7: A Particle System with a Repeller</h3>
            <canvas ref={example4_7Ref}></canvas>
        </div>
    );
};

class Confetti extends Particle {
    graphics: CanvasRenderingContext2D;
    x: number;
    y: number;

    constructor(graphics, x, y) {
        super(graphics, x, y);
    }

    draw() {
        let angle = p5.map(
            this.position[0],
            0,
            this.graphics.canvas.width,
            0,
            Math.PI * 4
        );

        this.graphics.save();
        this.graphics.translate(this.position[0], this.position[1]);
        this.graphics.rotate(angle);
        this.graphics.fillRect(0, 0, 12, 12);
        this.graphics.restore();
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
        let r = p5.random(1);

        if (r < 0.5) {
            this.particles.push(
                new Particle(
                    this.graphics,
                    this.x ? this.x : undefined,
                    this.y ? this.y : undefined
                )
            );
        } else {
            this.particles.push(
                new Confetti(
                    this.graphics,
                    this.x ? this.x : undefined,
                    this.y ? this.y : undefined
                )
            );
        }
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

class Emitter4_6 extends Emitter {
    constructor(graphics, x, y) {
        super(graphics, x, y);
    }

    applyForce(force) {
        for (let particle of this.particles) {
            particle.applyForce(force);
        }
    }

    run() {
        this.addParticle();

        for (let i = this.particles.length - 1; i >= 0; i--) {
            let particle = this.particles[i];
            particle.run();
            if (particle.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}

class Emitter4_7 extends Emitter4_6 {
    constructor(graphics, x, y) {
        super(graphics, x, y);
    }

    applyRepeller(repeller) {
        for (let particle of this.particles) {
            let force = repeller.repel(particle);
            particle.applyForce(force);
        }
    }
}

class Repeller {
    position: vec2;
    power: number;
    graphics: CanvasRenderingContext2D;

    constructor(graphics, x, y) {
        this.graphics = graphics;
        this.position = vec2.fromValues(x, y);
        this.power = 75;
    }

    display() {
        this.graphics.fillStyle = "black"
        this.graphics.beginPath();
        this.graphics.arc(
            this.position[0],
            this.position[1],
            32,
            0,
            Math.PI * 2
        );
        this.graphics.fill();
        this.graphics.closePath();
    }

    repel(particle: Particle) {
        let f = vec2.clone(this.position)
        let force = vec2.sub(f, f, particle.position);
        let distance = vec2.length(force);

        distance = p5.constrain(distance, 5, 50);
        let strength = (-1 * this.power) / (distance * distance);
        vec2.normalize(force, force);
        vec2.scale(force, force, strength);
        return force;
    }
}

function example4_5(c: HTMLCanvasElement) {
    const graphics = c.getContext("2d")!;

    graphics.canvas.width = CANVAS_WIDTH;
    graphics.canvas.height = graphics.canvas.width / CANVAS_WIDTH_RATIO;

    const emitter = new Emitter(graphics, graphics.canvas.width / 2, 50);

    function animate() {
        requestAnimationFrame(animate);
        graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        emitter.run();
    }

    requestAnimationFrame(animate);
}
function example4_6(c: HTMLCanvasElement) {
    const graphics = c.getContext("2d")!;

    graphics.canvas.width = CANVAS_WIDTH;
    graphics.canvas.height = graphics.canvas.width / CANVAS_WIDTH_RATIO;

    let emitter = new Emitter4_6(graphics, graphics.canvas.width / 2, 50);

    function animate() {
        requestAnimationFrame(animate);
        graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        let gravity = vec2.fromValues(0, 0.1);
        emitter.applyForce(gravity);
        emitter.run();
    }

    requestAnimationFrame(animate);
}
function example4_7(c: HTMLCanvasElement) {
    const graphics = c.getContext("2d")!;

    graphics.canvas.width = CANVAS_WIDTH;
    graphics.canvas.height = graphics.canvas.width / CANVAS_WIDTH_RATIO;

    const emitter = new Emitter4_7(graphics, graphics.canvas.width / 2, 50);
    const repeller = new Repeller(
        graphics,
        graphics.canvas.width / 2,
        graphics.canvas.height - 10
    );

    function animate() {
        requestAnimationFrame(animate);
        graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height)

        emitter.applyRepeller(repeller)
        emitter.run();

        repeller.display();
    }

    requestAnimationFrame(animate);
}
