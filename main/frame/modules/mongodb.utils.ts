// import { Logger } from "main/core/utils/logger.utils";

// const { MongoClient } = require("mongodb");

// export class MongoDbClient {
//   private logger: Logger;

//   constructor(baseUrl: string) {
//     const client = new MongoClient(uri);
//     this.logger = new Logger({priority: 'high'});
//   }
//   async execute(request: any): Promise<RestResponseType> {
//     return new Promise((resolve, reject) => {
//       this.restClient({
//         url: request.url,
//         data: request.data,
//         params: request.params,
//         method: request.post,
//       })
//       .then(response => {
//         this.logger.log(true, response.data, 'init() 123123123');
//         resolve(this.ResponseBuilder(response.status, response.data));
//       })
//       .catch(error => {
//         this.logger.error(error, request.url);
//          resolve(this.ResponseBuilder(400, {error : error.message || 'Something Went Wrong.', code: error.code}));
//       });
//     })
//   }
//   private ResponseBuilder(status: number, data: Record<string, any>) {
//     return {
//       status: status,
//       data: data,
//     }
//   }
// }