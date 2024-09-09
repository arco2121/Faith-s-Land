const Times = [
    [3000,6000,3000,12],
    [3750,7500,3750,15],
    [4500,9000,4500,18]
]

class Ball
{
    constructor(where)
    {
        this.Relax_Run = false
        this.Check
        this.Relax_Event = false
        this.Timing = Times[2]
        this.Create(where)
    }
    Create(where)
    {
        if(this.Created)
        {
            console.log("Already Exist")
            return
        }
        const ball_cont = document.createElement("div")
        ball_cont.classList.add("relax-ball")
        const ball_still = document.createElement("div")
        ball_still.classList.add("still")
        const ball = document.createElement("div")
        ball.classList.add("ball")
        const ball_text = document.createElement("div")
        ball_text.classList.add("ball-text")
        ball_text.textContent = Language_Handler.LocalLanguage.start
        ball.appendChild(ball_text)
        ball_still.appendChild(ball)
        ball_cont.appendChild(ball_still)
        where.appendChild(ball_cont)
        this.ball = ball
        this.node = ball_cont
        this.still = ball_still
        this.ball.addEventListener("click",()=>{
            if(this.Relax_Event)
            {
                this.Stop_Relax_Ball()
                this.Relax_Event = false
            }
            else
            {
                this.Start_Relax_Ball()
                this.Relax_Event = true
            }
        })
        this.still.addEventListener("click",()=>{
            if(this.Relax_Event && this.Relax_Run)
            {
                this.Stop_Relax_Ball()
                this.Relax_Event = false
            }
        })
        this.Created = true
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Doesn't Exist")
            return
        }
        this.node.remove()
        this.Created = false
    }
    ChangeTiming(value)
    {
        if(value == Language_Handler.LocalLanguage.fast)
        {
            this.Timing = Times[0]
        }
        else if(value == Language_Handler.LocalLanguage.medium)
        {
            this.Timing = Times[1]
        }
        else
        {
            this.Timing = Times[2]
        }
        this.Stop_Relax_Ball()
        this.Relax_Event = false
        this.Relax_Run = false
    }
    Check_Relax(string)
    {
        if(!this.Relax_Run)
        {
            this.Relax_Run = true
            try
            {
                this.ball.style.animation = "relax " + this.Timing[3] + "s infinite"
                this.ball.querySelector("." + string + "-text").style.animation = "relax-text " + this.Timing[3] + "s infinite"
                this.ball.querySelector("." + string + "-text").textContent = Language_Handler.LocalLanguage.inhale
            }catch{return}
            setTimeout(()=>{
                try{
                    this.ball.querySelector("." + string + "-text").textContent = Language_Handler.LocalLanguage.hold
                }catch{return}
                setTimeout(()=>{
                    try{
                        this.ball.querySelector("." + string + "-text").textContent = Language_Handler.LocalLanguage.exhale
                    }catch{return}
                    setTimeout(()=>{
                        this.Relax_Run = false
                    },this.Timing[0])
                },this.Timing[1])
            },this.Timing[2])
        }
    }
    Stop_Relax_Ball()
    {
        this.ball.style = ""
        this.ball.querySelector(".ball-text").style = ""
        this.Relax_Run = false
        clearInterval(this.Check)
        this.ball.querySelector(".ball-text").classList = "ball-text"
        this.ball.classList = "ball"
        this.ball.querySelector(".ball-text").textContent = Language_Handler.LocalLanguage.start
    }
    Start_Relax_Ball()
    {
        const string = Language_Handler.GenString(40)
        this.ball.classList.add(string,"ball-special")
        this.ball.querySelector(".ball-text").classList.add(string + "-text")
        this.Check = setInterval(()=>{
            this.Check_Relax(string)
        },0,)
    }
}
class Multi
{
    constructor(where,arr)
    {
        this.Create(where,arr)
    }
    Create(where,arr)
    {
        if(this.Created)
        {
            console.log("Already Exist")
            return
        }
        const multi_cont = document.createElement("div")
        multi_cont.classList.add("multi-cont")
        let choises = []
        for(let i = 0; i < arr.length;i++)
        {
            const choise = document.createElement("div")
            if(i == 0)
            {
                choise.classList.add("multi-selected")
                choise.textContent = arr[i]
                choises.push([choise,true,arr[i]])
            }
            else
            {
                choise.classList.add("multi")
                choise.textContent = arr[i]
                choises.push([choise,false,arr[i]])
            }
            multi_cont.appendChild(choise)
        }
        where.appendChild(multi_cont)
        this.node = multi_cont
        this.elems = choises
        this.Created = true
        this.elems.forEach((ele,index) => {
            this.elems[index][0].addEventListener("click",()=>{
                if(!ele[1])
                {
                    let i = 0
                    for(i = 0; i < this.elems.length;i++)
                    {
                        if(this.elems[i][1] == true)
                        {
                            break
                        }
                    }
                    this.elems[i][0].classList = "multi"
                    this.elems[i][1] = !this.elems[i][1]
                    this.elems[index][0].classList = "multi-selected"
                    this.elems[index][1] = !this.elems[index][1]
                }
            })
        })
    }
    Selected()
    {
        for(let i = 0; i<this.elems.length; i++)
        {
            if(this.elems[i][1])
            {
                return this.elems[i]
            }
        }
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Doesn't Exist")
            return
        }
        this.node.remove()
        this.Created = false
    }
}
class But
{
    constructor(where,how,text)
    {
        this.Create(where,how,text)
    }
    Create(where,how,text)
    {
        if(this.Created)
        {
            console.log("Already Exist")
            return
        }
        const but = document.createElement("button")
        if(how == "medium")
        {
            but.classList.add("but-medium")
        }
        else
        {
            but.classList.add("but-little")
        }
        if(typeof text == "string")
        {
            but.textContent = text
        }
        else
        {
            but.appendChild(text)
        }
        where.appendChild(but)
        this.node = but
        this.Created = true
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Doesn't Exist")
            return
        }
        this.node.remove()
        this.Created = false
    }
}
class TextBox
{
    constructor(where,but)
    {
        this.Create(where,but)
    }
    Create(where,but)
    {
        if(this.Created)
        {
            console.log("Already Exist")
            return
        }
        const cont = document.createElement("div")
        const textbox = document.createElement("textarea")
        textbox.classList.add("text-box")
        cont.classList.add("text-cont")
        cont.appendChild(textbox)
        if(but)
        {
            const but = document.createElement("button")
            but.classList.add("subm-text")
            cont.appendChild(but)
            but.addEventListener("click",() => {
                if(this.textbox.textContent != "")
                {
                    textbox.style.animation = "send 1s"
                }
            })
            this.but = but
            this.textbox = textbox
            this.node = cont
            where.appendChild(cont)
        }
        else
        {
            this.textbox = textbox
            this.node = cont
            where.appendChild(cont)
        }
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Doesn't Exist")
            return
        }
        this.node.remove()
        this.Created = false
    }
}
class MultiNavBar
{
    constructor(where,arr)
    {
        this.Create(where,arr)
    }
    Create(where,arr)
    {
        if(this.Created)
        {
            console.log("Already Exist")
            return
        }
        const multi_cont = document.createElement("div")
        multi_cont.classList.add("navbar")
        let choises = []
        for(let i = 0; i < arr.length;i++)
        {
            const choise = document.createElement("div")
            if(i == 0)
            {
                choise.classList.add("nav-multi-selected")
                choise.appendChild(arr[i])
                choises.push([choise,true,arr[i]])
            }
            else
            {
                choise.classList.add("nav-multi")
                choise.appendChild(arr[i])
                choises.push([choise,false,arr[i]])
            }
            multi_cont.appendChild(choise)
        }
        where.appendChild(multi_cont)
        this.node = multi_cont
        this.elems = choises
        this.Created = true
        this.elems.forEach((ele,index) => {
            this.elems[index][0].addEventListener("click",() => {
                if(!ele[1])
                {
                    let i = 0
                    for(i = 0; i < this.elems.length;i++)
                    {
                        if(this.elems[i][1] == true)
                        {
                            break
                        }
                    }
                    this.elems[i][0].classList = "nav-multi"
                    this.elems[i][1] = !this.elems[i][1]
                    this.elems[index][0].classList = "nav-multi-selected"
                    this.elems[index][1] = !this.elems[index][1]
                }
            })
        })
    }
    Selected()
    {
        for(let i = 0; i<this.elems.length; i++)
        {
            if(this.elems[i][1])
            {
                return this.elems[i]
            }
        }
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Doesn't Exist")
            return
        }
        this.node.remove()
        this.Created = false
    }
}
class Idle
{
    constructor(where)
    {
        this.Create(where)
    }
    Create(where)
    {
        if(this.Created)
        {
            console.log("Already Exist")
            return
        }
        const cont = document.createElement("div")
        const idlecont = document.createElement("div")
        const idle = document.createElement("img")
        cont.classList.add("idle")
        idlecont.classList.add("par")
        idle.classList.add("idleimg")
        idle.src = operativepath + "idle0.png"
        cont.appendChild(idlecont)
        idlecont.appendChild(idle)
        this.idle = idle
        this.node = cont
        where.appendChild(cont)
        this.outs = []
        idlecont.addEventListener("click",()=>{
            const ph = Language_Handler.LocalLanguage.phrases
            const r = Math.floor(Math.random() * (ph.length - 1) + 1)
            let L = ""
            if(ph[r].includes("<custon>"))
            {
                Account.value.SleepTracker.Med()
                L = ph[r].replace("<custom>",Account.value.SleepTracker.med[0] + "h " + + Language_Handler.LocalLanguage.cong + " " + Account.value.SleepTracker.med[1] + 
                    "m"
                )
            }
            else
            {
                L = ph[r]
            }
            if(PlatformReg == "Browser")
            {
                alert(L)
            }   
            else if(PlatformReg == "Android")
            {
                window.plugins.toast.showWithOptions(
                    {
                        message: L,
                        duration: 6000,
                        position: "bottom",
                        addPixelsY: 0,  
                    },
                )
            }
        })
        this.int = setInterval(() => {
            idle.src = operativepath + "idle0.png"
            const H = setTimeout(() => {
                idle.src = operativepath + "idle1.png"
                const E = setTimeout(()=>{
                    idle.src = operativepath + "idle0.png"
                    const Y = setTimeout(()=>{
                        idle.src = operativepath + "idle2.png"
                        const YY = setTimeout(()=> {
                            idle.src = operativepath + "idle0.png"
                        },200)
                        this.outs.push(YY)
                    },2000)
                    this.outs.push(Y)
                },3000)
                this.outs.push(E)
            },1000)
            this.outs.push(H)
        },7000)
        this.Created = true
    }
    ChangeIdle(st)
    {
        if(st != this.idlename)
        {
            this.idlename = st
            clearInterval(this.int)
            this.outs.forEach(I=>{
                clearTimeout(I)
            })
            this.outs = []
            if(st == "music")
            {
                this.int = setInterval(() => {
                    this.idle.src = operativepath + "music-idle0.png"
                    const H = setTimeout(() => {
                        this.idle.src = operativepath + "music-idle1.png"
                        const E = setTimeout(()=>{
                            this.idle.src = operativepath + "music-idle2.png"
                            const Y = setTimeout(()=>{
                                this.idle.src = operativepath + "music-idle3.png"
                                const HH = setTimeout(() => {
                                    this.idle.src = operativepath + "music-idle2.png"
                                    const EE = setTimeout(()=>{
                                        this.idle.src = operativepath + "music-idle1.png"
                                        const YY = setTimeout(()=>{
                                            this.idle.src = operativepath + "music-idle0.png"
                                        },2000)
                                        this.outs.push(YY)
                                    },2200)
                                    this.outs.push(EE)
                                },2000)
                                this.outs.push(HH)
                            },2000)
                            this.outs.push(Y)
                        },2200)
                        this.outs.push(E)
                    },2000)
                    this.outs.push(H)
                },14400)
            }
            else if(st == "idle")
            {
                this.int = setInterval(() => {
                    this.idle.src = operativepath + "idle0.png"
                    const H = setTimeout(() => {
                        this.idle.src = operativepath + "idle1.png"
                        const E = setTimeout(()=>{
                            this.idle.src = operativepath + "idle0.png"
                            const Y = setTimeout(()=>{
                                this.idle.src = operativepath + "idle2.png"
                                const YY = setTimeout(()=> {
                                    this.idle.src = operativepath + "idle0.png"
                                },200)
                                this.outs.push(YY)
                            },2000)
                            this.outs.push(Y)
                        },3000)
                        this.outs.push(E)
                    },1000)
                    this.outs.push(H)
                },7000)
            }
        }
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Already Destroyed")
            return
        }
        clearInterval(this.int)
        this.node.remove()
        this.Created = false
    }
}