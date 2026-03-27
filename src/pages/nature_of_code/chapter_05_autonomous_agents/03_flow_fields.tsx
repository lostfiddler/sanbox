import React, { useEffect, useRef } from "react";
import t_p5 from "p5";
import rough from "roughjs";
import {
    p5,
    CANVAS_WIDTH,
    CANVAS_WIDTH_RATIO,
    getMousePosition,
} from "../../../../constants";
import { stripIndent } from "common-tags";

export default () => {
    const displayRightRef = useRef(null);
    const displayRandomRef = useRef(null);
    const displayPerlinRef = useRef(null);
    const example5_6Ref = useRef(null);

    useEffect(() => {
        displayRight(displayRightRef.current!);
        displayRandom(displayRandomRef.current!);
        displayPerlin(displayPerlinRef.current!);
        example5_6(example5_6Ref.current!);
    });

    return (
        <div>
            <h1>Flow Fields</h1>
            <p>Another type of steering behaviour is flow-field following.</p>
            <p>
                What is flow-field folling? Think of a grid. In each cell of the
                grid lives an arrow pointing in a certain direction, or, in
                other words a vector. As a vehicle moves around the grid it
                looks up which arrow is beneath it, and that is its desired
                velocity.
            </p>
            <canvas ref={displayRightRef}></canvas>
            <p>
                How do we write the code for a flow-field? In the Nature of
                Code, Daniel Shiffman uses a 2D array to set up his data
                structure. Just for fun I'll try a one dimensional array.
            </p>
            <h3>One-Dimensional array</h3>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        class FlowField {
                            constructor() {
                                this.resolution = 50;

                                this.num_cols = Math.floor(gridWidth / this.resolution);
                                this.num_rows = Math.floor(gridHeight / this.resolution);

                                this.cell_w = gridWidth / this.num_cols;
                                this.cell_h = gridHeight / this.num_rows;

                                this.total_cells = this.num_cols * this.num_rows;

                                this.field = new Array(this.total_cells);
                            }
                        }
                    `}
                </code>
            </pre>
            <p>
                Now that we have our data structure set up, how do we compute
                the values of our vectors? However we want!
            </p>
            <p>How about pointing every vector in the right direction?</p>
            <canvas ref={displayRightRef}></canvas>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        for (let i = 0;i < this.field.length;i++) {
                            this.field[i] = p5.createVector(1, 0);
                        }
                    `}
                </code>
            </pre>
            <p>
                Or maybe we'd like every vector pointing in a random direction.
            </p>
            <canvas ref={displayRandomRef}></canvas>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        for (let i = 0;i < this.field.length;i++) {
                            this.field[i] = p5.Vector.random2D();
                        }
                    `}
                </code>
            </pre>
            <p>
                What about using perlin noise. Just map each vector to an angle
                from 0 to 2π and create a vector from that angle:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        let t = 0.1;
                        for (let i = 0;i < this.field.length;i++) {
                            let angle = p5.map(p5.noise(t), 0, 1, 0, p5.TWO_PI);
                            this.field[i] = p5.Vector.fromAngle(angle);
                            t += 0.1;
                        }
                    `}
                </code>
            </pre>
            <canvas ref={displayPerlinRef}></canvas>
            <p>
                Now that we have a data structure storing our 2D vector values,
                we need a way for a vehicle to look up its desired velocity.
            </p>
            <h3>Example 5.6: Flow-Field Following</h3>
            <canvas ref={example5_6Ref}></canvas>
        </div>
    );
};

class FlowField {
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.resolution = 50;

        this.num_cols = Math.floor(ctx.canvas.width / this.resolution);
        this.num_rows = Math.floor(ctx.canvas.height / this.resolution);
        this.cell_w = ctx.canvas.width / this.num_cols;
        this.cell_h = ctx.canvas.height / this.num_rows;
        this.total_cells = this.num_cols * this.num_rows;

        this.field = new Array(this.total_cells);

