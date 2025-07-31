interface BallProperties{
    horizontalPos: number;
    verticalPos: number;
    speedX: number;
    speedY: number;
    radius: number;
    mass: number;
    gravity: number;
    color: string;
    htmlElement: HTMLElement;
    isGravity : Boolean;
    trail: BallTrails[];
    trailLength: number;
}

interface BallTrails{
    XPos: number;
    YPos: number;
    Span: number;
}