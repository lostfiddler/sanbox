import React from "react";
import { stripIndent } from "common-tags";
import katex from "katex";
import t_p5 from "p5";
import {
    p5,
    getMousePosition,
    CANVAS_WIDTH,
    CANVAS_WIDTH_RATIO,
} from "../../../../constants";

export default () => {
    const example5_1Ref = React.useRef(null);
    const example5_2Ref = React.useRef(null);
    const example5_3Ref = React.useRef(null);

    React.useEffect(() => {
        example5_1(example5_1Ref.current!);
        example5_2(example5_2Ref.current!);
        example5_3(example5_3Ref.current!);
    });

    return (
        <div>
            <h1>Vehicles and Steering</h1>
            <p>Vehicles have three layers:</p>
            <ol>
                <li>
                    Action selection: A vehicle has a goal (or goals) and can
                    choose an action based on that goal.
                </li>
                <li>
                    Steering: Once an action has been selected, the vehicle has
                    to calculate its next move.
                </li>
                <li>
                    Locomotion: How will the vehicles movements be visually
                    represented?
                </li>
            </ol>
            <h2>Steering Force</h2>
            <p>
                Lets consider a vehicle seeking a target. The vehicles goal and
                subsequent action is to seek the target. How can we define this
                force? Craig Reynolds gives us the formula:
            </p>
            <div
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString(
                        "\\text{steering force} = \\text{desired velocity} - \\text{current velocity}",
                        { throwOnError: false }
                    ),
                }}
            />
            <p>Which we could write in p5.js as:</p>
            <pre>
                <code className="language-js">{stripIndent`
                let steer = p5.Vector.sub(desired, velocity);
            `}</code>
            </pre>
            <p>
                Assuming a vector called{" "}
                <code className="language-js">target</code> defining the targets
                position we could then define{" "}
                <code className="language-js">desired</code> as this:
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                    let desired = p5.Vector.sub(target, position);
                `}</code>
            </pre>
            <p>
                There's more to the story, however. With just these two lines
                the vehicle will appear to teleport itself instantly to the
                target. We can introduce some variables to keep the speed in
                check. The entire logic for the steering force will look like
                this:
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                    seek(target) {
                        let desired = p5.Vector.sub(target, this.position);
                        desired.setMag(this.maxspeed);
                        let steer = p5.Vector.sub(desired, this.velocity);
                        steer.limit(this.maxforce);
                        this.applyForce(steer);
                    }
                `}</code>
            </pre>
            <h3>Example 5.1: Seeking a target</h3>
            <canvas ref={example5_1Ref}></canvas>
            <h2>The Arrive Behavior</h2>
            <p>
                What if we want the vehicle to slow down as it approaches the
                target? Imagine a circle around the target with a given radius{" "}
                <em>r</em>. If the vehicle is within that circle, it gradually
                slows down--from the maximum speed at the very edge of the
                circle to zero speed at the target.
            </p>
            <p>
                In other words, if the distance from the target is less than{" "}
                <em>r</em>, the desired speed ranges from 0 to the maximum speed
                mapped according to that distance.
            </p>
            <h3>Example 5.2: Arriving at a target</h3>
            <canvas ref={example5_2Ref}></canvas>
            <pre className="language-js">
                <code>{stripIndent`
                    arrive(target) {
                        let desired = p5.Vector.sub(target, this.position);

                        // The distance is the magnitude of the vector
                        // pointing from the position to the target.
                        let d = desired.mag();

                        // If we are closer than 100 pixels...
                        if (d < 100) {
                            //... set the magnitude according to how close
                            //  we are.
                            let m = map(d, 0, 100, 0, this.maxspeed);
                            desired.setMag(m);
                        } else {
                            // Otherwise, proceed at maximum speed.
                            desired.setMag(this.maxspeed);
                        }

                        // The usual steering = desired - velocity

                        let steer = p5.Vector.sub(desired, this.velocity);
                        steer.limit(this.maxforce);
                        this.applyForce(steer);
                    }
                `}</code>
            </pre>
            <h3>Example 5.3: "Stay within the walls" Steering Behavior</h3>
            <canvas ref={example5_3Ref}></canvas>
        </div>
    );
};

