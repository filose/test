import Firebase from 'firebase';
const FIREBASE_URL = 'https://scorecast-app.firebaseio.com';
var firebaseRef = new Firebase(FIREBASE_URL);

let authService = {
  register: function(email, pass, callback){
    firebaseRef.createUser({
      email: email,
      password: pass
    }, function(error, authData){
      if(error){
        console.log(error);
      }else{
        if(callback){
          callback(authData);
        }
      }
    });
  },
  login: function(email, pass, callback){
    firebaseRef.authWithPassword({
      email: email,
      password: pass
    }, function(error, authData){
      if(error){
        // Handle error
        console.log(error);
      }else{
        // Handle successful login
        if(callback){
          callback(authData);
        }
      }
    });
  },
  logout: function(){
    firebaseRef.unauth();
  },
  onAuth: function(callback){
    firebaseRef.onAuth(function(authData){
      if(callback){
        callback(authData);
      }
    });
  },
  getAuth: function(){
    return firebaseRef.getAuth();
  }
};

export {firebaseRef, authService};
