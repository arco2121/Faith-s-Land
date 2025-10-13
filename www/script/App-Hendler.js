/*Avvio App*/
const Wel = new WindowManager("welcome",false,null,false,false)
const Account = new Memory("Account")
const MusicIndex = new Memory("MusicIndex")
const Operative = new WindowManager("operative",false,null,false,false)
const Lirics = [document.getElementById("l0"),document.getElementById("l1"),document.getElementById("l2"),
    document.getElementById("l3"),document.getElementById("l4"),document.getElementById("l5"),document.getElementById("l6"),
    document.getElementById("l7"),document.getElementById("l8"),document.getElementById("l9")
]
const MAX_FILE_SIZE = 2.5 * 1024 * 1024
let Network
let Format
let indexmusica = 0
let Play = false
let mute = false

window.addEventListener("load",()=>{
    const When = setInterval(async () => {
        try
        {
          if(Ready && Screens.End && Language_Handler != 0)
          {
              Format = new FormatBlock()
              Network = new NetworkHandler()
              if(!await Key.Get())
              {
                  let H = new Cripto(Language_Handler.GenSecretKey(),ALPHANUM)
                  await Key.Set(H.toJSON())
                  Key.value = Cripto.fromJSON(Key.value)
                  H = null
              }
              else
              {
                  await Key.Get()
                  Key.value = Cripto.fromJSON(Key.value)
              }
              if(!await MusicIndex.Get())
              {
                  await MusicIndex.Set(0)
              }
              else
              {
                  await MusicIndex.Get()
                  indexmusica = MusicIndex.value
              }
              if(!await Account.Get())
              {
                  clearInterval(When)
                  await WelcomeSetup()
                  const temp = WindowManager.ChangeWindow(Splash,Wel)
                  setTimeout(() => {
                      Splash.Destroy()
                  },temp)
              }
              else
              {
                  clearInterval(When)
                  await Account.Get()
                  Account.value = UserAccount.fromJSON(Key.value.Decrypt(Account.value,true))
                  await OperativeApp()
                  Splash.onlyfade = true
                  Operative.onlyfade = true
                  const temp = WindowManager.ChangeWindow(Splash,Operative)
                  setTimeout(() => {
                      Splash.Destroy()
                      Wel.Destroy()
                  },temp)
              }
          }
        }
        catch(e)
        {
            console.log(e)
        }
      },50)
})

