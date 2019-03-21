let globalEnv = {
    development: {
      ROOT_API: "data/"
    },
   production: {
    ROOT_API: "https://data-dept-healthworkforce.cloudapps.unc.edu/data/"
    }
  };
  
  export default function env(property){
    return globalEnv[process.env.NODE_ENV][property];
  };