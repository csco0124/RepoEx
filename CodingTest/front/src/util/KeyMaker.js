export const KeyMaker = {
    makeKey : (language,type,level) => {
        return `${language}_level${level}_${type}`;
    }
}