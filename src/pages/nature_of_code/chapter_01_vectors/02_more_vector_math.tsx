// TODO canvas apps require mouse, dosnt function on mobile
import React, { useRef, useEffect } from "react";
import { stripIndent } from "common-tags";

import { p5, CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants";

export default () => {
    const canvasRefExample1_3 = useRef(null);
    const canvasRefExample1_4 = useRef(null);
    const canvasRefExample1_5 = useRef(null);
    const canvasRefExample1_6 = useRef(null);

    useEffect(() => {
        example1_3(canvasRefExample1_3.current!);
        example1_4(canvasRefExample1_4.current!);
        example1_5(canvasRefExample1_5.current!);
        example1_6(canvasRefExample1_6.current!);
        console.log(p5.map(23, 13, 40, 0, 18))
    });

    return (
        <div>
            <h1>More Vector Math</h1>
            <p>
                Addition is really just the first step. Many mathematical
                operations are commonly used with vectors. Here's a{" "}
                <a href="https://natureofcode.com/vectors/#more-vector-math">
                    comprehensive table
                </a>{" "}
                of the operations available as methods in the{" "}
                <code className="language-js">p5.Vector</code> class.
            </p>
            <p>Here are a few examples of the key methods.</p>
            <h3>Example 1.3: Vector Subtraction</h3>
            <p>
                <span className="tag-danger">Note</span> When translating the
                the canvas, external objects and systems that interact with the
                canvas may need to know/account of said translation.
            </p>
            <canvas ref={canvasRefExample1_3}></canvas>
            <pre className="language-js">
                <code>{example1_3CodeBlock}</code>
            </pre>
            <h3>Example 1.4: Scaling a Vector</h3>
            <p>
                Further reading{" "}
                <a href="https://natureofcode.com/vectors/#vector-multiplication-and-division">
                    here
                </a>
            </p>
            <canvas ref={canvasRefExample1_4}></canvas>
            <pre className="language-js"><code>{example1_4CodeBlock}</code></pre>
            <h3>Example 1.5 Vector Magnitude</h3>
            <p>
                Further reading{" "}
                <a href="https://natureofcode.com/vectors/#vector-magnitude">
                    here
                </a>
            </p>
            <canvas ref={canvasRefExample1_5}></canvas>
            <pre className="language-js"><code>{example1_5CodeBlock}</code></pre>
            <h3>Example 1.6 Normalizing a Vector</h3>
            <p>
                Further reading{" "}
                <a href="https://natureofcode.com/vectors/#normalizing-vectors">
                    here
                </a>
            </p>
            <canvas ref={canvasRefExample1_6}></canvas>
            <pre className="language-js"><code>{example1_6CodeBlock}</code></pre>
        </div>
    );
};

function getMousePosition(e: MouseEvent) {
    let x: number;
    let y: number;

    const target = e.target! as HTMLCanvasElement;

    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x =
            e.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y =
            e.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= target.offsetLeft;
    y -= target.offsetTop;

    return p5.createVector(x, y);
}

function example1_3(c: HTMLCanvasElement) {
    const canvas = c;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const ctx = canvas.getContext("2d")!;

    let center = p5.createVector(canvas.width / 2, canvas.height / 2);
    let mouse = p5.createVector(0, 0);

    canvas.onmousemove = (e) => {
        mouse = getMousePosition(e);
    };

    window.requestAnimationFrame(draw);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(center.x, center.y);
            ctx.stroke();
        }
        {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        {
            let mouseCopy = mouse.copy().sub(center);
            ctx.save();

            ctx.translate(canvas.width / 2, canvas.height / 2);

            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(mouseCopy.x, mouseCopy.y);
            ctx.closePath();
            ctx.stroke();

            ctx.restore();
        }
        window.requestAnimationFrame(draw);
    }
    return canvas;
}

function example1_4(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let center = p5.createVector(canvas.width / 2, canvas.height / 2);
    let mouse = p5.createVector(0, 0);

    canvas.onmousemove = (e) => {
        mouse = getMousePosition(e);
        mouse.sub(center);
    };

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
        }

        {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        {
            ctx.lineWidth = 5;
            let mouseCopy = mouse.copy().mult(0.5);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(mouseCopy.x, mouseCopy.y);
            ctx.stroke();
            ctx.restore();
        }

        requestAnimationFrame(draw);
    })();
}

function example1_5(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let center = p5.createVector(canvas.width / 2, canvas.height / 2);
    let mouse = p5.createVector(0, 0);
    let m;

    canvas.onmousemove = (e) => {
        mouse = getMousePosition(e);
        mouse.sub(center);
        m = mouse.mag();
        p5.constrain(m, 10, 20)
        console.log(m)
    };

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        {
            ctx.save();
            ctx.translate(center.x, center.y);
        }

        {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.restore();
        }

        {
            ctx.fillRect(10, 10, m, 10);
        }
        requestAnimationFrame(draw);
    })();
}

function example1_6(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let center = p5.createVector(canvas.width / 2, canvas.height / 2);
    let mouse = p5.createVector(0, 0);

    canvas.onmousemove = (e) => {
        mouse = getMousePosition(e);
        mouse.sub(center);
    };

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        {
            ctx.save();
            ctx.translate(center.x, center.y);
        }
        {
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        {
            ctx.lineWidth = 5;
            let mouseCopy = mouse.copy().normalize().mult(50);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(mouseCopy.x, mouseCopy.y);
            ctx.stroke();
            ctx.restore();
        }
        requestAnimationFrame(draw);
    })();
}

const example1_3CodeBlock = stripIndent`
// getMousePosition() explination [here](https://lofiddle.com/get_mouse_position)
canvas.onmousemove = (e) => {
    mouse = getMousePosition(e);
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    {
        // line from origin to center of canvas
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(center.x, center.y);
        ctx.stroke();
    }
    {
        // line from origin to mouse position
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }
    {
        // line from center to mouse position. Represents
        // the result of subtraction.
        
        /** The mouse vector is updated in an event handler 
        * outside of the draw() loop. So I copy it here to
        * synchronize it. */
        let mouseCopy = mouse.copy().sub(center)
        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height / 2)

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(mouseCopy.x, mouseCopy.y);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
    window.requestAnimationFrame(draw);
}
`;

const example1_4CodeBlock = stripIndent`
(function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
    }

    {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }

    {
        // The vector is now half its original size!
        let mouseCopy = mouse.copy().mult(0.5);
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(mouseCopy.x, mouseCopy.y);
        ctx.stroke();
        ctx.restore();
    }

    requestAnimationFrame(draw);
})();
`
const example1_5CodeBlock = stripIndent`
let center = p5.createVector(canvas.width / 2, canvas.height / 2);
let mouse = p5.createVector(0, 0);
let mag;

canvas.onmousemove = (e) => {
    mouse = getMousePosition(e);
    mouse.sub(center);
    mag = mouse.mag();
};

(function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(center.x, center.y);

    line(0, 0, mouse.x, mouse.y)

    ctx.fillRect(10, 10, mag, 10);

    ctx.restore();

    requestAnimationFrame(draw);
})()
`
const example1_6CodeBlock = stripIndent`
(function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    {
        ctx.save();
        ctx.translate(center.x, center.y);
    }
    {
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }
    {
        ctx.lineWidth = 5;
        let mouseCopy = mouse.copy().normalize().mult(50);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(mouseCopy.x, mouseCopy.y);
        ctx.stroke();
        ctx.restore();
    }
    requestAnimationFrame(draw);
})();
`
