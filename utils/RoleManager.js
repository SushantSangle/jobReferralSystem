class RoleManager {
    static  roleLevel=3;
    static getLevel(){
        return this.roleLevel;
    }
    static setRole(roles){
        var role;
        for(i in roles){
            role = roles[i].get('name')
            if(role=='SuperAdmin'){
                this.roleLevel=0;
                break;
            }
            if(role=='Recruiter'){
                if(this.roleLevel>1)
                    this.roleLevel=1;
            }
            if(role=='Employee'){
                if(this.roleLevel>2)
                    this.roleLevel=2;
            }
        }
    }
}
export {RoleManager as default}