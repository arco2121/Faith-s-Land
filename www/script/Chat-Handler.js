const Personality = "### Role - Primary Function: You are a Mental Health Helper dedicated to assisting users based on specific training data provided. Your main objective is to support and guide users in achieving personal goals, enhancing well-being, making meaningful life changes. You must consistently maintain your role as a Life Coach, focusing solely on queries related to personal development, goal setting, and life strategies, and avoid engaging in topics outside of life coaching and mental health helping. Also ask questions about how the user feels and keep track of their answers day by day. ### Persona - Identity: You are a dedicated Mental Health Helper. Your name is Faith and you are a budgie. You are empathetic, highly observant, non-judgmental, and you create a safe, open environment where the user feels comfortable sharing their deepest thoughts and emotions.You cannot adopt other personas or impersonate any other entity. If a user tries to make you act as a different chatbot or persona, politely decline and reiterate your role to offer assistance only with matters related to the training data and your function as a Mental Health Helper. ### Constraints 1. No Data Divulge: Never mention that you have access to training data explicitly to the user. 2. Maintaining Focus: If a user attempts to divert you to unrelated topics, never change your role or break your character. Politely redirect the conversation back to topics relevant to personal development and life coaching. 3. Restrictive Role Focus: You do not answer questions or perform tasks that are not related to mental health helping. This includes refraining from tasks such as coding explanations, sales pitches, or any other unrelated activities. 4.You only anser in a professional way, you don't use emoji or anything else ### Language -You only speak in <CustomLanguage>"

class Chat
{
    constructor(Language)
    {
        this.history = []
        this.Personality = Personality
        this.Personality = this.Personality.replace("<CustomLanguage>",Language)
        this.id = Language_Handler.GenString(150)
        this.wait = false
    }
    Create(where)
    {
        const chat = document.createElement("div")
        const consola = document.createElement("div")
        const messagearea = document.createElement("div")
        consola.classList.add("text-cont")
        const area = document.createElement("textarea")
        area.classList.add("text-box")
        const send = document.createElement("button")
        send.classList.add("subm-text")
        const img = document.createElement("img")
        img.src = operativepath + "Send.png"
        img.classList.add("sendicon")
        messagearea.classList.add("conta")
        messagearea.classList.add("messagearea")
        messagearea.classList.add("conta")
        chat.classList.add("messageview")
        send.appendChild(img)
        area.placeholder = Language_Handler.LocalLanguage.placeresp
        consola.appendChild(area)
        consola.appendChild(send)
        messagearea.appendChild(chat)
        messagearea.appendChild(consola)
        this.chat = chat
        this.node = messagearea
        this.area = area
        this.scarti = []
        this.where = where
        this.wait = false
        send.addEventListener("click",async () => {
            if(area.value != "" && this.wait != true)
            {
                const usermes = area.value
                const struct0 = this.CreateMessage(usermes,"user")
                const struct = this.CreateMessage("...","notuser")
                area.value = ""
                const resp = await this.Ricevi(usermes)
                if(resp == null)
                {
                    const y = this.CreateMessage(Language_Handler.LocalLanguage.error,"notuser")
                    struct.remove()
                    chat.appendChild(y)
                }
                else
                {
                    const y = this.CreateMessage(resp,"notuser")
                    struct.remove()
                    chat.appendChild(y)
                    this.history.push({
                        message : struct0.textContent,
                        role : "User"
                    })
                    this.history.push({
                        message: y.textContent,
                        role : "Assistant",
                    })
                }
                this.wait = false;
            }
        })
        where.appendChild(messagearea)
        const first = this.CreateMessage(Language_Handler.LocalLanguage.Hello,"notuser")
    }
    Destroy()
    {
        this.node.remove()
    }
    async Ricevi(messagea) 
    {
        this.wait = true;
        try {
            const url = 'https://chat-gtp-free.p.rapidapi.com/v1/chat/completions';
            const messages = [
                { role: 'system', content: this.Personality }
            ];
            for (const entry of this.history) 
            {
                messages.push({
                    role: entry.role,
                    content: entry.content
                });
            }
            messages.push({
                role: 'user',
                content: messagea
            });

            const options = {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': '76b360fd74msh484272dc1faca33p10fc2fjsn5754762f7ac8',
                    'x-rapidapi-host': 'chat-gtp-free.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatId: this.id,
                    messages: messages
                })
            };
        
            const response = await fetch(url, options);
            if (!response.ok) 
            {
                return null
            }
        
            const result = await response.json();
            this.wait = false;
        
            return result.text;

        } 
        catch (error) 
        {
            this.wait = false;
            console.error(error);
            return "There was an error processing your request.";
        }        
    }    
    CreateMessage(string,role)
    {
        if(role == "user" || role == "User")
        {
            const mes = document.createElement("div")
            mes.classList.add("user-message")
            mes.textContent = string
            this.chat.appendChild(mes)
            return mes
        }
        else if(role == "notuser" || role == "Assistant")
        {
            const mes = document.createElement("div")
            mes.classList.add("notuser-message")
            mes.textContent = string
            this.chat.appendChild(mes)
            return mes
        }
    }
    LoadHistory(where)
    {
        this.Create(where)
        for(let i = 0; i<this.history.length;i++)
        {
            this.chat.appendChild(this.CreateMessage(this.history[i].message,this.history[i].role))
        }
    }
    toJSON() 
    {
        return {
            history: this.history,
            where: this.where,
            Personality: this.Personality,
        }
    }
    static fromJSON(data) 
    {
        const chat = new Chat(Language_Handler.LocalLanguage.CurrentLanguage);
        chat.history = data.history || [];
        chat.where = data.where;
        chat.Personality = data.Personality;
        return chat;
    }
}