/* eslint-disable no-restricted-syntax */
const getFileType = (extension) => {
  const typesByExtension = {
    presentation: ['pptx', 'ppt', 'key', 'bin'],
    pdf: ['pdf'],
    document: ['docx', 'doc', 'pages', 'txt'],
    audio: ['mp3', 'wav', 'ogg', 'wma', 'aac', 'm4a', 'flac', 'mpga'],
    image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
    video: ['mp4', 'avi', 'wmv', 'mov', 'm4v', 'flv']
  };

  const defaultType = 'document';
  let fileType = defaultType;

  for (const [type, extensions] of Object.entries(typesByExtension)) {
    if (extensions.includes(extension.toLowerCase())) {
      fileType = type;
      break;
    }
  }

  return fileType;
};

export default getFileType;
