const Delay = [2000,2300,2500,2700,2900,3000,3300,3500]
let Windows = []
let SubWindows = []
const Barrier = document.createElement("div")
Barrier.style = "position:fixed;display:none;width:100%;height:100%;z-index:10000;opacity:0%"
document.body.appendChild(Barrier)

class WindowManager
{
    constructor(tag,instate,customclass,speedup,onlyfade)
    {
        this.Create(tag,instate,customclass)
        this.speedup = speedup
        this.onlyfade = onlyfade
        Windows.push(this)
    }
    Create(tag,instate,customclass)
    {
        if(this.Created)
        {
            console.log("Already Exist")
            return
        }
        this.id = tag
        const window = document.createElement("div")
        window.classList.add("window")
        if(customclass != null)
        {
            window.classList.add(customclass)
        }
        window.classList.add(tag)
        if(instate)
        {
            window.style.display = "flex"
        }
        else
        {
            window.style.display = "none"
        }
        this.window = window
        this.instate = instate
        document.body.appendChild(window)
        this.Created = true
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Doesn't Exist")
            return
        }
        this.window.remove()
        if(Windows.indexOf(this) != -1)
        {
            Windows[Windows.indexOf(this)] = null
            let temp = []
            for(let i = 0; i<Windows.length; i++)
            {
                if(Windows[i] != null)
                {
                    temp.push(Windows[i])
                }
            }
            Windows = temp
        }
        this.Created = false
    }
    static SelectedWindows()
    {
        Windows.forEach(win => {
            if(win.instate == true)
            {
                return win
            }
        })
    }
    static SelectedSubWindows()
    {
        let h;
        for(let i = 0; i< SubWindows.length; i++)
        {
            if(SubWindows[i].instate == true)
            {
                h = SubWindows[i]
            }
        }
        return h
    }
    static ChangeWindow(WindowManager1,WindowManager2,reverse)
    {
        if(Barrier.style.display != "block")
        {
            Barrier.style.display = "block"
            let vel = 300
            if(WindowManager1.speedup || WindowManager2.speedup)
            {
                vel = 200
            }
            if(WindowManager1.onlyfade || WindowManager2.onlyfade)
            {
                WindowManager1.window.style.animation = "dissapear " + vel + "ms forwards"
                setTimeout(() => {
                    WindowManager1.window.style.display = "none"
                    WindowManager2.window.style.animation = "appear " + vel + "ms forwards"
                    WindowManager2.window.style.display = "flex"
                    setTimeout(()=> {
                        Barrier.style.display = "none"
                        WindowManager1.instate = false
                        WindowManager2.instate = true
                    },vel)
                },vel)
                return vel*3
            }
            if(WindowManager1 instanceof WindowManager && WindowManager2 instanceof WindowManager)
            {
                WindowManager1.window.style.animation = "window-out " + vel + "ms forwards"
                setTimeout(() => {
                    WindowManager1.window.style.display = "none"
                    WindowManager2.window.style.animation = "window-in " + vel + "ms forwards"
                    WindowManager2.window.style.display = "flex"
                    setTimeout(()=> {
                    Barrier.style.display = "none"
                    WindowManager1.instate = false
                    WindowManager2.instate = true
                },vel)
                },vel)
                return vel*3
            }
            else if(WindowManager1 instanceof SubWindow && WindowManager2 instanceof SubWindow || WindowManager1 instanceof NormalWindow && WindowManager2 instanceof NormalWindow)
            {
                WindowManager1.window.style.animation = "subwindow-out " + vel + "ms forwards"
                setTimeout(() => {
                    WindowManager1.window.style.display = "none"
                    WindowManager2.window.style.animation = "subwindow-in " + vel + "ms forwards"
                    WindowManager2.window.style.display = "flex"
                    setTimeout(()=> {
                    Barrier.style.display = "none"
                    WindowManager1.instate = false
                    WindowManager2.instate = true
                },vel)
                },vel)
                return vel*3
            }
            else
            {
                Barrier.style.display = "none"
                return
            }
        }
    }
}
class SubWindow
{
    constructor(tag,where,instate,customclass,speedup,onlyfade,haveto)
    {
        this.Create(tag,where,instate,customclass)
        this.onlyfade = onlyfade
        if(!haveto)
        {
            SubWindows.push(this)
        }
        this.speedup = speedup
    }
    Create(tag,where,instate,customclass)
    {
        if(this.Created)
        {
            console.log("Already Exist")
            return
        }
        this.id = tag
        const window = document.createElement("div")
        window.classList.add("subwindow")
        if(customclass != null)
        {
            window.classList.add(customclass)
        }
        window.classList.add(tag)
        if(instate)
        {
            window.style.display = "flex"
        }
        else
        {
            window.style.display = "none"
        }
        this.window = window
        this.instate = instate
        where.appendChild(window)
        this.Created = true
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Doesn't Exist")
            return
        }
        this.window.remove()
        if(SubWindows.indexOf(this) != -1)
        {
            SubWindows[SubWindows.indexOf(this)] = null
            let temp = []
            for(let i = 0; i<SubWindows.length; i++)
            {
                if(SubWindows[i] != null)
                {
                    temp.push(SubWindows[i])
                }
            }
            SubWindows = temp
        }
        this.Created = false
    }
}
class ErrorSplash
{
    constructor()
    {
        const scr = document.createElement("div")
        scr.classList.add("errorscreen")
        scr.style.animation = "error 0.5s"
        document.body.appendChild(scr)
        setTimeout(() => {
            scr.remove()
        },550)
    }
}
class SplashScreen
{
    constructor(where)
    {
        this.Create(where)
        this.End = false
        this.Animation()
    }
    Create(where)
    {
        if(this.Created)
        {
            console.log("Already Created")
            return
        }
        const splashscreen = document.createElement("div")
        splashscreen.classList.add("splashscreen")
        const back = document.createElement("img")
        back.classList.add("back-icon")
        back.src = splashpath + "back-icon.png"
        const fore = document.createElement("div")
        fore.classList.add("fore")
        const parrot = document.createElement("img")
        parrot.classList.add("center-icon")
        parrot.src = splashopeningpath + "Opening0.png"
        fore.appendChild(parrot)
        this.fore = fore
        this.back = back
        this.parrot = parrot
        this.node = splashscreen
        splashscreen.appendChild(fore)
        splashscreen.appendChild(back)
        where.appendChild(splashscreen)
        this.Created = true
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Not Created yet")
            return
        }
        this.node.remove()
        this.Created = false
    }
    Animation()
    {
        const del = Delay[Math.round(Math.random() * (Delay.length - 1))]
        setTimeout(() => {
            this.back.style.animation = "forwards back 1s"
            this.fore.style.animation = "forwards fore 1s"
            setTimeout(() => {
                this.parrot.style.animation = "forwards Opening0 1s"
                this.parrot.style.display = "flex"
                setTimeout(() => {
                    this.parrot.src = splashopeningpath + "Opening1.png"
                    setTimeout(() => {
                        this.parrot.src = splashopeningpath + "Opening2.png"
                        setTimeout(() => {
                            this.parrot.src = splashopeningpath + "Opening3.png"
                            this.parrot.style.top = "80%"
                            this.parrot.style.scale = "1.8"
                            setTimeout(() => {
                                this.parrot.style.animation = "Opening3 200ms"
                                setTimeout(() => {
                                    this.parrot.src = splashopeningpath + "Opening4.png"
                                    setTimeout(() => {
                                        this.parrot.style.animation = "reverse forwards Opening0 700ms"
                                        setTimeout(() => {
                                            this.fore.style.animation = "forwards fore-out 300ms"
                                            this.back.style.scale = "1"
                                            this.back.style.animation = "infinite rot 1s"
                                            setTimeout(() => {
                                                this.End = true
                                            },del)
                                        },700)
                                    },700)
                                },800)
                            },200)
                        },800)
                    },800)
                },1000)
            }, 1000)
        },200)
    }
}
class UpWindow
{
    constructor(where,index,onetime)
    {
        this.where = where;
        this.index = index
        this.onetime = onetime
        this.Create()
    }
    Create()
    {
        if(this.Created)
        {
            console.log("Already Exist")
            return
        }
        const node = document.createElement("div")
        node.classList.add("upwindow")
        node.style.zIndex = this.index
        const bab = document.createElement("div")
        bab.classList.add("barb")
        bab.style.zIndex = this.index-1
        this.where.appendChild(bab)
        this.where.appendChild(node)
        this.window = node
        this.bab = bab
        this.Created = true
    }
    Show()
    {
        this.bab.addEventListener("click",() => {
            if(this.Ok && this.onetime == true)
            {
                this.NotShow()
            }
        })
        this.Ok = false
        this.window.style.display = "flex"
        this.bab.style.display = "flex"
        this.bab.style.opacity = "100%"
        setTimeout(()=>{
            this.Ok = true
        },400)
    }
    NotShow()
    {
        this.OK = false
        this.window.style.animation = "suapp 350ms forwards"
        this.bab.style.opacity = "0%"
        setTimeout(()=>{
            this.bab.style.display = "none"
            this.window.style.display = "none"
            this.Ok = true
            if(this.onetime)
            {
                this.Destroy()
            }
        },400)
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Doesn't Exist")
            return
        }
        this.window.remove()
        this.bab.remove()
        this.Created = false
    }
}
class FormatBlock
{
    constructor()
    {
        const doc = document.createElement("div")
        const text = document.createElement("h2")
        text.textContent = Language_Handler.LocalLanguage.format
        doc.appendChild(text)
        doc.classList.add("formatblock")
        document.body.appendChild(doc)
    }
}
class NetworkHandler
{
    constructor()
    {
        this.one = true
        let up = new UpWindow(document.body,200,false)
        document.addEventListener("offline",()=>{
            if(this.one)
            {
                up.Destroy()
                up = new UpWindow(document.body,200,false)
                const img = document.createElement("img")
                img.src = operativepath + "nointernet.png"
                img.style = "height:200px;width:200px"
                const h1 = document.createElement("h1")
                const div = document.createElement("div")
                div.style = "display:flex;flex-direction:column;align-items:center;justify-content:center;margin:50px"
                h1.textContent = Language_Handler.LocalLanguage.nointernet
                div.appendChild(img)
                div.appendChild(h1)
                up.window.appendChild(div)
                up.Show(true)
                this.one = false
            }
        },false)
        document.addEventListener("online",()=>{
            if(!this.one)
            {
                up.NotShow()
                this.one = true
            }
        },false)
    }
    isOnline() 
    {
        if (typeof window.cordova !== 'undefined' && typeof navigator.connection !== 'undefined') 
        {
            let networkState = navigator.connection.type;
            return networkState !== Connection.NONE;
        } 
        else 
        {
            return navigator.onLine;
        }
    }
}
class NormalWindow
{
    constructor(tag,where,instate,customclass,speedup,onlyfade)
    {
        this.Create(tag,where,instate,customclass)
        this.onlyfade = onlyfade
        this.speedup = speedup
    }
    Create(tag,where,instate,customclass)
    {
        if(this.Created)
        {
            console.log("Already Exist")
            return
        }
        this.id = tag
        const window = document.createElement("div")
        window.classList.add("normalwindow")
        if(customclass != null)
        {
            window.classList.add(customclass)
        }
        window.classList.add(tag)
        if(instate)
        {
            window.style.display = "flex"
        }
        else
        {
            window.style.display = "none"
        }
        this.window = window
        this.instate = instate
        where.appendChild(window)
        this.Created = true
    }
    Destroy()
    {
        if(!this.Created)
        {
            console.log("Doesn't Exist")
            return
        }
        this.window.remove()
        this.Created = false
    }
}