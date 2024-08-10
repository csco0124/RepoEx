import React, { useEffect, useState } from 'react';
import { $axios } from '@/configs/axios/axiosConfig';
import { useAlert } from '@/hooks/useAlert';
import { Typography, Stack, Box, Card, Button, TextField, Fab, InputLabel, FormControl, FormControlLabel, Switch, Select, MenuItem } from "@mui/material";
import { btnModal } from "@/components/popupStyle";
import { mt } from "date-fns/locale";
const ManagementRoleModal = (props) => {
  const { Alert, AlertWarn, AlertError } = useAlert();

  const [cnt, setCnt] = useState(0);

  const [id, setId] = useState();
  const [clientName, setClientName] = useState(""); // clientId = oauth2_registered_client_id
  const [clientPK, setClientPK] = useState(""); // clientId = oauth2_registered_client_id
  const [clientId, setClientId] = useState(""); // clientId = oauth2_registered_client_id
  const [roleName, setRoleName] = useState("");
  const [defaultYn, setDefaultYn] = useState("N");

  const [searchRoleName, setSearchRoleName] = useState("");

  //조회된 role list
  const [roleList, setRoleList] = useState([]);

  //조회된 client list
  const [clientInfoList, setClientInfoList] = useState([]);

  //등록 버튼으로 진입하면 client list를 조회
  const setClientInfo = async () => {
    const response = (await $axios.get('/private/api/registered-client/all-list'));
    console.log(response);
    setClientInfoList(response.data.data); 
  }

  //수정 버튼으로 진입하면 client role 정보를 조회(단건)
  const setClientRole = async () => {
    const response = (await $axios.get('/private/api/admin/client-role/'+searchRoleName));
    console.log(response);

    const roleInfo = response.data.data;
    const authority = roleInfo.authority
    setId(roleInfo.id);
    setClientName(authority.substring(authority.indexOf("_")+1, authority.lastIndexOf("_")));
    setClientId(roleInfo.registeredClientId);
    setRoleName(authority.substring(authority.lastIndexOf("_")+1));
    setDefaultYn(roleInfo.defaultYn);
  }

  //client 수정페이지에서 진입하면 role list 조회
  const getRoleList = async () => {
    setClientName(props.clientName);
    setClientPK(props.clientId);

    const response = (await $axios.get('/private/api/admin/client-role/client/'+props.clientId));
    console.log(response);
    console.log(response.data.data);
    if(response.data.data.length > 0){
      setRoleList(response.data.data)
    }
  }

  useEffect(()=>{
    //roleModalType [reg = 등록, edit = 수정]
    if(props.mode == "reg"){
      setClientInfo();
    }else if(props.mode == "edit"){
      setSearchRoleName(props.roleName);
    }else if(props.mode == "client"){
      getRoleList();
    }
  }, [cnt]);

  useEffect(()=>{
    if(props.mode == "edit" && !!searchRoleName){
      setClientRole();
    }
  }, [searchRoleName]);
  
  // 등록/수정 버튼 클릭 이벤트
  const clickSaveBtn = async () => {
    let params = {
        "id" : null,
        "authority" : "ROLE_"+roleName,
        "defaultYn" : defaultYn,
        "registeredClientId" : clientPK,
		};

    $axios.post('/private/api/admin/client-role', params)
    .then((res)=>{
      console.log(res);
      if(res.data.error == "OK"){
        Alert("등록완료");
        
        if(props.mode == "reg"){
          props.callback();
          props.onClose();
        }else{
          setCnt(cnt+1);
          setRoleName("");
          setDefaultYn("N");
        }
      }
    })
    .catch((err) => {
      console.log("error!", err);
    });
  }

  // 삭제 버튼 클릭 이벤트
  const clickDelBtn = async () => {
    $axios.delete('/private/admin/api/client-role/'+clientPK)
    .then((res)=>{
      console.log("save 결과 : ", res);
      setCnt(cnt+1);
    })
    .catch((err) => {
      console.log("error!", err);
    });
  }

  // 
  const delRole = async (key) => {
    if(confirm("삭제?")){
      const response = await $axios.delete('/private/api/admin/client-role/'+key);
      setCnt(cnt+1);
    }else{

    }
  }

  return (
      <Stack>
        <Box>
          
          {props.mode == "client"?"":
            <Stack sx={{mb:"10px"}}>
              {props.mode == "edit"?
                <TextField
                  label="Client"
                  value={clientName + " [" + clientId + "]"}
                  fullWidth
                  disabled
                  />
                :
                <FormControl>
                  <InputLabel id="clientId">Client</InputLabel>
                  <Select
                    labelId="clientId"
                    id="clientId"
                    label="Client ID"
                    onChange={e => {
                      setClientPK(JSON.parse(e.target.value).clientId);
                      setClientName(JSON.parse(e.target.value).clientName);
                    }}
                    fullWidth 
                  >
                    {clientInfoList.map((clientInfo, idx) => (
                      <MenuItem key={idx} value={JSON.stringify({clientId : clientInfo.id, clientName : clientInfo.clientName})}>{clientInfo.clientName} [{clientInfo.clientId.substring(0,clientInfo.clientId.indexOf("-"))}]</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
            </Stack>
          }
          <Box>
            <TextField
              label="Role Name"
              value={roleName}
              onChange={e => {setRoleName(e.target.value)}}
              sx={{mr:"10px"}}
              fullWidth
              />
          </Box>
          <Box align={"right"} sx={{mt:"10px"}}>
            <FormControlLabel label="DefaultYn" control={<Switch checked={defaultYn=="Y"?true:false} onChange={e => {setDefaultYn(e.target.checked?"Y":"N")}}/>} />
            {props.mode == "reg" || props.mode == "client"?
              <span>
                <Button variant="contained" sx={{mr:"10px", height:"56px"}} onClick={clickSaveBtn}>등록</Button>
              </span>
              :
              <span>
                <Button variant="contained" sx={{mr:"10px", height:"56px"}} onClick={clickSaveBtn}>수정</Button>
                <Button variant="contained" sx={{mr:"10px", height:"56px"}} onClick={clickDelBtn}>삭제</Button>
              </span>
            }
          </Box>
        </Box>
        {props.mode == "client" && roleList.length > 0?
          <Stack sx={btnModal}> 
            <Box>
              {roleList.map(role => (
                <Fab key={role.authority}
                  variant="extended" size="medium" sx={{mr:"5px", mt:"10px"}}
                  onClick={e => {delRole(role.authority);}}
                  >{role.authority.substring(role.authority.lastIndexOf('_')+1)}</Fab>
              ))}
            </Box>
          </Stack>
        :""}
      </Stack>
  )
}

export { ManagementRoleModal };