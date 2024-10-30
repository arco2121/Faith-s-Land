const Moods = {
    0 : {
        mood : "happy",
        img : moodpath + "happy.png",
        color : "#FFF78A",
        n : 0
    },
    1 : {
        mood : "content",
        img : moodpath + "content.png",
        color : "#FFD989",
        n : 1
    },
    2 : {
        mood : "in love",
        img : moodpath + "inlove.png",
        color : "#FF89D7",
        n : 2
    },
    3 : {
        mood : "confident",
        img : moodpath + "confident.png",
        color : "#89FFF9",
        n : 3
    },
    4 : {
        mood : "neutral",
        img : moodpath + "neutral.png",
        color : "#C9C5C0",
        n : 4
    },
    5 : {
        mood : "sad",
        img : moodpath + "sad.png",
        color : "#8A89FF",
        n : 5
    },
    6 : {
        mood : "sick",
        img : moodpath + "sick.png",
        color : "#92FF89",
        n : 6
    },
    7 : {
        mood : "dizzy",
        img : moodpath + "dizzy.png",
        color : "#CECEA2",
        n : 7
    },
    8 : {
        mood : "anxious",
        img : moodpath + "anxious.png",
        color : "#A48DC1",
        n : 8
    },
    9 : {
        mood : "scared",
        img : moodpath + "scared.png",
        color : "#3F1A66",
        n : 9
    },
    10 : {
        mood : "angry",
        img : moodpath + "angry.png",
        color : "#FF7568",
        n :10
    },
    11 : {
        mood : "sleepy",
        img : moodpath + "sleepy.png",
        color : "#674D39",
        n : 11
    },
}

