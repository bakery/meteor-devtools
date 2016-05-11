import DocumentSorter from 'marsdb/dist/DocumentSorter';

const defaultAction = () => 0;

export default query => {
  try {
    let parsed = eval(`(${query})`);
    if (parsed && parsed.sort) {
      const helper = new DocumentSorter(parsed.sort);
      const action = helper.getComparator()
      return {action, error: false};
    }
    return {action: defaultAction, error: false};
  } catch (_) {
    return {action: defaultAction, error: true};
  }
};