const ds = require("../data/dataStore");

const getErrorDAL = errCode => {
  const errObj = ds.errors.find(obj => obj.code === errCode);
  return errObj.message;
};

exports.getErrorDAL = getErrorDAL;