const WelcomeSetup = async () => {
    const sub1 = new SubWindow("welcome0",Wel.window,true,null,false)
    const sub2 = new SubWindow("welcome1",Wel.window,false,null,false)
    const sub3 = new SubWindow("welcome2",Wel.window,false,null,false)
    const sub4 = new SubWindow("setup0",Wel.window,false,null,false)
    const sub5 = new SubWindow("final",Wel.window,false,null,false)
    const sub6 = new SubWindow("setup1",Wel.window,false,null,false)
    const sub11 = new SubWindow("setup2",Wel.window,false,null,false)
    const sub7 = new SubWindow("setup3",Wel.window,false,null,false)
    const sub8 = new SubWindow("setup4",Wel.window,false,null,false)
    const sub9 = new SubWindow("setup5",Wel.window,false,null,false)
    const sub10 = new SubWindow("setup6",Wel.window,false,null,false)
    /*sub1*/
    const div1 = document.createElement("div")
    div1.classList.add("backwelcomeimg")
    const img = document.createElement("img")
    img.src = welcomepath + "Welcome0.png"
    img.classList.add("welcomeimg")
    div1.appendChild(img)
    const cont = document.createElement("div")
    cont.classList.add("content")
    const text1 = document.createElement("h2")
    const text2 = document.createElement("h4")
    text2.classList.add("subtext")
    text1.textContent = Language_Handler.LocalLanguage.welcome0
    text2.textContent = Language_Handler.LocalLanguage.subwelcome0
    cont.appendChild(text1)
    cont.appendChild(text2)
    const Continue = new But(cont,"medium",Language_Handler.LocalLanguage.continue)
    sub1.window.appendChild(div1)
    sub1.window.appendChild(cont)
    /*sub2*/
    const div2 = document.createElement("div")
    div2.classList.add("backwelcomeimg")
    const img2 = document.createElement("img")
    img2.src = splashopeningpath + "Opening2.png"
    img2.classList.add("welcomeimg2")
    div2.appendChild(img2)
    const cont2 = document.createElement("div")
    cont2.classList.add("content")
    const text12 = document.createElement("h2")
    const text22 = document.createElement("h4")
    text22.classList.add("subtext")
    text12.textContent = Language_Handler.LocalLanguage.welcome1
    text22.textContent = Language_Handler.LocalLanguage.subwelcome1
    cont2.appendChild(text12)
    cont2.appendChild(text22)
    const Continue2 = new But(cont2,"medium",Language_Handler.LocalLanguage.continue)
    const Back = new But(cont2,"medium",Language_Handler.LocalLanguage.back)
    sub2.window.appendChild(div2)
    sub2.window.appendChild(cont2)
    sub2.window.classList.add("reverse")
    /*sub3*/
    const div3 = document.createElement("div")
    div3.classList.add("backwelcomeimg")
    const img3 = document.createElement("img")
    img3.src = operativepath + "Talk.png"
    img3.classList.add("welcomeimg")
    img3.style = "scale: 0.8;"
    div3.appendChild(img3)
    const cont3 = document.createElement("div")
    cont3.classList.add("content")
    const text13 = document.createElement("h2")
    const text23 = document.createElement("h4")
    text23.classList.add("subtext")
    text13.textContent = Language_Handler.LocalLanguage.welcome2
    text23.textContent = Language_Handler.LocalLanguage.subwelcome2
    cont3.appendChild(text13)
    cont3.appendChild(text23)
    const Continue3 = new But(cont3,"medium",Language_Handler.LocalLanguage.start)
    const Back2 = new But(cont3,"medium",Language_Handler.LocalLanguage.back)
    sub3.window.appendChild(div3)
    sub3.window.appendChild(cont3)
    /*sub4*/
    const cont4 = document.createElement("div")
    cont4.classList.add("content")
    const text14 = document.createElement("h2")
    const box = document.createElement("input")
    box.classList.add("input-box")
    text14.textContent = Language_Handler.LocalLanguage.setupname
    cont4.appendChild(text14)
    cont4.appendChild(box)
    sub4.window.appendChild(cont4)
    const MorF = new Multi(cont4,["M","F"])
    const Done = new But(sub4.window,"medium",Language_Handler.LocalLanguage.continue)
    Done.node.style.margin = "15px"
    sub4.window.style.flexDirection = "column"
    /*sub6*/
    const cont6 = document.createElement("div")
    cont6.classList.add("content")
    const text16 = document.createElement("h2")
    const box2 = document.createElement("input")
    box2.classList.add("input-box")
    box2.type = "number"
    text16.textContent = Language_Handler.LocalLanguage.setupage
    cont6.appendChild(text16)
    cont6.appendChild(box2)
    sub6.window.appendChild(cont6)
    const Done2 = new But(sub6.window,"medium",Language_Handler.LocalLanguage.continue)
    Done2.node.style.margin = "15px"
    sub6.window.style.flexDirection = "column"
    /*sub11*/
    const cont11 = document.createElement("div")
    cont11.classList.add("content")
    const text111 = document.createElement("h2")
    const box11 = document.createElement("input")
    box11.classList.add("input-box")
    box11.type = "number"
    text111.textContent = Language_Handler.LocalLanguage.setupheight
    cont11.appendChild(text111)
    cont11.appendChild(box11)
    sub11.window.appendChild(cont11)
    const Done11 = new But(sub11.window,"medium",Language_Handler.LocalLanguage.continue)
    Done11.node.style.margin = "15px"
    sub11.window.style.flexDirection = "column"
    /*sub7*/
    const cont7 = document.createElement("div")
    cont7.classList.add("content")
    const text17 = document.createElement("h2")
    const box3 = document.createElement("input")
    box3.classList.add("input-box")
    box3.type = "number"
    text17.textContent = Language_Handler.LocalLanguage.setupweight
    cont7.appendChild(text17)
    cont7.appendChild(box3)
    sub7.window.appendChild(cont7)
    const Done3 = new But(sub7.window,"medium",Language_Handler.LocalLanguage.continue)
    Done3.node.style.margin = "15px"
    sub7.window.style.flexDirection = "column"
    /*sub8*/
    const cont8 = document.createElement("div")
    cont8.classList.add("content")
    const text18 = document.createElement("h2")
    const box8 = document.createElement("input")
    box8.classList.add("input-box")
    box8.type = "time"
    const box88 = document.createElement("input")
    box88.classList.add("input-box")
    box88.type = "time"
    text18.textContent = Language_Handler.LocalLanguage.setupsleep
    cont8.appendChild(text18)
    cont8.appendChild(box8)
    cont8.appendChild(box88)
    box8.placeholder = Language_Handler.LocalLanguage.setupsleep1
    box88.placeholder = Language_Handler.LocalLanguage.setupsleep2
    sub8.window.appendChild(cont8)
    const Done8 = new But(sub8.window,"medium",Language_Handler.LocalLanguage.continue)
    Done8.node.style.margin = "15px"
    sub8.window.style.flexDirection = "column"
    /*sub9*/
    const cont9 = document.createElement("div")
    cont9.classList.add("content")
    const text19 = document.createElement("h2")
    const box9 = document.createElement("input")
    box9.classList.add("input-box")
    box9.type = "number"
    text19.textContent = Language_Handler.LocalLanguage.setupsteps
    cont9.appendChild(text19)
    cont9.appendChild(box9)
    sub9.window.appendChild(cont9)
    const Done9 = new But(sub9.window,"medium",Language_Handler.LocalLanguage.continue)
    Done9.node.style.margin = "15px"
    sub9.window.style.flexDirection = "column"
    /*sub10*/
    const cont10 = document.createElement("div")
    cont10.classList.add("content")
    const text10 = document.createElement("h2")
    const box10 = document.createElement("input")
    box10.classList.add("input-box")
    box10.type = "file"
    box10.accept = "image/*"
    const view = document.createElement("img")
    view.classList.add("preview-img")
    let base64String
    let imgchange = true
    view.src = operativepath + "Add.png"
    view.addEventListener("click",() => {
        box10.click()
    })
    box10.addEventListener("change", (event) => {
        const file = event.target.files[0];
    
        if(file) 
        {
            if (!file.type.startsWith('image/')) {
                if(PlatformReg == "Browser")
                {
                    alert(Language_Handler.LocalLanguage.noti)
                }   
                else if(PlatformReg == "Android")
                {
                    window.plugins.toast.showWithOptions(
                        {
                            message: Language_Handler.LocalLanguage.noti,
                            duration: "short",
                            position: "bottom",
                            addPixelsY: 0,  
                        },
                    )
                }
                return
            }
    
            if (file.size > MAX_FILE_SIZE) {
                if(PlatformReg == "Browser")
                {
                    alert(Language_Handler.LocalLanguage.fulls)
                }   
                else if(PlatformReg == "Android")
                {
                    window.plugins.toast.showWithOptions(
                        {
                            message: Language_Handler.LocalLanguage.fulls,
                            duration: "short",
                            position: "bottom",
                            addPixelsY: 0,  
                        },
                    )
                }
                return
            }
    
            const reader = new FileReader();
            reader.onloadend = () => {
                const baseString = reader.result; 
                view.src = baseString;
                base64String = baseString
            };
            
            reader.readAsDataURL(file);
            imgchange = false
        } 
        else 
        {
            view.src = operativepath + "Add.png";
            imgchange = true
        }
    })
    text10.textContent = Language_Handler.LocalLanguage.setupimg
    sub10.window.appendChild(view)
    cont10.appendChild(text10)
    sub10.window.appendChild(cont10)
    const Done10 = new But(cont10,"medium",Language_Handler.LocalLanguage.continue)
    Done10.node.style.margin = "15px"
    /*sub5*/
    const cont5 = document.createElement("div")
    cont5.classList.add("content")
    const text15 = document.createElement("h2")
    text15.textContent = Language_Handler.LocalLanguage.setupcomp
    cont5.style.margin = "30px"
    cont5.appendChild(text15)
    const DoneFinal = new But(cont5,"medium",Language_Handler.LocalLanguage.continue)
    sub5.window.appendChild(cont5)
    DoneFinal.node.style.margin = "15px"
    Continue.node.addEventListener("click",() => {
        WindowManager.ChangeWindow(sub1,sub2)
    })
    Continue2.node.addEventListener("click",() => {
        WindowManager.ChangeWindow(sub2,sub3)
    })
    Back.node.addEventListener("click",() => {
        WindowManager.ChangeWindow(sub2,sub1,true)
    })
    Continue3.node.addEventListener("click",() => {
        WindowManager.ChangeWindow(sub3,sub4)
    })
    Back2.node.addEventListener("click",() => {
        WindowManager.ChangeWindow(sub3,sub2,true)
    })
    Done.node.addEventListener("click",() => {
        if(box.value == "")
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub4,sub6)
        }
    })
    Done2.node.addEventListener("click",() => {
        if(box2.value == "" || box2.value <= 0)
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub6,sub11)
        }
    })
    Done11.node.addEventListener("click",() => {
        if(box11.value == "" || box11.value <= 0)
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub11,sub7)
        }
    })
    Done3.node.addEventListener("click",() => {
        if(box3.value == "" || box3.value <= 0)
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub7,sub8)
        }
    })
    Done8.node.addEventListener("click",() => {
        if(box8.value == "" || box88 == "" || box88.value == box8.value)
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub8,sub9)
        }
    })
    Done9.node.addEventListener("click",() => {
        if(box9.value == "" || box9.value <= 0)
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub9,sub10)
        }
    })
    Done10.node.addEventListener("click",() => {
        if(imgchange)
        {
            const imageUrl = operativepath + "User.jpg"
            fetch(imageUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = function() {
                        base64String = reader.result;
                    }
                    reader.readAsDataURL(blob);
                })
                .catch(error => {
                    console.error(error);
                })
        }
        WindowManager.ChangeWindow(sub10,sub5)
    })
    DoneFinal.node.addEventListener("click",() => {
        const Splash = new WindowManager("splash1",false)
        const temp = WindowManager.ChangeWindow(Wel,Splash)
        setTimeout(async () => {
            let acc = new UserAccount(box.value,base64String,parseInt(box2.value),parseInt(box11.value),parseInt(box3.value),MorF.Selected()[0].textContent,box8.value,box88.value,box9.value, new Date().getFullYear())
            await Account.Set(Key.value.Encrypt(acc.toJSON(),true),true)
            window.location.reload()
        },temp)
    })
}

