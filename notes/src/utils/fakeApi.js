const sleep = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const fakeApi = {
  setPublicStatus: async (_status) => {
    await sleep(1300);
    return;
  },
  getPublishedDate: async () => {
    await sleep(1100);
    return new Date();
  },
};

export default fakeApi;
