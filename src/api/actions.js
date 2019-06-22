const VK = window.VK;

/**
 * Экшен для обращения к API для аутентификации
 * @param {String} appId
 * @param {String} perms
 */
export const login = (appId, perms) => {
  return new Promise(function(resolve, reject) {
    VK.init({
      apiId: appId,
    });

    VK.Auth.login(function(response) {
      if (response.session) {
        resolve(response);
      } else {
        reject(new Error('Не удалось авторизоваться'));
      }
    }, perms);
  });
};

/**
 * Вспомогательная функция для вызова методов API
 * @param {String} method
 * @param {Object} params
 */
const callApi = (method, params) => {
  return new Promise(function(resolve, reject) {
    VK.api(method, params, function(response) {
      if (response.error) {
        reject(new Error(response.error.error_msg));
      } else {
        resolve(response.response);
        // console.log(response); // uncomment to debug
      }
    });
  });
};

/**
 * Экшен получения данных залогиненного пользователя
 * @param {String} v Версия API
 */
export const getUser = v => {
  return callApi('users.get', {
    fields: ['photo_100', 'city'],
    v: v,
  });
};

/**
 * Экшен получения друзей с произовльными полями
 * @param {String} v Версия API
 */
export const getFriends = v => {
  return callApi('friends.get', {
    fields: ['photo_100', 'city'],
    count: 5,
    v: v,
  });
};
