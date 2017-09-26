export const apiBase = 'http://webapps.barco.com/cs/ping/api/v1';
// export const apiBase = 'http://webapps.bgstst04.barco.com/cs/ping/api/v1';
const uploadUrl = 'http://webapps.bgstst04.barco.com/cs/ping/web/newFile.asp';
export const imageDir = 'images/icons';
export const fileTypes = {
  bat: 'Windows Batch file',
  cmd: 'Windows Command Script|bat',
  bmp: 'Bitmap image',
  doc: 'Microsoft Word 97 - 2003 Document',
  docx: 'Microsoft Word Document|doc',
  gif: 'GIF image',
  html: 'HTML document',
  htm: 'HTML document|html',
  ini: 'Configuration settings',
  jpg: 'JPEG image',
  jpeg: 'JPEG image',
  mdb: 'Microsoft Access Database',
  mp3: 'MP3 Format Sound',
  msi: 'Windows Installer Package',
  exe: 'Application|msi',
  pdf: 'Adobe Acrobat Document',
  psp: 'PSP file',
  snp: 'SNP File',
  txt: 'Text document|text',
  ttf: 'TrueType font file',
  vsd: 'Microsoft Visio Drawing',
  wma: 'Windows Media Audio file',
  xls: 'Microsoft Excel 97 - 2003 Worksheet',
  xlsx: 'Microsoft Excel Worksheet|xls',
  zip: 'Compressed (zipped) folder',
  tar: 'Compressed (tarred) folder|zip',
  gz: 'Compressed (gzipped) folder|zip',
  tgz: 'Compressed (targzipped) folder|zip',
  '7z': 'Compressed (7zipped) folder|zip',
  rar: 'Compressed (rarred) folder|zip',
  js: 'JScript Script File|file',
  vbs: 'VBScript Script File|file',
  cs: 'Visual C# Source file|file',
  css: 'Cascading Style Sheet Document|file'
};
export const uploadDirectories = {
  0: {
    id: 0,
    name: 'Support',
    uploadTypes: [0, 1]
  },
  2: {
    id: 2,
    name: 'ProgramMgmt',
    uploadTypes: [0]
  }
};
export const uploadTypes = {
  0: {
    id: 0,
    name: 'Generic file',
    code: 'GEN'
  },
  1: {
    id: 1,
    name: 'Visit report',
    code: 'VST',
    folder: '4_Service'
  }
};