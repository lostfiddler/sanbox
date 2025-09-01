import {default as instance} from 'p5';

export const p5 = new instance((_) => {
    _.setup = () => {
        _.noCanvas();
    }
});
export const CANVAS_WIDTH = 680;
export const CANVAS_WIDTH_RATIO = 2.2;

export function getMousePosition(e: MouseEvent) {
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
