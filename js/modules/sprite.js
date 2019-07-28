let _imageSprite = null;

export function getImageSprite() {
	return _imageSprite;
}

export function loadImageSprite() {
	return new Promise((resolve) => {
        let img = new Image();
        img.addEventListener('load', () => {
            _imageSprite = img;
            resolve(img);
        });
        img.src = './assets/images/sprite.png';
	});
}


/*
function loadImage(url) {
  return new Promise((resolve, reject) => {
    img.addEventListener('error', () => {
      reject(new Error(`Failed to load image's URL: ${url}`));
    });
  });
}*/
