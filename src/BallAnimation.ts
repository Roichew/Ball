import { BallBehavior } from "./BallBehavior";
import { EventHandler } from "./EventHandler";
export class BallAnimation{
    container: HTMLElement; 
    isAnimating;
    Xpos: number;
    YPos: number;
    totalBalls: BallBehavior[];
    EventHandlerInstance: EventHandler;
    

    constructor(){
        const container = document.getElementById('container');
          if (!container) {
            throw new Error('Container element with ID "container" not found');
        }
        this.EventHandlerInstance = new EventHandler(container, this);
        this.totalBalls =[];
        this.container = container;
        this.isAnimating = true;
        this.Xpos = this.container.clientWidth /2 ;
        this.YPos = this.container.clientHeight /2;  
        const initialBall = new BallBehavior(this.Xpos,this.YPos, BallBehavior.RandomSpeed(), BallBehavior.RandomSpeed());
        this.totalBalls.push(initialBall)
        this.container.appendChild(initialBall.htmlElement);
        this.EventHandlerInstance.onClickEvent();
        
    }
    public clearBalls(){
        this.totalBalls.forEach(ball => {            
            if(ball.htmlElement && ball.htmlElement.parentElement){
                ball.htmlElement.parentNode?.removeChild(ball.htmlElement);
            }
        });
        this.totalBalls = [];
        this.addBall((this.container.clientHeight/2),(this.container.clientWidth/2));
    }

    public addBall(xpos:number,ypos:number){
        const newBall = new BallBehavior(xpos,ypos,BallBehavior.RandomSpeed(), BallBehavior.RandomSpeed())
        this.totalBalls.push(newBall);
        this.container.appendChild(newBall.htmlElement);
    }

    private addtrail(){
        const AllTrails = document.querySelectorAll('.trail');
        AllTrails.forEach(trail => trail.remove());
        this.totalBalls.forEach(ball => {
            for(let i=0; i< ball.trail.length -1; i++){
                const CurrentTrail = ball.trail[i];
                const TrailSize = ball.radius;
                const trail = document.createElement('div');
                trail.className = 'trail';
                trail.style.left = `${CurrentTrail.XPos - TrailSize/2}px`;
                trail.style.top = `${CurrentTrail.YPos - TrailSize/2}px`;
                trail.style.width = `${TrailSize}px`;
                trail.style.height = `${TrailSize}px`;
                trail.style.backgroundColor = ball.color;
                trail.style.opacity = "1";
                this.container.appendChild(trail);

            }
        });
    }

    public animate() {
        if (this.isAnimating) {
            this.totalBalls.forEach(ball => {
            ball.Update(this.container);
            });
            this.addtrail();
        }
        for(let i=0; i< this.totalBalls.length; i++){
            for(let j= i+1; j<this.totalBalls.length; j++ ){
                BallBehavior.CheckForBallCollision(this.totalBalls[i], this.totalBalls[j]);
            }
        }
        requestAnimationFrame(() => this.animate());
    }
}
