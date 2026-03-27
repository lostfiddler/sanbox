import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

export default () => {
    return (
        <div>
            <h1>Idle</h1>
            <div>
                <Svg></Svg>
            </div>
            <div>
                <Circles></Circles>
            </div>
        </div>
    );
};

const Svg = () => {
    return (
        <svg
            style={{
                border: "2px solid violet",
            }}
        ></svg>
    );
};

const Circles = () => {
    const width = 300;
    const height = 140;
    const [dataset, setDataset] = useState(generateDataset(width, height));
    const ref = useRef(null);

    useInterval(() => {
        const newDataset = generateDataset(width, height);
        setDataset(newDataset);
    }, 2000);

    return (
        <svg width={width} height={height} ref={ref}>
            {dataset.map(([x, y], i) => (
                <circle cx={x} cy={y} r="5" fill="white"></circle>
            ))}
        </svg>
    );
};

const generateDataset = (width: number, height: number) => {
    const data = new Array(10);

    for (let i = 0; i < data.length; i++) {
        data[i] = [Math.random() * width, Math.random() * height];
    }

    return data;
};

function useInterval(callback, delay) {
    const savedCallback = useRef(() => {});

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function example() {
    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginLeft = 20;
    const marginBottom = 20;

    return (
        <div>
            <h1>Idle</h1>
            <svg width={width} height={height}></svg>
        </div>
    );
}
