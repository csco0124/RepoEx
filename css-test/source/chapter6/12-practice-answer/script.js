/* 라이트 박스로 같은 페이지 안에 이미지를 표시 */
/* 이미지만 표시 */
// new LuminousGallery(document.querySelectorAll(".lightbox"));

/* alt 속성 내 텍스트를 이미지 하단에 표시 */
new LuminousGallery(document.querySelectorAll('.lightbox'), {}, {
  caption: function(trigger) {
    return trigger.querySelector('img').getAttribute('alt');
  }
});