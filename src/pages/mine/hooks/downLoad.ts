// #ifdef APP-PLUS
const JYFileTools = uni.requireNativePlugin("JYFileTools");
// #endif

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

  const downloadForIos = (url: string,fileName:string) => {
    console.log(fileName);
    
    const dtask = plus.downloader.createDownload(url,{
      filename:fileName
    },(d,status) => {
      if(status == 200) {
        if(d.filename) {
          const fileSaveUrl = `file://${encodeURI(plus.io.convertLocalFileSystemURL(d.filename))}`
          console.log(fileSaveUrl);
          
          JYFileTools.jy_saveFile({
            "filePath": fileSaveUrl
          }, (res:any) => {
            console.log(res);
          })
        }
      }else {
        uni.showToast({
          title: '下载失败',
          icon: 'error',
          mask: true
        })
      }
    })
    dtask.start()
    // uni.downloadFile({
    //   url,
    //   success: ({ tempFilePath, statusCode }) => {
    //     console.log('file://' + plus.io.convertLocalFileSystemURL(tempFilePath));
        
    //     JYFileTools.jy_saveFile({
    //       "filePath": 'file://' + plus.io.convertLocalFileSystemURL(tempFilePath)
    //     }, (res:any) => {
    //       console.log(res);
    //     })
    //   },
    //   fail: (error) => {}
    // })
  }

  return {
    downloadAndSaveMP3,
    downloadForIos
  }
}