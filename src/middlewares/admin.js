export default function admin({next, store}){
    const user = store.state.auth.user;
    
    if(user && user.user_id) {
        return next({
            name: 'dashboard'
        });
    }
    
    return next();
}