const OperativeApp = async () => {
    const rt = setInterval(()=>{
        if( Account.value.SleepTracker != null)
        {
            Account.value.SleepTracker.SetNow()
            clearInterval(rt)
        }
    },100)
    const dash = new SubWindow("dashboard",Operative.window,true,null,true,true,false)
    const talk = new SubWindow("talkto",Operative.window,false,null,true,true,false)
    const pre = new SubWindow("pretalk",talk.window,true,null,true,true,true)
    const after = new SubWindow("aftertalk",talk.window,false,null,true,true,true)
    const diary = new SubWindow("diary",Operative.window,false,null,true,true,false)
    /*UpperMenu*/
    const Upmenu = document.createElement("div")
    Upmenu.classList.add("uppermenu")
    const textupper = document.createElement("h1")
    textupper.textContent = Language_Handler.LocalLanguage.dashboard
    Upmenu.appendChild(textupper)
    const imgsave = document.createElement("img")
    imgsave.classList.add("uppericon")
    imgsave.src = operativepath + "Save.png"
    const imgadd = document.createElement("img")
    const imgdelete = document.createElement("img")
    imgdelete.classList.add("uppericon")
    imgdelete.src = operativepath + "Block.png"
    imgadd.classList.add("uppericon")
    imgadd.src = operativepath + "Add.png"
    const imgset = document.createElement("img")
    imgset.classList.add("uppericon")
    imgset.src = operativepath + "Settings.png"
    const div = document.createElement("div")
    imgsave.style.display = "none"
    imgdelete.style.display = "none"
    const divhid = document.createElement("div")
    divhid.style.display = "contents"
    div.appendChild(imgadd)
    divhid.appendChild(imgsave)
    divhid.appendChild(imgdelete)
    div.appendChild(divhid)
    div.appendChild(imgset)
    div.style = "display:flex;flex-direction:row;"
    Upmenu.appendChild(div)
    imgset.addEventListener("click",async ()=>{
        await LoadSettings()
    })
    Operative.window.appendChild(Upmenu)
    /*Dashboard*/
    const container = document.createElement("div")
    container.classList.add("conta")
    const idle = new Idle(container)
    setInterval(()=>{
        if(Play)
        {
            idle.ChangeIdle("music")
        }
        else
        {
            idle.ChangeIdle("idle")
        }
    },0)
    const schede = document.createElement("div")
    schede.classList.add("schede")
    const line1 = document.createElement("div")
    const line2 = document.createElement("div")
    line1.classList.add("line")
    line2.classList.add("line")
    const sleep = document.createElement("div")
    sleep.classList.add("quad-tile")
    const mood = document.createElement("div")
    mood.classList.add("quad-tile")
    const health = document.createElement("div")
    health.classList.add("quad-tile")
    const respira = document.createElement("div")
    respira.classList.add("requ-tile")
    const medita = document.createElement("div")
    medita.classList.add("requ-tile")
    const img1 = document.createElement("img")
    img1.classList.add("imgtile")
    img1.src = operativepath + "sleep.png"
    const img2 = document.createElement("img")
    img2.classList.add("imgtile")
    img2.src = operativepath + "mood.png"
    const img3 = document.createElement("img")
    img3.classList.add("imgtile")
    img3.src = operativepath + "health.png"
    sleep.appendChild(img1)
    mood.appendChild(img2)
    health.appendChild(img3)
    const text1 = document.createElement("h5")
    const text2 = document.createElement("h5")
    text1.textContent = Language_Handler.LocalLanguage.breathingex
    text2.textContent = Language_Handler.LocalLanguage.meditation
    respira.appendChild(text1)
    medita.appendChild(text2)
    line1.appendChild(sleep)
    line1.appendChild(mood)
    line1.appendChild(health)
    line2.appendChild(respira)
    line2.appendChild(medita)
    schede.appendChild(line1)
    schede.appendChild(line2)
    container.appendChild(schede)
    imgadd.addEventListener("click",() => {
        if(WindowManager.SelectedSubWindows() == dash)
        {
            const WE = new UpWindow(document.body,7,true)
            const cen = document.createElement("div")
            cen.className = "center"
            const h2 = document.createElement("h2")
            h2.textContent = Language_Handler.LocalLanguage.adddata
            h2.style.margin = "40px"
            cen.appendChild(h2)
            const cent = document.createElement("div")
            cent.className = "center-line"
            cent.style = "margin:20px 5px 20px 5px; flex-wrap:wrap;"
            const newc = document.createElement("div")
            newc.classList.add("quad-tile")
            const imgs = document.createElement("img")
            imgs.src = operativepath + "sleep.png"
            imgs.classList.add("imgtilereq")
            newc.appendChild(imgs)
            newc.addEventListener("click",()=>{
                WE.NotShow()
                const Rec = Account.value.SleepTracker.SleepCycleRecord()
                const sub8 = new UpWindow(document.body,9,true)
                const cont8 = document.createElement("div")
                cont8.classList.add("content")
                const text18 = document.createElement("h2")
                const box8 = document.createElement("input")
                box8.classList.add("input-box")
                box8.type = "time"
                box8.value = Rec[0]
                text18.style.margin = "40px"
                const box88 = document.createElement("input")
                box88.classList.add("input-box")
                box88.type = "time"
                box88.value = Rec[1]
                text18.textContent = Language_Handler.LocalLanguage.addsleep
                cont8.appendChild(text18)
                cont8.appendChild(box8)
                cont8.appendChild(box88)
                box8.placeholder = Language_Handler.LocalLanguage.setupsleep1
                box88.placeholder = Language_Handler.LocalLanguage.setupsleep2
                sub8.window.appendChild(cont8)
                const Done8 = new But(sub8.window,"medium",Language_Handler.LocalLanguage.done)
                Done8.node.style.margin = "30px"
                sub8.window.style.flexDirection = "column"
                Done8.node.addEventListener("click",() => {
                    if(box8.value == "" || box88 == "" || box88.value == box8.value)
                    {
                        const Wrong = new ErrorSplash()
                    }
                    else
                    {
                        Account.value.SleepTracker.Add(box8.value,box88.value,new Date().toISOString().split('T')[0])
                        sub8.NotShow()
                    }
                })
                sub8.Show()
            })
            newc.style.margin = "20px"
            cent.appendChild(newc)
            const newc1 = document.createElement("div")
            newc1.classList.add("quad-tile")
            const imgs1 = document.createElement("img")
            imgs1.src = operativepath + "mood.png"
            imgs1.classList.add("imgtilereq")
            newc1.appendChild(imgs1)
            newc1.style.margin = "20px"
            cent.appendChild(newc1)
            newc1.addEventListener("click",()=>{
                WE.NotShow()
                const firstwin = new UpWindow(document.body,9,true)
                const emo = []
                let moodf = 0
                for(let i = 0; i<12;i++)
                {
                    const tiler = document.createElement("div")
                    tiler.classList.add("quad-tile-mini")
                    const img = document.createElement("img")
                    img.src = Moods[i].img
                    img.classList.add("imgminicr")
                    tiler.appendChild(img)
                    emo.push(tiler)
                }
                const h21 = document.createElement("h2")
                h21.textContent = Language_Handler.LocalLanguage.addmood
                h21.style.margin = "40px"
                const grid = document.createElement("div")
                grid.classList.add("gridla")
                emo.forEach(em => {
                    grid.appendChild(em)
                    em.addEventListener("click",()=>{
                        moodf = (emo.indexOf(em) != -1) ? emo.indexOf(em) : 0
                        firstwin.NotShow()
                        const data = new UpWindow(document.body,11,true)
                        const cont9 = document.createElement("div")
                        cont9.classList.add("content")
                        const text19 = document.createElement("h2")
                        text19.style.margin = "40px"
                        const box9 = document.createElement("input")
                        box9.classList.add("input-box")
                        box9.type = "number"
                        text19.textContent = Language_Handler.LocalLanguage.intensi
                        cont9.appendChild(text19)
                        cont9.appendChild(box9)
                        box9.style.margin = "20px"
                        data.window.appendChild(cont9)
                        const Done9 = new But(data.window,"medium",Language_Handler.LocalLanguage.done)
                        Done9.node.style.margin = "30px"
                        data.window.style.flexDirection = "column"
                        Done9.node.addEventListener("click",() => {
                            if(box9.value == "" || box9.value <= 0 || box9.value > 10 || isNaN(box9.value))
                            {
                                const Wrong = new ErrorSplash()
                            }
                            else
                            {
                                Account.value.MoodTracker.Add(moodf,Math.round(parseFloat(box9.value)),new Date().toISOString().split('T')[0])
                                data.NotShow()
                            }
                        })
                        data.Show()
                    })
                })
                firstwin.window.appendChild(h21)
                firstwin.window.appendChild(grid)
                firstwin.Show()
            })
            const newc3 = document.createElement("div")
            newc3.classList.add("quad-tile")
            const imgs3 = document.createElement("img")
            imgs3.src = operativepath + "health.png"
            imgs3.classList.add("imgtilereq")
            newc3.style.margin = "20px"
            newc3.appendChild(imgs3)
            cent.appendChild(newc3)
            newc3.addEventListener("click",()=>{
                WE.NotShow()
                const data = new UpWindow(document.body,9,true)
                const cont9 = document.createElement("div")
                cont9.classList.add("content")
                const text19 = document.createElement("h2")
                text19.style.margin = "40px"
                const box9 = document.createElement("input")
                box9.classList.add("input-box")
                box9.type = "number"
                text19.textContent = Language_Handler.LocalLanguage.addsteps
                cont9.appendChild(text19)
                cont9.appendChild(box9)
                box9.style.margin = "20px"
                data.window.appendChild(cont9)
                const Done9 = new But(data.window,"medium",Language_Handler.LocalLanguage.done)
                Done9.node.style.margin = "30px"
                data.window.style.flexDirection = "column"
                Done9.node.addEventListener("click",() => {
                    if(box9.value == "" || box9.value <= 0 || isNaN(box9.value))
                    {
                        const Wrong = new ErrorSplash()
                    }
                    else
                    {
                        Account.value.HealthTracker.newdata(parseInt(box9.value))
                        data.NotShow()
                    }
                })
                data.Show()
            })
            WE.window.appendChild(cen)
            WE.window.appendChild(cent)
            WE.Show()
        }
    })
    health.addEventListener("click",async ()=>{
        /*const WE = new UpWindow(document.body,7,true)
        const cen = document.createElement("div")
        cen.className = "center"
        const h2 = document.createElement("h2")
        h2.textContent = Language_Handler.LocalLanguage.notsupport
        cen.appendChild(h2)
        WE.window.appendChild(cen)
        WE.Show()*/
        Account.value.HealthTracker.LoadData(document.body)
    })
    sleep.addEventListener("click",()=>{
        Account.value.SleepTracker.LoadData(document.body)
    })
    mood.addEventListener("click",()=>{
        Account.value.MoodTracker.LoadData(document.body)
    })
    respira.addEventListener("click",() => {
        const upline = document.createElement('div');
        upline.className = 'upline'
        const rest = document.createElement('div');
        rest.className = 'rest'
        const uprespira = new UpWindow(document.body,7,true)
        const multi = new Multi(upline,[Language_Handler.LocalLanguage.slow,Language_Handler.LocalLanguage.medium,Language_Handler.LocalLanguage.fast])
        const ball = new Ball(rest)
        uprespira.window.appendChild(upline)
        uprespira.window.appendChild(rest)
        multi.elems.forEach(ele => {
            ele[0].addEventListener("click",()=>{
                ball.ChangeTiming(ele[2])
            })
        })
        uprespira.Show()
    })
    medita.addEventListener("click",()=>{
        const upmedita = new UpWindow(document.body,7,true)
        const cen1 = document.createElement("div")
        cen1.classList.add("center")
        const TimeM = document.createElement("h2")
        const J = setInterval(()=>{
            const time = Math.floor(Account.value.meditationTime/60) + ":" + ((Account.value.meditationTime%60) < 10 ? "0" : "") + Math.floor(Account.value.meditationTime%60)
            TimeM.textContent = Language_Handler.LocalLanguage.besttime + time
        },10) 
        cen1.appendChild(TimeM)
        let count = 0;
        const TimeN = document.createElement("h2")
        TimeN.style = "font-size:60px"
        const div = document.createElement("div")
        div.classList.add("center")
        div.style.margin = "45px 0px 45px 0px"
        div.appendChild(TimeN)
        const divline = document.createElement("div")
        divline.style = "margin:20px;"
        const div2 = document.createElement("div")
        div2.classList.add("center-line")
        divline.classList.add("center-line")
        const im1 = document.createElement("img")
        const im2 = document.createElement("img")
        const im3 = document.createElement("img")
        const im4 = document.createElement("img")
        const im5 = document.createElement("img")
        const im6 = document.createElement("img")
        const im7 = document.createElement("img")
        im1.src = operativepath + "Back.png"
        im2.src = operativepath + "Play.png"
        im3.src = operativepath + "Stop.png"
        im4.src = operativepath + "Forward.png"
        im5.src = operativepath + "vol.png"
        im6.src = operativepath + "timeplay.png"
        im7.src = operativepath + "timestop.png"
        im1.classList.add("playicon")
        im2.classList.add("playicon")
        im3.classList.add("playicon")
        im4.classList.add("playicon")
        im5.classList.add("playicon")
        im6.classList.add("playicon")
        im7.classList.add("playicon")
        im6.classList.add("lop")
        im7.classList.add("lop")
        const divb = document.createElement("div")
        divb.classList.add("center-line")
        divline.appendChild(im1)
        div2.appendChild(im2)
        div2.appendChild(im5)
        div2.appendChild(im3)
        divline.appendChild(div2)
        divline.appendChild(im4)
        divb.appendChild(im6)
        divb.appendChild(im7)
        div.appendChild(divb)
        let io = false
        let timer = false
        const JK = setInterval(()=>{
            const Ty = count
            const time =  Math.floor(Ty/60) + ":" + ((Ty%60) < 10 ? "0" : "") + Math.floor(Ty%60)
            TimeN.textContent = time
        },0)
        const JJ = setInterval(()=>{
            if(timer)
            {
                count = count + 1
            }
        },1000)
        const Y = setInterval(async ()=> {
            if(timer)
            {
                io = true
            }
            else
            {
                if(io)
                {
                    if(count > Account.value.meditationTime)
                    {
                        Account.value.meditationTime = count
                    }
                    io = false
                }
                count = 0;
            }
        },0)
        im6.addEventListener("click",()=>{
            timer = true
        })
        im7.addEventListener("click",()=>{
            timer = false
        })
        im1.addEventListener("click",()=>{
            Lirics[indexmusica].pause()
            Lirics[indexmusica].currentTime = 0
            if(indexmusica-1 < 0)
            {
                indexmusica = Lirics.length-1
            }
            else
            {
                indexmusica--
            }
            if(Play)
            {
                Lirics[indexmusica].play()
            }
        })
        im5.addEventListener("click",()=>{
            if(mute)
            {
                mute = false
                for(let index = 0; index<Lirics.length;index++)
                {
                    Lirics[index].muted = false
                }
            }
            else
            {
                mute = true
                for(let index = 0; index<Lirics.length;index++)
                {
                    Lirics[index].muted = true
                }
            }
        })
        const GIANNI = setInterval(()=>{
            if(mute)
            {
                im5.src = operativepath + "notvol.png"
            }
            else
            {
                im5.src = operativepath + "vol.png"
            }
        })
        for(let index = 0; index<Lirics.length;index++)
        {
            Lirics[index].addEventListener("ended",()=>{
                Lirics[index].pause()
                Lirics[index].currentTime = 0
                if(index+1 >=  Lirics.length)
                {
                    index = 0
                }
                else
                {
                    index++
                }
                if(Play)
                {
                    Lirics[index].play()
                }
                indexmusica = index
            })
        }
        im2.addEventListener("click",()=>{
            if(!Play)
            {
                Play = true
                Lirics[indexmusica].play()
            }
        })
        im3.addEventListener("click",()=>{
            if(Play)
            {
                Play = false
                Lirics[indexmusica].pause()
            }
        })
        im4.addEventListener("click",()=>{
            Lirics[indexmusica].pause()
            Lirics[indexmusica].currentTime = 0
            if(indexmusica+1 >=  Lirics.length)
            {
                indexmusica = 0
            }
            else
            {
                indexmusica++
            }
            if(Play)
            {
                Lirics[indexmusica].play()
            }
        })
        upmedita.window.appendChild(cen1)
        upmedita.window.appendChild(div)
        upmedita.window.appendChild(divline)
        upmedita.Show()
        upmedita.bab.addEventListener("click",()=>{
            timer = false
            setTimeout(()=>{
                clearInterval(Y)
                clearInterval(J)
                clearInterval(JJ)
                clearInterval(GIANNI)
                clearInterval(JK)
            },500)
        })
    })
    dash.window.appendChild(container)
    /*Talk*/
    const newc = document.createElement("div")
    newc.classList.add("quad-tile")
    const imgnew = document.createElement("img")
    imgnew.src = operativepath + "newchat.png"
    imgnew.classList.add("imgtilereq")
    newc.style.margin = "20px"
    const hist = document.createElement("div")
    hist.classList.add("quad-tile")
    hist.style.margin = "20px"
    const imgh = document.createElement("img")
    imgh.src = operativepath + "history.png"
    imgh.classList.add("imgtilereq")
    hist.appendChild(imgh)
    newc.appendChild(imgnew)
    const line = document.createElement("div")
    line.classList.add("line")
    line.appendChild(hist)
    line.appendChild(newc)
    const cont = document.createElement("div")
    cont.classList.add("content")
    const texttalk = document.createElement("h2")
    const sub = document.createElement("h4")
    sub.classList.add("subtext")
    texttalk.textContent = Language_Handler.LocalLanguage.welcome2
    sub.textContent = Language_Handler.LocalLanguage.talktonow
    cont.appendChild(texttalk)
    cont.appendChild(sub)
    pre.window.appendChild(line)
    pre.window.appendChild(cont)
    newc.addEventListener("click",async () => {
        WindowManager.ChangeWindow(pre,after)
        const chat = new Chat(Language_Handler.LocalLanguage.CurrentLanguage)
        chat.Create(after.window)
        imgsave.style.display = "flex"
        chat.area.addEventListener("focusin",()=>{
            if(PlatformReg == "Android")
            {
                Nav.node.style.display = "none"
                chat.node.style.height = "95%"
            }
        })
        chat.area.addEventListener("focusout",()=>{
            if(PlatformReg == "Android")
            {
                Nav.node.style.display = "flex"
                chat.node.style.height = ""
            }
        })
        imgdelete.style.display = "flex"
        function f1()
        {
            if(!chat.wait)
            {
                let hj = true
                for(let index = 0; index< Account.value.TalkHistrory.length;index++) 
                {
                    if(Account.value.TalkHistrory[index].id == chat.id)
                    {
                        Account.value.TalkHistrory[index] = chat
                        hj = false
                        break;
                    }
                }
                if(hj)
                {
                    Account.value.TalkHistrory.push(chat)
                }
            }
        }
        function f2()
        {
            if(!chat.wait)
            {
                imgsave.removeEventListener("click",f1)
                imgsave.style.display = "none"
                imgdelete.style.display = "none"
                WindowManager.ChangeWindow(after,pre)
                chat.Destroy()
                imgdelete.removeEventListener("click",f2)
            }
        }
        imgsave.addEventListener("click", f1)
        imgdelete.addEventListener("click",f2)
    })
    hist.addEventListener("click",()=>{
        if(Account.value.TalkHistrory.length <= 0)
        {
            const hj = new UpWindow(document.body,7,true)
            const H = document.createElement("h2")
            H.textContent = Language_Handler.LocalLanguage.nothingtoshow
            H.style = "margin:60px;"
            hj.window.appendChild(H)
            hj.Show()
        }
        else
        {
            const upwindowDiv = new UpWindow(document.body,7,true)
            for(let i = 0; i<Account.value.TalkHistrory.length;i++)
            {
                const centerLineDiv1 = document.createElement('div');
                centerLineDiv1.className = 'center-line';
                centerLineDiv1.style.margin = '10px';
                const label1 = document.createElement('label');
                label1.className = 'k';
                label1.textContent = Language_Handler.LocalLanguage.newchat + " " + (i+1)
                centerLineDiv1.appendChild(label1);
                upwindowDiv.window.appendChild(centerLineDiv1);
                label1.addEventListener("click",()=>{
                    upwindowDiv.NotShow()
                    WindowManager.ChangeWindow(pre,after)
                    const chat = Account.value.TalkHistrory[i]
                    chat.LoadHistory(after.window)
                    chat.area.disabled = true
                    imgdelete.style.display = "flex"
                    imgdelete.addEventListener("click",() => {
                        if(!chat.wait)
                        {
                            imgsave.style.display = "none"
                            imgdelete.style.display = "none"
                            WindowManager.ChangeWindow(after,pre)
                            chat.Destroy()
                        }
                    })
                })
            }
            upwindowDiv.Show()
        }
    })
    /*Diary*/
    const containerd = document.createElement("div")
    containerd.classList.add("conta")
    containerd.style.flexDirection = "column"
    diary.window.appendChild(containerd)
    setInterval(()=>{
        Account.value.Diary.LoadAll(containerd)
    },0)
    imgadd.addEventListener("click",() => {
        if(WindowManager.SelectedSubWindows() == diary)
        {
            Account.value.Diary.Add(containerd)
        }
    })
    /*IconBar*/
    const Dash = document.createElement("img")
    Dash.classList.add("navimg")
    Dash.src = operativepath + "Dash-Selected.png"
    const Talk = document.createElement("img")
    Talk.classList.add("navimg")
    Talk.classList.add("navimgspe")
    Talk.src = operativepath + "Talk.png"
    const Diary = document.createElement("img")
    Diary.classList.add("navimg")
    Diary.src = operativepath + "Diary.png"
    const Nav = new MultiNavBar(Operative.window,[Dash,Talk,Diary])
    Nav.elems.forEach(ele => {
        ele[0].addEventListener("click",() => {
            if(ele[2] == Dash)
            {
                if(WindowManager.SelectedSubWindows() != dash)
                {
                    if(WindowManager.SelectedSubWindows() == diary)
                    {
                        WindowManager.ChangeWindow(diary,dash)
                        talk.instate = false
                        talk.window.style.display = "none"
                        Dash.src = operativepath + "Dash-Selected.png"
                        Nav.elems[0][1] = true
                        Talk.src = operativepath + "Talk.png"
                        Nav.elems[1][1] = false
                        Diary.src = operativepath + "Diary.png"
                        Nav.elems[2][1] = false
                        textupper.textContent = Language_Handler.LocalLanguage.dashboard
                    }
                    else
                    {
                        WindowManager.ChangeWindow(talk,dash)
                        diary.instate = false
                        diary.window.style.display = "none"
                        Dash.src = operativepath + "Dash-Selected.png"
                        Nav.elems[0][1] = true
                        Talk.src = operativepath + "Talk.png"
                        Nav.elems[1][1] = false
                        Diary.src = operativepath + "Diary.png"
                        Nav.elems[2][1] = false
                        textupper.textContent = Language_Handler.LocalLanguage.dashboard
                    }
                    imgadd.style.display = "flex"
                    divhid.style.display = "none"
                }
            }
            else if(ele[2] == Talk)
            {
                if(WindowManager.SelectedSubWindows() != talk)
                {
                    if(WindowManager.SelectedSubWindows() == diary)
                    {
                        WindowManager.ChangeWindow(diary,talk)
                        dash.instate = false
                        dash.window.style.display = "none"
                        Dash.src = operativepath + "Dash.png"
                        Nav.elems[0][1] = false
                        Talk.src = operativepath + "Talk-Selected.png"
                        Nav.elems[1][1] = true
                        Diary.src = operativepath + "Diary.png"
                        Nav.elems[2][1] = false
                        textupper.textContent = Language_Handler.LocalLanguage.talk
                    }
                    else
                    {
                        WindowManager.ChangeWindow(dash,talk)
                        diary.instate = false
                        diary.window.style.display = "none"
                        Dash.src = operativepath + "Dash.png"
                        Nav.elems[0][1] = false
                        Talk.src = operativepath + "Talk-Selected.png"
                        Nav.elems[1][1] = true
                        Diary.src = operativepath + "Diary.png"
                        Nav.elems[2][1] = false
                        textupper.textContent = Language_Handler.LocalLanguage.talk
                    }
                    imgadd.style.display = "none"
                    divhid.style.display = "contents"
                }
            }
            else if(ele[2] == Diary)
            {
                if(WindowManager.SelectedSubWindows() != diary)
                {
                    if(WindowManager.SelectedSubWindows() == talk)
                    {
                        WindowManager.ChangeWindow(talk,diary)
                        dash.instate = false
                        dash.window.style.display = "none"
                        Dash.src = operativepath + "Dash.png"
                        Nav.elems[0][1] = false
                        Talk.src = operativepath + "Talk.png"
                        Nav.elems[1][1] = false
                        Diary.src = operativepath + "Diary-Selected.png"
                        Nav.elems[2][1] = true
                        textupper.textContent = Language_Handler.LocalLanguage.diary
                    }
                    else
                    {
                        WindowManager.ChangeWindow(dash,diary)
                        talk.instate = false
                        talk.window.style.display = "none"
                        Dash.src = operativepath + "Dash.png"
                        Nav.elems[0][1] = false
                        Talk.src = operativepath + "Talk.png"
                        Nav.elems[1][1] = false
                        Diary.src = operativepath + "Diary-Selected.png"
                        Nav.elems[2][1] = true
                        textupper.textContent = Language_Handler.LocalLanguage.diary
                    }
                    imgadd.style.display = "flex"
                    divhid.style.display = "none"
                }
            }
        })
    })
    if(PlatformReg == "Android")
    {
        Upmenu.style.boxShadow = "0px 0px 0px"
    }
    const observer = new MutationObserver(function(mutationsList, observer) 
    {
        for (const mutation of mutationsList) 
        {
            if (mutation.type === 'childList') 
            {
                Upmenu.style.animation = "roll 400ms"
                setTimeout(()=>{
                    Upmenu.style.animation = ""
                },400)
            }
        }
    })
    observer.observe(textupper,{childList:true})
    setTimeout(() => {
        Upmenu.style.animation = "appear 400ms forwards"
        Nav.node.style.animation = "appear 400ms forwards"
        Upmenu.style.display = "flex"
        Nav.node.style.display = "flex"
    },1000)
}

