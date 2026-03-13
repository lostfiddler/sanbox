import React, {useRef, useEffect} from 'react';
import {vec2} from "gl-matrix";
import { Particle } from './01_intro_to_particle_systems';
import { Emitter4_6 as Emitter } from "./02_behaviors_of_particles";
import { p5, CANVAS_WIDTH, CANVAS_WIDTH_RATIO, getMousePosition } from '../../../../constants';

export default () => {
    const example4_8Ref = useRef(null);
    const example4_9Ref = useRef(null);

    useEffect(() => {
        example4_8(example4_8Ref.current!)
    })

    return (
        <div>
            <h1>Image Textures</h1>
            <h3>Example 4.8: An Image-Texture Particle System</h3>
            <canvas ref={example4_8Ref}></canvas>
        </div>
    )
}

const img = new Image();
img.src = "./src/assets/images/smoke_texture.png";

class Particle4_8 extends Particle {
    constructor(graphics: CanvasRenderingContext2D, x: number | undefined, y: number | undefined) {
        super(graphics, x, y)
    }

    draw() {
        this.graphics.save();
        this.graphics.globalAlpha = this.lifespan / 500;
        this.graphics.drawImage(img, this.position[0], this.position[1])
        this.graphics.restore();
    }
}

class Emitter4_8 extends Emitter {
    constructor(graphics, x, y) {
        super(graphics, x, y);
    }

    addParticle() {
        this.particles.push(
            new Particle4_8(
                this.graphics,
                this.x ? this.x : undefined,
                this.y ? this.y : undefined
            )
        );
    }
}

function example4_8(c: HTMLCanvasElement) {
    const graphics = c.getContext("2d")!;

    graphics.canvas.width = CANVAS_WIDTH;
    graphics.canvas.height = graphics.canvas.width / CANVAS_WIDTH_RATIO;

    let emitter = new Emitter4_8(graphics, graphics.canvas.width / 2, 200)

    let mouseX, mouseY;
    graphics.canvas.onmousemove = (e) => {
         [mouseX, mouseY] = getMousePosition(e)
    }

    function animate() {
        requestAnimationFrame(animate);
        graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);

        let dx = p5.map(mouseX, 0, graphics.canvas.width, -0.2, 0.2);
        let wind = vec2.fromValues(dx, 0);

        emitter.applyForce(wind);
        emitter.run();
        emitter.addParticle();
    }
    requestAnimationFrame(animate);
}
