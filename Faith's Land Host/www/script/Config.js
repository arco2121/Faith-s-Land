/*Configuration*/
let Ready = false
const Splash = new WindowManager("splash",true,null,false,false)
let Screens
const Lang = new Memory("Language")
const Key = new Memory("Key")

document.addEventListener("deviceready", () => {
    Ready = true
    setTimeout(()=>{
        navigator.splashscreen.hide()
        setTimeout(async ()=>{
            Screens = new SplashScreen(Splash.window)
            await Determinate()
        },200)
    },200)
}, false);
setInterval(()=>{
    if(PlatformReg == "Android" && Ready)
    {
        const root = document.documentElement
        StatusBar.backgroundColorByHexString(getComputedStyle(root).getPropertyValue("--back"))
        StatusBar.styleDefault();
        NavigationBar.backgroundColorByHexString(getComputedStyle(root).getPropertyValue("--back"),true)
    }
},0)