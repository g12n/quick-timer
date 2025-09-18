class QuickTimer extends HTMLElement{
    constructor(){
        super()
        this.interval=null;
        this.endDate = null
    }
    connectedCallback(){
    
        this.timeToGo = document.createElement("div")
        this.appendChild(this.timeToGo);
    
        this.endTimeElement = document.createElement("div")
        this.appendChild(this.endTimeElement);
    
    
        this.formater = new Intl.DurationFormat("de-DE", { style: "long" })
        
                this.dateFormat = new Intl.DateTimeFormat("de-DE", { style: "long" })
                
        this.timeToGo.textContent= this.formater.format(this.dataset);
        
        this.addEventListener("command", event=>{
            if (event.command === "--start") {
                this.start()
            } else if (event.command === "--stop") {
                this.stop();
            }
        })
        
        if (localStorage.getItem("endDate")) {
        
        const stored= localStorage.getItem("endDate");
        console.log(stored) 
this.endDate = Temporal.PlainDateTime.from(stored); 

this.start();
} else {
this.endDate = null
}
        
        
        
    }

    stop(){
        this.endDate = null
        localStorage.removeItem("endDate");this.timeToGo.textContent= this.formater.format(this.dataset);
        clearInterval(this.interval);
        this.interval = null;
    }
    
    start(){    
        if (this.interval) return; // already running, ignore

if(!this.endDate){
        const dur1 = Temporal.Duration.from(this.dataset);
        this.endDate = Temporal.Now.plainDateTimeISO().add(dur1)


        localStorage.setItem("endDate",this.endDate)
 }
        

        
        this.update()
                                this.endTimeElement.textContent= this.dateFormat.format(this.endDate);
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