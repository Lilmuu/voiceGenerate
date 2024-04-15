import { getBatteryInfoSync } from "@/uni_modules/uni-getbatteryinfo";

export const useDownLoadToLocal = () => {
  const downloadAndSaveMP3 = (base64: string, fileName: string) => {
    return new Promise((resolve, reject) => {

      let dir = '/硅灵造物';
      let environment: any = plus.android.importClass("android.os.Environment");
      var sdRoot = environment.getExternalStorageDirectory(); //文件夹根目录
      var File: any = plus.android.importClass("java.io.File");
      var Base64: any = plus.android.importClass("android.util.Base64");
      var FileOutputStream: any = plus.android.importClass("java.io.FileOutputStream");

      try {
        //不加根目录创建文件(即用相对地址)的话directory.exists()这个判断一值都是false
        console.log(sdRoot + dir)
        let directory = new File(sdRoot + dir);
        if (!directory.exists()) {
          console.log('创建目录')
          directory.mkdirs(); //创建目录
        }
        if (!directory.exists()) {
          console.log('创建目录失败')
        } else {
          console.log('创建目录成功')
        }
        let downloadFiles = new File(`${sdRoot}${dir}/${fileName}`)
        if (downloadFiles.exists()) {
          resolve({
            fileStatus: 1,
            path: `${dir}/${fileName}`
          })
          return
        }
        console.log('文件不存在');

        let fos = new FileOutputStream(`${sdRoot}${dir}/${fileName}`)

        let bytes = Base64.decode(base64, 0);
        try {
          fos.write(bytes);
          fos.flush();
          fos.close();
          resolve({
            fileStatus: 0,
            path: `${dir}/${fileName}`
          })
        } catch (e) {
          console.log(e);
          reject(e)
        }
      } catch (e) {
        console.log(e);
        reject(e)
      }
    })
  }

  const downloadForIos = () => {
    // var NSSearchPathForDirectoriesInDomains = plus.ios.newObject("NSSearchPathForDirectoriesInDomains");
    // var NSDocumentDirectory = plus.ios.newObject("NSDocumentDirectory");
    // var NSUserDomainMask = plus.ios.newObject("NSUserDomainMask");
    // let docsdir = plus.ios.invoke(NSSearchPathForDirectoriesInDomains,'NSDocumentDirectory:NSUserDomainMask:',true)
    // console.log(NSSearchPathForDirectoriesInDomains);
    // var BundleClass = plus.ios.importClass("NSBundle");  
    // var BundleObj = BundleClass.mainBundle();  
    // var filenamagerobj = plus.ios.newObject("NSFileManager");  
    // var FileAttr = plus.ios.invoke(filenamagerobj,"attributesOfFileSystemForPath:error:",BundleObj.bundlePath(),null);  
    // console.log(FileAttr,'FileAttr');
    // // NSFileSystemFreeSize 参数获取剩余空间  0
    // // NSFileSystemSize  获取手机总存储空间  
    // var freeSpace = plus.ios.invoke(FileAttr,"objectForKey:","NSFileSystemFreeSize");  
    // console.log(freeSpace,'freeSpace');
    // var numberFormatterObj = plus.ios.newObject("NSNumberFormatter");  
    // console.log(numberFormatterObj,'numberFormatterObj');
    // var FreeSpaceStr = plus.ios.invoke(numberFormatterObj,"stringFromNumber:",freeSpace);  
    // console.log(FreeSpaceStr,'FreeSpaceStr');
    // var freeSpaces = FreeSpaceStr / 1024/1024/1024;
    // console.log(freeSpaces,'freeSpaces');
    console.log(getBatteryInfoSync());
    
  }

  return {
    downloadAndSaveMP3,
    downloadForIos
  }
}