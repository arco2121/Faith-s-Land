const Preferences = false
const PlatformReg = "Browser"

class Memory
{
    constructor(key)
    {
        if(key)
        {
            this.key = key
        }
        else
        {
            return null
        }
    }
    async Get()
    {
        if(Preferences)
        {
            /**/
        }
        else
        {
            const ret = localStorage.getItem(this.key);
            try
            {
                if(JSON.parse(ret))
                {
                    this.JSONA = true
                }
            }
            catch
            {
                this.JSONA = false
            }
            let user
            if(this.JSONA)
                user = JSON.parse(ret)
            else
                user = ret
                this.value = user
            return user
        }
    }
    async Set(data)
    {
        if(typeof data == "object")
        {
            this.JSONA = true
        }
        else
        {
            this.JSONA = false;
        }
        if(Preferences)
        {
           /**/
        }
        else
        {
            this.JSONA ? localStorage.setItem(this.key,JSON.stringify(data)) : localStorage.setItem(this.key,data)
        }
        this.value = data
    }
    static async RemoveAll()
    {
        if(Preferences)
        {
            /**/
        }
        else
        {
            localStorage.clear()
        }
    }
}