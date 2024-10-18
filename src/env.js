let globalEnv = {
    development: {
      ROOT_API: "http://localhost:1313/"
    },
   production: {
    ROOT_API: "https://hpdsdatanode-dept-healthworkforce.apps.cloudapps.unc.edu/"
    }
  };
  
  export default function env(property){
    return globalEnv[process.env.NODE_ENV][property];
  };