import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { setTreeParentsNodeName } from "../../store/LeftTreeReducer";

const LocationChangeAction = ({setIsNoNavi}:any) => {
  const location = useLocation();
	const navigate = useNavigate();
	const leftMenuState = useSelector((state: RootState) => state.leftTree);
	const dispatch = useDispatch();

  useEffect(() => {
		const userLogin = window.localStorage.getItem("userLogin");
		if(location.pathname === "/login"){
			setIsNoNavi(true);
		} else if(!userLogin){
			setIsNoNavi(true);
			navigate("/login");
		} else {
			setIsNoNavi(false);
		}
		//console.log('location.pathname', location.pathname);
		dispatch(setTreeParentsNodeName({treeId:location.pathname.replace("/","")}));
  }, [location]);
	
	return (
		<></>
	)
};

export default LocationChangeAction;