const LoadSettings = async () => {
    const upwindowDiv = new UpWindow(document.body,11,true)

    const centerDiv1 = document.createElement('div');
    centerDiv1.className = 'center';

    const innerCenterDiv1 = document.createElement('div');
    innerCenterDiv1.className = 'center';
    
    const img = document.createElement('img');
    img.className = 'preview-img-mini';
    img.src = Account.value.img
    
    const h2 = document.createElement('h2');
    h2.className = 'cla';
    h2.textContent = Account.value.name;

    innerCenterDiv1.appendChild(img);
    innerCenterDiv1.appendChild(h2);

    const centerLineDiv1 = document.createElement('div');
    centerLineDiv1.className = 'center-line';
    centerLineDiv1.style.justifyContent = 'space-evenly';
    
    const exportButton = document.createElement('button');
    exportButton.className = 'but-medium';
    exportButton.textContent = Language_Handler.LocalLanguage.export;
    exportButton.addEventListener("click",()=>{
        const Uip = new UpWindow(document.body,13,true)
        const Key = Account.value.secretkey
        const Temp = new Cripto(Key)
        const All = Temp.Encrypt(Account.value.toJSON(),true)
        const He = document.createElement("h2")
        He.textContent = Language_Handler.LocalLanguage.hereim
        const cen = document.createElement("div")
        cen.classList.add("center")
        cen.appendChild(He)
        const cen1 = document.createElement("div")
        cen1.classList.add("center")
        const yu = document.createElement("input")
        const yu2 = document.createElement("input")
        yu.classList.add("input-box")
        yu2.classList.add("input-box")
        yu.disabled = true
        yu.value = Key
        yu2.disabled = true
        yu2.value = All
        yu.style = "margin:25px;"
        yu2.style = "margin:25px;"
        cen1.appendChild(yu)
        cen.style = "margin:25px;"
        cen1.appendChild(yu2)
        const cen2 = document.createElement("div")
        cen2.classList.add("center")
        const j = new But(cen2,"medium",Language_Handler.LocalLanguage.copy)
        j.node.addEventListener("click",()=>{
            const JK = JSON.stringify({
                key:Key,
                all:All
            })
            if(PlatformReg == "Browser")
            {
                navigator.clipboard.writeText(JK)
            }
            else if(PlatformReg == "Android")
            {
                cordova.plugins.clipboard.copy(JK)
            }
            Uip.NotShow()
            if(PlatformReg == "Android")
            {
                window.plugins.toast.showWithOptions(
                    {
                        message: Language_Handler.LocalLanguage.copied,
                        duration: "short",
                        position: "bottom",
                        addPixelsY: 0,  
                    },
                )
            }
        })
        j.node.style = "margin:30px;"
        Uip.window.appendChild(cen)
        Uip.window.appendChild(cen1)
        Uip.window.appendChild(cen2)
        Uip.Show()
    })
    
    const modifyButton = document.createElement('button');
    modifyButton.className = 'but-medium';
    modifyButton.textContent = Language_Handler.LocalLanguage.modify;
    modifyButton.addEventListener("click",()=>{
        upwindowDiv.NotShow()
        setTimeout(async ()=>{
            await ModifyChange()
        },200)
    })

    centerLineDiv1.appendChild(exportButton);
    centerLineDiv1.appendChild(modifyButton);

    centerDiv1.appendChild(innerCenterDiv1);
    centerDiv1.appendChild(centerLineDiv1);    

    const centerDiv3 = document.createElement('div');
    centerDiv3.className = 'center';
    centerDiv3.style.margin = '30px';
    
    const centerLineDiv3 = document.createElement('div');
    centerLineDiv3.className = 'center-line';
    
    const languageLabel = document.createElement('label');
    languageLabel.textContent = Language_Handler.LocalLanguage.lang;
    
    const languageSelection = document.createElement('label');
    const selectedLanguage = document.createElement('label');
    selectedLanguage.className = 'sele';
    selectedLanguage.textContent = Language_Handler.LocalLanguage.CurrentLanguage;
    selectedLanguage.addEventListener("click",async ()=>{
        await LoadLangs()
    })

    languageSelection.appendChild(selectedLanguage);
    
    centerLineDiv3.appendChild(languageLabel);
    centerLineDiv3.appendChild(languageSelection);

    centerDiv3.appendChild(centerLineDiv3);

    const centerDiv4 = document.createElement('div');
    centerDiv4.className = 'center';
    centerDiv4.style.margin = '30px';
    
    const centerLineDiv4 = document.createElement('div');
    centerLineDiv4.className = 'center-line';
    
    const privacyButton = document.createElement('button');
    privacyButton.className = 'but-little';
    privacyButton.textContent = Language_Handler.LocalLanguage.privacy;
    privacyButton.addEventListener("click",()=>{
        const p = new UpWindow(document.body,13,true)
        const ifra = document.createElement("iframe")
        ifra.src = scriptpath + "privacy-policy.html"
        p.window.appendChild(ifra)
        p.Show()
    })
    
    const termsButton = document.createElement('button');
    termsButton.className = 'but-little';
    termsButton.textContent = Language_Handler.LocalLanguage.terms;
    termsButton.addEventListener("click",()=>{
        const p = new UpWindow(document.body,13,true)
        const ifra = document.createElement("iframe")
        ifra.src = scriptpath + "terms.html"
        p.window.appendChild(ifra)
        p.Show()
    })

    centerLineDiv4.appendChild(privacyButton);
    centerLineDiv4.appendChild(termsButton);

    centerDiv4.appendChild(centerLineDiv4);
    const centerDiv5 = document.createElement('div');
    centerDiv5.className = 'center';
    centerDiv5.style.marginTop = '20px';
    
    const h4 = document.createElement('h4');
    h4.className = 'f';
    h4.textContent = "Faith's Land 1.0.0 " + PlatformReg;

    centerDiv5.appendChild(h4);

    centerDiv1.style = "margin-bottom:30px;"
    upwindowDiv.window.appendChild(centerDiv1);
    upwindowDiv.window.appendChild(centerDiv3);
    upwindowDiv.window.appendChild(centerDiv4);
    upwindowDiv.window.appendChild(centerDiv5);
    upwindowDiv.Show()
}