class Vehicle {
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.position = p5.createVector(0, 0);
        this.velocity = p5.createVector();
        this.acceleration = p5.createVector();
        this.maxspeed = 8;
        this.maxforce = 4;
    }

    position: t_p5.Vector;
    velocity: t_p5.Vector;
    acceleration: t_p5.Vector;
    ctx: CanvasRenderingContext2D;
    maxspeed: number;
    maxforce: number;
    angle: number;

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxforce);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    display() {
        {
            // Triangle
            const width = 30;
            const height = 15;
            this.angle = Math.atan2(this.velocity.y, this.velocity.x);

            this.ctx.save();
            this.ctx.translate(this.position.x, this.position.y);
            this.ctx.rotate(this.angle);
            this.ctx.fillStyle = "red";
            this.ctx.strokeStyle = "black";
            this.ctx.beginPath();
            this.ctx.moveTo(width, height / 2);
            this.ctx.lineTo(0, height);
            this.ctx.lineTo(0, 0);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.restore();
        }
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    seek(target: t_p5.Vector) {
        let desired = t_p5.Vector.sub(target, this.position);
        desired.setMag(this.maxspeed);

        let steer = t_p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }

    arrive(target: t_p5.Vector) {
        let desired = t_p5.Vector.sub(target, this.position);

        let distance = desired.mag();

        if (distance < 100) {
            let m = p5.map(distance, 0, 100, 0, this.maxspeed);
            desired.setMag(m);
        } else {
            desired.setMag(this.maxspeed);
        }

        let steer = t_p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }
}

class Mover {
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.position = p5.createVector();
        this.velocity = p5.createVector();
    }

    ctx: CanvasRenderingContext2D;
    position: t_p5.Vector;
    velocity: t_p5.Vector;

    update(mouse: { x: number; y: number }) {
        this.velocity.set(mouse.x, mouse.y);
        this.position.set(this.velocity.x, this.velocity.y);
    }

    display() {
        this.ctx.save();
        this.ctx.fillStyle = "red";
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, 25, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }
}

function example5_1(c: HTMLCanvasElement) {
    const ctx = c.getContext("2d")!;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = ctx.canvas.width / CANVAS_WIDTH_RATIO;

    const vehicle = new Vehicle(ctx);
    const mover = new Mover(ctx);
    const mouse = {
        x: 0,
        y: 0,
    };

    ctx.canvas.onmousemove = (e) => {
        [mouse.x, mouse.y] = getMousePosition(e);
    };

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        mover.update(mouse);
        mover.display();

        vehicle.update();
        vehicle.display();
        vehicle.seek(mover.position);
    }

    requestAnimationFrame(animate);
}

function example5_2(c: HTMLCanvasElement) {
    const ctx = c.getContext("2d")!;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = ctx.canvas.width / CANVAS_WIDTH_RATIO;

    const vehicle = new Vehicle(ctx);
    const mover = new Mover(ctx);
    const mouse = {
        x: 0,
        y: 0,
    };

    ctx.canvas.onmousemove = (e) => {
        [mouse.x, mouse.y] = getMousePosition(e);
    };

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        mover.update(mouse);
        mover.display();

        vehicle.arrive(mover.position);
        vehicle.update();
        vehicle.display();
    }

    requestAnimationFrame(animate);
}

function example5_3(c: HTMLCanvasElement) {
    const ctx = c.getContext("2d")!;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = ctx.canvas.width / CANVAS_WIDTH_RATIO;

    const offset = 30;

    ctx.strokeRect(
        offset,
        offset,
        ctx.canvas.width - offset * 2,
        ctx.canvas.height - offset * 2
    );
}
