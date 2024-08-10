import {Card, CardContent} from "@mui/material";
import PasswordChecklist from "react-password-checklist";
import { Password } from "@pages/auth/ResetPassword";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

const PasswordValidField = ({passwordValue, setPasswordState}: {passwordValue: string, setPasswordState: React.Dispatch<React.SetStateAction<Password>>}) => {
  return (
    <Card sx={{maxWidth: "280px", position: 'absolute', zIndex: '10'}}>
      <CardContent sx={{backgroundColor: "#2EAC74", color: "white", fontSize: "13px", textAlign: "left"}}>
        최소 8자 이상, 소문자, 대문자, 특수문자 반드시 포함
      </CardContent>
      <CardContent>
        <PasswordChecklist
          style={{fontSize: "14px", textAlign: "left", backgroundColor: "transparent"}}
          rules={["minLength", "lowercase", "capital", "number", "specialChar"]}
          minLength={8}
          value={passwordValue}
          messages={{
            minLength: "비밀번호 길이",
            lowercase: "소문자",
            capital: "대문자",
            number: "숫자",
            specialChar: "특수문자",
          }}
          iconComponents={{
              ValidIcon: <CircleIcon sx={{color: "#2EAC74"}}/>, 
              InvalidIcon: <CircleOutlinedIcon sx={{color: "#2EAC74"}}/>
          }}
          onChange={(isPasswordValid: boolean) => setPasswordState(prev => ({...prev, isValid: isPasswordValid}))}
        />
        </CardContent>
    </Card>
  )
}

export { PasswordValidField }