// hiding the div that will contain the images
const imagesDiv = document.querySelector("#images");
const fileInput = document.querySelector("#upload");

/* start image watermark*/

//doTest();
async function doTest() {
	const result =await fetch("sample.jpg");
	const blob =await result.blob();
	const image = await createImageBitmap(blob);
  
	const testImage = document.querySelector("#testImage");
   
	testImage.src = await watermarkImage(
		  image,
		  "img.ly.2.png"
		);
	}

 /* end image watermark*/
	
fileInput.addEventListener("change", async (e) => {
  const [file] = fileInput.files;
  // displaying the uploaded image
  const originalImage = document.querySelector("#originalImage");
  originalImage.src = await fileToDataUri(file);
  
  // adding the image watermark to the original image
  // and showing the watermarked image
  const watermarkedImage = document.querySelector("#watermarkedImage");
  const watermarkedImageWithText = document.querySelector(
    "#watermarkedImageWithText"
  );
  
  originalImage.addEventListener("load", async () => {
	  
    /* start image watermark*/
    watermarkedImage.src = await watermarkImage(
      originalImage,
      "img.ly.2.png"
    );
    
	/* end image watermark*/
	
	/* start text watermark*/
	
    // watermarkedImageWithText.src = watermarkImageWithText(
      // originalImage,
      // "text ex. Playback Filmul!"
    // );
	
	/* end text watermark*/
  });
  
  // making the div containing the image visible
  imagesDiv.style.visibility = "visible";
  
  return false;
});

function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    
    reader.readAsDataURL(field);
  });
}

async function watermarkImage(originalImage, watermarkImagePath) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  
  const canvasWidth = originalImage.width;
  const canvasHeight = originalImage.height;
  
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  // initializing the canvas with the original image
  context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);
  
  // loading the watermark image and transforming it into a pattern
  const result = await fetch(watermarkImagePath);
  const blob = await result.blob();
  const image = await createImageBitmap(blob);
  
   var imgWidth = image.width;
    var imgHeight = image.height;
  var scaleX = 1;
    if (image.width > canvasWidth)
        scaleX = canvasWidth/image.width;
     var scaleY = 1;
    if (image.height > canvasHeight)
        scaleY = canvasHeight/image.height;
    var scale = scaleY;
    if(scaleX < scaleY)
        scale = scaleX;
    if(scale < 1){
        imgHeight = imgHeight*scale;
        imgWidth = imgWidth*scale;          
    }
	
	debugger;
  context.drawImage(image,0,0, image.width,image.height,  canvasWidth - image.width, canvasHeight - image.height, imgWidth, imgHeight);
  
  // const pattern = context.createPattern(image, "no-repeat");
  // const pattern = context.createPattern(image, "no-repeat");
  
  // translating the watermark image to the bottom right corner
  //context.translate(canvasWidth - image.width, canvasHeight - image.height);
  //context.rect(0, 0, canvasWidth, canvasHeight);
  //context.fillStyle = pattern;
  
 
  
  return canvas.toDataURL('image/jpeg', 0.3);
}

function watermarkImageWithText(originalImage, watermarkText) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  
  const canvasWidth = originalImage.width;
  const canvasHeight = originalImage.height;
  
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);
  
 
  context.fillStyle = "white";
  context.textBaseline = "middle";
  context.font = "bold 25px serif";
  context.fillText(watermarkText, canvasWidth - 500, canvasHeight - 120);
  
  return canvas.toDataURL('image/jpeg', 0.3);
}
