import React, {useRef, useEffect} from 'react';
import { Particle } from './01_intro_to_particle_systems';
import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from '../../../../constants';

export default () => {
    const example4_8Ref = useRef(null);
    const example4_9Ref = useRef(null);

    useEffect(() => {
        example4_8(example4_8Ref.current!)
        example4_9(example4_9Ref.current!)
    })

    return (
        <div>
            <h1>Image Textures and Additive Blending</h1>
            <h3>Example 4.8: An Image-Texture Particle System</h3>
            <canvas ref={example4_8Ref}></canvas>
            <h3>Example 4.9: Additive Blending</h3>
            <canvas ref={example4_9Ref}></canvas>
        </div>
    )
}

const img = new Image();
img.src = "./src/assets/images/smoke_texture.png";

class Particle4_8 extends Particle {
    constructor(graphics: CanvasRenderingContext2D) {
        super(graphics)
    }

    draw() {
        this.graphics.drawImage(img, this.position[0], this.position[1])
    }
}

function example4_8(c: HTMLCanvasElement) {
    const graphics = c.getContext("2d")!;

    graphics.canvas.width = CANVAS_WIDTH;
    graphics.canvas.height = graphics.canvas.width / CANVAS_WIDTH_RATIO;

    const particle = new Particle4_8(graphics)

    particle.draw();
}

function example4_9(c: HTMLCanvasElement) {
    const graphics = c.getContext("2d")!;

    graphics.canvas.width = CANVAS_WIDTH;
    graphics.canvas.height = graphics.canvas.width / CANVAS_WIDTH_RATIO;

}
