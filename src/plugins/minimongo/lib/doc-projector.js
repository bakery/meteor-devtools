import DocumentProjector from 'marsdb/dist/DocumentProjector';

const defaultAction = doc => doc;

export default query => {
  try {
    let parsed = eval(`(${query})`);
    if (parsed && parsed.fields) {
      const helper = new DocumentProjector(parsed.fields);
      const action = doc => helper.project(doc);
      return {action, error: false};
    }
    return {action: defaultAction, error: false};
  } catch (_) {
    return {action: defaultAction, error: true};
  }
};