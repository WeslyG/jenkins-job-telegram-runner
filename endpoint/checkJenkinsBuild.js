import axios from 'axios';
import {cred} from './../credential/config';

export const checkJenkins = (msg, jenkins) => {
  return new Promise((resolve, reject) => {
    axios.get(`${cred.jenkins.protocol}://${cred.jenkinsAuth.username}:${cred.jenkinsAuth.token}@${cred.jenkins.fqdn}/${jenkins}/api/json?pretty=true`)
      .then(res => {
        // console.log(res);
        const lastBuild = res.data.lastBuild.number;
        const lastSuccessBuild = res.data.lastSuccessfulBuild ? res.data.lastSuccessfulBuild.number : null;
        const lastFailedBuild = res.data.lastFailedBuild ? res.data.lastFailedBuild.number : null;
        const lastUnsuccessfulBuild = res.data.lastUnsuccessfulBuild ? res.data.lastFailedBuild.number : null;

        if (lastBuild != lastSuccessBuild && lastBuild != lastFailedBuild && lastBuild != lastUnsuccessfulBuild) resolve('wait');
        else if (lastBuild == lastSuccessBuild) resolve('true');
        else if (lastBuild == lastFailedBuild || lastBuild == lastUnsuccessfulBuild) resolve('false');
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
