import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import {isEmpty} from './tool';

import {Message} from 'element-ui'

Vue.prototype.$message = Message

axios.defaults.timeout = 60000
axios.defaults.baseURL = ''

// http request 拦截器
const requestInterceptors = axios.interceptors.request.use(
  config => {
    let token = '';
    if (isEmpty(sessionStorage.tk) == false) {
      token = sessionStorage.tk;
    }
    config.headers = {
      'Authorization': token,
    }

    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

// http response 拦截器
const responseInterceptors = axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          Vue.prototype.$message({
            showClose: true,
            message: '请求无效',
            type: 'error'
          });
          break;
        case 401:
          sessionStorage.clear()
          Vue.prototype.$message({
            showClose: true,
            message: '未授权，请重新登录',
            type: 'error'
          });
          router.push({
            path: '/login'
          })
          break;
        case 403:
          Vue.prototype.$message({
            showClose: true,
            message: error.response.data.detail,
            type: 'error'
          });
          break;
        case 404:
          Vue.prototype.$message({
            showClose: true,
            message: '请求错误,未找到该资源',
            type: 'error'
          })
          break
        case 405:
          Vue.prototype.$message({
            showClose: true,
            message: '请求方法未允许',
            type: 'error'
          });
          break;
        case 408:
          Vue.prototype.$message({
            showClose: true,
            message: '请求超时',
            type: 'error'
          });
          break;
        case 500:
          Vue.prototype.$message({
            showClose: true,
            message: '返回超时，请刷新页面或稍后再试',
            type: 'error'
          });
          break;
        case 501:
          Vue.prototype.$message({
            showClose: true,
            message: '网络未实现',
            type: 'error'
          });
          break;
        case 502:
          Vue.prototype.$message({
            showClose: true,
            message: '网络错误',
            type: 'error'
          });
          break;
        case 503:
          Vue.prototype.$message({
            showClose: true,
            message: '服务不可用',
            type: 'error'
          });
          break;
        case 504:
          Vue.prototype.$message({
            showClose: true,
            message: '网络超时',
            type: 'error'
          });
          break;
        case 505:
          Vue.prototype.$message({
            showClose: true,
            message: 'http版本不支持该请求',
            type: 'error'
          });
          break;
        default:
          Vue.prototype.$message({
            showClose: true,
            message: `连接错误${error.response.status}`,
            type: 'error'
          });
      }
    } else {
      Vue.prototype.$message({
        showClose: true,
        message: '连接到服务器失败',
        type: 'error'
      });
    }
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装remove请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function remove(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}
