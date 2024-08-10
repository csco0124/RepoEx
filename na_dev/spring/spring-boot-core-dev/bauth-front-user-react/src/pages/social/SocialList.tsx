import { deleteWebauthn, registWebauthn } from "@/auth/Webauthn";
import AppBarGoBack from "@/components/AppBarGoBack";
import { $axios } from "@/configs/axiosConfig";
import { useAlert } from "@/hooks/useAlert";
import { authPath, socialPath } from "@/routes/paths";
import { getUrlParam, isNotEmpty } from "@/utils/commonUtil";
import { Box, Button, Card, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface userInfoType{
  username: string,
  userHandle: string,
  email: string
}

const socialList = () => {
  const [userInfo, setUserInfo] = useState<userInfoType>();

  const [kakaoOn, setKakaoOn] = useState(false);
  const [naverOn, setNaverOn] = useState(false);
  const [googleOn, setGoogleOn] = useState(false);
  const [webauthnOn, setWebauthnOn] = useState(false);

  const {Alert} = useAlert();
  const navigate = useNavigate();

  const socialAuth = (social:string) => {
    if(social == 'kakao'){
      location.href = "/oauth2/authorization/kakao";
    }
    if(social == 'naver'){
      location.href = "/oauth2/authorization/naver";
    }
    if(social == 'google'){
      location.href = "/oauth2/authorization/google";
    }
    if(social == 'webauthn'){
      $axios.get('/private/api/common/userInfo').then((res: any) => {
        const data = res.data.data;

        localStorage.setItem('email', data.email);
        registWebauthn(Alert, userInfo, () => {setWebauthnOn(true)});
      }).catch((err: any) => {
        console.log(err);
      })
    }
  }
  const eventBinding = {
    kakaoChange: () => {
      if(kakaoOn){
        socialKeyDelete('kakao', () => {setKakaoOn(false)});
      }else{
        socialAuth('kakao');
      }
    },
    naverChange: () => {
      if(naverOn){
        socialKeyDelete('naver', () => {setNaverOn(false)});
      }else{
        socialAuth('naver');
      }
    },
    googleChange: () => {
      if(googleOn){
        socialKeyDelete('google', () => {setGoogleOn(false)});
      }else{
        socialAuth('google');
      }
    },
    webauthnChange: () => {
      if(webauthnOn){
        socialKeyDelete('webauthn', () => {setWebauthnOn(false)});
      }else{
        socialAuth('webauthn');
      }
    }
  }

  useEffect(() => {
    socialAuthFailCheck();
    socialChkBoxSetting();
  }, [])
  
  const socialAuthFailCheck = () => {
    const error = getUrlParam('error');
    if(error == "USERALREADYEXIST"){
      Alert({
        message : '해당 소셜 계정은 이미 등록되어 있습니다.',
        onClose : () => {
          navigate(socialPath('/social-list'));
        }
      });
    }
  }

  const socialChkBoxSetting = () => {
    $axios.get('/private/api/social/key').then((res: any) => {
      const data = res.data.data;
      
      if(res.data.error != "OK"){
        return;
      }

      console.log(data.kakaoKey);
      console.log(isNotEmpty(data.kakaoKey))

      if(data.kakaoKey){
        setKakaoOn(true);
      }
      if(data.naverKey){
        setNaverOn(true);
      }
      if(data.googleKey){
        setGoogleOn(true);
      }
    }).catch((err: any) => {
      console.log(err);
    });

    $axios.get('/public/api/profile').then((res: any) => {
      const profile = res.data.data;

      if(res.data.error != "OK"){
        return;
      }

      setUserInfo({
        username: profile.username,
        userHandle: profile.userHandle,
        email: profile.email
      });

      if(profile.authenticators.length > 0){
        setWebauthnOn(true);
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

  const socialKeyDelete = async (social:string, callbackFn: Function) => {
    if(social != 'webauthn'){ //social auth
      const url = `/private/api/social/key/${social}`;
      $axios.put(url).then(() => {
        callbackFn();
      }).catch((err: any) => {
        console.log(err)
      });
    }else{ //webauthn
      const isSuccess:boolean = await deleteWebauthn(userInfo);

      let msg:string = "";
      if(isSuccess){
        msg = '간편인증 삭제에 성공하였습니다.';
      }else{
        msg = '간편인증 삭제에 실패하였습니다.';
      }

      Alert({message: msg, onClose: () => {
        callbackFn();
      }});
    }

  }

  const formControlStyle = {margin: 0, height: 60, width: '90%', paddingLeft: '12px', borderBottom: '1px solid #bbb' };
  const labelStyle = {width: '100%', textAlign: 'left'};

  return (
    <>
      <AppBarGoBack/>      
      <Card style={{ height:'100%', textAlign: 'center', boxShadow: 'none' }}>
        <Grid>
          <Grid>
            <FormControlLabel
              control={<Switch checked={kakaoOn} onChange={() => {eventBinding.kakaoChange()}}/>}
              label={<Typography sx={labelStyle}>카카오 로그인</Typography>}
              labelPlacement="start"
              sx={formControlStyle}
            />
          </Grid>
          <Grid>
            <FormControlLabel
              control={<Switch checked={naverOn} onChange={() => {eventBinding.naverChange()}}/>}
              label={<Typography sx={labelStyle}>네이버 로그인</Typography>}
              labelPlacement="start"
              sx={formControlStyle}
            />
          </Grid>
          <Grid>
            <FormControlLabel
              control={<Switch checked={googleOn} onChange={() => {eventBinding.googleChange()}}/>}
              label={<Typography sx={labelStyle}>구글 로그인</Typography>}
              labelPlacement="start"
              sx={formControlStyle}
            />
          </Grid>
          <Grid>
            <FormControlLabel
              control={<Switch checked={webauthnOn} onChange={() => {eventBinding.webauthnChange()}}/>}
              label={<Typography sx={labelStyle}>간편인증 로그인</Typography>}
              labelPlacement="start"
              sx={formControlStyle}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default socialList;