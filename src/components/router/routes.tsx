import React from "react";

import Home from "../../pages/Home";
// Nature of Code
import { RandomWalks } from "../../pages/nature_of_code/chapter_00_randomness/01_random_walks";
import { RandomNumberDistribution } from "../../pages/nature_of_code/chapter_00_randomness/02_random-number_distribution";
import { Probability } from "../../pages/nature_of_code/chapter_00_randomness/03_probability_and_nonuniform_distributions";
import { NormalDistribution } from "../../pages/nature_of_code/chapter_00_randomness/04_normal_distribution_of_random_numbers";
import { CustomDistribution } from "../../pages/nature_of_code/chapter_00_randomness/05_custom_distribution_of_random_numbers";
import { PerlinNoise } from "../../pages/nature_of_code/chapter_00_randomness/06_smoother_approach_with_perlin_noise";
// Nature of Code - Chapter 01
import Vectors from "../../pages/nature_of_code/chapter_01_vectors/01_intro_to_vectors";
import MoreVectorMath from "../../pages/nature_of_code/chapter_01_vectors/02_more_vector_math.tsx";
import MotionWithVectors from "../../pages/nature_of_code/chapter_01_vectors/03_motion_with_vectors";
// Nature of Code - Chapter 02
import Forces from "../../pages/nature_of_code/chapter_02_forces/01_making_up_forces.tsx";
import ModelingForces from "../../pages/nature_of_code/chapter_02_forces/02_modeling_a_force.tsx";
import NBodyProblem from "../../pages/nature_of_code/chapter_02_forces/03_n_body_problem.tsx";
// Nature of Code - Chapter 03
import AngularMotion from "../../pages/nature_of_code/chapter_03_oscillation/01_angles_angular_motion.tsx";
import Oscillation from "../../pages/nature_of_code/chapter_03_oscillation/02_oscillation.tsx";
import Pendulum from "../../pages/nature_of_code/chapter_03_oscillation/03_pendulum.tsx";
// Nature of Code - Chapter 04
import ParticleSystems from '../../pages/nature_of_code/chapter_04_particle_systems/01_intro_to_particle_systems.tsx';
import ParticleBehaviors from '../../pages/nature_of_code/chapter_04_particle_systems/02_behaviors_of_particles.tsx';
import TexturesAndBlending from '../../pages/nature_of_code/chapter_04_particle_systems/03_image_texture_and_additive_blending.tsx';
// Nature of Code - Chapter 05
import AutonomousAgents from '../../pages/nature_of_code/chapter_05_autonomous_agents/index.tsx'
import ForcesFromWithin from "../../pages/nature_of_code/chapter_05_autonomous_agents/01_forces_from_within.tsx";
import VehiclesAndSteering from "../../pages/nature_of_code/chapter_05_autonomous_agents/02_vehicles_and_steering.tsx";
import FLowFields from "../../pages/nature_of_code/chapter_05_autonomous_agents/03_flow_fields.tsx";
import PathFollowing from "../../pages/nature_of_code/chapter_05_autonomous_agents/04_path_following.tsx";
import ComplexSystems from "../../pages/nature_of_code/chapter_05_autonomous_agents/05_complex_systems.tsx";
// HTML/CSS
import MousePosition from "../../pages/html_css/mouse_position.tsx";
import DynamicBezierCurves from "../../pages/html_css/dynamic_bezier_curves.tsx";
import Sprites from "../../pages/html_css/sprites.tsx";
// Three
import HelloCube from "../../pages/three/hello_cube";
import LoadOBJ from "../../pages/three/load_obj";
import LoadGLTF from "../../pages/three/load_gltf";
import Utilities from "../../pages/three/utiliites";
import GLTFAnimations from "../../pages/three/gltf_animations.tsx";
// Arcade
import Adventure from "../../pages/arcade/adventure";
import BarrenRoom from "../../pages/arcade/barren_room/";
import Archer from "../../pages/arcade/archer.tsx";
import ThrottlingFPS from "../../pages/arcade/throttling.tsx";
import Rapier from "../../pages/arcade/rapier.tsx";
import GridStudy from "../../pages/arcade/grid_study";
// Data Visuals
import Idle from "../../pages/data_visuals/idle.tsx";

export default [
    { path: "/", component: <Home /> },
    // Nature of Code - Chapter 00
    { path: "/random_walks", component: <RandomWalks /> },
    {
        path: "/random_number_distribution",
        component: <RandomNumberDistribution />,
    },
    {
        path: "/probability_and_non-uniform_distribution",
        component: <Probability />,
    },
    {
        path: "/a_normal_distribution_of_random_numbers",
        component: <NormalDistribution />,
    },
    {
        path: "/a_custom_distribution_of_random_numbers",
        component: <CustomDistribution />,
    },
    {
        path: "/a_smoother_approach_with_perlin_noise",
        component: <PerlinNoise />,
    },
    // Nature of Code - Chapter 01
    { path: "/intro_to_vectors", component: <Vectors /> },
    { path: "/more_vector_math", component: <MoreVectorMath /> },
    { path: "/motion_with_vectors", component: <MotionWithVectors /> },
    // Nature of Code - Chapter 02
    { path: "/forces", component: <Forces /> },
    { path: "/modeling_a_force", component: <ModelingForces /> },
    { path: "/n_body_problem", component: <NBodyProblem /> },
    // Nature of Code - Chapter 03
    { path: "/angles_and_angular_motion", component: <AngularMotion /> },
    { path: "/oscillation", component: <Oscillation /> },
    { path: "/the_pendulum", component: <Pendulum /> },
    // Nature of Code - Chapter 04
    { path: "/intro_particle_systems", component: <ParticleSystems />},
    { path: "/behaviours_of_particles", component: <ParticleBehaviors />},
    { path: "/textures_and_blending", component: <TexturesAndBlending />},
    // Nature of Code - Chapter 05
    {path: "/autonomous_agents", component: <AutonomousAgents />},
    {path: "/forces_from_within", component: <ForcesFromWithin />},
    {path: "/vehicles_and_steering", component: <VehiclesAndSteering />},
    {path: "/flow_fields", component: <FLowFields />},
    {path: "/path_following", component: <PathFollowing />},
    {path: "/complex_systems", component: <ComplexSystems />},
    // html/css
    { path: "/get_mouse_position", component: <MousePosition /> },
    { path: "/dynamic_bezier_curves", component: <DynamicBezierCurves /> },
    { path: "/sprites", component: <Sprites /> },
    // three.js
    { path: "/hello_cube", component: <HelloCube /> },
    { path: "/load_obj", component: <LoadOBJ /> },
    { path: "/load_gltf", component: <LoadGLTF /> },
    { path: "/gltf_animations", component: <GLTFAnimations /> },
    { path: "/utilities", component: <Utilities /> },
    // Arcade
    { path: "/adventure", component: <Adventure /> },
    { path: "/barren_room", component: <BarrenRoom />},
    { path: "/archer", component: <Archer /> },
    { path: "/throttling_fps", component: <ThrottlingFPS />},
    { path: "/rapier", component: <Rapier />},
    { path: "/grid_study", component: <GridStudy />}, 
    // data visuals
    {path: "/idle", component: <Idle />},
];
