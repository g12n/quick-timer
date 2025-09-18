class QuickTimer extends HTMLElement{
    constructor(){
        super()
        this.interval=null;
        this.endDate = null
    }
    connectedCallback(){
        const {start,duration} = this.dataset;
    
        this.dataset.seconds=10;
    
        this.formater = new Intl.DurationFormat("de-DE", { style: "long" })
        this.textContent= this.formater.format(this.dataset);
        
        this.addEventListener("command", event=>{
            if (event.command === "--start") {
                this.start()
            } else if (event.command === "--pause") {
                this.pause();
            } else if (event.command === "--stop") {
                this.stop();
            }
        })
    }

    stop(){
        this.endDate = null
        this.pause()
    }
    pause(){
        clearInterval(this.interval);
        this.interval = null;
    }
    start(){    
        if (this.interval) return; // already running, ignore

        
        const dur1 = Temporal.Duration.from(this.dataset);
        this.endDate = Temporal.Now.plainDateTimeISO().add(dur1)
        this.dataset.end= this.endDate;
        
        this.update()
        this.interval = setInterval(() => this.update(), 1000);
        console.log(this.interval)
    }

    update(){
        const now = Temporal.Now.plainDateTimeISO();
        const duration = now.until(this.endDate, { smallestUnit: "seconds" });
        this.textContent= this.formater.format(duration);
    }

}
       

customElements.define("quick-timer", QuickTimer);