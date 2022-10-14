export declare interface IHttpMeta {
  url: string,
  method?: string
}

export declare type HttpSpreadCallback = (...args:any[])=>void;
export declare type HttpPromiseCallback = (result:any)=>void;
export declare type HttpResultCallback = (res:any)=>void;

export class HttpMethod {
  static Get = 'get';
  static Post = 'post';
  static Put = 'put';
  static Delete = 'delete';
  static Head = 'head';
  static Options = 'options';
  static Patch = 'patch';
};
/**
 * 请求的选项
 */
 export declare interface IHttpOptions {
  /**
   * 是请求的接口地址，必填
   */
  url: string,
  /**
   * 是请求的方法，默认值 HttpMethod.Get
   */
  method?: string,
  /**
   * 如果url不是绝对路径，那么会将baseURL和url拼接作为请求的接口地址,用来区分不同环境，建议使用
   */
  baseURL?: string,
  /**
   * 用于请求之前对请求数据进行操作,只用当请求方法为‘PUT’，‘POST’和‘PATCH’时可用,最后一个函数需return出相应数据,可以修改headers
   */
  transformRequest?: ((data:any, headers:any)=>any)[],
  /**
   * 用于对相应数据进行处理,它会通过then或者catch
   */
  transformResponse?: ((data:any)=>any)[],
  /**
   * 请求头,如： {'X-Requested-With': 'XMLHttpRequest'}
   */
  headers?: any,
  /**
   * URL中的路径参数  如：url = /abc/:id/:name ,pathParams = {id:123, name:'name1'}
   */
  pathParams?:any,
  /**
   * URL参数,必须是一个纯对象或者 URL参数对象
   */
  params?: any,
  /**
   * 是一个可选的函数负责序列化`params`
   * (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
   */
  paramsSerializer?: (params:any)=>string,
  /**
   * 请求体数据,只有当请求方法为'PUT', 'POST',和'PATCH'时可用.
   * 当没有设置`transformRequest`时，必须是以下几种格式:
   * - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
   * - Browser only: FormData, File, Blob
   * - Node only: Stream, Buffer
   */
  data?: any,
  /**
   * 请求超时时间（毫秒）
   */
  timeout?: number,
  /**
   * 是否携带cookie信息,默认false
   */
  withCredentials?:boolean,
  /**
   * 使用该配置项目, 我们可以设置属于自己的请求方法,统一处理request让测试更加容易,返回一个Promise并提供一个可用的response
   */
  adapter?:(config:any)=>Promise<(resolved:(res:any)=>void,reject:(err:any)=>void)=>any>,
  /**
   * `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
   * This will set an `Authorization` header, overwriting any existing
   * `Authorization` custom headers you have set using `headers`.
   */
  auth?: any,
  /**
   * 响应格式:可选项 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'.default：'json'
   */
  responseType?:string,
  /**
   * `xsrfCookieName` is the name of the cookie to use as a value for xsrf token. default：'XSRF-TOKEN'
   */
  xsrfCookieName?: string,
   /**
    * `xsrfHeaderName` is the name of the http header that carries the xsrf token value. default:'X-XSRF-TOKEN'
    */
  xsrfHeaderName?: string,
  /**
   * 处理上传进度事件
   */
  onUploadProgress?:(progress:any)=>void,
  /**
   * 处理下载进度事件
   */
   onDownloadProgress?:(progress:any)=>void,
  /**
   * 设置http响应内容的最大长度
   */
  maxContentLength?: number,
  /**
   * 定义可获得的http响应状态码
   * return true、设置为null或者undefined，promise将resolved,否则将rejected
   */
  validateStatus?:(status:number)=>boolean | Promise<(resolved:any,rejected:any)=>void>,
  /**
   * `maxRedirects` defines the maximum number of redirects to follow in node.js.
   * If set to 0, no redirects will be followed.
   * default: 5
   */
  maxRedirects?:number,
  /**
   * `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
   * and https requests, respectively, in node.js. This allows options to be added like
   * `keepAlive` that are not enabled by default.
   *  example：new http.Agent({ keepAlive: true })
   */
  httpAgent?:any,
  /**
   * example： new https.Agent({ keepAlive: true }),
   */
  httpsAgent?:any,
  /**
   * 'proxy' defines the hostname and port of the proxy server
   * Use `false` to disable proxies, ignoring environment variables.
   * `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and supplies credentials.
   * This will set an `Proxy-Authorization` header, overwriting any existing。
   * `Proxy-Authorization` custom headers you have set using `headers`.
   * 如： { host: '127.0.0.1',port: 9000,auth: { username: 'mikeymike',password: 'rapunz3l'}}
   */
  proxy?: any,
  /**
   * 用于取消请求
   * cancelToken` specifies a cancel token that can be used to cancel the request
   * example: new axios.CancelToken(function (cancel) })
   */
  cancelToken?: any
}

// http://www.axios-js.com/zh-cn/docs/
export declare  interface IHttpService{
  /**
   * Get请求
   * @param url 请求地址
   * @param options 请求配置选项
   */
    get(url:string,options:IHttpOptions):Promise<HttpPromiseCallback>;
    /**
     * Post请求
     * @param url 请求地址
     * @param options 请求配置选项
     */
    post(url:string,options:IHttpOptions):Promise<HttpPromiseCallback>;
    /**
     * Put请求
     * @param url 请求地址
     * @param options 请求配置选项
     */
    put(url:string,options:IHttpOptions):Promise<HttpPromiseCallback>;
    /**
     * Delete请求
     * @param url 请求地址
     * @param options 请求配置选项
     */
    delete(url:string,options:IHttpOptions):Promise<HttpPromiseCallback>;
    /**
     * Head请求
     * @param url 请求地址
     * @param options 请求配置选项
     */
    head(url:string,options:IHttpOptions):Promise<HttpPromiseCallback>;
    /**
     * Options请求
     * @param url 请求地址
     * @param options 请求配置选项
     */
    options(url:string,options:IHttpOptions):Promise<HttpPromiseCallback>;
    /**
     * Patch请求
     * @param url 请求地址
     * @param options 请求配置选项
     */
    patch(url:string,options:IHttpOptions):Promise<HttpPromiseCallback>;
    /**
     * 发起多个Promise的Http请求
     * @param iterable 可枚举的多个Promise请求
     */
    all(iterable:Promise<HttpPromiseCallback>[]):Promise<HttpPromiseCallback>;
    /**
     * 展开多个Promise请求
     * @param callback
     */
    spread(callback:HttpSpreadCallback):void;
    /**
     * 创建新的http请求实例
     * @param options
     */
    create(options:IHttpOptions):any;
}


/**
 * http插件
 */
export declare interface IHttpPlugin {
  requestConfig(config:any):any;
  requestError(err:any):Promise<HttpPromiseCallback>;
  responseSuccess(res:any):Promise<HttpResultCallback>|any;
  responseFail(err:any):Promise<HttpResultCallback>;
}

export declare interface IUseHttp{
  getHttpService():IHttpService,
  Http:any
  HttpMethod:HttpMethod
}