const ModifyChange = async () => {
    const upwindowDiv = new UpWindow(document.body,13,true)
    const centerLineDiv1 = document.createElement('div');
    centerLineDiv1.className = 'center-line';
    centerLineDiv1.style.margin = '10px';
    
    const label1 = document.createElement('label');
    label1.className = 'k';
    label1.textContent = Language_Handler.LocalLanguage.import;
    centerLineDiv1.appendChild(label1);
    upwindowDiv.window.appendChild(centerLineDiv1);
    label1.addEventListener("click",async ()=>{
        upwindowDiv.NotShow()
        setTimeout(async()=>{
            const I = new UpWindow(document.body,15,true)
            await Import(I)
        },200)
    })

    const centerLineDiv2 = document.createElement('div');
    centerLineDiv2.className = 'center-line';
    centerLineDiv2.style.margin = '10px';
    
    const label2 = document.createElement('label');
    label2.className = 'k';
    label2.textContent = Language_Handler.LocalLanguage.modify;
    label2.addEventListener("click",()=>{
        upwindowDiv.NotShow()
        setTimeout(async ()=>{
            const L = new UpWindow(document.body,15,true)
            await Modify(L)
        },200)
    })
    centerLineDiv2.appendChild(label2);
    upwindowDiv.window.appendChild(centerLineDiv2);

    const centerLineDiv3 = document.createElement('div');
    centerLineDiv3.className = 'center-line';
    centerLineDiv3.style.margin = '10px';
    
    const label3 = document.createElement('label');
    label3.className = 'k';
    label3.textContent = Language_Handler.LocalLanguage.canceldata;
    label3.addEventListener("click",()=>{
        upwindowDiv.NotShow()
        setTimeout(async ()=>{
            Cancel()
        },200)
    })
    centerLineDiv3.appendChild(label3);
    upwindowDiv.window.appendChild(centerLineDiv3);

    const centerLineDiv4 = document.createElement('div');
    centerLineDiv4.className = 'center-line';
    centerLineDiv4.style.margin = '10px';
    const label4 = document.createElement('label');
    label4.className = 'k';
    label4.textContent = Language_Handler.LocalLanguage.erase;
    label4.addEventListener("click",()=>{
        upwindowDiv.NotShow()
        setTimeout(async ()=>{
            await Erase()
        },200)
    })
    centerLineDiv4.appendChild(label4);
    upwindowDiv.window.appendChild(centerLineDiv4);
    upwindowDiv.Show()
}