        let t = 0;
        for (let i = 0; i < this.field.length; i++) {
            this.field[i] = p5.createVector(p5.noise(t, 0));
            t += 0.1;
        }
    }

    ctx: CanvasRenderingContext2D;
    resolution;
    num_cols;
    num_rows;
    cell_w;
    cell_h;
    total_cells;
    field: t_p5.Vector[];

    displayRight() {
        for (let i = 0; i < this.field.length; i++) {
            const x = (i % this.num_cols) * this.cell_w;
            const y = Math.floor(i / this.num_cols) * this.cell_h;

            this.ctx.strokeStyle = "darkviolet";

            this.drawArrow(
                x,
                y + this.cell_h / 2,
                x + this.cell_w,
                y + this.cell_h / 2
            );
        }
    }

    displayRandom() {
        for (let i = 0; i < this.field.length; i++) {
            const x = (i % this.num_cols) * this.cell_w;
            const y = Math.floor(i / this.num_cols) * this.cell_h;
            const angle = p5.map(p5.random(p5.TWO_PI), 0, 1, 0, p5.TWO_PI);

            this.ctx.save();

            this.ctx.translate(x + this.cell_w / 2, y + this.cell_h / 2);
            this.ctx.rotate(angle);
            this.ctx.translate(-(x + this.cell_w / 2), -(y + this.cell_h / 2));

            this.ctx.strokeStyle = "darkviolet";

            this.drawArrow(
                x,
                y + this.cell_h / 2,
                x + this.cell_w,
                y + this.cell_h / 2
            );

            this.ctx.restore();
        }
    }

    displayPerlin() {
        for (let i = 0; i < this.field.length; i++) {
            const x = (i % this.num_cols) * this.cell_w;
            const y = Math.floor(i / this.num_cols) * this.cell_h;
            const angle = p5.map(
                this.field[i].x,
                this.field[i].y,
                1,
                0,
                p5.TWO_PI
            );

            this.ctx.save();

            this.ctx.translate(x + this.cell_w / 2, y + this.cell_h / 2);
            this.ctx.rotate(angle);
            this.ctx.translate(-(x + this.cell_w / 2), -(y + this.cell_h / 2));

            this.ctx.strokeStyle = "darkviolet";

            this.drawArrow(
                x,
                y + this.cell_h / 2,
                x + this.cell_w,
                y + this.cell_h / 2
            );

            this.ctx.restore();
        }
    }

    lookup(position: t_p5.Vector) {
        const index =
            Math.floor(position.x / this.cell_w) +
            Math.floor(position.y / this.cell_h);

        console.log(this.field[index]);
    }

    drawArrow(fromx, fromy, tox, toy) {
        const headLength = 20; // length of the wings
        const angle = Math.atan2(toy - fromy, tox - fromx);

        this.ctx.beginPath();
        this.ctx.moveTo(fromx, fromy);
        this.ctx.lineTo(tox, toy);

        this.ctx.lineTo(
            tox - headLength * Math.cos(angle - Math.PI / 6),
            toy - headLength * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.moveTo(tox, toy);
        this.ctx.lineTo(
            tox - headLength * Math.cos(angle + Math.PI / 6),
            toy - headLength * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.stroke();
    }
}

class Vehicle {
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.position = p5.createVector(25, 0);
        this.velocity = p5.createVector();
        this.acceleration = p5.createVector();
    }

    ctx: CanvasRenderingContext2D;
    position: t_p5.Vector;
    velocity: t_p5.Vector;
    acceleration: t_p5.Vector;
    angle: number;

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        this.acceleration.mult(0);
    }

    applyForce(f: t_p5.Vector) {
        this.acceleration.add(f);
    }

    display() {
        const rc = rough.canvas(this.ctx.canvas);
        this.angle = Math.atan2(this.velocity.x, this.velocity.y);

        this.ctx.save();

        this.ctx.translate(this.position.x, this.position.y);

        this.ctx.translate(25, 50);
        this.ctx.rotate(this.angle);
        this.ctx.translate(-25, -50);

        rc.polygon(
            [
                [10, 0],
                [0, 25],
                [20, 25],
                [10, 0],
            ],
            { fill: "green" }
        );
        this.ctx.restore();
    }
}

function displayRight(c: HTMLCanvasElement) {
    const ctx = c.getContext("2d")!;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = ctx.canvas.width / CANVAS_WIDTH_RATIO;

    const ff = new FlowField(ctx);

    ff.displayRight();
}

function displayRandom(c: HTMLCanvasElement) {
    const ctx = c.getContext("2d")!;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = ctx.canvas.width / CANVAS_WIDTH_RATIO;

    const ff = new FlowField(ctx);

    ff.displayRandom();
}
function displayPerlin(c: HTMLCanvasElement) {
    const ctx = c.getContext("2d")!;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = ctx.canvas.width / CANVAS_WIDTH_RATIO;

    const ff = new FlowField(ctx);

    ff.displayPerlin();
}
function example5_6(c: HTMLCanvasElement) {
    const ctx = c.getContext("2d")!;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = ctx.canvas.width / CANVAS_WIDTH_RATIO;

    const vehicle = new Vehicle(ctx);
    const ff = new FlowField(ctx);
    const f = ff.lookup(vehicle.position);

    function frame() {
        requestAnimationFrame(frame);

        ctx.clearRect(0, 0, c.width, c.height);
        ff.displayPerlin();
        vehicle.update();
        vehicle.display();
    }

    requestAnimationFrame(frame);
}
