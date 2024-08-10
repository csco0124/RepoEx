import { $axios } from "@/configs/axiosConfig";
import { decodeBase64url, encodeBase64url } from "@/utils/base64urlJS";
import { getCookieValue, isEmpty, isNotEmpty } from "@/utils/commonUtil";

export async function webAuthnLogin(registConfirm, rememberMe) {
  const credentialRequestOptions = await getCredential("required")
  if(credentialRequestOptions == 'regist'){
    registConfirm();
    return;
  }
      
  return await navigator.credentials.get(credentialRequestOptions).then((credential) => {
    const formData = new FormData();
    formData.append('credentialId', credential.id);
    formData.append('clientDataJSON', encodeBase64url(credential.response.clientDataJSON));
    formData.append('authenticatorData', encodeBase64url(credential.response.authenticatorData));
    formData.append('signature', encodeBase64url(credential.response.signature));
    formData.append('clientExtensions', JSON.stringify(credential.getClientExtensionResults()));
    formData.append('remember-me', rememberMe);

    $axios.post('/webauthn/login', formData).then(res => location.href = res.data.data.targetUrl);

    return 'success';
  }).catch((e) => {
    console.error("Error:%s, Message:%s", e.name, e.message);
    return 'error';
  });

}

function getEmail(){
  let email = '';

  email = getCookieValue('webauthnEmail');

  if(!isEmpty(localStorage.getItem('email')) && isEmpty(email) ){
    email = localStorage.getItem('email');
  }
  
  return email;
}

async function getCredential(userVertification){
  const email = getEmail();

  if(isEmpty(email)){
    return 'regist';
  }

  return await $axios.get('/webauthn/assertion/options?email=' + encodeURIComponent(email)).then((res) => {
    const options = res.data;
    if(options.allowCredentials.length == 0){
      return 'regist';
    }
    const publicKeyCredentialRequestOptions = {
      challenge: decodeBase64url(options.challenge),
      timeout: options.timeout,
      rpId: options.rpId,
      allowCredentials: options.allowCredentials.map(credential => {
        return {
          type: credential.type,
          id: decodeBase64url(credential.id)
        }
      }),
      userVerification: userVertification,
      extensions: options.extensions
    };
    const credentialRequestOptions = {
      publicKey: publicKeyCredentialRequestOptions
    };
    
    return credentialRequestOptions;
    //return navigator.credentials.get(credentialRequestOptions);
  });
}

export async function createCredential(residentKeyRequirement, userInfo){

    let username = userInfo.email;
    let userHandle = userInfo.userHandle;

    return await $axios.get('/webauthn/attestation/options').then(res => {
      const options = res.data;

      let allowCredentialsArray = [];
      let publicKeyCredentialCreationOptions = {
          rp: {
              id: options.rp.id,
              name: options.rp.name
          },
          user: {
              id: decodeBase64url(userHandle),
              name: username,
              displayName: username
          },
          challenge: decodeBase64url(options.challenge),
          pubKeyCredParams: options.pubKeyCredParams,
          timeout: options.timeout,
          excludeCredentials: allowCredentialsArray,
          authenticatorSelection: {
              authenticatorAttachment: options.authenticatorSelection.authenticatorAttachment,
              requireResidentKey: residentKeyRequirement,
              residentKey: options.authenticatorSelection.residentKey,
              userVerification: options.authenticatorSelection.userVerification
          },
          attestation: options.attestation,
          extensions: options.extensions
      };

      let credentialCreationOptions = {
          publicKey: publicKeyCredentialCreationOptions
      };

      return credentialCreationOptions;
      //return navigator.credentials.create(credentialCreationOptions);
    });
}

  // return Promise
export async function onResidentKeyRequirementDialogClosing(residentKeyRequirement, userInfo){
    const credentialCreationOptions = await createCredential(residentKeyRequirement, userInfo)
    return await navigator.credentials.create(credentialCreationOptions).then(function (credential) {
        return {
            credentialId: encodeBase64url(credential.rawId),
            clientDataJSON: encodeBase64url(credential.response.clientDataJSON),
            attestationObject: encodeBase64url(credential.response.attestationObject),
            clientExtensions: JSON.stringify(credential.getClientExtensionResults()),
            type : credential.type
        }
    }).catch(function (e) {
        console.error("Error:%s, Message:%s", e.name, e.message);
    });
}

export async function registWebauthn(Alert, userInfo, callbackFn, verifySocialId){
  await onResidentKeyRequirementDialogClosing(true, userInfo).then((credential) => {
    if(isEmpty(credential)){
      console.log('credential is empty');
      return;
    }

    const authenticators = [{
      id: '',
      name: 'authenticator',
      credentialId: credential.credentialId,
			clientDataJSON: credential.clientDataJSON,
			attestationObject: credential.attestationObject,
			clientExtensions: credential.clientExtensions
    }];

    const data = {
      username: userInfo.username,
      userHandle: userInfo.userHandle,
      email: userInfo.email,
      authenticators: authenticators
    };

    let uri = '/public/api/profile';

    if(isNotEmpty(verifySocialId)){
      data.secretKey = userInfo.secretKey;
      uri += `/${verifySocialId}`;
    }

    $axios.post(uri, data).then((res) => {
      if(res.data.error != 'OK'){
          console.log(res.data.message);
          return;
      }
      localStorage.setItem('email', res.data.data.email)
      Alert({message: '등록이 완료되었습니다.', onClose:() => {
        callbackFn();
      }});
      
    }).catch(() => {
      console.log('webauthn 등록 에러');
    });

    return data;
  });
}
  
export function registWebauthnSetting(Alert, userId, callbackFn){
  $axios.get('/auth/api/webauthn/profile?userId=' + userId).then((res) => {
      if(res.data.error != 'OK'){
          console.log(res.data.message);
          return;
      }
      const userInfo = res.data.data;
      registWebauthn(Alert, userInfo, callbackFn);
  });
}

//========================비로그인 webauthn 등록===============================
export function annonymousWebauthnSetting(params){
  $axios.get('/auth/api/webauthn/profile?userId=' + params.userId).then((res) => {
      if(res.data.error != 'OK'){
          console.log(res.data.message);
          return;
      }
      const userInfo = res.data.data;
      userInfo.secretKey = params.secretKey; //비로그인 등록 시 보안을 위한 secretKey
      registWebauthn(params.alert, userInfo, params.callbackFn, params.verifySocialId);
  });
}
//============================================================================

export async function deleteWebauthn(userInfo){
  const data = {
    username: userInfo.username,
    userHandle: userInfo.userHandle,
    email: userInfo.email,
    authenticators: []
  }

  let isSuccess = false;

  await $axios.post('/public/api/profile', data).then((res) => {
    if(res.data.error == 'OK'){
      isSuccess = true;
    }
  })

  return isSuccess;
}