export function save() {
  sessionStorage.setItem('preLoginUrl', window.location.href);
}

export function restore(callback) {
  const preLoginUrl = sessionStorage.getItem('preLoginUrl');
  if (preLoginUrl) {
    sessionStorage.removeItem('preLoginUrl');
    callback(preLoginUrl);
  }
}