class UserAccount
{
    constructor(name,img64,age,height,weight,sex,sleepstart,sleepend,steps,year)
    {
        this.name = name
        this.img = img64
        this.age = age
        this.height = height
        this.weight = weight
        this.sex = sex
        this.Year = year != null ? year : new Date().getFullYear()
        this.Check = setInterval(()=>{
            if(this.Year != new Date().getFullYear())
            {
                this.age++
                this.Year = new Date().getFullYear()
            }
        },0)
        this.secretkey = Language_Handler.GenSecretKey()
        this.Criptografy = new Cripto(this.secretkey)
        this.SleepTracker = new SleepTracker(SleepUnit.CreateUnit(sleepstart,sleepend))
        this.Diary = new DiaryHandler()
        this.HealthTracker = new HealthTracker(steps,{
            age:this.age,
            height:this.height,
            weight:this.weight,
            sex:this.sex,
        })
        this.MoodTracker = new MoodTracker()
        this.meditationTime = 0
        this.TalkHistrory = []
    }
    toJSON() 
    {
        return {
            name: this.name,
            img: this.img,
            age: this.age,
            height: this.height,
            weight: this.weight,
            sex: this.sex,
            secretkey: this.secretkey,
            Criptografy: this.Criptografy.toJSON(),
            SleepTracker: this.SleepTracker.toJSON(),
            Diary: this.Diary.toJSON(),
            TalkHistrory : this.TalkHistrory,
            HealthTracker : this.HealthTracker.toJSON(),
            meditationTime: this.meditationTime,
            MoodTracker: this.MoodTracker.toJSON(),
            Year : this.Year
        };
    }
    static fromJSON(data) 
    {
        const account = new UserAccount(data.name,data.img ,data.age, data.height,data.weight, data.sex, '', '',data.Year);
        account.secretkey = data.secretkey;
        account.Criptografy = Cripto.fromJSON(data.Criptografy);
        account.SleepTracker = SleepTracker.fromJSON(data.SleepTracker);
        account.Diary = DiaryHandler.fromJSON(data.Diary)
        account.HealthTracker = HealthTracker.fromJSON(data.HealthTracker)
        account.meditationTime = data.meditationTime
        account.MoodTracker = MoodTracker.fromJSON(data.MoodTracker)
        let r = []
        for(let i = 0; i<data.TalkHistrory.length;i++)
        {
            r.push(Chat.fromJSON(data.TalkHistrory[i]))
        }
        account.TalkHistrory = r
        return account;
    }
    static Compare(oldInstance, newInstance) 
    {
        let updated = false;

        if (oldInstance.name !== newInstance.name) {
            oldInstance.name = newInstance.name;
            updated = true;
        }
        if (oldInstance.img !== newInstance.img) {
            oldInstance.img = newInstance.img;
            updated = true;
        }
        if (oldInstance.age !== newInstance.age) {
            oldInstance.age = newInstance.age;
            updated = true;
        }
        if (oldInstance.height !== newInstance.height) {
            oldInstance.height = newInstance.height;
            updated = true;
        }
        if (oldInstance.weight !== newInstance.weight) {
            oldInstance.weight = newInstance.weight;
            updated = true;
        }
        if (oldInstance.sex !== newInstance.sex) {
            oldInstance.sex = newInstance.sex;
            updated = true;
        }

        if (JSON.stringify(oldInstance.Criptografy) !== JSON.stringify(newInstance.Criptografy)) {
            oldInstance.secretkey = newInstance.secretkey
            oldInstance.Criptografy = new Cripto(oldInstance.secretkey);
            updated = true;
        }
        if (JSON.stringify(oldInstance.SleepTracker) !== JSON.stringify(newInstance.SleepTracker)) {
            oldInstance.SleepTracker.ChangeTarget(newInstance.SleepTracker.Target);
            updated = true;
        }

        if(updated)
        {
            return oldInstance
        }
        else
        {
            return newInstance
        }
    }
}
class Cripto
{
    constructor(key) 
    {
        this.key = key;
        this.alphabet = ALPHANUM
        this.mapping = this.createMapping();
    }
    createMapping() 
    {
        let map = {};
        for (let i = 0; i < this.alphabet.length; i++) {
            map[this.alphabet[i]] = this.key[i];
        }
        return map;
    }
    Encrypt(plainText,JSONA) 
    {
        if(JSONA)
        {
            plainText = JSON.stringify(plainText)
        }
        let cipherText = '';
        for (let i = 0; i < plainText.length; i++) {
            let char = plainText[i];
            cipherText += this.mapping[char] || char;
        }
        return cipherText;
    }
    Decrypt(cipherText,JSONA) 
    {
        let reverseMapping = {};
        for (let char in this.mapping) {
            reverseMapping[this.mapping[char]] = char;
        }

        let plainText = '';
        for (let i = 0; i < cipherText.length; i++) {
            let char = cipherText[i];
            plainText += reverseMapping[char] || char; 
        }
        if(JSONA)
        {
            plainText = JSON.parse(plainText)
        }
        return plainText;
    }
    toJSON() 
    {
        return {
            key: this.key,
        };
    }
    static fromJSON(data) 
    {
        return new Cripto(data.key);
    }
}
class SleepUnit
{
    constructor(start,end,dur,time)
    {
        this.start = start
        this.end = end
        this.dur = dur
        this.time = time
    }
    FormatDur()
    {
        const seconds = Math.floor((this.dur / 1000) % 60);
        const minutes = Math.floor((this.dur / (1000 * 60)) % 60);
        const hours = Math.floor((this.dur / (1000 * 60 * 60)) % 24);
        
        return [hours,minutes,seconds]
    }
    FormatStartEnd()
    {
        const hours = String(this.start.getHours()).padStart(2, '0');
        const minutes = String(this.start.getMinutes()).padStart(2, '0');
        const time = `${hours}:${minutes}`;
        const hours2 = String(this.end.getHours()).padStart(2, '0');
        const minutes2 = String(this.end.getMinutes()).padStart(2, '0');
        const time2 = `${hours2}:${minutes2}`
        return [time,time2]
    }
    static FormatDurGeneral(dur)
    {
        const seconds = Math.floor((dur / 1000) % 60);
        const minutes = Math.floor((dur / (1000 * 60)) % 60);
        const hours = Math.floor((dur / (1000 * 60 * 60)) % 24);
        
        return [hours,minutes,seconds]
    }
    static CreateUnit(start,end)
    {        
        const st = new Date()
        const en = new Date()
        st.setHours(start.split(":")[0],start.split(":")[1])
        en.setHours(end.split(":")[0],end.split(":")[1])
        const day = Date.now()
        return new SleepUnit(st,en,en-st,day)
    }
    toJSON() 
    {
        return {
            start: this.start.toISOString(),
            end: this.end.toISOString(),
            dur: this.dur,
            time: this.time,
        };
    }
    static fromJSON(data) 
    {
        return new SleepUnit(new Date(data.start), new Date(data.end), data.dur, data.time);
    }
}
class SleepTracker
{
    constructor(Target)
    {
        this.rec = []
        this.med = SleepUnit.FormatDurGeneral(0)
        this.Target = Target
        this.last
        this.first
    }
    toJSON() 
    {
        return {
            rec: this.rec.map(([unit, message]) => [unit.toJSON(), message]),
            med: this.med,
            Target: this.Target,
            last: this.last,
            first: this.first,
        };
    }
    static fromJSON(data) 
    {
        const tracker = new SleepTracker(SleepUnit.fromJSON(data.Target));
        tracker.rec = data.rec.map(([unit, message]) => [SleepUnit.fromJSON(unit), message]);
        tracker.med = data.med;
        tracker.last = data.last ? new Date(data.last) : null;
        tracker.first = data.first ? new Date(data.first) : null;
        return tracker;
    }
    ChangeTarget(unit)
    {
        this.Target = unit
        this.UploadMessages()
    }
    UploadMessages()
    {
        for(let i = 0; i<this.rec.length; i++)
        {
            if(this.rec[i] != undefined)
            {
                const ki = this.CompareToMessage(this.rec[i][0])
                this.rec[i][1] = ki
            }
        }
    }
    Add(start,end,day)
    {
        let dele = true
        for(let i = 0; i<this.rec.length; i++)
        {
            if(this.rec[i][0].time == day)
            {
                const st = new Date()
                const en = new Date()
                st.setHours(start.split(":")[0],start.split(":")[1])
                en.setHours(end.split(":")[0],end.split(":")[1])
                const final = new SleepUnit(st,en,(en-st) < 0 ? 1440000 + (en-st) : en-st ,day)
                const message = this.CompareToMessage(final)
                this.rec[i] = [final,message]
                this.rec.sort((a, b) => b[0].time.localeCompare(a[0].time))
                this.Med()
                dele = false
                return
            }
        }
        if(dele)
        {
            const st = new Date()
            const en = new Date()
            st.setHours(start.split(":")[0],start.split(":")[1])
            en.setHours(end.split(":")[0],end.split(":")[1])
            const final = new SleepUnit(st,en,(en-st) < 0 ? 1440000 + (en-st) : en-st ,day)
            const message = this.CompareToMessage(final)
            this.rec.push([final,message])
            this.rec.sort((a, b) => b[0].time.localeCompare(a[0].time))
            this.Med()
            return
        }
    }
    Delete(unit)
    {
        for(let i = 0; i<this.rec.length; i++)
        {
            if(this.rec[i][0] == unit)
            {
                this.rec[i]
                this.rec.splice(i,1)
                this.rec.sort((a, b) => b[0].time.localeCompare(a[0].time))
                this.Med()
            }
        }
    }
    Med()
    {
        let m = 0
        for(let i = 0; i<this.rec.length; i++)
        {
            m += this.rec[i][0].dur
        }
        m = m / this.rec.length
        this.med = SleepUnit.FormatDurGeneral(m)
    }
    SetNow()
    {
        this.first = new Date()
    }
    SetLast()
    {
        this.last = new Date()
    }
    SleepCycleRecord()
    {
        if(this.first == undefined || this.last == undefined)
        {
            return ['00:00','08:00']
        }
        else
        {
            const hours = String(this.last.getHours()).padStart(2, '0');
            const minutes = String(this.last.getMinutes()).padStart(2, '0');
            const time = `${hours}:${minutes}`;
            const hours2 = String(this.first.getHours()).padStart(2, '0');
            const minutes2 = String(this.first.getMinutes()).padStart(2, '0');
            const time2 = `${hours2}:${minutes2}`
            return [time,time2]
        }
    }
    CompareToMessage(date)
    {
        const diffdur = date.dur - this.Target.dur
        let mes = ""
        if(date.start.getHours() <= 24 && date.start.getHours() >= 22 || date.start.getHours() == 0)
        {
            if(diffdur > 15000)
            {
                mes = Language_Handler.LocalLanguage.sleepmessage0
            }
            else if(-10000 <= diffdur <= 15000)
            {
                mes = Language_Handler.LocalLanguage.sleepmessage1
            }
            else
            {
                mes = Language_Handler.LocalLanguage.sleepmessage2
            }
        }
        else if(date.start.getHours() <= 3 && date.start.getHours() >= 1)
        {
            if(diffdur > 15000)
            {
                mes = Language_Handler.LocalLanguage.sleepmessage3
            }
            else if(-10000 <= diffdur <= 15000)
            {
                mes = Language_Handler.LocalLanguage.sleepmessage4
            }
            else
            {
                mes = Language_Handler.LocalLanguage.sleepmessage5
            }
        }
        else if(date.start.getHours() < 22 && date.start.getHours() >= 18)
        {
            if(diffdur > 15000)
            {
                mes = Language_Handler.LocalLanguage.sleepmessage6
            }
            else if(-10000 <= diffdur <= 15000)
            {
                mes = Language_Handler.LocalLanguage.sleepmessage7
            }
            else
            {
                mes = Language_Handler.LocalLanguage.sleepmessage8
            }
        }
        else
        {
            mes = Language_Handler.LocalLanguage.sleepmessage9
        }

        return mes
    }  
    LoadData(where)
    {
        if(this.rec.length <= 0)
        {
            const hj = new UpWindow(where,7,true)
            const H = document.createElement("h2")
            H.textContent = Language_Handler.LocalLanguage.nothingtoshow
            H.style = "margin:60px;"
            hj.window.appendChild(H)
            hj.Show()
        }
        else
        {
            let ind = 0
            this.UploadMessages()
            const upwindow = new UpWindow(where,7,true);
            const centerLine = document.createElement('div');
            centerLine.className = 'center-line';
            centerLine.style.margin = '25px';
            const imgIndietro = document.createElement('img');
            imgIndietro.src = operativepath + 'indietro.png';
            imgIndietro.className = 'playicons';
            centerLine.appendChild(imgIndietro);
            const inputBox = document.createElement('input');
            inputBox.type = 'date';
            inputBox.className = 'input-box';
            inputBox.disabled = true;
            inputBox.value = this.rec[ind][0].time
            centerLine.appendChild(inputBox);
            inputBox.disabled = true
            const imgAvanti = document.createElement('img');
            imgAvanti.src = operativepath + 'avanti.png';
            imgAvanti.className = 'playicons';
            imgIndietro.addEventListener("click",()=>{
                if(ind-1 >= 0)
                {
                    ind = ind - 1
                    inputBox.value = this.rec[ind][0].time
                    timeText.textContent = this.rec[ind][0].FormatDur()[0] + "h " + Language_Handler.LocalLanguage.cong + " " + this.rec[ind][0].FormatDur()[1] + "m"
                    startLabelTime.textContent = this.rec[ind][0].FormatStartEnd()[0]
                    endLabelTime.textContent = this.rec[ind][0].FormatStartEnd()[1]
                    finalLabel.textContent = this.rec[ind][1]
                }
            })
            imgAvanti.addEventListener("click",()=>{
                if(ind+1 < this.rec.length)
                {
                    ind = ind + 1
                    inputBox.value = this.rec[ind][0].time
                    timeText.textContent = this.rec[ind][0].FormatDur()[0] + "h " + Language_Handler.LocalLanguage.cong + " " + this.rec[ind][0].FormatDur()[1] + "m"
                    startLabelTime.textContent = this.rec[ind][0].FormatStartEnd()[0]
                    endLabelTime.textContent = this.rec[ind][0].FormatStartEnd()[1]
                    finalLabel.textContent = this.rec[ind][1]
                }
            })
            centerLine.appendChild(imgAvanti);
            upwindow.window.appendChild(centerLine);
            const center = document.createElement('div');
            center.className = 'center';
            center.style.borderBottom = 'dashed 8px var(--mood)';
            const innerCenter = document.createElement('div');
            innerCenter.className = 'center';
            innerCenter.style.margin = '15px';
            const timeText = document.createElement('h2');
            timeText.style = "font-size:40px; margin:10px;"
            timeText.textContent = this.rec[ind][0].FormatDur()[0] + "h " + Language_Handler.LocalLanguage.cong + " " + this.rec[ind][0].FormatDur()[1] + "m "
            innerCenter.appendChild(timeText);
            center.appendChild(innerCenter);
            const centerLine2 = document.createElement('div');
            centerLine2.className = 'center-line';
            centerLine2.style.margin = '40px';
            const startDiv = document.createElement('div');
            startDiv.className = 'center';
            const startLabelTime = document.createElement('label');
            startLabelTime.textContent = this.rec[ind][0].FormatStartEnd()[0]
            startDiv.appendChild(startLabelTime);
            const startLabel = document.createElement('label');
            startLabel.textContent = Language_Handler.LocalLanguage.start
            startDiv.appendChild(startLabel);
            const endDiv = document.createElement('div');
            endDiv.className = 'center';
            const endLabelTime = document.createElement('label');
            endLabelTime.textContent = this.rec[ind][0].FormatStartEnd()[1]
            endDiv.appendChild(endLabelTime);
            const endLabel = document.createElement('label');
            endLabel.textContent = Language_Handler.LocalLanguage.end
            endDiv.appendChild(endLabel);
            centerLine2.appendChild(startDiv);
            centerLine2.appendChild(endDiv);
            center.appendChild(centerLine2);
            upwindow.window.appendChild(center);
            const finalCenter = document.createElement('div');
            finalCenter.className = 'center';
            finalCenter.style.margin = '40px';
            const finalLabel = document.createElement('label');
            finalLabel.style.width = '90%';
            finalLabel.textContent = this.rec[ind][1]
            finalCenter.appendChild(finalLabel);
            upwindow.window.appendChild(finalCenter);
            upwindow.Show()
        }
    } 
}
class DiaryHandler
{
    constructor()
    {
        this.data = []
        this.change = true
    }
    Add(where)
    {
        while (where.firstChild) 
        {
            where.removeChild(where.firstChild);
        }
        const diarypage = new DiaryPage(this)
        this.data.push(diarypage)
        this.last = this.data
        diarypage.Load()
        this.change = true
        this.LoadAll(where)
        return
    }
    LoadAll(where)
    {
       if(this.isChanged())
       {
            if(this.data.length > 0)
            {
                while (where.firstChild) 
                {
                    where.removeChild(where.firstChild);
                }
                where.style.justifyContent = "flex-start"
                for(let i = 0; i<this.data.length; i++)
                {
                    if(this.data[i] instanceof DiaryPage)
                    {
                        this.data[i].LoadPre(where)
                    }
                }
            }
            else
            {
                while (where.firstChild) 
                {
                    where.removeChild(where.firstChild);
                }
                where.style.justifyContent = "center"
                const h4 = document.createElement("h2")
                h4.textContent = Language_Handler.LocalLanguage.nothingtoshow
                where.appendChild(h4)
            }
       }
    }
    isChanged()
    {
        if(this.change)
        {
            this.change = !this.change
            return true
        }
        else
            return false
    }
    Remove(page)
    {
        if(this.data.indexOf(page) != -1)
        {
            this.data.splice(this.data.indexOf(page),1)
        }
    }
    toJSON() 
    {
        return {
            data: this.data.map(page => page.toJSON())
        };
    }
    static fromJSON(json) 
    {
        const handler = new DiaryHandler();
        handler.data = json.data.map(pageData => DiaryPage.fromJSON(pageData, handler));
        return handler;
    }
}
class DiaryPage
{
    constructor(append)
    {
        this.data = ["","",""]
        this.append = append
    }
    LoadPre(where)
    {
        const pre = document.createElement("div")
        pre.classList.add("dpre")
        const title = document.createElement("label")
        if(this.data[1] == "")
        {
            title.textContent = Language_Handler.LocalLanguage.newdi + " " + (this.append.data.indexOf(this) + 1)
        }
        else
        {
            title.textContent = this.data[1]
        }
        pre.appendChild(title)
        pre.addEventListener("click",()=>{
            this.Load()
        })
        where.appendChild(pre)
    }
    Load()
    {
        const upwindow = new UpWindow(document.body,5,true)
        const upline = document.createElement('div');
        upline.className = 'upline';
        const saveIcon = document.createElement('img');
        saveIcon.className = 'uppericon';
        saveIcon.src = operativepath + 'Save.png';
        const blockIcon = document.createElement('img');
        blockIcon.className = 'uppericon';
        blockIcon.src = operativepath + 'Block.png';
        upline.appendChild(saveIcon);
        upline.appendChild(blockIcon);
        upwindow.window.appendChild(upline);
        const rest = document.createElement('div');
        rest.className = 'rest';
        const restliDate = document.createElement('div');
        restliDate.className = 'restli';
        const dateLabel = document.createElement('label');
        dateLabel.textContent = Language_Handler.LocalLanguage.date;
        const dateInput = document.createElement('input');
        dateInput.style.width = '150px';
        dateInput.className = 'input-box';
        dateInput.value = this.data[0]
        dateInput.type = 'date';
        restliDate.appendChild(dateLabel);
        restliDate.appendChild(dateInput);
        const restliTitle = document.createElement('div');
        restliTitle.className = 'restli';
        const titleInput = document.createElement('input');
        titleInput.className = 'input-box';
        titleInput.placeholder = Language_Handler.LocalLanguage.title;
        titleInput.type = 'text';
        titleInput.value = this.data[1]
        restliTitle.appendChild(titleInput);
        const restlo = document.createElement('div');
        restlo.className = 'restlo';
        const textArea = document.createElement('textarea');
        textArea.className = 'text-area';
        textArea.placeholder = Language_Handler.LocalLanguage.placeresp;
        textArea.value = this.data[2]
        restlo.appendChild(textArea);
        rest.appendChild(restliDate);
        rest.appendChild(restliTitle);
        rest.appendChild(restlo);
        upwindow.window.appendChild(rest);
        saveIcon.addEventListener("click",()=>{
            this.data = [dateInput.value,titleInput.value,textArea.value]
            this.append.change = true
        })
        blockIcon.addEventListener("click",()=>{
            upwindow.NotShow()
            this.append.Remove(this)
            this.append.change = true
        })
        upwindow.Show()
    }
    toJSON() 
    {
        return {
            data: this.data
        };
    }
    static fromJSON(json, append) 
    {
        const page = new DiaryPage(append);
        page.data = json.data;
        return page;
    }
}
class HealthTracker
{
    constructor(Target,append)
    {
        this.Target = Target
        this.data = []
        this.currentDate = new Date().toISOString().split('T')[0]
        this.temp = [0,0,0,this.currentDate,0]
        this.append = append
        this.daycheck = setInterval(()=>{
            this.DayChange()
        },200)
    }
    newdata(data) 
    {
        this.temp[0] += data
        this.temp[1] = Math.round(this.calcParameters()[0])
        this.temp[2] = Math.round(this.calcParameters()[1])
    }
    calcParameters()
    {
        let mbr
        if (this.append.sex == 'M') 
        {
            mbr = 88.362 + (13.397 * this.append.weight) + (4.799 * this.append.height) - (5.677 * this.append.age);
        } 
        else if(this.append.sex == 'F') 
        {
            mbr = 447.593 + (9.247 * this.append.weight) + (3.098 * this.append.height) - (4.330 * this.append.age);
        }
        let dist = (this.temp[0] + this.temp[4]) * ((this.append.height * 0.413) / 100)
        let hours = dist / 5000
        let cal = mbr * 3.5 * hours / 24
        return [dist, cal]
    }
    DayChange() 
    {
        const today = new Date().toISOString().split('T')[0]
        if (this.currentDate != today) 
        {
            this.currentDate = today
            this.data.push(this.temp)
            this.data.sort((a, b) => b[3].localeCompare(a[3]))
            this.temp = [0,0,0,this.currentDate,0]
        }
    }
    LoadData(where)
    {
        let ind = -1
        const upwindow = new UpWindow(where,7,true)
        const centerLine = document.createElement('div');
        centerLine.className = 'center-line';
        centerLine.style.justifyContent = 'space-between';
        centerLine.style.padding = '20px';
        const backImg = document.createElement('img');
        backImg.src = operativepath + 'indietro.png'
        backImg.className = 'playicons';
        const inputBox = document.createElement('input');
        inputBox.className = 'input-box';
        inputBox.type = 'text'
        inputBox.disabled = true
        inputBox.value = "Oggi"
        const forwardImg = document.createElement('img');
        forwardImg.src = operativepath + 'avanti.png'
        forwardImg.className = 'playicons';
        backImg.addEventListener("click",()=>{
            if(ind-1 < -1)
            {}
            else if(ind-1 != -1)
            {
                ind = ind - 1
                inputBox.value = this.data[ind][3]
                stepsH2.textContent = (this.data[ind][0] + this.data[ind][4]) + " / " + this.Target
                distanceLabel1.textContent = this.data[ind][1] + " m"
                caloriesLabel1.textContent =  this.data[ind][2] + ' Kcal';
                inputBox.type = 'date';
            }
            else if(ind-1 == -1)
            {
                inputBox.value = "Oggi"
                stepsH2.textContent = (this.temp[0] + this.temp[4]) + " / " + this.Target
                distanceLabel1.textContent = this.temp[1] + " m"
                caloriesLabel1.textContent =  this.temp[2] + ' Kcal';
                inputBox.type = 'text';
            }
        })
        forwardImg.addEventListener("click",()=>{
            if(ind+1 < this.data)
            {
                ind = ind + 1
                inputBox.type = 'date';
                inputBox.value = this.data[ind][3]
                stepsH2.textContent = (this.data[ind][0] + this.data[ind][4]) + " / " + this.Target
                distanceLabel1.textContent = this.data[ind][1] + " m"
                caloriesLabel1.textContent =  this.data[ind][2] + ' Kcal';
            }
        })

        centerLine.appendChild(backImg);
        centerLine.appendChild(inputBox);
        centerLine.appendChild(forwardImg);

        const center = document.createElement('div');
        center.className = 'center';
        const stepsDiv = document.createElement('div');
        stepsDiv.className = 'center';
        stepsDiv.style.padding = '40px';
        stepsDiv.style.borderBottom = 'dashed 8px var(--mood)';
        const stepsH2 = document.createElement('h2');
        stepsH2.style.fontSize = '40px';
        stepsH2.textContent = (this.temp[0] + this.temp[4]) + " / " + this.Target

        const stepsLabel = document.createElement('label');
        stepsLabel.textContent = Language_Handler.LocalLanguage.steps
        stepsDiv.appendChild(stepsH2);
        stepsDiv.appendChild(stepsLabel);

        const dataCenterLine = document.createElement('div');
        dataCenterLine.className = 'center-line';
        dataCenterLine.style.padding = '60px';
        const distanceDiv = document.createElement('div');
        distanceDiv.className = 'center';

        const distanceLabel1 = document.createElement('label');
        distanceLabel1.textContent = this.temp[1] + " m"

        const distanceLabel2 = document.createElement('label');
        distanceLabel2.textContent = Language_Handler.LocalLanguage.distance
        distanceDiv.appendChild(distanceLabel1);
        distanceDiv.appendChild(distanceLabel2);
        const caloriesDiv = document.createElement('div');
        caloriesDiv.className = 'center';
        const innerCaloriesDiv = document.createElement('div');
        innerCaloriesDiv.className = 'center';
        const caloriesLabel1 = document.createElement('label');
        caloriesLabel1.textContent =  this.temp[2] + ' Kcal';
        const caloriesLabel2 = document.createElement('label');
        caloriesLabel2.textContent = Language_Handler.LocalLanguage.calo
        innerCaloriesDiv.appendChild(caloriesLabel1);
        innerCaloriesDiv.appendChild(caloriesLabel2);
        caloriesDiv.appendChild(innerCaloriesDiv);

        dataCenterLine.appendChild(distanceDiv);
        dataCenterLine.appendChild(caloriesDiv);

        center.appendChild(stepsDiv);
        center.appendChild(dataCenterLine);
        upwindow.window.appendChild(centerLine);
        upwindow.window.appendChild(center);
        upwindow.Show()
    }
    toJSON() 
    {
        return {
            Target: this.Target,
            data: this.data,
            currentDate: this.currentDate,
            temp: this.temp,
            append: this.append
        }
    }
    static fromJSON(parsed) 
    {
        const instance = new HealthTracker(parsed.Target, parsed.append);
        instance.data = parsed.data;
        instance.currentDate = parsed.currentDate;
        instance.temp = parsed.temp;
        return instance;
    }
}
class MoodUnit
{
    constructor(mood,intensity,date)
    {
        this.mood = Moods[mood]
        this.intensity = intensity
        this.time = date
    }
    toJSON() 
    {
        return {
            mood: this.mood.n,
            intensity: this.intensity,
            time: this.time
        };
    }
    static fromJSON(jsonString) 
    {
        const data = jsonString;
        return new MoodUnit(data.mood, data.intensity, data.time);
    }
}
class MoodTracker
{
    constructor()
    {
        this.rec = []
    }
    Add(mood,inte,date)
    {
        let dele = true
        for(let i = 0; i<this.rec.length; i++)
        {
            if(this.rec[i].time == date)
            {
                const final = new MoodUnit(mood,inte,date)
                this.rec[i] = final
                this.rec.sort((a, b) => b.time.localeCompare(a.time))
                dele = false
                return
            }
        }
        if(dele)
        {
            const final = new MoodUnit(mood,inte,date)
            this.rec.push(final)
            this.rec.sort((a, b) => b.time.localeCompare(a.time))
            return
        }   
    }
    Med(unit)
    {
        let moodf = 0;
        let count = 0;

        for(let i = 0; i < this.rec.length; i++)
        {
            if(this.rec[i].mood.mood === unit.mood.mood)
            {
                moodf += this.rec[i].intensity;
                count++;
            }
        }

        if(count == 0) return 0

        moodf = Math.round(moodf / count);
        return moodf
    }
    LoadData(where)
    {
        if(this.rec.length <= 0)
        {
            const hj = new UpWindow(where,7,true)
            const H = document.createElement("h2")
            H.textContent = Language_Handler.LocalLanguage.nothingtoshow
            H.style = "margin:60px;"
            hj.window.appendChild(H)
            hj.Show()
        }
        else
        {
            let ind = 0
            const upwindow = new UpWindow(where,7,true)

            const centerLine = document.createElement('div');
            centerLine.className = 'center-line';
            centerLine.style.margin = '25px';

            const imgIndietro = document.createElement('img');
            imgIndietro.src = operativepath + 'indietro.png';
            imgIndietro.className = 'playicons';
            centerLine.appendChild(imgIndietro);

            const inputDate = document.createElement('input');
            inputDate.type = 'date';
            inputDate.disabled = true
            inputDate.value = this.rec[ind].time
            inputDate.className = 'input-box';
            centerLine.appendChild(inputDate);

            const imgAvanti = document.createElement('img');
            imgAvanti.src = operativepath + 'avanti.png';
            imgAvanti.className = 'playicons';
            centerLine.appendChild(imgAvanti);
            imgIndietro.addEventListener("click",()=>{
                if(ind-1 >= 0)
                {
                    ind = ind - 1
                    inputDate.value = this.rec[ind].time
                    labelDesc.textContent = this.Message(this.rec[ind])
                    labelIntensity.textContent = this.rec[ind].intensity + " / 10"
                    labelMood.textContent = Language_Handler.LocalLanguage[this.rec[ind].mood.mood]
                    imgMood.src = this.rec[ind].mood.img
                    iconama.style = "border-color:"+this.rec[ind].mood.color
                }
            })
            imgAvanti.addEventListener("click",()=>{
                if(ind+1 < this.rec.length)
                {
                    ind = ind + 1
                    inputDate.value = this.rec[ind].time
                    labelDesc.textContent = this.Message(this.rec[ind])
                    labelIntensity.textContent = this.rec[ind].intensity + " / 10"
                    labelMood.textContent = Language_Handler.LocalLanguage[this.rec[ind].mood.mood]
                    imgMood.src = this.rec[ind].mood.img
                    iconama.style = "border-color:"+this.rec[ind].mood.color
                }
            })
            upwindow.window.appendChild(centerLine);

            const centerBorder = document.createElement('div');
            centerBorder.className = 'center';
            centerBorder.style.borderBottom = 'dashed 8px var(--mood)';

            const centerInner = document.createElement('div');
            centerInner.className = 'center';

            const centerIcon = document.createElement('div');
            centerIcon.className = 'center';
            centerIcon.style.marginTop = '20px';

            const iconama = document.createElement('div');
            iconama.className = 'iconama';
            iconama.style = "border-color:"+this.rec[ind].mood.color

            const imgMood = document.createElement('img')
            imgMood.src = this.rec[ind].mood.img
            imgMood.className = 'tigiuro';
            iconama.appendChild(imgMood);

            centerIcon.appendChild(iconama);
            centerInner.appendChild(centerIcon);

            const centerLabels = document.createElement('div');
            centerLabels.className = 'center-line';
            centerLabels.style.margin = '40px';

            const innerCenter = document.createElement('div');
            innerCenter.className = 'center';

            const labelMood = document.createElement('label');
            labelMood.textContent = Language_Handler.LocalLanguage[this.rec[ind].mood.mood]
            innerCenter.appendChild(labelMood);

            const labelMoodText = document.createElement('label');
            labelMoodText.textContent = Language_Handler.LocalLanguage.mood
            innerCenter.appendChild(labelMoodText);

            centerLabels.appendChild(innerCenter);

            const innerCenterIntensity = document.createElement('div');
            innerCenterIntensity.className = 'center';

            const labelIntensity = document.createElement('label');
            labelIntensity.textContent = this.rec[ind].intensity + " / 10"
            innerCenterIntensity.appendChild(labelIntensity);

            const labelIntensityText = document.createElement('label');
            labelIntensityText.textContent = Language_Handler.LocalLanguage.intensity
            innerCenterIntensity.appendChild(labelIntensityText);

            centerLabels.appendChild(innerCenterIntensity);
            centerInner.appendChild(centerLabels);
            centerBorder.appendChild(centerInner);

            upwindow.window.appendChild(centerBorder);

            const centerDesc = document.createElement('div');
            centerDesc.className = 'center';
            centerDesc.style.margin = '40px';

            const labelDesc = document.createElement('label');
            labelDesc.style.width = '90%';
            labelDesc.textContent = this.Message(this.rec[ind])
            centerDesc.appendChild(labelDesc);

            upwindow.window.appendChild(centerDesc);

            upwindow.Show()
        }
    }
    Message(unit)
    {
        const media = this.Med(unit);
        const intensitaAttuale = unit.intensity;
        const differenza = intensitaAttuale - media
    
        let messaggio;
    
        if (differenza > 1) 
        {
            messaggio = Language_Handler.LocalLanguage.inte0 + differenza
        } 
        else if (differenza < -1) 
        {
            messaggio = Language_Handler.LocalLanguage.inte1 + Math.abs(differenza) 
        } 
        else if (differenza == 1) 
        {
            messaggio = Language_Handler.LocalLanguage.inte2
        } 
        else if (differenza == -1) 
        {
            messaggio = Language_Handler.LocalLanguage.inte3
        } 
        else 
        {
            messaggio = Language_Handler.LocalLanguage.inte4
        }
    
        return messaggio
    }
    toJSON() 
    {
        return {
            rec: this.rec.map(unit => unit.toJSON())
        }
    }
    static fromJSON(jsonString) 
    {
        const data = jsonString;
        const tracker = new MoodTracker();
        tracker.rec = data.rec.map(unitJson => MoodUnit.fromJSON(unitJson));
        return tracker;
    }
}