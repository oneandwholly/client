import axios from 'axios';

const ROOT_URL = "http://localhost:3090";

export function upload(data, cb) {
  return function(dispatch) {

    Date.prototype.toBasicISOString = function() {
      return this.toISOString().replace(/[:\-]|\.\d{3}/g, '');
    }

    function getDateStr(d) {
      function pad(num) {
        return num.toString().length === 1 ? '0' + num : num
      }
      return d.getFullYear().toString() + pad(d.getMonth() + 1) + pad(d.getDate())
    }

    let file = data.files[0];
    const AWS_ACCESS_KEY_ID = 'AKIAJQOR3RTYHRS7OKDA';

    const d = new Date();
    const bucket = 'instaclone-pictures';
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const algorithm = 'AWS4-HMAC-SHA256';
    const credential = [
        AWS_ACCESS_KEY_ID,
        getDateStr(d),
        'us-east-1',
        's3',
        'aws4_request'
      ].join('/');
    const dStr = d.toBasicISOString();

    const body = {
      acl: 'public-read',
      bucket: bucket,
      key: key,
      'x-amz-algorithm': algorithm,
      'x-amz-credential': credential,
      'x-amz-date': dStr
    };
    const config = {
      'content-type': 'application/json;charset=UTF-8',
      headers: { authorization: localStorage.getItem('token')}
    };
    const s3Url = 'https://' + bucket + '.s3.amazonaws.com/';
    axios.post('http://localhost:3090/photo/upload', body, config)
      .then(resp => {
        let body = new FormData();
        body.append('key', key); // order matters?
        body.append('file', file);
        body.append('policy', resp.data.policy);
        body.append('x-amz-algorithm', algorithm);
        body.append('x-amz-credential', credential);
        body.append('x-amz-date', dStr);
        body.append('x-amz-signature', resp.data.signature);

        return axios.post(s3Url, body);
      })
      .then((response) => {
        cb();
      })

  }
}
