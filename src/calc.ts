export type Point = [number, number];
export const divide = function (a: number, b: number) {
    //discards infinite results
    if (isFinite(a / b)) {
        return a / b;
    } else {
        return 0;
    }
};
export const areSuperposed = (p1: [number, number], p2: [number, number]) => {
    let dx = p1[0] / p2[0];
    let dy = p1[1] / p2[1];
    let test = false;
    if (0.99 < dx && dx < 1.01 && 0.99 < dy && dy < 1.01) {
        test = true;
    }
    return test;
};
export const getPoint = (max:number)=>{
    const point:Point = [
        50+Math.floor(Math.random()*max),
        50+Math.floor(Math.random()*max)
    ]
    return point
}