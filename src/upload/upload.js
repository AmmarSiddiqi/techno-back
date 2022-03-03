import googleApis from "googleapis";
import fs from "fs";
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadToDrive(image, drive) {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: image.name,
          mimeType: image.mimetype
        },
        media: {
          mimetype: image.mimetype,
          body: fs.createReadStream(path.join(`${__dirname}/publicimgs/${image.name}`))
        },
      })
      let url = await getUrl(response.data.id, drive);
      return { url, id: response.data.id, error: null };
    } catch (error) {
      console.error(error);
      return { error, url: null, id: null }
    }
  }
  
  async function deleteFile(id, drive) {
    try {
      const response = await drive.files.delete({
        fileId: id
      })
      return { success: "success", error: null };
    } catch (error) {
      console.error(error);
      return { success: null, error };
    }
  }
  
  async function getUrl(id, drive) {
    try {
      await drive.permissions.create({
        fileId: id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      })
      const result = await drive.files.get({
        fileId: id,
        fields: 'webContentLink'
      })
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  
  const uploadImage = async (file) => {
    try {
      const dir = `${__dirname}/publicimgs/`
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      await file.mv(`${dir}/${file.name}`);
      const CLIENT_ID = process.env.CLIENT_ID;
      const CLIENT_SECRET = process.env.CLIENT_SECRET;
      const REDIRECT_URI = process.env.REDIRECT_URI;
      const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
  
      const oauth2Client = new googleApis.google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
  
      oauth2Client.generateAuthUrl({
        access_type: 'offline',
      });
  
      oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
      const drive = googleApis.google.drive({
        version: 'v3',
        auth: oauth2Client
      });
  
      return await uploadToDrive(file, drive);
    } catch (error) {
      return { url: null, id: null, error }
    }
  }
  
  export default uploadImage;