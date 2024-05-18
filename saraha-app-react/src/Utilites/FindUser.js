
let findUser=(users,UserId)=>{
    let UserIndex=users.findIndex(user=>user._id===UserId);
    if(UserIndex<-1)
return{};
return users[UserIndex];

}
export default findUser;