'use client';
import { Supabase } from '@/lib/supa';
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

const supabase = Supabase();
const tus = require('tus-js-client');
const projectId = '';

export default function CreateItem() {
  const [progress, setProgress] = useState("");
  const [progVis, setProgVis] = useState(false);

  async function uploadThing(formData: FormData) {
    const file: File | any = formData.get('file');
    const fileType = file['type'];

    const { data: { user }} = await supabase.auth.getUser();
    const fileName = user.email.split('@')[0] + Date.now();


    //add data to the table now:
    let bucket = '*';
    if (fileType.startsWith('video')) {
      bucket = "video";
    } else if (fileType.startsWith('audio')) {
      bucket = "audio";
    } else {
      bucket = "images";
    }

    await uploadFile(bucket, fileName, file, fileType);

    const { data: url } = await supabase.storage.from(bucket).getPublicUrl(fileName);
    const { data: result } = await supabase.from(bucket).insert({ email: user.email,
                                                                  url: url.publicUrl,
                                                                  title: file['name'],
                                                                  caption: formData.get('caption')});

                                                  
  
    redirect('/dashboard');
  }

  async function uploadFile(bucketName: string, fileName: string, file: File, fileType: string) {
      setProgVis(true);
      setProgress("0");
      const { data: { session } } = await supabase.auth.getSession()
  
      return new Promise<void>((resolve, reject) => {
          var upload = new tus.Upload(file, {
              endpoint: `https://skhxtmjbcfmytgqgdayj.supabase.co/storage/v1/upload/resumable`,
              retryDelays: [0, 3000, 5000, 10000, 20000],
              headers: {
                  authorization: `Bearer ${session.access_token}`,
                  'x-upsert': 'true', // optionally set upsert to true to overwrite existing files
              },
              uploadDataDuringCreation: true,
              removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
              metadata: {
                  bucketName: bucketName,
                  objectName: fileName,
                  contentType: fileType,
                  cacheControl: 3600,
              },
              chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
              onError: function (error: any) {
                  console.log('Failed because: ' + error)
                  reject(error)
              },
              onProgress: function (bytesUploaded: number, bytesTotal: number) {
                  var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
                  console.log(bytesUploaded, bytesTotal, percentage + '%')
                  setProgress(percentage);
              },
              onSuccess: function () {
                  console.log('Download %s from %s', upload.file.name, upload.url)
                  resolve()
              },
          })
  
  
          // Check if there are any previous uploads to continue.
          return upload.findPreviousUploads().then(function (previousUploads: any) {
              // Found previous uploads so we select the first one.
              if (previousUploads.length) {
                  upload.resumeFromPreviousUpload(previousUploads[0])
              }
  
              // Start the upload
              upload.start()
          })
      })
  }

  return (
    <div className="flex flex-col">
      <form action={uploadThing}>
        <div className="flex flex-col">
          <label>Choose file</label>
          <input name="file" type="file" accept="image/*, audio/mpeg, video/*," required/>
          <label>Caption</label>
          <input name="caption" type="text" required/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
        </div>
        
      </form>
      {progVis ? <div>Uploading file.. %{progress}</div> : null}
    </div>
  );

}
//const [hideAlbumArt, setHideAlbumArt] = useState(false);
//<div className={` ${hideAlbumArt ? 'visible' : 'hidden'} `}>INPUT FOR ALBUM ART</div>
