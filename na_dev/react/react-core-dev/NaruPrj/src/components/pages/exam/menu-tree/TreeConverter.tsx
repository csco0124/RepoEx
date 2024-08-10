const TreeConverter = (data: any) => {
  const map = new Map();
  const roots = [];

  const newData = data.map((obj: any) => {
    return { ...obj, name: obj.text, text: undefined, id: String(obj.id) };
  });

  // create a map for efficient lookup of nodes by id
  for (const node of newData) {
    node.children = [];
    map.set(node.id, node);
  }

  // link child nodes to parent nodes
  for (const node of newData) {
    if (node.parent !== 0) {
      const parent = map.get(String(node.parent));
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  // check if children is empty array and remove the property
  const removeChildren = (node: any) => {
    if (Array.isArray(node.children) && node.children.length === 0) {
      delete node.children;
    } else {
      node.children.forEach(removeChildren);
    }
  };

  roots.forEach(removeChildren);

  return roots;
};

export default TreeConverter;