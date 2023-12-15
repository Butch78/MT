import { AbstractApiService } from "./AbstractApiService";


//  TODO upload to S3 bucket
class FileApiService extends AbstractApiService {
  constructor() {
    const baseURL = import.meta.env.FASTAPI_URL
    super("/v1/upload", baseURL);
  }

  files() {
    return this.http
      .get("")
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }

  file(id: string) {
    return this.http
      .get(`/${id}`)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }

  createFile(file: any, user_id: string) {
    const formData = new FormData();
    if (file.files[0]) {
      formData.append("file", file.files[0]);
      console.log('>> formData >> ', formData);

      const url = `/${user_id}`;
      return this.http
        .post(url, formData,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this));
    }
  }

  updateFile(file: any) {
    return this.http
      .put(`/${file.id}`, file)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }
}

export const fileApiService = new FileApiService();
