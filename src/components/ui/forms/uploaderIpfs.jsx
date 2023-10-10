import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import { uploadToIPFS } from '@/utils/ipfsClient';
import Loader from '../loader';

function UploaderIpfs({ setFileImage }) {
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFile) => {
    try {
      setLoading(true);
      const file = acceptedFile[0];
      const url = await uploadToIPFS(file);
      setFileUrl(url);
      setFileImage(url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });
  return (
    <div className="rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6">
      <div
        {...getRootProps({
          className:
            'border border-dashed relative border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center rounded-lg',
        })}
      >
        <input {...getInputProps()} />
        {loading ? (
          <Loader />
        ) : (
          <>
            {fileUrl ? (
              <Image src={fileUrl} alt="image" width={150} height={150} />
            ) : (
              <div className="text-center">
                <p className="mb-6 text-sm tracking-tighter text-gray-600 dark:text-gray-400">
                  PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                </p>
                <Button>CHOOSE FILE</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UploaderIpfs;
