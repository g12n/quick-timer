class QuickTimer extends HTMLElement{
    constructor(){
        super()
        this.interval=null;
        this.endDate = null
    }
    connectedCallback(){
    
        this.timeToGo = document.createElement("div")
        this.appendChild(this.timeToGo);
    
        this.timeStart = document.createElement("div")
        this.appendChild(this.timeStart);
    
    
        this.formater = new Intl.DurationFormat("de-DE", { style: "long" })
        this.timeToGo.textContent= this.formater.format(this.dataset);
        
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
        clearInterval(this.interval);
        this.interval = null;
    }
    
    start(){    
        if (this.interval) return; // already running, ignore

        const dur1 = Temporal.Duration.from(this.dataset);
        this.endDate = Temporal.Now.plainDateTimeISO().add(dur1)
        this.timeStart.textContent= this.endDate;
        
        
        
        this.update()
        this.interval = setInterval(() => this.update(), 1000);
        console.log(this.interval)
    }

    update(){
        const now = Temporal.Now.plainDateTimeISO();
        const duration = now.until(this.endDate, { smallestUnit: "seconds" });
        this.timeToGo.textContent= this.formater.format(duration);
    }

}
       

customElements.define("quick-timer", QuickTimer);