const Modify = async (where) => {
    const sub4 = new NormalWindow("setup0",where.window,true,null,false)
    const sub5 = new NormalWindow("final",where.window,false,null,false)
    const sub6 = new NormalWindow("setup1",where.window,false,null,false)
    const sub11 = new NormalWindow("setup2",where.window,false,null,false)
    const sub7 = new NormalWindow("setup3",where.window,false,null,false)
    const sub8 = new NormalWindow("setup4",where.window,false,null,false)
    const sub9 = new NormalWindow("setup5",where.window,false,null,false)
    const sub10 = new NormalWindow("setup6",where.window,false,null,false)
    /*sub4*/
    const cont4 = document.createElement("div")
    cont4.classList.add("content")
    const text14 = document.createElement("h2")
    const box = document.createElement("input")
    box.classList.add("input-box")
    text14.textContent = Language_Handler.LocalLanguage.setupname
    cont4.appendChild(text14)
    cont4.appendChild(box)
    sub4.window.appendChild(cont4)
    const MorF = new Multi(cont4,["M","F"])
    const Done = new But(sub4.window,"medium",Language_Handler.LocalLanguage.continue)
    Done.node.style.margin = "15px"
    sub4.window.style.flexDirection = "column"
    /*sub6*/
    const cont6 = document.createElement("div")
    cont6.classList.add("content")
    const text16 = document.createElement("h2")
    const box2 = document.createElement("input")
    box2.classList.add("input-box")
    box2.type = "number"
    text16.textContent = Language_Handler.LocalLanguage.setupage
    cont6.appendChild(text16)
    cont6.appendChild(box2)
    sub6.window.appendChild(cont6)
    const Done2 = new But(sub6.window,"medium",Language_Handler.LocalLanguage.continue)
    Done2.node.style.margin = "15px"
    sub6.window.style.flexDirection = "column"
    /*sub11*/
    const cont11 = document.createElement("div")
    cont11.classList.add("content")
    const text111 = document.createElement("h2")
    const box11 = document.createElement("input")
    box11.classList.add("input-box")
    box11.type = "number"
    text111.textContent = Language_Handler.LocalLanguage.setupheight
    cont11.appendChild(text111)
    cont11.appendChild(box11)
    sub11.window.appendChild(cont11)
    const Done11 = new But(sub11.window,"medium",Language_Handler.LocalLanguage.continue)
    Done11.node.style.margin = "15px"
    sub11.window.style.flexDirection = "column"
    /*sub7*/
    const cont7 = document.createElement("div")
    cont7.classList.add("content")
    const text17 = document.createElement("h2")
    const box3 = document.createElement("input")
    box3.classList.add("input-box")
    box3.type = "number"
    text17.textContent = Language_Handler.LocalLanguage.setupweight
    cont7.appendChild(text17)
    cont7.appendChild(box3)
    sub7.window.appendChild(cont7)
    const Done3 = new But(sub7.window,"medium",Language_Handler.LocalLanguage.continue)
    Done3.node.style.margin = "15px"
    sub7.window.style.flexDirection = "column"
    /*sub8*/
    const cont8 = document.createElement("div")
    cont8.classList.add("content")
    const text18 = document.createElement("h2")
    const box8 = document.createElement("input")
    box8.classList.add("input-box")
    box8.type = "time"
    const box88 = document.createElement("input")
    box88.classList.add("input-box")
    box88.type = "time"
    text18.textContent = Language_Handler.LocalLanguage.setupsleep
    cont8.appendChild(text18)
    cont8.appendChild(box8)
    cont8.appendChild(box88)
    box8.placeholder = Language_Handler.LocalLanguage.setupsleep1
    box88.placeholder = Language_Handler.LocalLanguage.setupsleep2
    sub8.window.appendChild(cont8)
    const Done8 = new But(sub8.window,"medium",Language_Handler.LocalLanguage.continue)
    Done8.node.style.margin = "15px"
    sub8.window.style.flexDirection = "column"
    /*sub9*/
    const cont9 = document.createElement("div")
    cont9.classList.add("content")
    const text19 = document.createElement("h2")
    const box9 = document.createElement("input")
    box9.classList.add("input-box")
    box9.type = "number"
    text19.textContent = Language_Handler.LocalLanguage.setupsteps
    cont9.appendChild(text19)
    cont9.appendChild(box9)
    sub9.window.appendChild(cont9)
    const Done9 = new But(sub9.window,"medium",Language_Handler.LocalLanguage.continue)
    Done9.node.style.margin = "15px"
    sub9.window.style.flexDirection = "column"
    /*sub10*/
    const cont10 = document.createElement("div")
    cont10.classList.add("content")
    const text10 = document.createElement("h2")
    const box10 = document.createElement("input")
    box10.classList.add("input-box")
    box10.type = "file"
    box10.accept = "image/*"
    const view = document.createElement("img")
    view.classList.add("preview-img")
    let base64String
    let imgchange = true
    view.src = operativepath + "Add.png"
    view.addEventListener("click",() => {
        box10.click()
    })
    box10.addEventListener("change", (event) => {
        const file = event.target.files[0];
    
        if(file) 
        {
            if (!file.type.startsWith('image/')) {
                if(PlatformReg == "Browser")
                {
                    alert(Language_Handler.LocalLanguage.noti)
                }   
                else if(PlatformReg == "Android")
                {
                    window.plugins.toast.showWithOptions(
                        {
                            message: Language_Handler.LocalLanguage.noti,
                            duration: "short",
                            position: "bottom",
                            addPixelsY: 0,  
                        },
                    )
                }
                return
            }
    
            if (file.size > MAX_FILE_SIZE) {
                if(PlatformReg == "Browser")
                {
                    alert(Language_Handler.LocalLanguage.fulls)
                }   
                else if(PlatformReg == "Android")
                {
                    window.plugins.toast.showWithOptions(
                        {
                            message: Language_Handler.LocalLanguage.fulls,
                            duration: "short",
                            position: "bottom",
                            addPixelsY: 0,  
                        },
                    )
                }
                return
            }
    
            const reader = new FileReader();
            reader.onloadend = () => {
                const baseString = reader.result; 
                view.src = baseString;
                base64String = baseString
            };
            
            reader.readAsDataURL(file);
            imgchange = false
        } 
        else 
        {
            view.src = operativepath + "Add.png";
            imgchange = true
        }
    })
    text10.textContent = Language_Handler.LocalLanguage.setupimg
    sub10.window.appendChild(view)
    cont10.appendChild(text10)
    sub10.window.appendChild(cont10)
    const Done10 = new But(cont10,"medium",Language_Handler.LocalLanguage.continue)
    Done10.node.style.margin = "15px"
    /*sub5*/
    const cont5 = document.createElement("div")
    cont5.classList.add("content")
    const text15 = document.createElement("h2")
    text15.textContent = Language_Handler.LocalLanguage.modifycomp
    cont5.style.margin = "30px"
    cont5.appendChild(text15)
    const DoneFinal = new But(cont5,"medium",Language_Handler.LocalLanguage.continue)
    sub5.window.appendChild(cont5)
    DoneFinal.node.style.margin = "15px"
    Done.node.addEventListener("click",() => {
        if(box.value == "")
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub4,sub6)
        }
    })
    Done2.node.addEventListener("click",() => {
        if(box2.value == "" || box2.value <= 0)
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub6,sub11)
        }
    })
    Done11.node.addEventListener("click",() => {
        if(box11.value == "" || box11.value <= 0)
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub11,sub7)
        }
    })
    Done3.node.addEventListener("click",() => {
        if(box3.value == "" || box3.value <= 0)
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub7,sub8)
        }
    })
    Done8.node.addEventListener("click",() => {
        if(box8.value == "" || box88 == "" || box88.value == box8.value)
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub8,sub9)
        }
    })
    Done9.node.addEventListener("click",() => {
        if(box9.value == "" || box9.value <= 0)
        {
            const Wrong = new ErrorSplash()
        }
        else
        {
            WindowManager.ChangeWindow(sub9,sub10)
        }
    })
    Done10.node.addEventListener("click",() => {
        if(imgchange)
        {
            const imageUrl = operativepath + "User.jpg"
            fetch(imageUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = function() {
                        base64String = reader.result;
                    }
                    reader.readAsDataURL(blob);
                })
                .catch(error => {
                    console.error(error);
                })
        }
        WindowManager.ChangeWindow(sub10,sub5)
    })
    DoneFinal.node.addEventListener("click", async () => {
        const acc = new UserAccount(box.value,base64String,parseInt(box2.value),parseInt(box11.value),parseInt(box3.value),MorF.Selected()[0].textContent,box8.value,box88.value,box9.value,new Date().getFullYear())
        const h = UserAccount.Compare(Account.value,acc)
        await Account.Set(Key.value.Encrypt(h.toJSON(),true),true)
        Account.value = h
        where.NotShow()
    })
    where.Show()
}

