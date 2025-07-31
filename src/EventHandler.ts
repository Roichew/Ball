import { BallAnimation } from "./BallAnimation";
import { SoundManager } from './SoundManager';
import { BallBehavior } from './BallBehavior';

export class EventHandler{
    container: HTMLElement;
    BallAnimInstance;
    soundManager: SoundManager;
    //BallBehaviorInstance: BallBehavior;

    constructor(ctn: HTMLElement, ballAnimInstance: BallAnimation){
        this.container = ctn;
        this.BallAnimInstance = ballAnimInstance;
        this.soundManager = new SoundManager();
        //this.BallBehaviorInstance = new BallBehavior();
    }
    public toggleGravity() {
        this.BallAnimInstance.totalBalls.forEach(ball => {
            ball.isGravity = !ball.isGravity;
        });
    }
    onClickEvent(){
        this.container.addEventListener('click', (e)=>{
            const clientRect = this.container.getBoundingClientRect();
            const clickX = e.clientX - clientRect.left;
            const clickY = e.clientY - clientRect.top;
            this.BallAnimInstance.addBall(clickX,clickY);
            if(!this.soundManager.isPlaying){
                this.soundManager.BgPlay();
                this.soundManager.isPlaying = true;
            }
            //this.soundManager.PlayClickSound();
            
        })
        const audioBtn = document.getElementById("audioBtn");
        const gravityBtn = document.getElementById("gravityBtn");
        const resetBtn = document.getElementById("resetBtn");
        if(audioBtn){
            audioBtn.addEventListener('click', () => {
                this.soundManager.BgPause();
                this.soundManager.isPlaying = false;
            });
        }
        if(gravityBtn){
            gravityBtn.addEventListener('click', () => {
                this.toggleGravity();
            });
        }
        if(resetBtn){
            resetBtn.addEventListener('click', () => {
                this.BallAnimInstance.clearBalls();
            });
        }
    }
}