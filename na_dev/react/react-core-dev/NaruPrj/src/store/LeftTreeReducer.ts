import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../common/CommonAxios";
import { NodeModel } from "../components/pages/exam/menu-tree/types";

const getTreeData:any = createAsyncThunk(
  'treeReducer/getTreeData',
  async ({treeType3}:any) => {
		const returnData = {treeData3:{}};
    await $api.post("/api/tree/get", {treeType : treeType3}).then(response => {
			try {
					const sortedTreeData3 = [...JSON.parse(response.data.treeJson)['003']];
					//console.log(sortedTreeData3);
					sortedTreeData3.sort((a, b) => {
						if (a['ord'] && b['ord'] && a['ord'] < b['ord']) return -1;
						if (a['ord'] && b['ord'] && a['ord'] > b['ord']) return 1;
						return 0;
					});
					returnData.treeData3 = sortedTreeData3;

			} catch (error) {
			console.error('JSON 파싱 오류:', error);
			// 에러 처리
			}
		});

    return returnData;
  }
)

const setTreeParentsNodeName:any = createAsyncThunk(
  'treeReducer/setTreeParentsNodeName',
  async ({treeId}:any, { getState }) => {
		const state:any = getState(); 
		const textArray: string[] = [];
		let treeType:number = 0;
		const getTreeTextArrayById = (data: NodeModel[], id: string, treeTypeNum:number) => {
			const traverse = (node: NodeModel) => {
				textArray.unshift(String(node.id)); // 배열의 맨 앞에 추가하기 위해 unshift() 사용
				
				const parentNode = data.find(item => item.id === node.parent);
				if (parentNode) {
					treeType = treeTypeNum;
					traverse(parentNode);
				}         
			}
			const startNode = data.find(item => item.id === id);
			if (startNode) {
				traverse(startNode);
			}
		}
		
		getTreeTextArrayById(state.leftTree.treeData1, treeId, 1);
		getTreeTextArrayById(state.leftTree.treeData2, treeId, 2);
		getTreeTextArrayById(state.leftTree.treeData3, treeId, 3);
		if(treeType == 1){
			textArray.unshift("AdminInfoMgt");
		} else if (treeType == 2){
			textArray.unshift("DashBoardCbMgt");
		} else if(treeType == 3){
			textArray.unshift("DemoMgt");
		}
		return textArray;
  }
)

const setTreeParentsNodeUrl: any = createAsyncThunk(
	'treeReducer/setTreeParentsNodeUrl',
	async ({treeUrl}: any, { getState }) => {
		const state: any = getState();
		const urlTextArray: string[] = [];
		let treeType: number = 0;
		const getTreeTextArrayByUrl = (data: NodeModel[], url: string, treeTypeNum:number) => {
			const traverse = (node: NodeModel) => {
				urlTextArray.unshift(String(node.id));
				const parentNode = data.find(item => item.id === node.parent);
				if(parentNode) {
					// 부모가 있으므로..
					treeType = treeTypeNum;
					traverse(parentNode);
				}
			}
			const startNodeUrl = data.find(item => item.url === url.replace("/",""));
			if(startNodeUrl) {
				traverse(startNodeUrl);
			}
			
		}

		getTreeTextArrayByUrl(state.leftTree.treeData1, treeUrl, 1);
		getTreeTextArrayByUrl(state.leftTree.treeData2, treeUrl, 2);
		getTreeTextArrayByUrl(state.leftTree.treeData3, treeUrl, 3);
		if(treeType == 1){
			urlTextArray.unshift("AdminInfoMgt");
		} else if (treeType == 2){
			urlTextArray.unshift("DashBoardCbMgt");
		} else if(treeType == 3){
			urlTextArray.unshift("DemoMgt");
		}
		return urlTextArray;

	}

)

const initialState = { treeData1: [], treeData2: [], treeData3: [], treeType:5, textArray:[], urlTextArray:[] } as any;

export const LeftTreeReducer = createSlice({
  name: "test",
  initialState,
  reducers: {
		setTreeType(state, action: PayloadAction<any>) {
      state.treeType = action.payload.treeType;
    }
	},
	extraReducers: (builder) => {
    builder.addCase(getTreeData.fulfilled, (state,action)=>{
			console.log('getTreeData.fulfilled', action.payload);
      state.treeData1 = action.payload.treeData1;
      state.treeData2 = action.payload.treeData2;
			state.treeData3 = action.payload.treeData3;
    }),
		builder.addCase(setTreeParentsNodeName.fulfilled, (state,action)=>{
			console.log('setTreeParentsNodeName.fulfilled', action.payload);
      state.textArray = action.payload;
    }),
		builder.addCase(setTreeParentsNodeUrl.fulfilled, (state, action)=>{
			console.log("setTreeParentsNodeUrl.fulfilled", action.payload);
			state.urlTextArray = action.payload;
		})
  }
});

export const { setTreeType } = LeftTreeReducer.actions;
export default LeftTreeReducer.reducer;
export {getTreeData, setTreeParentsNodeName, setTreeParentsNodeUrl}
