const setLocalStorageWithExpiry = (key:string, value:string, ttl?:number) => {
	const now = new Date()

	let item = {
		value: value,
		expiry: 0
	}
	if(ttl){
		item.expiry = now.getTime() + ttl;	// ttl ex) 5000 : 5초
	}
	localStorage.setItem(key, JSON.stringify(item))
}


const getLocalStorageWithExpiry = (key:string) => {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	if (item.expiry !== 0 && now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	} else {
		return item.value;
	}
}

export {setLocalStorageWithExpiry, getLocalStorageWithExpiry}