const Import = async (where) => {
    const He = document.createElement("h2")
        He.textContent = Language_Handler.LocalLanguage.hereex
        const cen = document.createElement("div")
        cen.classList.add("center")
        cen.appendChild(He)
        const cen1 = document.createElement("div")
        cen1.classList.add("center")
        const yu = document.createElement("input")
        yu.classList.add("input-box")
        yu.style = "margin:25px;"
        cen1.appendChild(yu)
        cen.style = "margin:25px;"
        const cen2 = document.createElement("div")
        cen2.classList.add("center")
        const j = new But(cen2,"medium",Language_Handler.LocalLanguage.done)
        j.node.style = "margin:30px;"
        j.node.addEventListener("click",async ()=>{
            try
            {
                const JK = JSON.parse(yu.value)
                const Keys = JK.key
                const All = JK.all
                const Temp = new Cripto(Keys)
                Account.value = UserAccount.fromJSON(Temp.Decrypt(All,true))
                const u = Key.value.Encrypt(Account.value.toJSON(),true)
                await Account.Set(u,true)
                where.NotShow()
                window.location.reload()
            }
            catch(err)
            {
                console.log(err)
                if(PlatformReg == "Browser")
                {
                    alert(Language_Handler.LocalLanguage.some)
                }   
                else if(PlatformReg == "Android")
                {
                    window.plugins.toast.showWithOptions(
                        {
                            message: Language_Handler.LocalLanguage.some,
                            duration: "short",
                            position: "bottom",
                            addPixelsY: 0,  
                        },
                    )
                }
            }
        })
        j.node.style = "margin:30px;"
        where.window.appendChild(cen)
        where.window.appendChild(cen1)
        where.window.appendChild(cen2)
        where.Show()
}

