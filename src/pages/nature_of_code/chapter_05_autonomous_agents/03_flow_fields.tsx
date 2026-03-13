import React from "react";
import {
    p5,
    CANVAS_WIDTH,
    CANVAS_WIDTH_RATIO,
    getMousePosition,
} from "../../../../constants";

export default () => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        app(canvasRef.current!);
    });

    return (
        <div>
            <h1>Flow Fields</h1>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

class FlowField {
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.resolution = 40;
        this.num_cols = Math.floor(ctx.canvas.width / this.resolution);
        this.num_rows = Math.floor(ctx.canvas.height / this.resolution);
        this.cell_w = ctx.canvas.width / this.num_cols;
        this.cell_h = ctx.canvas.height / this.num_rows;
        this.total_cells = this.num_cols * this.num_rows;
        this.cells = new Array(this.total_cells);
        this.t = 0;
    }

    ctx: CanvasRenderingContext2D;
    resolution;
    num_cols;
    num_rows;
    cell_w;
    cell_h;
    total_cells;
    cells;
    t;

    display() {
        for (let i = 0; i <= this.total_cells; i++) {
            const x = (i % this.num_cols) * this.cell_w;
            const y = Math.floor(i / this.num_cols) * this.cell_h;
            const angle = p5.map(p5.noise(this.t), 0, 1, 0, p5.TWO_PI);

            this.cells[i] = p5.createVector(angle);

            {
                // vector
                const width = 20;
                const height = 20;

                this.ctx.save();

                this.ctx.translate(this.cell_w / 2, this.cell_h / 2);
                this.ctx.translate(x + width / 2, y + height / 2);
                this.ctx.rotate(angle);
                this.ctx.translate(-(x + width / 2), -(y + height / 2));

                {
                    this.ctx.strokeStyle = "darkviolet";

                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(x + width, y + height);
                    this.ctx.closePath();

                    this.ctx.stroke();
                }

                this.drawArrow(x, y, x+ width, y+height)

                this.ctx.restore();
            }

            this.t += 0.1;
        }
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

function app(c: HTMLCanvasElement) {
    const ctx = c.getContext("2d")!;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = ctx.canvas.width / CANVAS_WIDTH_RATIO;

    const ff = new FlowField(ctx);
    let mousex, mousey;

    c.onmousemove = (e) => {
        [mousex, mousey] = getMousePosition(e);
    };

    ff.display();
}
