import DocumentMatcher from 'marsdb/dist/DocumentMatcher';

const defaultAction = () => true;

export default query => {
  try {
    let parsed = eval(`(${query})`);
    if (parsed && parsed.query) {
      const helper = new DocumentMatcher(parsed.query);
      const action = doc => helper.documentMatches(doc).result;
      return {action, error: false};
    }
    return { action: defaultAction, error: false };
  } catch (_) {
    return { action: defaultAction, error: true };
  }
};