const LoadLangs = async () => {
    const upwindowDiv = new UpWindow(document.body,13,true)
    for(let i of Language_Handler.LocalLanguage.Languages)
    {
        const centerLineDiv1 = document.createElement('div');
        centerLineDiv1.className = 'center-line';
        centerLineDiv1.style.margin = '25px';
        
        const label1 = document.createElement('label');
        label1.className = 'k';
        label1.textContent = i[0];
        centerLineDiv1.appendChild(label1);
        label1.addEventListener("click",async()=>{
            await Lang.Set(i[1])
            upwindowDiv.NotShow()
            if(PlatformReg == "Browser")
            {
                alert(Language_Handler.LocalLanguage.reload)
            }   
            else if(PlatformReg == "Android")
            {
                window.plugins.toast.showWithOptions(
                    {
                        message: Language_Handler.LocalLanguage.reload,
                        duration: "short",
                        position: "bottom",
                        addPixelsY: 0,  
                    },
                )
            }
        })
        upwindowDiv.window.appendChild(centerLineDiv1);
    }
    upwindowDiv.Show()
}

const Cancel = () => {
    Account.value.TalkHistrory = []
    Account.value.HealthTracker.data = []
    Account.value.HealthTracker.temp = [0,0,0,Account.value.currentDate,0]
    Account.value.SleepTracker.rec = []
    Account.value.MoodTracker.rec = []
}

const Erase = async () => {
    await Memory.RemoveAll()
    window.location.reload(true);
}

/*Chiusura App*/
window.addEventListener("beforeunload",async () => {
    await MusicIndex.Set(indexmusica)
    Account.value.SleepTracker.SetLast()
    await Account.Set(Key.value.Encrypt(Account.value.toJSON(),true),true)
})