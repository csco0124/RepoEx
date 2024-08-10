// a 에서 b 로 향하는 방향값을 반환
export function getMoveDirection(a: {x:number,y:number}, b: {x:number,y:number}): {x:number,y:number} {
    const directionX = b.x - a.x;
    const directionY = b.y - a.y;  
    // 방향 벡터의 크기는 고려하지 않고 방향만을 반환
    const magnitude = Math.sqrt(directionX ** 2 + directionY ** 2);
    const normalizedDirectionX = directionX / magnitude;
    const normalizedDirectionY = directionY / magnitude;  
    return { x: normalizedDirectionX, y: normalizedDirectionY };
}
// a 과 b 의 거리를 계산
export function calculateDistance(point1: {x:number,y:number}, point2: {x:number,y:number}): number {
    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    return distance;
}

export function addCommas(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
  

export function getVectorFromAngle(angle: number, magnitude: number): {x:number,y:number} {
    const radian = (angle * Math.PI) / 180; // 각도를 라디안 값으로 변환
    const x = magnitude * Math.cos(radian);
    const y = magnitude * Math.sin(radian);
    return { x, y };
  }
  