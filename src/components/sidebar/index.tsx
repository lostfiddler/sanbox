import React, { useRef, useState, useEffect } from "react";
import "./style.css";

export default () => {
    const [nav, toggleNav] = useState(false);
    const [mobileMenu, toggleMobileMenu] = useState(true);
    const details = useRef<HTMLDetailsElement[]>([]).current;
    const navigationRef = useRef(null);
    const navigationContainerRef = useRef(null);

    useEffect(() => {
        openDetailElements(details);
        openNavigation(toggleNav, nav);
        handlePersistentStorage(details);
        window.onload = () => {
            navigationRef.current!.id = "";
            navigationContainerRef.current!.id = "";
        };
    }, []);

    return (
        <div
            ref={navigationContainerRef}
            id="notransition"
            className={
                nav ? "navigation-container" : "navigation-container closed"
            }
        >
            <i
                className={
                    nav
                        ? "fa-solid fa-arrow-right-from-bracket open-arrow"
                        : "fa-solid fa-arrow-right-from-bracket open-arrow closed"
                }
                onClick={() => {
                    toggleNav(!nav);
                    localStorage.setItem("navigation", "open");
                }}
            ></i>
            <div
                ref={navigationRef}
                id="notransition"
                className={nav ? "navigation" : "navigation closed"}
            >
                <div className="header">
                    <i
                        className="fa-solid fa-xmark xmark"
                        onClick={() => {
                            toggleNav(!nav);
                            localStorage.setItem("navigation", "closed");
                        }}
                    ></i>
                    <a href="/">
                        <h1>lofiddle</h1>
                    </a>
                    <i
                        className="fa-solid fa-bars bars"
                        onClick={() => toggleMobileMenu(!mobileMenu)}
                    ></i>
                </div>
                <div className={mobileMenu ? "menu" : "menu opened"}>
                    <details
                        ref={(el) => {
                            if (el) details.push(el);
                        }}
                        data-name="nature_of_code"
                    >
                        <summary>Nature of Code</summary>
                        <ul>
                            <li className="chapter">Exercises</li>
                            <li className="chapter">Chapter 00 Randomness</li>
                            <li>
                                <a href="/random_walks">01 - A Random Walk</a>
                            </li>
                            <li>
                                <a href="/random_number_distribution">
                                    02 - Random Number Distributions
                                </a>
                            </li>
                            <li>
                                <a href="/probability_and_non-uniform_distribution">
                                    03 - Non-Uniform Distributions
                                </a>
                            </li>
                            <li>
                                <a href="/a_normal_distribution_of_random_numbers">
                                    04 - A Normal Distribution
                                </a>
                            </li>
                            <li>
                                <a href="/a_custom_distribution_of_random_numbers">
                                    05 - A Custom Distribution
                                </a>
                            </li>
                            <li>
                                <a href="/a_smoother_approach_with_perlin_noise">
                                    06 - Perlin Noise
                                </a>
                            </li>
                            <li className="chapter">Chapter 01 Vectors</li>
                            <li>
                                <a href="/intro_to_vectors">
                                    01 - Intro to Vectors
                                </a>
                            </li>
                            <li>
                                <a href="/more_vector_math">
                                    02 - More Vector Math
                                </a>
                            </li>
                            <li>
                                <a href="/motion_with_vectors">
                                    03 - Motion with Vectors
                                </a>
                            </li>
                            <li className="chapter">Chapter 02 Forces</li>
                            <li>
                                <a href="/forces">01 - Making up Forces</a>
                            </li>
                            <li>
                                <a href="/modeling_a_force">
                                    02 - Modeling Forces
                                </a>
                            </li>
                            <li>
                                <a href="/n_body_problem">
                                    03 - The n-Body Problem
                                </a>
                            </li>
                            <li className="chapter">Chapter 03 Oscillation</li>
                            <li>
                                <a href="/angles_and_angular_motion">
                                    01 - Angles & Angular Motion
                                </a>
                            </li>
                            <li>
                                <a href="/oscillation">02 - Oscillation</a>
                            </li>
                            <li>
                                <a href="/the_pendulum">03 - Spring Forces & The Pendulum</a>
                            </li>
                            <li className="chapter">
                                Chapter 04 Particle Systems
                            </li>
                            <li>
                                <a href="/intro_particle_systems">
                                    01 - Intro to Particle Stystems
                                </a>
                            </li>
                            <li>
                                <a href="/behaviours_of_particles">
                                    02 - Behaviours of Particles
                                </a>
                            </li>
                            <li>
                                <a href="/textures_and_blending">
                                    03 - Textures and Blending
                                </a>
                            </li>
                            <li className="chapter">
                                <a href="/autonomous_agents" style={{color: "inherit"}}>
                                    Chapter 05 Autonomous Agents
                                </a>
                            </li>
                        </ul>
                    </details>
                    <details
                        ref={(el) => {
                            if (el) details.push(el);
                        }}
                        data-name="html_css"
                    >
                        <summary>HMTL/CSS</summary>
                        <ul>
                            <li>
                                <a href="/get_mouse_position">
                                    Get Mouse Position
                                </a>
                            </li>
                            <li>
                                <a href="/dynamic_bezier_curves">
                                    Dynamic Bézier Curves
                                </a>
                            </li>
                            <li>
                                <a href="/sprites">Sprites</a>
                            </li>
                        </ul>
                    </details>
                    <details
                        ref={(el) => {
                            if (el) details.push(el);
                        }}
                        data-name="three_js"
                    >
                        <summary>Three js</summary>
                        <ul>
                            <a href="/hello_cube">
                                <li>Hello Cube</li>
                            </a>
                            <a href="/load_obj">
                                <li>Load a .obj file</li>
                            </a>
                            <a href="/load_gltf">
                                <li>Laad a .gltf file</li>
                            </a>
                            <a href="/gltf_animations">
                                <li>.gltf Animations</li>
                            </a>
                            <a href="/utilities">
                                <li>Utilities</li>
                            </a>
                        </ul>
                    </details>
                    <details
                        ref={(el) => {
                            if (el) details.push(el);
                        }}
                        data-name="arcade"
                    >
                        <summary>Arcade</summary>
                        <ul>
                            <a href="/adventure">
                                <li>Adventure</li>
                            </a>
                            <a href="/barren_room">
                                <li>Barren Room</li>
                            </a>
                            <a href="/archer">
                                <li>Archer</li>
                            </a>
                            <a href="/throttling_fps">
                                <li>Throttling fps</li>
                            </a>
                            <a href="/rapier">
                                <li>Rapier</li>
                            </a>
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    );
};

function openDetailElements(details: HTMLDetailsElement[]) {
    for (let i = 0; localStorage.length > i; i++) {
        if (localStorage.key(i) === "navigation") continue;
        const item = localStorage.getItem(localStorage.key(i)!);

        if (item === "open") {
            details.find(
                (el) => el.dataset.name === localStorage.key(i)
            )!.open = true;
        }
    }
}

function openNavigation(toggleNav, nav) {
    if (localStorage.getItem("navigation") === "closed") {
        toggleNav(false);
    } else {
        toggleNav(true);
    }
}

function handlePersistentStorage(details: HTMLDetailsElement[]) {
    details.forEach((el) => {
        el.addEventListener("toggle", (e: Event) => {
            const target = e.target as HTMLDetailsElement;

            if (target.open) {
                localStorage.setItem(`${target.dataset.name}`, "open");
            } else {
                localStorage.setItem(`${target.dataset.name}`, "closed");
            }
        });
    });
}
