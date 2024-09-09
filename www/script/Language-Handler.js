const welcomepath = "./img/SplashScreen/Welcome/"
const splashpath = "./img/SplashScreen/"
const splashopeningpath = "./img/SplashScreen/Opening/"
const operativepath = "./img/Operative/"
const scriptpath = "./script/"
const moodpath = operativepath + "Mood/"
const Language = {
    "en" : {
        "format": "Display format not supported",
        "CurrentLanguage" : "English",
        "Languages":[
            ["Italian","it"],
            ["English","en"]
        ],
        "checkin":"Come here and record your daily data",
        "phrases" : [
            "Good morning, how are you feeling today?",
            "How was your wake-up this morning?",
            "Do you feel more energetic or a bit tired today?",
            "Have you thought about your goals for today?",
            "How are you dealing with your current challenges?",
            "How do you feel about the progress you've made so far?",
            "How was your day yesterday?",
            "Have you taken some time for yourself today?",
            "Have you found moments of tranquility today?",
            "Have you thought about any new goals you would like to achieve?",
            "How are you managing stress lately?",
            "Have you reflected on what makes you happy?",
            "Do you feel motivated to do something new today?",
            "Did you sleep well? Getting an average of <custom> of sleep is great for your well-being.",
            "Have you had moments of gratitude today?",
            "Have you done something to take care of yourself today?",
            "How do you feel about your relationships with others?",
            "Have you done something positive for your mental well-being today?",
            "Is there something you would like to improve today?",
            "Have you taken time to relax today?",
            "How do you feel about your daily routine?",
            "Have you found a moment to smile today?",
            "Did you feel heard when you talked to someone today?",
            "What has made you feel happy recently?",
            "Have you had time to take a break today?",
            "How are you managing your work-life balance?",
            "Is there something that is particularly concerning you today?",
            "Have you done something today that has given you satisfaction?",
            "Do you feel at peace right now?",
            "Have you thought about what inspires you most in life?",
            "Have you noticed something beautiful around you today?",
            "How did you feel when you woke up this morning?",
            "Have you had a chance to express your creativity today?",
            "Have you done something that brings you closer to your long-term goals?",
            "Is there something you are particularly grateful for today?",
            "Have you found time to go for a walk or be outdoors today?",
            "Have you met someone who has inspired you recently?",
            "How are you managing your emotions lately?",
            "Is there something you would like to change about your day today?",
            "Have you had the chance to learn something new today?",
            "Have you felt supported by the people around you today?",
            "Have you had time to reflect on yourself today?",
            "Have you done something fun today?",
            "How do you feel about your physical health lately?",
            "Have you found a moment to relax and breathe deeply today?",
            "Have you felt productive today?",
            "Is there something that is making you feel anxious today?",
            "Have you done something that made you proud of yourself today?",
            "How do you feel about your emotional balance?",
            "Have you had a chance to connect with someone you care about today?",
            "Is there something that has pleasantly surprised you today?",
            "Have you had a moment of silence for yourself today?",
            "How do you feel about how you manage your responsibilities?",
            "Have you found a moment to cultivate a hobby today?",
            "Have you felt in tune with yourself today?"
        ],        
        "Hello" : "Greetings, I'm Faith the Budgie and I'm your personal mental health helper. What can I do for you today?",
        "reload" : "Reopen to apply",
        "notsupport":"Not supported on this platform",
        "error" : "Sorry but right now I cannot reply, try again later",
        "addsteps":"Add steps to the daily counter",
        "adddata":"Add data",
        "start" : "Start",
        "inhale" : "Inhale",
        "lang" : "Language",
        "reminder":"Reminders",
        "hold" : "Hold",
        "exhale" : "Exhale",
        "slow" : "Slow",
        "medium" : "Medium",
        "fast" : "Fast",
        "nointernet": "No internet connection",
        "continue" : "Continue",
        "back" : "Back",
        "newdi": "New Page",
        "welcome0" : "Welcome to Faith's Land",
        "subwelcome0" : "Here you'll find a safe place where you'll relax and track your health",
        "welcome1" : "A Land of Opportunies",
        "subwelcome1" : "Breathing exercises, Meditation, Sleep tracking, Mood monitoring are just some of the features available",
        "welcome2" : "Talk to Faith",
        "subwelcome2" : "If you need any help or an advice, just send a message, it is there for you",
        "talktonow" : "If you need any help or an advice, send a message now, it is ready",
        "setupname" : "Tell me your name",
        "setupweight" : "And now your weight (in Kg)",
        "setupsleep" : "Now tell me your sleep routine (24H format)",
        "setupsleep1" : "Start Sleep",
        "setupsleep2" : "End Sleep",
        "setupage" : "Now your age",
        "setupheight" : "Now your height (in Cm)",
        "setupsteps" : "And finally your daily steps goal",
        "setupcomp" : "Setup completed",
        "setupimg" : "Now choose a profile pic",
        "dashboard" : "Dashboard",
        "diary" : "Personal Diary",
        "talk" : "Chat",
        "inte0": "The intensity is above the average by ",
        "inte1": "The intensity is below the average by ",
        "inte2": "The intensity is slightly above the average.",
        "inte3": "The intensity is slightly below the average.",
        "inte4": "The intensity is average.",
        "placeresp": "Write down something...",
        "sleepmessage0": "A common routine, perhaps you slept a bit too much, but that's okay.",
        "sleepmessage1": "A good routine, and you met your target. Well done!",
        "sleepmessage2": "A normal time, but maybe you should try to sleep a bit more if you can.",
        "sleepmessage3": "Maybe you went to bed a little too late, and you also slept a bit too much.",
        "sleepmessage4": "You went to bed a bit too late, but you still met your target.",
        "sleepmessage5": "You went to bed too late, and you should try to sleep a bit more.",
        "sleepmessage6": "Great timing, though you might have slept a little too much.",
        "sleepmessage7": "Nothing to criticize, you also met your target.",
        "sleepmessage8": "A very recommended time, though you should try to sleep a bit more.",
        "sleepmessage9": "A rather unusual time, as long as it works for you, but be sure to get enough sleep.",
        "breathingex": "Breathing Exercise",
        "meditation": "Meditation",
        "cong" : "and",
        "end" : "End",
        "date" : "Date",
        "title": "Title",
        "copy":"Copy",
        "hereim":"Export to another device",
        "nothingtoshow": "Nothing to see here for now",
        "privacy" : "Privacy Policy",
        "terms": "Terms and Conditions",
        "modify":"Modify",
        "export":"Export",
        "import":"Import",
        "modifycomp" : "Modify completed",
        "besttime" : "Best Time: ",
        "paste":"Paste",
        "hereex":"Import on this device",
        "some" : "Some problems occurred",
        "calo":"Calories",
        "steps":"Steps",
        "distance":"Distance",
        "done" : "Done",
        "addsleep":"Record last night's sleep cycle",
        "addmood" : "Record how you're feeling today",
        "canceldata" : "Erase data",
        "erase" : "Delete",
        "intensi" : "How much intense is it? (From 1 to 10)",
        "intensity": "Intensity",
        "mood": "Mood",
        "happy": "Happy",
        "content": "Content",
        "in love": "In love",
        "confident": "Confident",
        "neutral": "Neutral",
        "sad": "Sad",
        "sick": "Sick",
        "dizzy": "Dizzy",
        "anxious": "Anxious",
        "scared": "Scared",
        "angry": "Angry",
        "sleepy": "Sleepy",
        "newchat":"New Chat",
    },
    "it" : {
        "Edges" : {
            latMin : 36.0,
            latMax : 47.0,
            lngMin : 6.0,
            lngMax : 19.0
        },
        "Languages":[
            ["Italiano","it"],
            ["Inglese","en"]
        ],
        "checkin":"Vieni e registra i tui dati giornalieri",
        "newchat":"Nuova Chat",
        "phrases" : [
            "Buongiorno, come ti senti oggi?",
            "Come è stato il tuo risveglio stamattina?",
            "Oggi ti senti più energico o un po' stanco?",
            "Hai pensato ai tuoi obiettivi per oggi?",
            "Come stai affrontando le tue sfide attuali?",
            "Come ti senti riguardo ai progressi che hai fatto finora?",
            "Come è stata la tua giornata ieri?",
            "Hai dedicato del tempo a te stesso oggi?",
            "Hai trovato momenti di tranquillità oggi?",
            "Hai pensato a qualche nuovo obiettivo che vorresti raggiungere?",
            "Come stai gestendo lo stress ultimamente?",
            "Hai riflettuto su cosa ti rende felice?",
            "Ti senti motivato a fare qualcosa di nuovo oggi?",
            "Sei riuscito a dormire bene? Hai dormito una media di circa <custom>, il che è ottimo per il tuo benessere.",
            "Hai avuto momenti di gratitudine oggi?",
            "Hai fatto qualcosa per prenderti cura di te stesso oggi?",
            "Come ti senti riguardo alle tue relazioni con gli altri?",
            "Hai fatto qualcosa di positivo per il tuo benessere mentale oggi?",
            "C'è qualcosa che vorresti migliorare oggi?",
            "Hai preso del tempo per rilassarti oggi?",
            "Come ti senti riguardo alla tua routine quotidiana?",
            "Hai trovato un momento per sorridere oggi?",
            "Ti sei sentito ascoltato quando hai parlato con qualcuno oggi?",
            "Cosa ti ha fatto sentire felice recentemente?",
            "Hai avuto tempo per fare una pausa oggi?",
            "Come stai gestendo il tuo equilibrio tra lavoro e vita personale?",
            "C'è qualcosa che ti preoccupa in particolare oggi?",
            "Hai fatto qualcosa oggi che ti ha dato soddisfazione?",
            "Ti senti in pace in questo momento?",
            "Hai pensato a cosa ti ispira di più nella vita?",
            "Hai notato qualcosa di bello attorno a te oggi?",
            "Come ti sei sentito quando ti sei svegliato stamattina?",
            "Hai avuto modo di esprimere la tua creatività oggi?",
            "Hai fatto qualcosa che ti avvicina ai tuoi obiettivi a lungo termine?",
            "C'è qualcosa di cui sei particolarmente grato oggi?",
            "Hai trovato il tempo per fare una passeggiata o stare all'aria aperta oggi?",
            "Hai incontrato qualcuno che ti ha ispirato recentemente?",
            "Come stai gestendo le tue emozioni ultimamente?",
            "C'è qualcosa che vorresti cambiare nella tua giornata di oggi?",
            "Hai avuto modo di imparare qualcosa di nuovo oggi?",
            "Ti sei sentito supportato dalle persone attorno a te oggi?",
            "Hai avuto tempo per riflettere su te stesso oggi?",
            "Hai fatto qualcosa di divertente oggi?",
            "Come ti senti riguardo alla tua salute fisica ultimamente?",
            "Hai trovato un momento per rilassarti e respirare profondamente oggi?",
            "Ti sei sentito produttivo oggi?",
            "C'è qualcosa che ti fa sentire ansioso oggi?",
            "Hai fatto qualcosa che ti ha reso orgoglioso di te stesso oggi?",
            "Come ti senti riguardo al tuo equilibrio emotivo?",
            "Hai avuto modo di connetterti con qualcuno che ti sta a cuore oggi?",
            "C'è qualcosa che ti ha sorpreso piacevolmente oggi?",
            "Hai avuto un momento di silenzio per te stesso oggi?",
            "Come ti senti riguardo al modo in cui gestisci le tue responsabilità?",
            "Hai trovato un momento per coltivare un hobby oggi?",
            "Ti sei sentito in sintonia con te stesso oggi?"
        ],
        "import" : "Importa",
        "calo":"Calorie",
        "steps":"Passi",
        "done":"Fatto",
        "distance":"Distanza",
        "adddata":"Aggiungi dei dati",
        "notsupport":"Non supportato su questa piattaforma",
        "format": "Formato display non supportato",
        "CurrentLanguage" : "Italiano",
        "reload" : "Riapri per apportare le modifiche",
        "start" : "Inizio",
        "some" : "Si sono verificati alcuni problemi",
        "lang" : "Lingua",
        "inte0":"L'intensità è superiore alla media di ",
        "inte1":"L'intensità è inferiore alla media di ",
        "inte2":"L'intensità è leggermente superiore alla media.",
        "inte3":"L'intensità è leggermente inferiore alla media.",
        "inte4":"L'intensità è nella media.",
        "addsteps":"Aggiungi passi al contatore gionarliero",
        "addsleep":"Registra l'intervallo di sonno di questa notte",
        "Hello": "Saluti, sono Faith the Budgie e sono il tuo assistente personale per la salute mentale. Cosa posso fare per te oggi?",
        "reminder":"Promemoria",
        "error":"Scusa ma ora non posso rispondere, prova piu tardi",
        "privacy" : "Privacy Policy",
        "terms": "Termini e Condizioni",
        "inhale" : "Respira",
        "hold" : "Tieni",
        "exhale" : "Esprira",
        "cong" : "e",
        "end" : "Fine",
        "hereim":"Esporta su un altro dispositivo",
        "newdi" : "Nuova Pagina",
        "paste":"Incolla",
        "hereex":"Imposta su questo dispositivo",
        "slow" : "Lento",
        "nointernet": "Nessuna connessione a internet",
        "medium" : "Medio",
        "fast" : "Rapido",
        "continue" : "Continua",
        "copy":"Copia",
        "back" : "Indietro",
        "dashboard" : "Dashboard",
        "diary" : "Diario Personale",
        "talk" : "Chat",
        "placeresp": "Scrivi qualcosa...",
        "canceldata" : "Cancella dati",
        "erase" : "Elimina",
        "talktonow" : "Se hai bisogno di un consiglio, mandagli un messsaggio ora, è pronto",
        "welcome0" : "Benvenuto in Faith's Land",
        "subwelcome0" : "Qui troverai un posto sicuro dove poterti rilassare e tenere traccia della tua salute",
        "welcome1" : "Una Land di opprtunità",
        "subwelcome1" : "Esercizi di respirazione, Meditazione, Monitoraggio del sonno, Monitoraggio dell'umore sono solo alcune delle funzioni disponibili",
        "welcome2" : "Parla con Faith",
        "subwelcome2" : "Se hai bisogno di un consiglio, mandagli semplicemente un messsaggio, è li per te",
        "setupname" : "Dimmi il tuo nome",
        "setupweight" : "E ora il tuo peso (in Kg)",
        "setupage" : "Ora la tua età",
        "setupheight" : "Ora la tua altezza (in Cm)",
        "setupsleep" : "Ora dimmi la tua routine del sonno (Formato H24)",
        "setupsleep1" : "Inizio sonno",
        "setupsleep2" : "Fine sonno",
        "date" : "Data",
        "title": "Titolo",
        "setupsteps" : "Infine quale è il tuo obbiettivo di passi giornaliero",
        "setupimg" : "Ora scegli un immagine profilo",
        "setupcomp" : "Setup completato",
        "sleepmessage0": "Una routine diffusa, forse hai anche dormito un po' troppo, ma va bene così.",
        "sleepmessage1": "Una buona routine, e hai rispettato il tuo target. Complimenti.",
        "sleepmessage2": "Un orario normale, ma magari dovresti dormire un po' di più, se puoi.",
        "sleepmessage3": "Forse sei andato un po' troppo tardi, e hai anche dormito un po' troppo.",
        "sleepmessage4": "Sei andato a letto un po' troppo tardi, ma hai comunque rispettato il tuo target.",
        "sleepmessage5": "Sei andato a letto troppo tardi, e dovresti dormire anche un po' di più.",
        "sleepmessage6": "Ottimo orario, anche se hai dormito un po' troppo.",
        "sleepmessage7": "Nulla da dire, hai anche rispettato il tuo target.",
        "sleepmessage8": "Orario molto consigliato, anche se dovresti dormire un po' di più.",
        "sleepmessage9": "Orario alquanto insolito, l'importante è che ti trovi bene, ma fai attenzione comunque a dormire a sufficienza.",
        "breathingex": "Esercizi di respirazione",
        "meditation": "Meditazione",
        "nothingtoshow": "Nulla da vedere qua per ora",
        "modify":"Modifica",
        "export":"Esporta",
        "modifycomp" : "Modifica completata",
        "besttime" : "Tempo migliore: ",
        "addmood" : "Registra come ti senti oggi",
        "intensi" : "Qunato è intenso? (Da 1 a 10)",
        "intensity": "Intensità",
        "mood": "Umore",
        "happy": "Felice",
        "content": "Contento",
        "in love": "Innamorato",
        "confident": "Sicuro",
        "neutral": "Neutro",
        "sad": "Triste",
        "sick": "Malato",
        "dizzy": "Stordito",
        "anxious": "Ansioso",
        "scared": "Spaventato",
        "angry": "Arrabbiato",
        "sleepy": "Assonnato",
}
}
const Permesso = new Memory("GeoPermission")
const ALPHA = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
const ALPHANUM = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890@.;!£$%&/()=^|*°-_,[]{}?+#"
let Determinate
if(PlatformReg == "Android")
{
    Determinate = async () => 
    {
        if (!await Lang.Get()) 
        {
            try 
            {
                const resolve = async (position) =>
                {
                    try
                    {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
            
                        if(!await Key.Get())
                        {
                            Memory.RemoveAll()
                        }
                        if (lat >= Language.it.Edges.latMin && lat <= Language.it.Edges.latMax &&
                            lng >= Language.it.Edges.lngMin && lng <= Language.it.Edges.lngMax) 
                        {
                            Lang.Set("it");
                        } 
                        else 
                        {
                            Lang.Set("en");
                        }
                        document.documentElement.lang = Lang.value
                        Language_Handler = new LanguageHandler(Lang.value);
                    }
                    catch
                    {
                        if(!await Key.Get())
                        {
                            Memory.RemoveAll()
                        }
                        Lang.Set("en");
                        document.documentElement.lang = Lang.value
                        Language_Handler = new LanguageHandler(Lang.value);
                    }
                }
                const reject = async () =>
                {
                    if(!await Key.Get())
                    {
                        Memory.RemoveAll()
                    }
                    Lang.Set("en");
                    document.documentElement.lang = Lang.value
                    Language_Handler = new LanguageHandler(Lang.value);
                }
                const evaluate = async (status) => {
                    console.log(status)
                    switch(status)
                    {
                    case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                            cordova.plugins.diagnostic.requestLocationAuthorization(evaluate, reject)
                            break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED:
                        if(!await Permesso.Get())
                        {
                                await Permesso.Set(true)
                                cordova.plugins.diagnostic.requestLocationAuthorization(evaluate, reject)
                        }
                        else
                        {
                            reject()
                        }
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                            if(!await Permesso.Get())
                            {
                                await Permesso.Set(true)
                                cordova.plugins.diagnostic.requestLocationAuthorization(evaluate,reject)
                            }
                            else
                            {
                                reject()
                            }
                            break;
                    case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                            navigator.geolocation.getCurrentPosition(resolve, reject)
                            break;   
                            
                    default :
                        navigator.geolocation.getCurrentPosition(resolve, reject)
                        break;
                    }
                }
                
                cordova.plugins.diagnostic.getLocationAuthorizationStatus(evaluate, reject);
            } 
            catch 
            {
                if(!await Key.Get())
                {
                    Memory.RemoveAll()
                }
                Lang.Set("en");
                document.documentElement.lang = Lang.value
                Language_Handler = new LanguageHandler(Lang.value);
            }
        } 
        else 
        {
            if(!await Key.Get())
            {
                Memory.RemoveAll()
            }
            await Lang.Get()
            document.documentElement.lang = Lang.value
            Language_Handler = new LanguageHandler(Lang.value);
        }
    }
}
else
{
    Determinate = async () => 
    {
        if (!await Lang.Get()) 
        {
            try 
            {
                const resolve = async (position) =>
                {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
        
                    if(!await Key.Get())
                    {
                        Memory.RemoveAll()
                    }
                    if (lat >= Language.it.Edges.latMin && lat <= Language.it.Edges.latMax &&
                        lng >= Language.it.Edges.lngMin && lng <= Language.it.Edges.lngMax) 
                    {
                        Lang.Set("it");
                    } 
                    else 
                    {
                        Lang.Set("en");
                    }
                    document.documentElement.lang = Lang.value
                    Language_Handler = new LanguageHandler(Lang.value);
                }
                const reject = async () =>
                {
                    if(!await Key.Get())
                    {
                        Memory.RemoveAll()
                    }
                    Lang.Set("en");
                    document.documentElement.lang = Lang.value
                    Language_Handler = new LanguageHandler(Lang.value);
                }
                navigator.geolocation.getCurrentPosition(resolve, reject)
            } catch (error) 
            {
                if(!await Key.Get())
                {
                    Memory.RemoveAll()
                }
                Lang.Set("en");
                document.documentElement.lang = Lang.value
                Language_Handler = new LanguageHandler(Lang.value);
            }
        } 
        else 
        {
            if(!await Key.Get())
            {
                Memory.RemoveAll()
            }
            await Lang.Get()
            document.documentElement.lang = Lang.value
            Language_Handler = new LanguageHandler(Lang.value);
        }
    }
}

class LanguageHandler
{
    constructor(lang)
    {
        this.languagecode = lang
        this.ALPHA = ALPHA
        this.ALPHANUM = ALPHANUM
        this.ChangeLanguage(lang)
    }

    ChangeLanguage(languagecode)
    {
        this.languagecode = languagecode
        this.LocalLanguage = Language[this.languagecode]
        this.CurrentLanguage = this.LocalLanguage.CurrentLanguage
    }

    GenString(num)
    {
        let str = ""
        for(let i = 0; i < num; i++)
        {
            let ran = this.ALPHA[Math.round(Math.random() * this.ALPHA.length)]
            str += ran
        }
        return str
    }
    GenSecretKey()
    {
        let str = ""
        let J = this.ALPHANUM.split("")
        for(let i = 0; i < J.length; i)
        {
            let enhancedIndex = Math.round(Math.random() * J.length);
            let ran = J[enhancedIndex];
            if(ran == undefined)
            {

            }
            else
                str += ran
            J.splice(enhancedIndex,1)
        }
        return str
    }
}
/*Default*/
let Language_Handler = 0;