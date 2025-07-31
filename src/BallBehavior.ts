export class BallBehavior implements BallProperties {
    horizontalPos: number;
    verticalPos: number;
    speedX: number;
    speedY: number;
    mass: number;
    radius: number;
    color: string;
    gravity: number;
    htmlElement: HTMLElement;
    isGravity: Boolean;
    trail: BallTrails[];
    trailLength: number;


    constructor(horizontal: number,vertical: number, speedX: number, speedY: number){
        this.horizontalPos = horizontal;
        this.verticalPos = vertical;
        this.isGravity = false;
        this.trail= [];
        this.trailLength = 10;
        this.speedX = BallBehavior.RandomSpeed() | speedX;
        this.speedY = BallBehavior.RandomSpeed() | speedY;
        this.color = BallBehavior.RandomColor();
        this.radius = this.RandomRadius();
        this.mass = this.SetMass(this.radius);
        this.gravity = 10;
        this.htmlElement = this.CreateBall();
        
    }

    public static RandomColor(): string{
       return `hsl(${Math.random() * 360}, 50%, 50%)`;
    }

    private RandomRadius(): number{
        const minNum = 1;
        const maxNum = 20;
        return Math.floor(Math.random() * (maxNum - minNum) + minNum);
    }

    private SetMass(Radius: number){
        return this.radius * 1.5
    }

    static RandomSpeed(){
        const minNum = 1;
        const maxNum = 5;
        return Math.floor(Math.random() * (maxNum - minNum) + minNum);
    }
    
    private CreateBall(){
        const ball = document.createElement('div')
        ball.className = 'ball';
        ball.style.width = `${this.radius * 2}px`;
        ball.style.height = `${this.radius * 2}px`;
        ball.style.left = (this.horizontalPos - this.radius) + 'px'
        ball.style.top = (this.verticalPos - this.radius) + 'px'
        ball.style.backgroundColor = this.color;
        return ball;
    }

    public Update(container: HTMLElement) {
        this.horizontalPos += this.speedX;
        this.verticalPos += this.speedY;
        if(this.isGravity){
            this.speedY += this.gravity;
            if(this.speedY>15){
                this.speedY = 15;
            }
        }
        this.trail.push({
            XPos : this.horizontalPos,
            YPos : this.verticalPos,
            Span: Date.now()
        });

        if(this.trail.length > this.trailLength){
            this.trail.shift();
        }

        this.CheckForCollision(container.clientWidth, container.clientHeight);
        this.updateElement();
    }

    public UpdateGravity(newGravity: number){
        this.gravity = newGravity;
    }

    private CheckForCollision(containerWidth: number, containerHeight: number) {
        let bounced = false;
        // Left wall collision
        if (this.horizontalPos - this.radius <= 0) {
            this.horizontalPos = this.radius; 
            this.speedX = Math.abs(this.speedX); 
            bounced = true;
        }
        // Right wall collision
        if (this.horizontalPos + this.radius >= containerWidth) {
            this.horizontalPos = containerWidth - this.radius; 
            this.speedX = -Math.abs(this.speedX); 
            bounced = true;
        }
        // Top wall collision
        if (this.verticalPos - this.radius <= 0) {
            this.verticalPos = this.radius; 
            this.speedY = Math.abs(this.speedY); 
            bounced = true;
        }
        // Bottom wall collision
        if (this.verticalPos + this.radius >= containerHeight) {
            this.verticalPos = containerHeight - this.radius;
            this.speedY = -Math.abs(this.speedY); 
            bounced = true;
        }
        if (bounced) {
            this.color = BallBehavior.RandomColor();
            this.updateElement();
        }
    }
    
    public static CheckForBallCollision(ball1: BallBehavior, ball2:BallBehavior){
        const XPosDiff = ball2.horizontalPos - ball1.horizontalPos;
        const YPosDiff = ball2.verticalPos - ball1.verticalPos;
        const Distance = Math.sqrt(XPosDiff * XPosDiff + YPosDiff * YPosDiff);
        const SumofRadius = ball1.radius + ball2.radius;
        if(Distance < SumofRadius){
            this.BallCollisionHandler(XPosDiff,YPosDiff,Distance,ball1,ball2);
        }
    }

    private static BallCollisionHandler(XPosDiff:number, YPosDiff:number, DistanceDiff:number, ball1: BallBehavior, ball2:BallBehavior){
        const NormalX = XPosDiff / DistanceDiff;
        const NormalY = YPosDiff / DistanceDiff;

        const Overlapping = (ball1.radius + ball2.radius) - DistanceDiff;
        const X = NormalX * Overlapping * 0.5;
        const Y = NormalY * Overlapping * 0.5;
        ball1.horizontalPos -= X;
        ball1.verticalPos -= Y;
        ball2.horizontalPos += X;
        ball2.verticalPos += Y;

        const RelVelX = ball2.speedX - ball1.speedX;
        const RelVelY = ball2.speedY - ball1.speedY;

        const Dot = RelVelX * NormalX + RelVelY * NormalY;

        if (Dot > 0) return;

        const impulse = 2 * Dot / (ball2.mass + ball1.mass);

        ball1.speedX += impulse * ball2.mass * NormalX;
        ball1.speedY += impulse * ball2.mass * NormalY;
        ball2.speedX -= impulse * ball1.mass * NormalX;
        ball2.speedY -= impulse * ball1.mass * NormalY;

        ball1.color = this.RandomColor();
        ball2.color = this.RandomColor();
        ball2.updateElement();
        
    }
    
    private updateElement() {
            this.htmlElement.style.left = (this.horizontalPos - this.radius) + 'px';
            this.htmlElement.style.top = (this.verticalPos - this.radius) + 'px';
            this.htmlElement.style.backgroundColor = this.color;
        }

}