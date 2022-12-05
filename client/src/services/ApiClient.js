import axios from "axios"

class ApiClient {
    constructor(remortHostUrl) {
        this.remortHostUrl = remortHostUrl
        this.token = null
        this.tokenName = 'token'
    }
    async setToken(token) {
        localStorage.setItem(this.tokenName,token);
    }
    getToken = async () => {
        // get Data from Storage
        try {
          const data = localStorage.getItem(this.tokenName);
          if (data !== null) {
            return data
          }
        } catch (error) {
        }
    }
    removeToken = async () => {
        this.token = null
        localStorage.removeItem(this.tokenName)
    }

    async request({endpoint, method = `GET`, data = {}}) {
        const url = `${this.remortHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }
        this.token = await this.getToken();
        if(this.token){
            headers["Authorization"]=`Bearer ${this.token}`
        }
        try {
            const res = await axios({url, method, data, headers})
            if(!this.token) {
                this.setToken(res.data.token)
            }
            return { dataresponse: res.data, error: null }
        } catch (error) {
            console.error("APIclient.makeRequest.error:")
            console.error({ errorResponse: error.response })

            
            const message = "error"
            // const message = error.response.data.error.message
            return { data: null, error: message || String(error) }
        }
    }
    async registerUser(credentials){
        return await this.request({ endpoint: `auth/registerUser`, method: `POST`, data:credentials})
    }

    async loginUser(credentials){
        return await this.request({ endpoint: `auth/loginUser`, method: `POST`, data:credentials})
    }

    async getuser(){
        return await this.request({ endpoint: `auth/getuser`, method: `GET`})
    }

    async logout(){
        this.removeToken()
    }

    async isLoggedIn() {
        this.token = await this.getToken();
        if(this.token !== undefined){
            return true
        } else {
            return false
        }
    }

    async addNewProject(credentials){
        return await this.request({ endpoint: `projects/addNewProject`, method: `POST`, data:credentials})
    }
    async fetchProjects(){
        return await this.request({ endpoint: `projects/fetchProjects`, method: `GET`})
    }
    async fetchTasks(credentials){
        return await this.request({ endpoint: `tasks/fetchTasks`, method: `POST`, data:credentials})
    }
    async fetchUsers(){
        return await this.request({ endpoint: `auth/fetchUsers`, method: `GET`})
    }
    async addNewTask(credentials){
        return await this.request({ endpoint: `tasks/addNewTask`, method: `POST`, data:credentials})
    }
    async fetchAssignees(credentials){
        return await this.request({ endpoint: `tasks/fetchAssignees`, method: `POST`, data:credentials})
    }
    async changeStatus(credentials){
        return await this.request({ endpoint: `tasks/changeStatus`, method: `POST`, data:credentials})
    }
    async updateTaskDetails(credentials){
        return await this.request({ endpoint: `tasks/updateTaskDetails`, method: `POST`, data:credentials})
    }
    async deleteTask(credentials){
        return await this.request({ endpoint: `tasks/deleteTask`, method: `POST`, data:credentials})
    }
    async fetchAllTasks(){
        return await this.request({ endpoint: `tasks/fetchAllTasks`, method: `GET`})
    }
    async fetchAllAssignees(){
        return await this.request({ endpoint: `tasks/fetchAllAssignees`, method: `GET`})
    }
    
}

const API = new ApiClient("http://localhost:3001")

export default API