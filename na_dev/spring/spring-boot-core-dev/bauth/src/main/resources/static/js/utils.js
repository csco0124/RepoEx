let utils = {
    isApp() {
        let reg = new RegExp(/NARUI_(.*?)_APP/ig);
        return reg.test(navigator.userAgent);
    },

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    isPC() {
        return !this.isMobile();
    }
}