import {extendObservable} from 'mobx'

class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,              // determines if user is logged in
            username: ''
        }) //contains property for stores
    }
}

export default new UserStore();