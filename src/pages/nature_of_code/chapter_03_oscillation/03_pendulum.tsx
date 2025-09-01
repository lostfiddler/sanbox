import React, { useRef, useEffect } from "react";
import katex from "katex";
import { stripIndent } from "common-tags";
import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO, p5 } from "../../../../constants";
import { Vector } from "p5";

export default () => {
    const example3_10Ref = useRef(null);
    const example3_11Ref = useRef(null);

    useEffect(() => {
        example3_10(example3_10Ref.current!);
        example3_11(example3_11Ref.current!);
    });

    return (
        <div>
            <h1> Spring Forces</h1>
            <p>
                Lets consider a spring to be a connection between a movable bob
                (or weight) and a fixed anchor point.
            </p>
            <p>
                The force of the spring is a vector calculated according to
                Hooke's law which states "As the extension, so the force." In
                other words:
            </p>
            <span className="callout">
                The force of the spring is directly proportional to the
                extension of the spring.
            </span>
            <p>Mathematically, the law is stated as follows:</p>
            <span
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString("F_{spring}=-kx"),
                }}
            />
            <p>
                Here <em>k</em> is the <em>spring constant</em>. Its value
                scales the force, setting how elastic or rigid the spring is.
                Meanwhile, <em>x</em> is the extension, the current length minus
                the rest length.
            </p>
            <p>For the code, lets start with three variables:</p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    let anchor = createVector(0, 0);
                    let bob = createVector(0, 120);
                    let restLength = 100;
                `}
                </code>
            </pre>
            <p>
                Let's then use Hooke's law to calculate the magnitude of the
                force. For that, we'll need{" "}
                <code className="language-js">k</code>
                and <code className="language-js">x</code>. Calculating{" "}
                <code className="language-js">k</code> is easy; it's just a
                constant:
            </p>
            <pre className="language-js">
                <code>let k = 0.1;</code>
            </pre>
            <p>
                Finding <code className="language-js">x</code> is a bit more
                work. We need to know the difference between the current length
                and the rest length.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    // A vector pointing from the anchor to the bob gives us the
                    // current length of the spring.
                    let dir = p5.Vector.sub(bob, anchor);

                    let currentLength = dir.mag();
                    let x = currentLength - restLength;
                `}
                </code>
            </pre>
            <p>
                Now we need to figure out the direction, a unit vector pointing
                in the direction of the force. Fortunatly we already have this
                vector! we found it for our previous calculation of the
                magnitude.
            </p>
            <p>
                All we need to do now is set the magnitude of the vector used
                for the distance calculation and lets also rename that vector
                variable to <code className="language-js">force</code>.
            </p>
            <pre className="language-js" data-line="2-5,8">
                <code>
                    {stripIndent`
                    // The magnitude of the spring force according to Hooke's law
                    let k = 0.1;
                    let force = p5.Vector.sub(bob, anchor);
                    let currentLength = force.mag();
                    let x = currentLength - restLength;

                    // Put it together: direction and magnitude!
                    force.setMag(-1 * k * x);
                `}
                </code>
            </pre>
            <p>
                Now we have the algorithm for computing Hooke's law, but the
                question remains: What method should we use to graphically
                simulate it? Several possibilities exist. I'll stick with the
                same framework I have been following along with from previous
                chapters.
            </p>
            <h3>Example 3.10: A Spring Connection</h3>
            <canvas ref={example3_10Ref}></canvas>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        class Spring {
                            constructor(x, y, length) {
                                this.anchor = createVector(x, y);
                                this.restLength = length;
                                this.k = 0.2
                            }

                            connect(bob: Bob) {
                                let force = bob.position.copy().sub(this.anchor);
                                let currentLength = force.mag();
                                let stretch = currentLength - this.restLength;

                                force.setMag(-1 * this.k * stretch);
                                bob.applyForce(force);
                            }

                            display() {
                                circle(this.anchor.x, this.anchor.y, 10);
                            }

                            showLine(bob) {
                                line(bob.position.x, 
                                     bob.position.y,
                                     this.anchor.x,
                                     this.anchor.y
                                )
                            }
                        }
                    `}
                </code>
            </pre>
            <h1>The Pendulum</h1>
            <p>
                A <b>pendulum</b> is a bob suspended by an arm from a pivot
                (previously called the <em>anchor</em> in the spring). When the
                pendulum swings, its arm and bob are essentially rotating around
                the fixed point of the pivot.
            </p>
            <p>
                Unlike the spring which used <em>linear</em> acceleration and
                velocity, we're going to describe the motion of the pendulum in
                terms of <em>angular</em> velocity.
            </p>
            <p>
                This example is pretty interesting but its a bit complicated,
                check out this{" "}
                <a href="https://natureofcode.com/oscillation/#the-pendulum">
                    link
                </a>{" "}
                for more a more complete explanation.
            </p>
            <p>
                Note: right triangles make everything easier, keep an eye out
                for them.
            </p>
            <p>
                Even though we are glossing over a few questions regarding this
                simulation, there are a few critical pieces I do want to
                mention.
            </p>
            <p>
                The length of the pendulum's arm affects the acceleration of the
                pendulum because of the concepts of torque and moment of
                inertia.
            </p>
            <p>
                <b>Torque</b> (or ⊤) is a measure of the rotational force acting
                on an object. In the case of a pendulum, torque is proportional
                to both the mass of the bob and the length of the arm (
                <span
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString("M\\times r"),
                    }}
                />
                ) The <b>moment of inertia</b> (or <em>I</em>) of a pendulum is
                a measure of the amount of difficulty in rotating the pendulum
                around the pivot point. It is proportional to the mass of the
                bob and the <em>square</em> of the length of the arm (
                <span
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString("Mr^2"),
                    }}
                />
                )
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    class Pendulum {
                        constructor() {
                            this.r = ????;
                            this.angle = ????;
                            this.angleVelocity = ????;
                            this.angleAcceleration = ????;
                        }
                    }
                `}
                </code>
            </pre>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    update() {
                        let gravity = 0.4;

                        // Calculate acceleration according to the formula.
                        this.angleAcceleration = -1 * gravity * Math.sin(this.angle) / this.r

                        this.angleVelocity += this.angleAcceleration;
                        this.angle += this.angleVelocity;
                    }
                `}
                </code>
            </pre>
            <h3>Example 3.11: Swinging Pendulum</h3>
            <canvas ref={example3_11Ref}></canvas>
            <pre className="language-js">
                <code>
                {stripIndent`
                    class Pendulum {
                        constructor(x, y, r) {
                            this.pivot = p5.createVector(x, y)
                            this.bob = p5.createVector();
                            this.r = r;
                            this.angle = Math.PI / 4;
                            this.angleVelocity = 0;
                            this.angleAcceleration = 0;
                            this.damping = 0.99;
                            this.ballr = 24;
                        }

                        update() {
                            let gravity = 0.4;

                            // Formula for angular acceleration
                            this.angleAcceleration = 
                                (-1 * gravity / this.r) * Math.sin(this.angle)

                            // Standard angular motion algorithm
                            this.angleVelocity += this.angleAcceleration;
                            this.angle += this.angleVelocity;

                            // Apply some damping
                            this.angleVelocity *= this.damping
                        }

                        display() {
                            // Apply polar-to-Cartesian conversion. Instead of
                            // creating a new vector each time, use set() to
                            // update the bob's position
                            this.bob.set(this.r * Math.sin(this.angle),
                                         this.r * Math.cos(this.angle))
                            this.bob.add(this.pivot)

                            this.line(this.pivot.x, this.pivot.y, this.bob.x, this.bob.y);
                            this.circle(this.bob.x, this.bob.y, this.ballr)
                        }

                        line(startX, startY, endX, endY){
                            ctx.beginPath()
                            ctx.moveTo(startX, startY);
                            ctx.lineTo(endX, endY)
                            ctx.stroke();
                            ctx.closePath();
                        }
                        circle(x, y, r){
                            ctx.beginPath();
                            ctx.arc(x, y, r, 0, Math.PI * 2)
                            ctx.stroke();
                            ctx.fill();
                            ctx.closePath();
                        }
                    }

                    const pendulum = new Pendulum(canvas.width / 2, 5, 200);

                    function animate() {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)

                        pendulum.update()
                        pendulum.display();
                        requestAnimationFrame(animate)
                    }

                    animate()
                `}
                </code>
            </pre>
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

    return [x, y];
}

function example3_10(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    class Bob {
        position: Vector;
        velocity: Vector;
        acceleration: Vector;
        mass: number;
        damping: number;
        mouse: Vector;
        offset: Vector;
        draggable: Boolean;
        mousePressed: Boolean;

        constructor(x, y) {
            this.position = p5.createVector(x, y);
            this.velocity = p5.createVector();
            this.acceleration = p5.createVector();
            this.mass = 24;
            // Arbitraty damping to  simulate friction / drag
            this.damping = 0.98;
            this.mouse = p5.createVector();
            this.offset = p5.createVector();
            this.draggable = false;
            this.mousePressed = false;

            canvas.onmousemove = (e) => {
                [this.mouse.x, this.mouse.y] = getMousePosition(e);

                // check if mouse is in area of circle
                if (
                    this.mouse.x > this.position.x - this.mass &&
                    this.mouse.x < this.position.x + this.mass &&
                    this.mouse.y > this.position.y - this.mass &&
                    this.mouse.y < this.position.y + this.mass
                ) {
                    this.draggable = true;
                } else {
                    this.draggable = false;
                }
            };

            canvas.onmousedown = (e) => {
                if (this.draggable) {
                    this.mousePressed = true;
                    this.offset = this.position.sub(this.mouse);
                }
            };

            canvas.onmouseup = (e) => {
                this.mousePressed = false;
            };
        }

        applyForce(force: Vector) {
            let f = force.copy();
            f.div(this.mass);

            this.acceleration.add(f);
        }

        update() {
            this.velocity.add(this.acceleration);
            this.velocity.mult(this.damping);
            this.position.add(this.velocity);

            if (this.mousePressed) {
                this.position = this.mouse.copy().add(this.offset);
            }

            this.acceleration.mult(0);
        }

        display() {
            ctx.lineWidth = 4;
            ctx.fillStyle = "grey";

            ctx.beginPath();
            ctx.arc(
                this.position.x,
                this.position.y,
                this.mass,
                0,
                Math.PI * 2
            );
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }

    class Spring {
        anchor: Vector;
        restLength: number;
        k: number;

        constructor(x, y, length) {
            this.anchor = p5.createVector(x, y);
            this.restLength = length;
            this.k = 0.2;
        }

        connect(bob: Bob) {
            let force = bob.position.copy().sub(this.anchor);
            let currentLength = force.mag();
            let stretch = currentLength - this.restLength;

            force.setMag(-1 * this.k * stretch);
            bob.applyForce(force);
        }

        constrainLength(bob, minlen, maxlen) {
            let direction = bob.position.copy().sub(this.anchor);
            let length = direction.mag();

            if (length < minlen) {
                direction.setMag(minlen);
                bob.position = this.anchor.copy().add(direction);
                bob.velocity.mult(0);
            } else if (length > maxlen) {
                direction.setMag(maxlen);
                bob.position = this.anchor.copy().add(direction);
                bob.velocity.mult(0);
            }
        }

        display() {
            ctx.fillStyle = "grey";

            ctx.beginPath();
            ctx.arc(this.anchor.x, this.anchor.y, 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }

        displayLine(bob: Bob) {
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(this.anchor.x, this.anchor.y);
            ctx.lineTo(bob.position.x, bob.position.y);
            ctx.stroke();
            ctx.closePath();
        }
    }

    const spring = new Spring(canvas.width / 2, 10, 100);
    const bob = new Bob(canvas.width / 2, 100);

    const gravity = p5.createVector(0, 2);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bob.applyForce(gravity);
        bob.update();
        spring.connect(bob);

        spring.constrainLength(bob, 30, 200);

        spring.displayLine(bob);
        bob.display();
        spring.display();

        requestAnimationFrame(animate);
    }

    animate();
}

function example3_11(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    class Pendulum {
        pivot: Vector;
        bob: Vector;
        r: number;
        angle: number;
        angleVelocity: number;
        angleAcceleration: number;
        damping: number;
        ballr: number;
        mouse: Vector;
        draggable: Boolean;
        mousePressed: Boolean;
        offset: Vector;

        constructor(x, y, r) {
            this.pivot = p5.createVector(x, y);
            this.bob = p5.createVector();
            this.r = r;
            this.angle = Math.PI / 4;
            this.angleVelocity = 0;
            this.angleAcceleration = 0;
            this.damping = 0.99;
            this.ballr = 24;
            this.mouse = p5.createVector();
            this.offset = p5.createVector();
            this.draggable = false;
            this.mousePressed = false;

            canvas.onmousemove = (e) => {
                [this.mouse.x, this.mouse.y] = getMousePosition(e);

                // check if mouse is in area of circle
                if (
                    this.mouse.x > this.bob.x - this.ballr &&
                    this.mouse.x < this.bob.x + this.ballr &&
                    this.mouse.y > this.bob.y - this.ballr &&
                    this.mouse.y < this.bob.y + this.ballr
                ) {
                    this.draggable = true;
                } else {
                    this.draggable = false;
                }
            };

            canvas.onmousedown = (e) => {
                if (this.draggable) {
                    this.mousePressed = true;
                    this.offset = this.bob.sub(this.mouse);
                }
            };

            canvas.onmouseup = (e) => {
                this.mousePressed = false;
            };
        }

        update() {
            if (!this.mousePressed){
                let gravity = 0.4;
                this.angleAcceleration =
                    ((-1 * gravity) / this.r) * Math.sin(this.angle);
                this.angleVelocity += this.angleAcceleration;
                this.angle += this.angleVelocity;
                this.angleVelocity *= this.damping;
            }
        }

        display() {
            this.bob.set(
                this.r * Math.sin(this.angle),
                this.r * Math.cos(this.angle)
            );
            this.bob.add(this.pivot);

            this.line(this.pivot.x, this.pivot.y, this.bob.x, this.bob.y);
            this.circle(this.bob.x, this.bob.y, this.ballr);
        }

        drag() {
            if (this.mousePressed) {
                let diff = this.pivot.copy().sub(this.mouse)
                this.angle = Math.atan2(-1 * diff.y, diff.x) - p5.radians(90)
            }
        }

        line(startX, startY, endX, endY) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.closePath();
        }
        circle(x, y, r) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }

    const pendulum = new Pendulum(canvas.width / 2, 5, 200);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pendulum.update();
        pendulum.display();
        pendulum.drag();
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate)
}
