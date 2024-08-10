import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useFormContext, Controller } from 'react-hook-form';

// @hooks
import { useModal } from '@hooks/useModal';
// @mui
import { Box, Fab, Switch, Card, CardHeader, CardContent, Container, Typography, Checkbox, FormGroup, FormControl, FormControlLabel, TextField, Stack, Button, Grid, RadioGroup, Radio } from '@mui/material';
import { Masonry } from '@mui/lab';
// components
import { useSettingsContext } from '../../components/settings';
import axios from 'axios';
import { $axios } from '@/configs/axios/axiosConfig';
import ManagementClientGrid from '@/pages/management/ManagementClientGrid';
// hook
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ManagementRoleModal } from "@/components/modals/ManagementRoleModal";

export default function ManagementClientEdit({variant}) {
  
  const { openModal } = useModal();
  const history = useNavigate();
  const containerStyle  = useMemo(() => ({ width: '100%', height: '100%' }), []);
  
  //파일 업로드 관련
  const orgFileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoUri, setLogoUri] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  const [csrf, setCsrf] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [homeUri, setHomeUri] = useState("");
  
  const [authorizationGrantTypes, setAuthorizationGrantTypes] = useState([]);

  const [chkAuthorizationCode, setChkAuthorizationCode] = useState("");
  const [chkRefreshToken, setChkRefreshToken] = useState("");
  const [chkClientCredentials, setChkClientCredentials] = useState("");
  const [chkPassword, setChkPassword] = useState("");
  const [chkJwtBearer, setChkJwtBearer] = useState("");
  const [chkImplicit, setChkImplicit] = useState("");


  const [clientAuthenticationMethods, setClientAuthenticationMethods] = useState([]);

  const [chkClientSecretBasic, setChkClientSecretBasic] = useState("");
  const [chkClientSecretPost, setChkClientSecretPost] = useState("");
  const [chkClientSecretJwt, setChkClientSecretJwt] = useState("");
  const [chkPrivateKeyJwt, setChkPrivateKeyJwt] = useState("");
  const [chkNone, setChkNone] = useState("");

  const [scopes , setScopes] = useState([]);
  const [redirectUris, setRedirectUris] = useState("");
  
  //clientSettings
  const [jwkSetUrl , setJwkSetUrl] = useState("");
  const [requireAuthorizationConsent , setRequireAuthorizationConsent] = useState(false);
  const [requireProofKey , setRequireProofKey] = useState(false);
  
  //tokenSettings
  const [accessTokenFormat , setAccessTokenFormat] = useState("");
  const [refreshTokenTimeToLive , setRefreshTokenTimeToLive] = useState("");
  const [accessTokenTimeToLive , setAccessTokenTimeToLive] = useState("");
  const [reuseRefreshTokens , setReuseRefreshTokens] = useState(false);

  const [authorizationGrantTypesParam, setAuthorizationGrantTypesParam] = useState([]);
  const [clientAuthenticationMethodsParam, setClientAuthenticationMethodsParam] = useState([]);

  //화면 진입하고 값 조회 및 세팅
  useEffect(()=>{
    if(!!window.localStorage.getItem("editClientId")){
      setData();
    }
  },[]);

  //값 세팅 확인 후 화면 세팅
  useEffect(() => {
    setChkClientSecretBasic(clientAuthenticationMethods.some(item => item.value === "client_secret_basic")?"checked":"");
    setChkClientSecretPost(clientAuthenticationMethods.some(item => item.value === "client_secret_post")?"checked":"");
    setChkClientSecretJwt(clientAuthenticationMethods.some(item => item.value === "client_secret_jwt")?"checked":"");
    setChkPrivateKeyJwt(clientAuthenticationMethods.some(item => item.value === "private_key_jwt")?"checked":"");
    setChkNone(clientAuthenticationMethods.some(item => item.value === "none")?"checked":"");
  }, [clientAuthenticationMethods]);

  useEffect(() => {
    setChkAuthorizationCode(authorizationGrantTypes.some(item => item.value === "authorization_code")?"checked":"");
    setChkRefreshToken(authorizationGrantTypes.some(item => item.value === "refresh_token")?"checked":"");
    setChkClientCredentials(authorizationGrantTypes.some(item => item.value === "client_credentials")?"checked":"");
    setChkPassword(authorizationGrantTypes.some(item => item.value === "password")?"checked":"");
    setChkJwtBearer(authorizationGrantTypes.some(item => item.value === "urn:ietf:params:oauth:grant-type:jwt-bearer")?"checked":"");
    setChkImplicit(authorizationGrantTypes.some(item => item.value === "implicit")?"checked":"");
  }, [authorizationGrantTypes]);

  //clientAuthenticationMethods 데이터 세팅
  useEffect(() => {
    let arr = [];
    chkClientSecretBasic=="checked"?arr.push("client_secret_basic"):"";
    chkClientSecretPost=="checked"?arr.push("client_secret_post"):"";
    chkClientSecretJwt=="checked"?arr.push("client_secret_jwt"):"";
    chkPrivateKeyJwt=="checked"?arr.push("private_key_jwt"):"";
    chkNone=="checked"?arr.push("none"):"";
      
    setClientAuthenticationMethodsParam(arr);
  },[chkClientSecretBasic, chkClientSecretPost, chkClientSecretJwt, chkPrivateKeyJwt, chkNone]);
  
  //authorizationGrantTypes 데이터 세팅
  useEffect(() => {
    let arr = [];
    chkAuthorizationCode=="checked"?arr.push("authorization_code"):"";
    chkRefreshToken=="checked"?arr.push("refresh_token"):"";
    chkClientCredentials=="checked"?arr.push("client_credentials"):"";
    chkPassword=="checked"?arr.push("password"):"";
    chkJwtBearer=="checked"?arr.push("urn:ietf:params:oauth:grant-type:jwt-bearer"):"";
    chkImplicit=="checked"?arr.push("implicit"):"";
      
    setAuthorizationGrantTypesParam(arr);
  },[chkAuthorizationCode, chkRefreshToken, chkClientCredentials, chkPassword, chkJwtBearer, chkImplicit]);

  const setAuthGtType = () => {
    
  }

  //client secret 재발급 버튼 클릭 감지
  useEffect(()=>{
    if (refreshKey !== 0) {
      clickSaveBtn();
    }
  },[refreshKey]);

  //수정 페이지로 진입하면 선택한 row의 client 정보 조회
  const setData = () => {
    axios.get('/private/api/registered-client/list/'+window.localStorage.getItem("editClientId"))
    .then((res)=>{
      const data = res.data.data;
      setCsrf(res.data.txId)
      setClientId(data.clientId);
      setClientName(data.clientName);
      setClientSecret(data.clientSecret);
      
      setClientAuthenticationMethods(data.clientAuthenticationMethods);
      setAuthorizationGrantTypes(data.authorizationGrantTypes);
      
      axios.get("/private/api/client/"+data.clientId)
      .then((res2)=>{
        setBaseUrl(res2.data.data.baseUrl);
        setHomeUri(res2.data.data.homeUri);
        setLogoUri(res2.data.data.logoUri);
        axios.get("/public/api/get-image?imagename="+res2.data.data.logoUri)
        .then((res3)=>{
          document.getElementById('logoImg').src = "data:image/*;base64,"+res3.data;

        }).catch((err) => {
          console.log("error!", err);
        })
      }).catch((err) => {
        console.log("error!", err);
      })
      
      setScopes(data.scopes);
      const redirectUrisArr = data.redirectUris;
      let redirectUrisStr = "";

      for(var i = 0; i < data.redirectUris.length; i++){
        if(i==0){
          redirectUrisStr += redirectUrisArr[i];
        }else{
          redirectUrisStr += ","+redirectUrisArr[i];
        }
      }
      setRedirectUris(redirectUrisStr);
      
      //clientSettings
      setJwkSetUrl(data.clientSettings.jwkSetUrl);
      setRequireAuthorizationConsent(data.clientSettings.requireAuthorizationConsent);
      setRequireProofKey(data.clientSettings.requireProofKey);

      //tokenSettings
      setAccessTokenFormat(data.tokenSettings.accessTokenFormat);
      setRefreshTokenTimeToLive(data.tokenSettings.refreshTokenTimeToLive);
      setAccessTokenTimeToLive(data.tokenSettings.accessTokenTimeToLive);
      setReuseRefreshTokens(data.tokenSettings.reuseRefreshTokens);


    })
    .catch((err) => {
      console.log("error!", err);
    })
  }

  const changeAccessTokenFormat = (event) => {
    setAccessTokenFormat(event.target.value);
  }

  //등록 버튼 클릭 이벤트
  const clickSaveBtn = () => {
    let req = {
      "clientId" : clientId,
			"clientSecret" : clientSecret,
			"clientName" : clientName,
			"clientAuthenticationMethods" : clientAuthenticationMethodsParam,
			"authorizationGrantTypes" : authorizationGrantTypesParam,
			"redirectUris" : redirectUris.split(","),
			"scopes" : scopes,
			"clientSettings" : {
        "requireProofKey" : requireProofKey,
				"requireAuthorizationConsent" : requireAuthorizationConsent,
				"jwkSetUrl" : jwkSetUrl,
			},
			"tokenSettings" : {
        "accessTokenTimeToLive" : accessTokenTimeToLive,
				"accessTokenFormat" : accessTokenFormat,
				"reuseRefreshTokens" : reuseRefreshTokens,
				"refreshTokenTimeToLive" : refreshTokenTimeToLive,
				"idTokenSignatureAlgorithm" : ""
			},
			"_csrf" : csrf
		};

    const clientSettingInfo = {
      baseUrl: baseUrl,
			homeUri: homeUri
		};
    
    //이미지 저장
    axios.post('/private/api/registered-client/save', {registeredClientDto: req, clientSettingInfoDto: clientSettingInfo })
    .then((res)=>{
      if(res.data.error === "ERR"){
        alert(res.data.message);
      }else{
        if(selectedFile){
          const formData = new FormData();
          formData.append('image', selectedFile);

          axios.post('/private/api/upload-image/'+res.data.data.clientId, formData)
          .then((res2)=>{
            alert("이미지가 등록되었습니다.");
          })
          .catch((err) => {
            alert("이미지 등록에 실패했습니다");
            console.log("error!", err);
          });
        }
        
        if(clientSecret != ""){
          alert("수정이 완료되었습니다");
        }else{
          alert("클라이언트 시크릿 키는 최초 1회만 확인 가능하며, 이후 확인이 불가능합니다. (분실시 수정하기에서 재발급 받을실 수 있습니다.)\n 시크릿키 : "+res.data.data.clientSecret);
        }
        localStorage.removeItem("editClientId");
        history('/private/view/admin/management/client');
      }
    })
    .catch((err) => {
      console.log("error!", err);
    });

  }
  
  //role 등록,삭제 가능한 modal
  const openRole = () => {
    openModal(ManagementRoleModal,
      {message : '모달 샘플 props', title:'Role 관리', clientId: window.localStorage.getItem("editClientId"), clientName: clientName, mode:"client"}, 
      {outsideClose:true});
  }
  
  //[업로드] 버튼 클릭 이벤트
  const clickUploadFileBtn = () => {
    orgFileInput.current.click();
  }

  //파일이 변경되면 변경된 이미지를 출력
  const uploadFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setLogoUri(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        document.getElementById('logoImg').src = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <>
      <Helmet>
        <title> Client | Minimal UI</title>
      </Helmet>
      <div className="ag-theme-alpine" style={containerStyle}>
        <Masonry columns={{ xs: 1, md: 3 }} spacing={2}>
          <Card sx={{m:2}}>
            <CardHeader title="CLIENT INFO"/>
            <CardContent>

              <div hidden={!window.localStorage.getItem("editClientId") === true}>
                <br/>
                <TextField
                  label="ClientId"
                  fullWidth
                  disabled
                  value={clientId}
                  onChange={e => {setClientId(e.target.value)}}
                />
                <br/>
                <br/>
                <Fab variant="extended" size="medium"
                sx={{marginRight: '10px'}}
                onClick={e => {setClientSecret(""); setRefreshKey(refreshKey+1);}}>
                  ClientSecret 재발급
                </Fab>
                <Fab variant="extended" size="medium"
                sx={{marginRight: '10px'}}
                onClick={openRole}>
                  Role 관리
                </Fab>
              </div>
              <div>
                <br/>
                <input
                  type="file" 
                  ref={orgFileInput}
                  style={{ display: 'none' }}
                  onChange={uploadFileChange}
                />
                {!selectedFile&&!logoUri?"":
                  <img id="logoImg" src="" style={{height:"200px"}}/> 
                }
                <Fab variant="extended" size="medium"
                  onClick={clickUploadFileBtn}>
                    업로드
                </Fab>
                <br/>
                <br/>
                <TextField
                  label="ClientName"
                  fullWidth
                  disabled={!window.localStorage.getItem("editClientId")? "": true}
                  value={clientName}
                  onChange={e => {setClientName(e.target.value)}}
                  />
                <br/>
                <br/>
                <TextField
                label="redirectUris"
                placeholder='("," 구분하여 연속적으로 나열)'
                fullWidth
                value={redirectUris}
                onChange={e => {setRedirectUris(e.target.value)}}
                />
                <br/>
                <br/>
                <TextField
                  label="scopes"
                  placeholder='("," 구분하여 연속적으로 나열) : openid*, profile, email, phone'
                  fullWidth
                  value={scopes}
                  onChange={e => {setScopes(e.target.value.split(','))}}
                />
                <br/>
                <br/>
                <TextField
                  label="BaseUrl"
                  fullWidth
                  placeholder='http://www.example.com'
                  value={baseUrl}
                  onChange={e => {setBaseUrl(e.target.value)}}
                  />
                <br/>
                <br/>
                <TextField
                  label="HomeUri"
                  fullWidth
                  placeholder='/home'
                  value={homeUri}
                  onChange={e => {setHomeUri(e.target.value)}}
                  />
                  
              </div>
            </CardContent>
          </Card>
          <Card sx={{m:2}}>
            <CardHeader title="CLIENT SETTINGS"/>
            <CardContent>
              <FormControlLabel label="REQUIRE_PROOF_KEY" control={<Switch size="small" checked={requireProofKey === true} onChange={e => {setRequireProofKey(e.target.checked)}}/>} />
              <br/>
              <FormControlLabel label="REQUIRE_AUTHORIZATION_CONSENT" control={<Switch size="small" checked={requireAuthorizationConsent === true} onChange={e => {setRequireAuthorizationConsent(e.target.checked)}}/>} />
              <br/>
              <br/>
              <TextField
                label="JWK_SET_URL"
                fullWidth
                value={jwkSetUrl}
                onChange={e => {setJwkSetUrl(e.target.value)}}
                />
              <br/>
              <br/>
              <TextField
                label="ACCESS_TOKEN_TIME_TO_LIVE"
                placeholder="(분: 30분 이하)"
                fullWidth
                value={accessTokenTimeToLive}
                onChange={e => {setAccessTokenTimeToLive(e.target.value)}}
                />
            </CardContent>
          </Card>
          <Card sx={{m:2}}>
            <CardHeader title="AUTHORIZATION GRANT TYPE"/>
            <CardContent>
              <FormGroup aria-label="ClientAuthenticationMethod">
                <FormControlLabel label="AUTHORIZATION_CODE" value={"authorization_code"} control={<Switch size="small" checked={chkAuthorizationCode} onChange={e => {setChkAuthorizationCode(e.target.checked?"checked":"")}}/>} />
                <FormControlLabel label="REFRESH_TOKEN" value={"refresh_token"} control={<Switch size="small" checked={chkRefreshToken} onChange={e => {setChkRefreshToken(e.target.checked?"checked":"")}}/>} />
                <FormControlLabel label="CLIENT_CREDENTIALS (사용자 구분없음. server-to-server)" value={"client_credentials"} control={<Switch size="small" checked={chkClientCredentials} onChange={e => {setChkClientCredentials(e.target.checked?"checked":"")}}/>} />
                <FormControlLabel label="PASSWORD ( x )" value={"password"} control={<Switch size="small" checked={chkPassword} onChange={e => {setChkPassword(e.target.checked?"checked":"")}}/>} />
                <FormControlLabel label="JWT_BEARER" value={"urn:ietf:params:oauth:grant-type:jwt-bearer"} control={<Switch size="small" checked={chkJwtBearer} onChange={e => {setChkJwtBearer(e.target.checked?"checked":"")}}/>} />
                <FormControlLabel label="IMPLICIT ( x )" value={"implicit"} control={<Switch size="small" checked={chkImplicit} onChange={e => {setChkImplicit(e.target.checked?"checked":"")}}/>} />
              </FormGroup>
            </CardContent>
          </Card>
          <Card sx={{m:2}}>
            <CardHeader title="ACCESS TOKEN FORMAT"/>
            <CardContent>
              <FormControl>
                <RadioGroup defaultValue="">
                  <FormControlLabel
                  key={"self-contained"}
                  value={"self-contained"}
                  onChange={changeAccessTokenFormat}
                  checked={accessTokenFormat === "self-contained"}
                  control={<Radio/>}
                  label={"SELF_CONTAINED ( * )"}
                  sx={{ textTransform: 'capitalize' }}
                  />
                  <FormControlLabel
                  key={"reference"}
                  value={"reference"}
                  onChange={changeAccessTokenFormat}
                  checked={accessTokenFormat === "reference"}
                  control={<Radio/>}
                  label={"REFERENCE ( x )"}
                  sx={{ textTransform: 'capitalize' }}
                  />
                </RadioGroup>
              </FormControl>

              <br/>

              <FormControlLabel label="REUSE_REFRESH_TOKENS" control={<Switch size="small" checked={reuseRefreshTokens === true} onChange={e => {setReuseRefreshTokens(e.target.checked)}}/>} />
              <br/>
              <br/>
              <TextField
                label="REFRESH_TOKEN_TIME_TO_LIVE"
                placeholder='(분 : 24시간 이하)'
                fullWidth
                value={refreshTokenTimeToLive} 
                onChange={e => {setRefreshTokenTimeToLive(e.target.value)}}
                />
              <br/>
              <br/>
                

              <div>
              이론상 로그인 후 browser 23:59분 후 다시 클릭하면 access_token이 재 발급되어 로그인 상태 유지되나<br/>
              browser - client(webflux) - resource 의 경우 client가 token을 session 에 가지고 있기 때문에<br/>
              browser를 종료하거나 session timeout 시간이 지나면 logout 상태가 됨<br/>
              client_id, secret 으로 보호된 client만 token을 발급받을 수 있기 때문에 access_token 시간을 session timeout 시간보다 길게 주어도 됨.

              </div>
            </CardContent>  
          </Card>
          <Card sx={{m:2}}>
            <CardHeader title="CLIENT AUTHENTICATION METHOD"/>
            <CardContent>

              <FormGroup aria-label="ClientAuthenticationMethod">
                <FormControlLabel label="CLIENT_SECRET_BASIC" value={"client_secret_basic"} control={<Switch size="small" checked={chkClientSecretBasic} onChange={e => {setChkClientSecretBasic(e.target.checked?"checked":"")}}/>} />
                <FormControlLabel label="CLIENT_SECRET_POST" value={"client_secret_post"} control={<Switch size="small" checked={chkClientSecretPost} onChange={e => {setChkClientSecretPost(e.target.checked?"checked":"")}}/>} />
                <FormControlLabel label="CLIENT_SECRET_JWT" value={"client_secret_jwt"} control={<Switch size="small" checked={chkClientSecretJwt} onChange={e => {setChkClientSecretJwt(e.target.checked?"checked":"")}}/>} />
                <FormControlLabel label="PRIVATE_KEY_JWT" value={"private_key_jwt"} control={<Switch size="small" checked={chkPrivateKeyJwt} onChange={e => {setChkPrivateKeyJwt(e.target.checked?"checked":"")}}/>} />
                <FormControlLabel label="NONE" value={"none"} control={<Switch size="small" checked={chkNone} onChange={e => {setChkNone(e.target.checked?"checked":"")}}/>} />
              </FormGroup>
            </CardContent>
          </Card>  
        </Masonry>
        <div style={{textAlign:"right"}}>
          <Fab variant="extended" size="extended"
          sx={{marginRight: '10px'}}
          onClick={clickSaveBtn}>
            {!window.localStorage.getItem("editClientId")? "등록": "수정"}
          </Fab>
          <Link to="/private/view/admin/management/client">
            <Fab variant="extended" size="extended" color="inherit"
            sx={{marginRight: '30px'}}
            onClick={e => {localStorage.removeItem("editClientId");}}>
              취소
            </Fab>
          </Link>
        </div>
      </div>
    </>
  );
}
