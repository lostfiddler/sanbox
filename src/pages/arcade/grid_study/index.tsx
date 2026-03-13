import React, { Dispatch, SetStateAction } from "react";
import {
    p5,
    CANVAS_WIDTH,
    CANVAS_WIDTH_RATIO,
    getMousePosition,
} from "../../../../constants";

type reference = {
    value: string | number;
    setValue: Dispatch<SetStateAction<string>>;
};

type references = {
    [key: string]: reference;
};

export default () => {
    const canvasRef = React.useRef(null);
    const [foo, setFoo] = React.useState("");
    const [kit, setKit] = React.useState("");

    React.useEffect(() => {
        app(canvasRef.current!, {
            foo: { value: foo, setValue: setFoo },
            kit: { value: kit, setValue: setKit },
        });
    });

    return (
        <div>
            <h1>Grid Study</h1>
            <canvas ref={canvasRef}></canvas>
            <p>{foo}</p>
            <p>{kit}</p>
        </div>
    );
};

function app(c: HTMLCanvasElement, refs: references) {
    const ctx = c.getContext("2d")!;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = ctx.canvas.width / CANVAS_WIDTH_RATIO;

    const resolution = 50;
    const num_cols = Math.floor(c.width / resolution);
    const num_rows = Math.floor(c.height / resolution);
    const cell_w = c.width / num_cols;
    const cell_h = c.height / num_rows;
    const total_cells = num_cols * num_rows;
    const cells = new Array(total_cells);
    let mousex, mousey;
    let cellIndex;

    c.onmousemove = (e) => {
        [mousex, mousey] = getMousePosition(e);
        cellIndex =
            Math.floor(mousex / cell_w) +
            Math.floor(mousey / cell_h) * num_cols;
        refs.foo.setValue(
            `${Math.floor(mousex / cell_w) + 1} ${Math.floor(mousey / cell_h)}`
        );
        refs.kit.setValue(cellIndex);
    };

    function frame() {
        requestAnimationFrame(frame);
        ctx.clearRect(0, 0, c.width, c.height);
        for (let i = 0; i < total_cells; i++) {
            const x = (i % num_cols) * cell_w;
            const y = Math.floor(i / num_cols) * cell_h;

            cells[i] = { x, y };

            ctx.save();

            if (i === cellIndex) {
                ctx.fillStyle = "powderblue";
            }

            const width = cell_w / 3;
            const height = cell_h / 3;

            ctx.fillRect(x, y, width, height);

            ctx.strokeRect(x, y, cell_w, cell_h);
            ctx.restore();
        }
    }

    requestAnimationFrame(frame);
}
