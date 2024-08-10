import React, { useState } from 'react';

export type UtilityItemType = {
  no: number;
  title: string;
};
export type UtilityContextValueType = {
  state : UtilityItemType,
	actions: {
		setNo: (no: number) => void;
		setTitle: (title: string) => void;
	},
};

type PropsType = {
  children: JSX.Element | JSX.Element[];
};

const UtilityContext = React.createContext<UtilityContextValueType | null>(null);

export const UtilityProvider = (props: PropsType) => {
	const [no, setNo] = useState<number>(0);
	const [title, setTitle] = useState<string>('');
	
	const values: UtilityContextValueType = {
		state : {no : no, title : title},
		actions: { setNo, setTitle },
  };
	return <UtilityContext.Provider value={values}>{props.children}</UtilityContext.Provider>;
};

export default UtilityContext;