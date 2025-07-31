export class SoundManager{
    private BGAudioPlayer: HTMLAudioElement
    private SfxList: HTMLAudioElement[] = [];
    private bgMusic: string;
    public isPlaying: boolean;
    private playbackSpeed: number;

    constructor(){
        this.bgMusic = "/Media/Audio/Bgmusic.mp3";
        this.BGAudioPlayer = new Audio(this.bgMusic);
        this.BGAudioPlayer.addEventListener('error', (e) => {
            console.error("Failed to load BGM:", e);
        });
        this.BGAudioPlayer.loop = true;
        this.playbackSpeed = 1;
        this.isPlaying = false;
        const sfxModules = import.meta.glob('./Media/Audio/SFX/*.mp3', { eager: true });

        for (const path in sfxModules) {
            const mod = sfxModules[path] as { default: string };
            const audio = new Audio(mod.default);
            this.SfxList.push(audio);
        }
    }

    public BgPlay(){
        if(!this.isPlaying){
            this.BGAudioPlayer.play()
            this.isPlaying = true;
        }
    }

     public BgPause(){
        if(this.isPlaying){
            this.BGAudioPlayer.pause()
            this.isPlaying = false;
        }
    }

    public PlayClickSound(){
        const RandomSoundIndex = Math.floor(Math.random() * this.SfxList.length)
        const SFX = this.SfxList[RandomSoundIndex];
        SFX.play();
    }

}